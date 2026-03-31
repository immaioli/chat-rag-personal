import { google } from "@ai-sdk/google";
import { streamText, embed } from "ai";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { systemPrompt } from "./config";

// CONFIGURATION: Prisma adapter setup for connection pooling
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool as any);
const prisma = new PrismaClient({ adapter });

export async function POST(req: Request) {
    try {
        const payload = await req.json();
        
        // DEBUG: Print the exact payload arriving from the frontend
        console.log("📥 [DEBUG API] Payload received:", JSON.stringify(payload, null, 2));

        const { messages, visitorId } = payload;

        // SAFEGUARD 1: Check for visitor ID
        if (!visitorId) {
            console.error("❌ [DEBUG API] 400 Error: visitorId is missing!");
            return new Response('Missing visitorId', { status: 400 });
        }

        // DATA NORMALIZATION: Formatting messages to comply with Vercel AI SDK CoreMessage schema
        const formattedMessages = messages.map((messageItem: any) => {
            let textContext = messageItem.content;
            if (!textContext && messageItem.parts) {
                textContext = messageItem.parts.map((partItem: any) => partItem.text).join(' ');
            }
            return {
                role: messageItem.role,
                content: textContext || '',
            };
        });

        const lastUserMessage = formattedMessages[formattedMessages.length - 1].content;

        if (!lastUserMessage || !lastUserMessage.trim()) {
            return new Response('Empty message content', { status: 400 });
        }

        // DATABASE (USER): Save the incoming user question immediately
        await prisma.chatMessage.create({
            data: {
                visitorId: visitorId,
                role: 'user',
                content: lastUserMessage,
            }
        });

        // EMBEDDING: Transform the user's question into a vector for semantic search
        const { embedding } = await embed({
            model: google.embeddingModel(process.env.GOOGLE_EMBEDDING_MODEL || 'text-embedding-004'),
            value: lastUserMessage
        });

        // VECTOR SEARCH: Query PostgreSQL for the most relevant context
        const vectorQuery = `[${embedding.join(',')}]`;
        const relevantKnowledge = await prisma.$queryRaw`
            SELECT content
            FROM "Knowledge"
            ORDER BY vector <=> ${vectorQuery}::vector
            LIMIT 3;
        ` as { content: string }[];

        const retrievedContext = relevantKnowledge.map((knowledgeItem) => knowledgeItem.content).join('\n\n');
        
        // DYNAMIC PROMPT: Combine the base system prompt with the retrieved database context
        const contextAwareSystemPrompt = `${systemPrompt}\n\n[CONTEXT RETRIEVED FROM THE DATABASE TO GROUND THE RESPONSE]:\n${retrievedContext}`;

        // AI GENERATION & BACKGROUND PROCESSING: Stream the response back to the client
        const result = streamText({
            model: google('gemini-2.5-flash'),
            system: contextAwareSystemPrompt, 
            messages: formattedMessages,
            
            // ASYNC CALLBACK: Executes in the background after the stream finishes sending to the frontend.
            // This is the Next.js equivalent of a lightweight message queue worker.
            async onFinish({ text }) {
                try {
                    // DATABASE (AI): Save the AI's generated response
                    await prisma.chatMessage.create({
                        data: {
                            visitorId: visitorId,
                            role: 'assistant',
                            content: text,
                        }
                    });

                    // ARCHITECTURE NOTE: If deploying on a persistent Docker container, 
                    // this is the exact spot where you would publish the message to RabbitMQ:
                    // rabbitMqChannel.sendToQueue('chat_logs', Buffer.from(JSON.stringify({ visitorId, prompt: lastUserMessage, response: text })));
                    
                } catch (dbError) {
                    console.error('[DATABASE ERROR] Failed to save AI response:', dbError);
                }
            }
        });

        return result.toUIMessageStreamResponse();

    } catch (error) {
        console.log('Error in chat route: ', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}
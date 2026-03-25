import { google } from "@ai-sdk/google"
import { streamText, embed } from "ai"
import { PrismaClient } from "@prisma/client"
import { Pool } from "pg"
import { PrismaPg } from "@prisma/adapter-pg"
import { systemPrompt } from "./config"

// 1. Prisma configuration with Adapter (same pattern as the seed script)
const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool as any)
const prisma = new PrismaClient({ adapter })

export async function POST(req: Request) {
    try {
        const { messages } = await req.json()

        // 1. Format message to comply with the Vercel AI SDK CoreMessage schema
        // This ensures 'content' is never undefined, extracting from 'parts' if necessary
        const formattedMessages = messages.map((msg: any) => {
            let textContext = msg.content
            if (!textContext && msg.parts) {
                textContext = msg.parts.map((p: any) => p.text).join(' ')
            }
            return {
                role: msg.role,
                content: textContext || '',
            }
        })

        // 2. Get the visitor's last question from the formatted array
        const lastMessageText = formattedMessages[formattedMessages.length - 1].content

        // Safeguard to prevent API crash if text is empty
        if (!lastMessageText || !lastMessageText.trim()) {
            return new Response('Empty message content', { status: 400 })
        }

        // 3. transform the visitor's question into a vector (Embedding)
        const { embedding } = await embed({
            model: google.embeddingModel(process.env.GOOGLE_EMBEDDING_MODEL || 'text-embedding-004'),
            value: lastMessageText
        })

        // 4. Search PostgreSQL for the most similar information
        const vectorQuery = `[${embedding.join(',')}]`
        const relevantKnowledge = await prisma.$queryRaw`
            SELECT content
            FROM "Knowledge"
            ORDER BY vector <=> ${vectorQuery}::vector
            LIMIT 3;
        ` as { content: string }[]

        // Join the retrieved result into a single context string
        const context = relevantKnowledge.map((k) => k.content).join('\n\n')

        console.log('🧠 CONTEXTO RECUPERADO DO BANCO:', context)

        // 5. Generate a streaming response using Gemini
        const result = streamText({
            model: google('gemini-2.5-flash'),
            system: systemPrompt,
            messages: formattedMessages,
        })

        return result.toUIMessageStreamResponse();

    } catch (error) {
        console.log('Error in chat route: ', error)
        return new Response('Internal Server Error', { status: 500 })
    }
}
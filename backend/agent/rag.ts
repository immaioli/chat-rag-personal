import { ToolLoopAgent, embed } from "ai"
import { createGroq } from "@ai-sdk/groq"
import { google } from "@ai-sdk/google"
import { z } from 'zod'
import { prisma } from '../db/prisma'

// Initialize Groq provider for ultra-fast Llama3 inference
const groq = createGroq({ apiKey: process.env.GROQ_API_KEY })

// Define the agent with type-safe call options for RAG
export const personalChatbotAgent = new ToolLoopAgent({
    model: groq('llama3-8b-8192'),
    instructions: 'You are an AI representing Irineu Marcelo Maioli. Answer strictly based on the provided context.',

    // Strict typing for inputs coming from the frontend payload
    callOptionsSchema: z.object({
        query: z.string().min(1),
    }),

    // Intercept the call to dynamically inject RAG context
    prepareCall: async ({ options, ...settings }) => {
        // Generate mathematical embedding using Google AI Studio
        const { embedding } = await embed({
            model: google.embeddingModel('gemini-embedding-001'),
            value: options.query,
        })

        // Raw SQL injection for vector similarity search (Cosine Distance)
        const matchedDocs = await prisma.$queryRaw`
        SELECT title, content
        FROM "Document"
        ORDER BY embedding <=> ${embedding}::vector
        LIMIT 3
        ` as Array<{ title: string, content: string }>

        const contextStr = matchedDocs.map(doc => doc.content).join('\n\n')

        // Early return guard clause: keep original settings if no context is found
        if (!contextStr) {
            return settings
        }

        // Inject context seamlessly into the LLM instructios
        return {
            ...settings,
            instructions: `${settings.instructions}\n\nContext:\n${contextStr}`
        }
    }
})
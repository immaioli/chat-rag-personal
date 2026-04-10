import 'dotenv/config'
import { embedMany } from "ai"
import { google } from "@ai-sdk/google"
import { PrismaClient } from "@prisma/client"
import { Pool } from 'pg'
import { PrismaPg } from "@prisma/adapter-pg"
import { resumeChunks } from "@/data/resume"
import { randomUUID } from 'crypto'

// SETUP: Mandatory Prisma configuration with Driver Adapter for serverless compatibility
const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool as any)
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log('🚀 Starting knowledge ingestion (Data Seed)...')

    try {
        // ACTION: Generate embeddings for each text chunk extracted from the structured object
        console.log(`🧠 Generating embeddings for ${resumeChunks.length} knowledge chunks...`)

        const { embeddings } = await embedMany({
            model: google.embeddingModel(`${process.env.GOOGLE_EMBEDDING_MODEL}`),
            // FIX: Successfully mapping to extract only the string content
            values: resumeChunks.map((chunkItem) => chunkItem.content),
        })

        console.log('✅ Embedding generated successfully! Saving to the database...')

        // ACTION: Clear the table before populating it again to avoid duplication during development
        await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Knowledge";`)

        // ACTION: Iterate over the chunks to save them alongside their generated vectors
        for (let chunkIndex = 0; chunkIndex < resumeChunks.length; chunkIndex++) {
            // FIX: Correctly extracting the text content property from the object
            const currentChunkContent = resumeChunks[chunkIndex].content
            const currentEmbedding = embeddings[chunkIndex]

            // FORMATTING: pgvector requires the array to be formatted as an SQL array string: '[0.1, 0.2, ...]'
            const embedingString = `[${currentEmbedding.join(',')}]`
            const chunkId = randomUUID()

            // DATABASE: Execute raw SQL query to insert the vector in the correct form
            await prisma.$executeRawUnsafe(
                `INSERT INTO "Knowledge" (id, content, vector) VALUES ($1, $2, $3::vector)`,
                chunkId,
                currentChunkContent,
                embedingString
            )
        }

        console.log('🎉 Ingestion complete! Your AI now knows your professional and personal journey.')

    } catch (error) {
        console.error('❌ Error during data ingestion: ', error)
    } finally {
        // CLEANUP: Disconnect from the database to prevent memory leaks
        await prisma.$disconnect()
    }
}

main().catch(console.error)
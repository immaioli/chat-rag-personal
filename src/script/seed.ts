import 'dotenv/config'
import { embedMany } from "ai"
import { google } from "@ai-sdk/google"
import { PrismaClient } from "@prisma/client"
import { Pool } from 'pg'
import { PrismaPg } from "@prisma/adapter-pg"
import { resumeChunks } from "@/data/resume"
import { randomUUID } from 'crypto'

// Setting obrigatory of Prisma with Driver adapter
const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool as any)
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log('🚀 Starting knowledge ingestion (Data Seed)...')

    try {
        // 1. Generate embeddings for ech text chunk
        console.log(`🧠 Generating embeddings for ${resumeChunks.length} knowledge chunks...`)

        const { embeddings } = await embedMany({
            model: google.embeddingModel(`${process.env.GOOGLE_EMBEDDING_MODEL}`),
            values: resumeChunks,
        })

        console.log('✅ Embedding generated successfully! Saving to the database...')

        // 2. Save to PostgreSQL (using pgvector)
        // Clear the table before populating it again (optional, useful for development)
        await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Knowledge";`)

        for (let i = 0; i < resumeChunks.length; i++) {
            const content = resumeChunks[i]
            const embedding = embeddings[i]

            // pgvector requires the array to be formatted as an SQL array string: '[0.1, 0.2, ...]
            const embedingString = `[${embedding.join(',')}]`
            const id = randomUUID()

            // Execute raw SQL query to insert the vector in the correct form
            await prisma.$executeRawUnsafe(
                `INSERT INTO "Knowledge" (id, content ,vector) VALUES ($1, $2, $3::vector)`,
                id,
                content,
                embedingString
            )

        }
        console.log('🎉 Ingestion complete! Your AI now knows your professional and personal journey.')

    } catch (error) {
        console.error('❌ Error during data ingestion: ', error)
    } finally {
        // Disconnect from the database
        await prisma.$disconnect()
    }
}

main().catch(console.error)
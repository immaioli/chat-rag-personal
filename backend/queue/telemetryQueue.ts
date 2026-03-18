import { Queue } from "bullmq"

// Instantiate the Queue bypassing the external ioredis instance
// We pass the raw connection parameters directly to BullMQ
export const telemetryQueue = new Queue('rag-telemetry', {
    connection: {
        host: 'localhost',
        port: 6379,
    }
})

// Expose a decoupled function to dispatch jobs
export async function dispatchTelemetry(jobData: { query: string; response: string }) {
    // Fire and forget: pushes the data to Redis instantly
    await telemetryQueue.add('log-chat', jobData, {
        removeOnComplete: true,
        attempts: 3,
        backoff: { type: 'exponential', delay: 1000 }
    })
}
import { createAgentUIStreamResponse } from "ai"
import { personalChatbotAgent } from "../../../../backend/agent/rag"
import { dispatchTelemetry } from "../../../../backend/queue/telemetryQueue"

export async function POST(req: Request) {
    const { messages, query } = await req.json()

    // Early return guard clause to prevent invalid processing
    if (!messages || !query) {
        return new Response('Bad Request: Missing messages or query payload.', { status: 400 })
    }

    // Bind the agent to the UI stream, passing the required Call Options
    return createAgentUIStreamResponse({
        agent: personalChatbotAgent,
        uiMessages: messages,
        options: {
            query: query
        },
        // Lifecycle hook: Triggers right after the stream finishes sending to the client
        onFinish: async ({ responseMessage }) => {
            // Extract the textual answer from the complex AI response object 
            const responseText = responseMessage.parts
                .filter((part: any) => part.type === 'text')
                .map((part: any) => part.text)
                .join(' ')

            // Offload the heavy database writing to BullMQ
            // The Serverless function can terminate peacefully now
            await dispatchTelemetry({
                query: query,
                response: responseText
            })
        }
    })
}
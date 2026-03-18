import { createAgentUIStreamResponse } from "ai"
import { personalChatbotAgent } from "../../../../backend/agent/rag"

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
        }
    })
}
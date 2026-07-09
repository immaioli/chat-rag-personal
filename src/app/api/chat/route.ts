import * as Sentry from '@sentry/nextjs'
import { prisma } from '../../../../backend/db/prisma'

interface MessagePart {
    text: string
}

interface MessageItem {
    role: string
    content?: string
    parts?: MessagePart[]
}

export async function POST(requestPayload: Request) {
    try {
        const payload = await requestPayload.json()
        if (!payload || typeof payload !== 'object') {
            return new Response(JSON.stringify({ error: 'Invalid payload' }), { status: 400 })
        }

        const { messages, visitorId } = payload

        if (!visitorId || typeof visitorId !== 'string') {
            return new Response(JSON.stringify({ error: 'Missing or invalid visitorId' }), { status: 400 })
        }

        if (!Array.isArray(messages) || messages.length === 0) {
            return new Response(JSON.stringify({ error: 'Missing or empty messages array' }), { status: 400 })
        }

        const formattedMessages = messages.map((messageItem: MessageItem) => ({
            role: messageItem.role,
            content: messageItem.content || (messageItem.parts?.map(partItem => partItem.text).join(' ')) || ''
        }))

        const lastUserMessage = formattedMessages[formattedMessages.length - 1]?.content?.trim()

        if (!lastUserMessage) {
            return new Response(JSON.stringify({ error: 'Empty message content' }), { status: 400 })
        }

        const refererUrl = requestPayload.headers.get('referer') || ''
        let userLocale: 'pt-BR' | 'en-US' | 'es-LA' = 'pt-BR'

        if (refererUrl.includes('/en-US')) {
            userLocale = 'en-US'
        } else if (refererUrl.includes('/es-LA')) {
            userLocale = 'es-LA'
        }

        let finalNlgResponse = ''
        const fallbackErrorMessages = {
            'pt-BR': 'No momento estou passando por dificuldades técnicas. Por favor, tente novamente mais tarde.',
            'en-US': 'I am currently experiencing technical difficulties. Please try again later.',
            'es-LA': 'Actualmente estoy experimentando dificultades técnicas. Por favor, inténtelo de nuevo más tarde.'
        }
        const fallbackErrorMessage = fallbackErrorMessages[userLocale] || fallbackErrorMessages['en-US']

        // EXTRACT THE API URL FROM THE ENVIRONMENT
        const classifierApiUrl = process.env.CLASSIFIER_API_URL

        // PREVENT EXECUTION IF THE URL IS NOT CONFIGURED
        if (!classifierApiUrl) {
            console.error('Missing CLASSIFIER_API_URL in environment variables')
            return new Response(JSON.stringify({ error: 'Internal Configuration Error' }), { status: 500 })
        }

        try {
            const apiResponse = await fetch(classifierApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: lastUserMessage,
                    locale: userLocale
                })
            })

            if (!apiResponse.ok) {
                throw new Error(`API responded with status ${apiResponse.status}`)
            }

            const responseData = await apiResponse.json()
            finalNlgResponse = responseData.response || fallbackErrorMessage
        } catch (fetchError) {
            console.error('Failed to fetch from classifier API:', fetchError)
            Sentry.captureException(fetchError)
            finalNlgResponse = fallbackErrorMessage
        }

        try {
            // Persist User Message
            await prisma.chatMessage.create({
                data: {
                    role: 'user',
                    content: lastUserMessage,
                    visitorId: visitorId
                }
            })

            // Persist AI Response
            await prisma.chatMessage.create({
                data: {
                    role: 'assistant',
                    content: finalNlgResponse,
                    visitorId: visitorId
                }
            })
        } catch (dbError) {
            console.error('Failed to persist messages to DB:', dbError)
            Sentry.captureException(dbError)
        }

        const stream = new ReadableStream({
            async start(controller) {
                const encoder = new TextEncoder()
                const words = finalNlgResponse.split(' ')
                const messageId = 'msg_' + Date.now()
                const partId = 'part_' + Date.now()

                controller.enqueue(encoder.encode(`data: {"type":"start","messageId":"${messageId}"}\n\n`))
                controller.enqueue(encoder.encode(`data: {"type":"text-start","id":"${partId}"}\n\n`))

                for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
                    const chunk = (wordIndex === 0 ? '' : ' ') + words[wordIndex]
                    controller.enqueue(encoder.encode(`data: {"type":"text-delta","id":"${partId}","delta":${JSON.stringify(chunk)}}\n\n`))

                    // 30ms delay between words to simulate AI text generation
                    await new Promise(resolve => setTimeout(resolve, 30))
                }

                controller.enqueue(encoder.encode(`data: {"type":"text-end","id":"${partId}"}\n\n`))
                controller.enqueue(encoder.encode(`data: {"type":"finish"}\n\n`))
                controller.enqueue(encoder.encode(`data: [DONE]\n\n`))

                controller.close()
            }
        })

        return new Response(stream, {
            status: 200,
            headers: {
                'Content-Type': 'text/event-stream; charset=utf-8',
                'Cache-Control': 'no-cache, no-transform',
                'X-Content-Type-Options': 'nosniff',
                'x-vercel-ai-ui-message-stream': 'v1'
            }
        })

    } catch (serverError) {
        Sentry.captureException(serverError)
        console.error('❌ [SERVER ERROR]:', serverError)
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        })
    }
}
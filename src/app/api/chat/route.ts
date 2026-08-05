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

        const { messages, visitorId, visitorName } = payload

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
            // Check if visitor exists to avoid Prisma P2003 Foreign Key error
            const visitorUpsertPromise = prisma.visitor.upsert({
                where: { id: visitorId },
                update: {},
                create: {
                    id: visitorId,
                    name: visitorName || 'Visitante',
                    company: ''
                }
            })

            // Persist User Message
            const userMessageCreationPromise = prisma.chatMessage.create({
                data: {
                    role: 'user',
                    content: lastUserMessage,
                    visitorId: visitorId
                }
            })

            // Persist AI Response
            const assistantMessageCreationPromise = prisma.chatMessage.create({
                data: {
                    role: 'assistant',
                    content: finalNlgResponse,
                    visitorId: visitorId
                }
            })

            await prisma.$transaction([
                visitorUpsertPromise,
                userMessageCreationPromise,
                assistantMessageCreationPromise
            ])
        } catch (dbError) {
            console.error('Failed to persist messages to DB:', dbError)
            Sentry.captureException(dbError)
        }

        // We return a simple JSON payload instead of a slow manual stream
        // The front-end will handle the typing animation visually.
        const jsonResponsePayload = {
            id: 'msg_' + Date.now(),
            role: 'assistant',
            content: finalNlgResponse,
            createdAt: new Date().toISOString()
        }

        return new Response(JSON.stringify(jsonResponsePayload), {
            status: 200,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
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
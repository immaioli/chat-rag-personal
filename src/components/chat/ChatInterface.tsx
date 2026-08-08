'use client'
import { useChat } from '@ai-sdk/react'
import { useEffect, useState, useRef } from 'react'
import { ChatHeader } from '@/components/chat/ChatHeader'
import { MessageBubble } from '@/components/chat/MessageBubble'
import { TypingIndicator } from '@/components/chat/TypingIndicator'
import { MessageAvatar } from '@/components/chat/MessageAvatar'
import { MessageInfo } from '@/components/chat/MessageInfo'
import { QuickActionsMenu } from '@/components/chat/QuickActionsMenu'
// import { ChatInputForm } from '@/components/chat/ChatInputForm'
import { TrainingDisclaimer } from './TrainingDisclaimer'
import { useTranslations } from 'next-intl'
import { useVisitorStore } from '@/store/visitorStore'
import { FlexContainer } from '@/components/ui/FlexContainer'
import { Typography } from '@/components/ui/Typography'
import { Button } from '@/components/ui/Button'
import { mergeClasses } from '@/lib/utils'
import { surfaceStyles, typographyStyles, buttonStyles, layoutStyles } from '@/constants/styles'

import { SessionExpiredModal } from './SessionExpiredModal'

const avatar = '/avatar.jpg'
const avatarAI = '/avatar_mAIo.png'

export function ChatInterface({ visitorId }: { visitorId: string }) {
    const [mounted, setMounted] = useState(false)
    const [isProcessingAiResponse, setIsProcessingAiResponse] = useState(false)
    // const [inputValue, setInputValue] = useState('')
    const chatTranslations = useTranslations('ChatInterface')
    const { visitorIdentifier, visitorFullName, hasValidVisitorName, setVisitorInformation } = useVisitorStore()

    const getActiveVisitorData = () => {
        if (visitorIdentifier && visitorFullName) {
            return {
                id: visitorIdentifier,
                name: visitorFullName
            }
        }

        if (typeof window !== 'undefined') {
            return {
                id: localStorage.getItem('mAIo_visitorId') || visitorId || '',
                name: localStorage.getItem('mAIo_visitorName') || 'Visitante'
            }
        }
        return { id: visitorId || '', name: 'Visitante' }
    }

    useEffect(() => {
        const checkAndSetVisitorState = () => {
            if (typeof window !== 'undefined') {
                const storedIdentifier = localStorage.getItem('mAIo_visitorId')
                const storedName = localStorage.getItem('mAIo_visitorName')
                if (storedIdentifier && storedName) {
                    setVisitorInformation(storedIdentifier, storedName.split(' ')[0].toUpperCase())
                    return true
                }
            }
            return false
        }

        checkAndSetVisitorState()
    }, [setVisitorInformation])

    const [currentDate] = useState(() => {
        const now = new Date()
        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        }).format(now)
    })

    const messagesEndRef = useRef<HTMLDivElement>(null)

    // FIX: Extracting all required variables directly and bypassing TypeScript strict options
    const { messages, setMessages, sendMessage, status } = useChat()

    useEffect(() => {
        if (messages && messages.length > 0) {
            sessionStorage.setItem('mAIo_chat_history', JSON.stringify(messages))
        }
    }, [messages])

    useEffect(() => {
        const storedChatHistory = sessionStorage.getItem('mAIo_chat_history')
        if (storedChatHistory) {
            try {
                const parsedHistory = JSON.parse(storedChatHistory)
                setMessages(parsedHistory)
            } catch (error) {
                console.error('Error to parse chat history. ', error)
            }
        }
    }, [setMessages])

    const scrollBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
    }

    useEffect(() => {
        scrollBottom()
    }, [messages, chatTranslations])

    useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true)
        }, 0)
        return () => clearTimeout(timer)
    }, [])

    const [isSessionCurrentlyExpired, setIsSessionCurrentlyExpired] = useState(false)

    const timeoutIdentifierReference = useRef<NodeJS.Timeout>(undefined)

    const resetSessionIdleTimer = () => {
        if (timeoutIdentifierReference.current) {
            clearTimeout(timeoutIdentifierReference.current)
        }
        timeoutIdentifierReference.current = setTimeout(() => {
            setIsSessionCurrentlyExpired(true)
        }, 600000) // 10 minutes
    }

    useEffect(() => {
        if (!hasValidVisitorName) return // Prevent starting the idle timer if the user hasn't completed the WelcomeModal

        // Start initial timer
        resetSessionIdleTimer()

        // Setup event listeners for user activity
        const activityEventsList = ['mousedown', 'keydown', 'scroll', 'touchstart']
        const handleUserActivity = () => resetSessionIdleTimer()

        activityEventsList.forEach(eventName => {
            window.addEventListener(eventName, handleUserActivity)
        })

        return () => {
            if (timeoutIdentifierReference.current) {
                clearTimeout(timeoutIdentifierReference.current)
            }
            activityEventsList.forEach(eventName => {
                window.removeEventListener(eventName, handleUserActivity)
            })
        }
    }, [hasValidVisitorName])

    // PREVENT MULTIPLE SUBMISSIONS IN REACT COMPONENT
    const handleSendMessage = async (payload: { text: string }, options: { body: { visitorId: string, visitorName?: string } }) => {
        if (isProcessingAiResponse) return

        setIsProcessingAiResponse(true)

        try {
            const newUserMessage = {
                id: 'msg_' + Date.now(),
                role: 'user' as const,
                content: payload.text,
                parts: [{ type: 'text', text: payload.text }]
            }

            const updatedMessagesList = [...messages, newUserMessage]
            setMessages(updatedMessagesList as any[])

            const networkResponse = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages: updatedMessagesList,
                    ...options.body
                })
            })

            if (!networkResponse.ok) {
                throw new Error('Failed to fetch AI response')
            }

            const jsonResponseData = await networkResponse.json()
            setMessages([...updatedMessagesList, jsonResponseData])

        } catch (requestError) {
            console.error('Chat request failed:', requestError)
        } finally {
            setIsProcessingAiResponse(false)
        }
    }

    const handleQuickAction = (action: string) => {
        if (action) {
            const visitorData = getActiveVisitorData()
            handleSendMessage(
                { text: action },
                { body: { visitorId: visitorData.id, visitorName: visitorData.name } }
            )
        }
    }

    // const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault()
    //     if (inputValue.trim()) {
    //         const visitorData = getActiveVisitorData()
    //         sendMessage(
    //             { text: inputValue },
    //             { body: { visitorId: visitorData.id, visitorName: visitorData.name } }
    //         )
    //         setInputValue('')
    //     }
    // }

    if (!mounted) return null

    const isAITyping = isProcessingAiResponse && messages[messages.length - 1]?.role === 'user'

    return (
        <FlexContainer justifyContent='center' className={mergeClasses('overflow-hidden h-screen w-full', surfaceStyles.mainWrapper)}>
            <SessionExpiredModal isSessionCurrentlyExpired={isSessionCurrentlyExpired} hasValidVisitorName={hasValidVisitorName} />
            <FlexContainer direction='col' className={mergeClasses('relative', surfaceStyles.chatContainer)}>
                <ChatHeader avatarUrl={avatar} />
                <FlexContainer direction='col' className={mergeClasses('space-y-6', surfaceStyles.chatBody)}>
                    <FlexContainer justifyContent='center'>
                        <Typography as='span' size='xs' weight='medium' color='muted' className={typographyStyles.dateBadge}>
                            Hoje
                        </Typography>
                    </FlexContainer>
                    {hasValidVisitorName ? (
                        <MessageBubble isUser={false} content={chatTranslations('welcomeMessage', { name: visitorFullName })} currentDate={currentDate} avatarAI={avatarAI} isTyping={false} />
                    ) : (
                        <div className="flex items-start gap-3 w-full">
                            <MessageAvatar isUser={false} avatarAI={avatarAI} />
                            <div className={layoutStyles.messageContainer}>
                                <MessageInfo isUser={false} currentDate={currentDate} />
                                <div className={surfaceStyles.messageBubbleAI}>
                                    <TypingIndicator />
                                </div>
                            </div>
                        </div>
                    )}
                    {messages?.map((message: { id: string, role: string, content?: string, parts?: Array<{ type: string, text?: string }> }) => {
                        const extractedText = message.content || (message.parts?.map((part: { type: string, text?: string }) => (part.type === 'text' ? part.text : '') || '').join('')) || ''
                        return (
                            <MessageBubble key={message.id} isUser={message.role === 'user'} content={extractedText} parts={message.parts} currentDate={currentDate} avatarAI={avatarAI} isTyping={true} onReveal={scrollBottom} />
                        )
                    })}
                    
                </FlexContainer>
                <FlexContainer direction='col' className={mergeClasses('gap-3', surfaceStyles.chatFooter)}>
                    <QuickActionsMenu onAction={handleQuickAction} />
                    {/* VERSION 2.0.0: AI manual input integration form
                    <ChatInputForm
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        onSubmit={onSubmit}
                        disabled={status !== 'ready'}
                    />
                    */}
                    <TrainingDisclaimer />
                </FlexContainer>
                <div ref={messagesEndRef} className='h-24 w-full shrink-0' />
            </FlexContainer>
        </FlexContainer>
    )
}
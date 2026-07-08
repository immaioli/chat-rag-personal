'use client'
import { useChat } from '@ai-sdk/react'
import { useEffect, useState, useRef } from 'react'
import { ChatHeader } from '@/components/chat/ChatHeader'
import { MessageBubble } from '@/components/chat/MessageBubble'
import { TypingIndicator } from '@/components/chat/TypingIndicator'
import { QuickActionsMenu } from '@/components/chat/QuickActionsMenu'
// import { ChatInputForm } from '@/components/chat/ChatInputForm'
import { TrainingDisclaimer } from './TrainingDisclaimer'
import { useTranslations } from 'next-intl'
import { FlexContainer } from '@/components/ui/FlexContainer'
import { Typography } from '@/components/ui/Typography'
import { mergeClasses } from '@/lib/utils'
import { surfaceStyles, typographyStyles } from '@/constants/styles'

const avatar = '/avatar.jpg'
const avatarAI = '/avatar_mAIo.png'

export function ChatInterface({ visitorId }: { visitorId: string }) {
    const [mounted, setMounted] = useState(false)
    const [isProcessingAiResponse, setIsProcessingAiResponse] = useState(false)
    // const [inputValue, setInputValue] = useState('')
    const chatTranslations = useTranslations('ChatInterface')
    const [activeVisitorId] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('mAIo_visitorId') || visitorId || ''
        }
        return visitorId || ''
    })
    
    const [visitorFirstName] = useState(() => {
        if (typeof window !== 'undefined') {
            const storedName = localStorage.getItem('mAIo_visitorName')
            if (storedName) return storedName.split(' ')[0].toUpperCase()
        }
        return 'Visitante'
    })
    
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

    // PREVENT MULTIPLE SUBMISSIONS IN REACT COMPONENT
    const handleSendMessage = async (payload: { text: string }, options: { body: { visitorId: string } }) => {
        if (isProcessingAiResponse) return
        
        setIsProcessingAiResponse(true)
        
        try {
            // EXECUTE CHAT API CALL
            await sendMessage(payload, options)
        } catch (requestError) {
            console.error('Chat request failed:', requestError)
        } finally {
            setIsProcessingAiResponse(false)
        }
    }

    const handleQuickAction = (action: string) => {
        if (action) {
            handleSendMessage(
                { text: action },
                { body: { visitorId: activeVisitorId } }
            )
        }
    }

    // const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault()
    //     if (inputValue.trim()) {
    //         sendMessage(
    //             { text: inputValue },
    //             { body: { visitorId: activeVisitorId } }
    //         )
    //         setInputValue('')
    //     }
    // }

    if (!mounted) return null

    const isAITyping = (status === 'submitted' || status === 'streaming') && messages[messages.length - 1]?.role === 'user'

    return (
        <FlexContainer justifyContent='center' className={mergeClasses('overflow-hidden h-screen w-full', surfaceStyles.mainWrapper)}>
            <FlexContainer direction='col' className={mergeClasses('relative', surfaceStyles.chatContainer)}>
                <ChatHeader avatarUrl={avatar} />
                <FlexContainer direction='col' className={mergeClasses('space-y-6', surfaceStyles.chatBody)}>
                    <FlexContainer justifyContent='center'>
                        <Typography as='span' size='xs' weight='medium' color='muted' className={typographyStyles.dateBadge}>
                            Hoje
                        </Typography>
                    </FlexContainer>
                    <MessageBubble isUser={false} content={chatTranslations('welcomeMessage', { name: visitorFirstName })} currentDate={currentDate} avatarAI={avatarAI} />
                    {messages?.map((message: { id: string, role: string, parts?: Array<{ type: string, text?: string }> }) => {
                        const extractedText = message.parts?.map((part: { type: string, text?: string }) => (part.type === 'text' ? part.text : '') || '').join('') || ''
                        return (
                            <MessageBubble key={message.id} isUser={message.role === 'user'} content={extractedText} parts={message.parts} currentDate={currentDate} avatarAI={avatarAI} />
                        )
                    })}
                    {isAITyping && <TypingIndicator avatarAI={avatarAI} />}
                    <div ref={messagesEndRef} className='h-px w-full' />
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
            </FlexContainer>
        </FlexContainer>
    )
}
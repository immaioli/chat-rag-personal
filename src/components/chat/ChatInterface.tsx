'use client'
import { useChat } from '@ai-sdk/react'
import { useEffect, useState, useRef } from 'react'
import { ChatHeader } from '@/components/chat/ChatHeader'
import { MessageBubble } from '@/components/chat/MessageBubble'
import { TypingIndicator } from '@/components/chat/TypingIndicator'
import { QuickActionsMenu } from '@/components/chat/QuickActionsMenu'
import { ChatInputForm } from '@/components/chat/ChatInputForm'
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
    const [inputValue, setInputValue] = useState('')
    const [currentDate, setCurrentDate] = useState('')
    const chatTranslations = useTranslations('ChatInterface')
    const [activeVisitorId, setActiveVisitorId] = useState(visitorId || '')
    const [visitorFirstName, setVisitorFirstName] = useState('Visitante')
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const { messages, setMessages, sendMessage, status } = useChat({
        api: '/api/chat'
    } as any)

    useEffect(() => {
        if (messages.length > 0) {
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
    }, [])

    const scrollBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollBottom()
    }, [messages])

    useEffect(() => {
        const storedName = localStorage.getItem('mAIo_visitorName')
        const storedId = localStorage.getItem('mAIo_visitorId')

        if (storedName) {
            const firstName = storedName.split(' ')[0].toUpperCase()
            setVisitorFirstName(firstName)
        }

        if (storedId) {
            setActiveVisitorId(storedId)
        }

        const now = new Date()
        const formatted = new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        }).format(now)

        setCurrentDate(formatted)
        setMounted(true)
    }, [])

    const handleQuickAction = (action: string) => {
        if (action) {
            sendMessage(
                { text: action },
                { body: { visitorId: activeVisitorId } }
            )
        }
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (inputValue.trim()) {
            sendMessage(
                { text: inputValue },
                { body: { visitorId: activeVisitorId } }
            )
            setInputValue('')
        }
    }

    if (!mounted) return null

    const isAITyping =
        (status === 'submitted' || status === 'streaming') &&
        messages[messages.length - 1]?.role === 'user'

    return (
        <FlexContainer
            justifyContent='center'
            className={mergeClasses('overflow-hidden h-screen w-full', surfaceStyles.mainWrapper)}
        >
            <FlexContainer
                direction='col'
                className={mergeClasses('relative', surfaceStyles.chatContainer)}
            >
                <ChatHeader avatarUrl={avatar} />
                <FlexContainer
                    direction='col'
                    className={mergeClasses('space-y-6', surfaceStyles.chatBody)}
                >
                    <FlexContainer justifyContent='center'>
                        <Typography
                            as='span'
                            size='xs'
                            weight='medium'
                            color='muted'
                            className={typographyStyles.dateBadge}
                        >
                            Hoje
                        </Typography>
                    </FlexContainer>
                    <MessageBubble
                        isUser={false}
                        content={chatTranslations('welcomeMessage', { name: visitorFirstName })}
                        currentDate={currentDate}
                        avatarAI={avatarAI}
                    />
                    {messages.map((message) => (
                        <MessageBubble
                            key={message.id}
                            isUser={message.role === 'user'}
                            content={(message as any).content}
                            parts={message.parts}
                            currentDate={currentDate}
                            avatarAI={avatarAI}
                        />
                    ))}
                    {isAITyping && <TypingIndicator avatarAI={avatarAI} />}
                    <div ref={messagesEndRef} className='h-px w-full' />
                </FlexContainer>
                <FlexContainer
                    direction='col'
                    className={mergeClasses('gap-3', surfaceStyles.chatFooter)}
                >
                    <QuickActionsMenu onAction={handleQuickAction} />
                    <ChatInputForm
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        onSubmit={onSubmit}
                        disabled={status !== 'ready'}
                    />
                    <TrainingDisclaimer />
                </FlexContainer>
            </FlexContainer>
        </FlexContainer>
    )
}
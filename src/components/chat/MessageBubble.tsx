'use client'
import { useEffect, useState } from 'react'
import { MarkdownBlock } from './MarkdownBlock'
import { MessageAvatar } from './MessageAvatar'
import { MessageInfo } from './MessageInfo'
import { FlexContainer } from '@/components/ui/FlexContainer'
import { mergeClasses } from '@/lib/utils'
import { surfaceStyles, layoutStyles } from '@/constants/styles'

interface MessageBubbleProps {
    isUser: boolean
    content: any
    parts?: any[]
    currentDate: string
    avatarAI: string
}

export function MessageBubble({
    isUser,
    content,
    parts,
    currentDate,
    avatarAI
}: MessageBubbleProps) {
    const [visitorName, setVisitorName] = useState<string>('Você')

    useEffect(() => {
        const storedName = localStorage.getItem('mAIo_visitorName')
        if (storedName) {
            const firstName = storedName.split(' ')[0]
            setVisitorName(firstName)
        }
    }, [])

    return (
        <div className={isUser ? layoutStyles.messageWrapperUser : layoutStyles.messageWrapperAI}>
            <MessageAvatar
                isUser={isUser}
                avatarAI={!isUser ? avatarAI : undefined}
            />

            <div className={layoutStyles.messageContainer}>
                <MessageInfo
                    isUser={isUser}
                    currentDate={currentDate}
                    nameUser={isUser ? visitorName : undefined}
                />

                <div className={isUser ? surfaceStyles.messageBubbleUser : surfaceStyles.messageBubbleAI}>
                    {parts ? (
                        parts.map((messagePart, index) => messagePart.type === 'text' && (
                            isUser ? (
                                <span key={index}>{messagePart.text}</span>
                            ) : (
                                <MarkdownBlock key={index} content={messagePart.text} />
                            )
                        ))
                    ) : (
                        isUser ? <span>{content}</span> : <MarkdownBlock content={content} />
                    )}
                </div>
            </div>
        </div>
    )
}
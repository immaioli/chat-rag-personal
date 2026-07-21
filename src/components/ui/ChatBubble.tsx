import React from 'react'
import { markdownStyles, surfaceStyles } from '@/constants/styles'

// Interface mapping the required properties for the chat bubble
interface ChatBubbleProperties {
  messageContent: string
  isUserMessage: boolean
}

export function ChatBubble({ messageContent, isUserMessage }: ChatBubbleProperties) {
  // Determine the bubble styling based on the message sender
  const bubbleContainerStyle = isUserMessage
    ? surfaceStyles.messageBubbleUser
    : surfaceStyles.messageBubbleAI

  // Wrapper style alignment based on the message sender
  const wrapperAlignmentStyle = isUserMessage
    ? 'flex flex-row-reverse items-start justify-start gap-3 w-full'
    : 'flex flex-row items-start justify-start gap-3 w-full'

  return (
    <div className={wrapperAlignmentStyle}>
      <div className={bubbleContainerStyle}>
        <p className={markdownStyles.paragraph}>{messageContent}</p>
      </div>
    </div>
  )
}

'use client'
import { useState, useEffect } from 'react'

interface AnimatedTypingMessageProperties {
    fullContentText: string
    typingSpeedMilliseconds?: number
}

export function AnimatedTypingMessage({ fullContentText, typingSpeedMilliseconds = 30 }: AnimatedTypingMessageProperties) {
    const [currentlyDisplayedText, setCurrentlyDisplayedText] = useState('')
    const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0)

    useEffect(() => {
        if (currentCharacterIndex < fullContentText.length) {
            const typingDelayTimeoutIdentifier = setTimeout(() => {
                setCurrentlyDisplayedText((previousDisplayedText) => previousDisplayedText + fullContentText.charAt(currentCharacterIndex))
                setCurrentCharacterIndex((previousCharacterIndex) => previousCharacterIndex + 1)
            }, typingSpeedMilliseconds)
            return () => clearTimeout(typingDelayTimeoutIdentifier)
        }
    }, [currentCharacterIndex, fullContentText, typingSpeedMilliseconds])

    const formattedHtmlText = currentlyDisplayedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

    return <span dangerouslySetInnerHTML={{ __html: formattedHtmlText }} />
}

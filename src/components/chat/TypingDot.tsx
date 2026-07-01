import { animationStyles } from '@/constants/styles'

interface TypingDotProps {
    delay?: string
}

export function TypingDot({
    delay = '0s'
}: TypingDotProps) {
    return (
        <div
            className={animationStyles.typingDot}
            style={{ animationDelay: delay }}
        />
    )
}
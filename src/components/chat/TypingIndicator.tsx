import { FlexContainer } from '@/components/ui/FlexContainer'
import { TypingDot } from './TypingDot'
import { surfaceStyles } from '@/constants/styles'

export function TypingIndicator() {
    return (
        <FlexContainer className={surfaceStyles.typingBubble}>
            <TypingDot />
            <TypingDot delay='0.1s' />
            <TypingDot delay='0.2s' />
        </FlexContainer>
    )
}
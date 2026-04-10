import { Avatar } from '@/components/ui/Avatar'
import { FlexContainer } from '@/components/ui/FlexContainer'
import { TypingDot } from './TypingDot'
import {
    layoutStyles,
    surfaceStyles
} from '@/constants/styles'

interface TypingIndicatorProps {
    avatarAI: string
}

export function TypingIndicator({
    avatarAI
}: TypingIndicatorProps) {
    return (
        <FlexContainer
            alignItems='center'
            className={layoutStyles.typingIndicator}
        >
            <Avatar
                url={avatarAI}
                showStatus={true}
                size='sm'
            />
            <FlexContainer className={surfaceStyles.typingBubble}>
                <TypingDot />
                <TypingDot delay='0.1s' />
                <TypingDot delay='0.2s' />
            </FlexContainer>
        </FlexContainer>
    )
}
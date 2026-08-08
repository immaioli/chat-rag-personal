import { FlexContainer } from '@/components/ui/FlexContainer'
import { TypingDot } from './TypingDot'
import { surfaceStyles } from '@/constants/styles'

export function TypingIndicator() {
    return (
        <FlexContainer className="flex items-center justify-center gap-1 min-w-[40px] pt-1 pb-1 animate-in fade-in duration-300">
            <TypingDot />
            <TypingDot delay='0.1s' />
            <TypingDot delay='0.2s' />
        </FlexContainer>
    )
}
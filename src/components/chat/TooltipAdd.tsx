import { MessageSquarePlus } from 'lucide-react'
import { FlexContainer } from '@/components/ui/FlexContainer'
import { Typography } from '@/components/ui/Typography'
import { 
    layoutStyles, 
    typographyStyles, 
    popoverStyles, 
    iconStyles 
} from '@/constants/styles'

interface TooltipAddProps {
    text: string
}

export function TooltipAdd({ text }: TooltipAddProps) {
    return (
        <FlexContainer className={layoutStyles.tooltipContainer}>
            <FlexContainer 
                as='span' 
                alignItems='center' 
                className={iconStyles.tooltipIcon}
            >
                <MessageSquarePlus size={20} />
            </FlexContainer>
            <FlexContainer 
                direction='col' 
                alignItems='center' 
                className={popoverStyles.tooltipWrapper}
            >
                <Typography 
                    as='span' 
                    size='xs' 
                    className={typographyStyles.tooltip}
                >
                    {text}
                </Typography>
                <div className={popoverStyles.tooltipArrow} />
            </FlexContainer>
        </FlexContainer>
    )
}
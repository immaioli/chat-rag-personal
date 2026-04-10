import { Info } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FlexContainer } from '@/components/ui/FlexContainer'
import { Typography } from '@/components/ui/Typography'
import { mergeClasses } from '@/lib/utils'
import {
    layoutStyles,
    iconStyles,
    typographyStyles,
} from '@/constants/styles'

export function TrainingDisclaimer() {
    const chatTranslations = useTranslations('ChatInterface')
    return (
        <FlexContainer
            alignItems='center'
            justifyContent='center'
            className={layoutStyles.disclaimer}
        >
            <Info
                className={mergeClasses(
                    iconStyles.xlg,
                    iconStyles.disclaimer
                )}
            />
            <Typography
                as='p'
                weight='semibold'
                color='muted'
                className={typographyStyles.disclaimer}
            >
                {chatTranslations('disclaimer')}
            </Typography>
        </FlexContainer>
    )
}
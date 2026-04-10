import { LucideIcon } from 'lucide-react'
import { FlexContainer } from '@/components/ui/FlexContainer'
import { Typography } from '@/components/ui/Typography'
import { typographyStyles } from '@/constants/styles'

interface StackProps {
    Icon: LucideIcon
    label: string
    iconColor: string
    showSeparator?: boolean
}

export function Stack({
    Icon,
    label,
    iconColor,
    showSeparator = true
}: StackProps) {
    return (
        <>
            <FlexContainer
                as='span'
                alignItems='center'
                className='gap-1'
            >
                <Icon
                    size={12}
                    className={iconColor}
                />
                {label}
            </FlexContainer>
            {showSeparator
                ? (
                    <Typography
                        as='span'
                        className={typographyStyles.separator}
                    >
                        |
                    </Typography>
                )
                : null
            }
        </>
    )
}
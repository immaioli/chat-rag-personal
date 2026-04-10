import { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Typography } from '@/components/ui/Typography'
import {
    buttonStyles,
    iconStyles,
    typographyStyles
} from '@/constants/styles'

interface QuickActionButtonProps {
    label: string
    Icon: LucideIcon
    onClick: () => void
}

export function QuickActionButton({
    label,
    Icon,
    onClick
}: QuickActionButtonProps) {
    return (
        <Button
            onClick={onClick}
            type='button'
            variant='ghost'
            className={buttonStyles.quickAction}
        >
            <Icon
                size={18}
                className={iconStyles.quickAction}
            />
            <Typography
                as='span'
                size='sm'
                weight='medium'
                className={typographyStyles.quickAction}
            >
                {label}
            </Typography>
        </Button>
    )
}
import { ChevronDown, Menu } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'
import { Typography } from '@/components/ui/Typography'
import { mergeClasses } from '@/lib/utils'
import { 
    buttonStyles, 
    typographyStyles, 
    iconStyles 
} from '@/constants/styles'

interface QuickActionsToggleProps {
    isOpen: boolean
    onClick: () => void
}

export function QuickActionsToggle({ 
    isOpen, 
    onClick 
}: QuickActionsToggleProps) {
    const quickActionsTranslations = useTranslations('QuickActions')
    return (
        <Button
            onClick={onClick}
            type='button'
            variant='ghost'
            className={buttonStyles.quickActionsToggle}
        >
            <Typography 
                as='span' 
                size='sm' 
                weight='medium' 
                className={typographyStyles.toggleLabel}
            >
                <Menu 
                    size={18} 
                    className={iconStyles.muted} 
                />
                {quickActionsTranslations('title')}
            </Typography>
            <ChevronDown
                size={18}
                className={mergeClasses(
                    iconStyles.muted,
                    iconStyles.animated,
                    isOpen 
                        ? 'rotate-180' 
                        : 'rotate-0'
                )}
            />
        </Button>
    )
}
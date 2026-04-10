import { ElementType } from 'react'
import { Button } from '@/components/ui/Button'
import { Typography } from '@/components/ui/Typography'
import { mergeClasses } from '@/lib/utils'
import { 
    buttonStyles, 
    iconStyles, 
    typographyStyles 
} from '@/constants/styles'

interface LanguageButtonProps {
    title: string
    icon: ElementType
    isActive?: boolean
    onClick?: () => void
    isShowTitle?: boolean
}

export function LanguageButton({ 
    title, 
    icon: FlagIcon, 
    isActive = false, 
    isShowTitle = true, 
    onClick 
}: LanguageButtonProps) {
    return (
        <Button
            type='button'
            onClick={onClick}
            variant='ghost'
            className={mergeClasses(
                buttonStyles.language,
                isShowTitle ? 'w-28 px-2 py-2' : 'w-8 p-0',
                isActive ? buttonStyles.languageActive : buttonStyles.languageInactive
            )}
            title={title}
        >
            <FlagIcon 
                className={mergeClasses(
                    iconStyles.flag, 
                    isShowTitle && 'mr-1'
                )} 
            />
            {isShowTitle && (
                <Typography 
                    as='span' 
                    size='sm' 
                    weight='medium' 
                    className={typographyStyles.language}
                >
                    {title}
                </Typography>
            )}
        </Button>
    )
}
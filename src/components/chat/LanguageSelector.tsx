'use client'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/routing'
import { LanguageButton } from './LanguageButton'
import { BR, US, ES } from 'country-flag-icons/react/3x2'
import { useTransition } from 'react'
import { FlexContainer } from '@/components/ui/FlexContainer'
import { layoutStyles } from '@/constants/styles'

export function LanguageSelector() {
    const currentLocale = useLocale()
    const router = useRouter()
    const pathname = usePathname()
    const [, startTransition] = useTransition()

    const handleLanguageChange = (newLocale: string) => {
        if (currentLocale !== newLocale) {
            startTransition(() => {
                router.replace(
                    pathname, 
                    { locale: newLocale }
                )
            })
        }
    }

    return (
        <FlexContainer 
            alignItems='center' 
            className={layoutStyles.selector}
        >
            <LanguageButton
                title='Português'
                icon={BR}
                isShowTitle={false}
                isActive={currentLocale === 'pt-BR'}
                onClick={() => handleLanguageChange('pt-BR')}
            />
            <LanguageButton
                title='English'
                icon={US}
                isShowTitle={false}
                isActive={currentLocale === 'en-US'}
                onClick={() => handleLanguageChange('en-US')}
            />
            <LanguageButton
                title='Español'
                icon={ES}
                isShowTitle={false}
                isActive={currentLocale === 'es-LA'}
                onClick={() => handleLanguageChange('es-LA')}
            />
        </FlexContainer>
    )
}
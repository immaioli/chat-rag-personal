'use client'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from '@/i18n/routing'
import { BR, US, ES } from 'country-flag-icons/react/3x2'
import { LanguageButton } from './LanguageButton'
import { FlexContainer } from '@/components/ui/FlexContainer'
import { Typography } from '@/components/ui/Typography'
import { Button } from '@/components/ui/Button'
import { surfaceStyles, typographyStyles, buttonStyles, layoutStyles } from '@/constants/styles'
import ptBR from '../../../translate/pt-BR.json'
import enUS from '../../../translate/en-US.json'
import esLA from '../../../translate/es-LA.json'

const modalDict = {
    'pt-BR': ptBR.SessionExpiredModal,
    'en-US': enUS.SessionExpiredModal,
    'es-LA': esLA.SessionExpiredModal
}

interface SessionExpiredModalProperties {
    isSessionCurrentlyExpired: boolean
    hasValidVisitorName: boolean
}

export function SessionExpiredModal({ isSessionCurrentlyExpired, hasValidVisitorName }: SessionExpiredModalProperties) {
    const router = useRouter()
    const pathname = usePathname()
    const [selectedLocale, setSelectedLocale] = useState('en-US')

    useEffect(() => {
        // Set default locale based on path if available, to match WelcomeModal behavior
        if (pathname.includes('/pt-BR')) setSelectedLocale('pt-BR')
        else if (pathname.includes('/es-LA')) setSelectedLocale('es-LA')
    }, [pathname])

    const handleRestartSession = () => {
        localStorage.clear()
        sessionStorage.clear()
        router.replace(pathname, { locale: selectedLocale })
        setTimeout(() => window.location.reload(), 100) // Ensure complete wipe and fresh state
    }

    if (!isSessionCurrentlyExpired || !hasValidVisitorName) return null

    const activeExpiredTexts = modalDict[selectedLocale as keyof typeof modalDict] || modalDict['en-US']

    return (
        <FlexContainer alignItems='center' justifyContent='center' className={surfaceStyles.modalOverlay}>
            <FlexContainer direction='col' className={surfaceStyles.modalContent}>
                <FlexContainer direction='col' className={surfaceStyles.modalHeader}>
                    <Typography as='h2' size='2xl' weight='bold' className={typographyStyles.modalTitle}>
                        {activeExpiredTexts.title}
                    </Typography>
                    <Typography as='p' size='sm' color='muted' className='mt-2'>
                        {activeExpiredTexts.description}
                    </Typography>
                </FlexContainer>

                <FlexContainer direction='col' className={surfaceStyles.modalForm}>
                    <FlexContainer direction='col' className={layoutStyles.languageSection}>
                        <FlexContainer justifyContent='between' className='gap-4 w-full'>
                            <LanguageButton
                                title='Português'
                                icon={BR}
                                onClick={() => setSelectedLocale('pt-BR')}
                                isActive={selectedLocale === 'pt-BR'}
                            />
                            <LanguageButton
                                title='English'
                                icon={US}
                                onClick={() => setSelectedLocale('en-US')}
                                isActive={selectedLocale === 'en-US'}
                            />
                            <LanguageButton
                                title='Español'
                                icon={ES}
                                onClick={() => setSelectedLocale('es-LA')}
                                isActive={selectedLocale === 'es-LA'}
                            />
                        </FlexContainer>
                    </FlexContainer>

                    <Button onClick={handleRestartSession} variant='primaryForm'>
                        {activeExpiredTexts.button}
                    </Button>
                </FlexContainer>
            </FlexContainer>
        </FlexContainer>
    )
}

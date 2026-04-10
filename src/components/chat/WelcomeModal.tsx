'use client'
import { useState, useEffect, FormEvent } from 'react'
import { useRouter, usePathname } from '@/i18n/routing'
import { registerVisitor } from '@/actions/visitor'
import { Info } from 'lucide-react'
import { LanguageButton } from './LanguageButton'
import { BR, US, ES } from 'country-flag-icons/react/3x2'
import { FlexContainer } from '@/components/ui/FlexContainer'
import { Typography } from '@/components/ui/Typography'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { mergeClasses } from '@/lib/utils'
import {
    surfaceStyles,
    typographyStyles,
    iconStyles,
    layoutStyles,
    buttonStyles
} from '@/constants/styles'
import ptBR from '../../../translate/pt-BR.json'
import enUS from '../../../translate/en-US.json'
import esLA from '../../../translate/es-LA.json'

const modalDict = {
    'pt-BR': ptBR.WelcomeModal,
    'en-US': enUS.WelcomeModal,
    'es-LA': esLA.WelcomeModal
}

export function WelcomeModal() {
    const router = useRouter()
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const [name, setName] = useState('')
    const [company, setCompany] = useState('')
    const [selectedLocale, setSelectedLocale] = useState('en-US')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const storedVisitorId = localStorage.getItem('mAIo_visitorId')
        if (!storedVisitorId) {
            setIsOpen(true)
        }
    }, [])

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        if (!name.trim()) return
        setIsLoading(true)
        const response = await registerVisitor(name, company)
        if (response.success && response.visitorId) {
            localStorage.setItem('mAIo_visitorId', response.visitorId)
            localStorage.setItem('mAIo_visitorName', name)
            setIsOpen(false)
            router.replace(
                pathname,
                { locale: selectedLocale }
            )
        }
        setIsLoading(false)
    }

    if (!isOpen) return null
    const activeTexts = modalDict[selectedLocale as keyof typeof modalDict] || modalDict['en-US']

    return (
        <FlexContainer
            alignItems='center'
            justifyContent='center'
            className={surfaceStyles.modalOverlay}
        >
            <FlexContainer
                direction='col'
                className={surfaceStyles.modalContent}
            >
                <FlexContainer
                    direction='col'
                    className={surfaceStyles.modalHeader}
                >
                    <Typography
                        as='h2'
                        size='2xl'
                        weight='bold'
                        className={typographyStyles.modalTitle}
                    >
                        {activeTexts.title}
                    </Typography>
                    <Typography
                        as='p'
                        size='sm'
                        color='muted'
                        className='mt-2'
                    >
                        {activeTexts.description}
                    </Typography>
                </FlexContainer>
                <FlexContainer
                    as='form'
                    onSubmit={handleSubmit}
                    direction='col'
                    className={surfaceStyles.modalForm}
                >
                    <FlexContainer
                        direction='col'
                        className={layoutStyles.languageSection}
                    >
                        <FlexContainer
                            justifyContent='between'
                            className='gap-4 w-full'
                        >
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
                    <FlexContainer
                        direction='col'
                        className={layoutStyles.formSection}
                    >
                        <Input
                            placeholder={activeTexts.name_ph}
                            required
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <Input
                            placeholder={activeTexts.company_ph}
                            value={company}
                            onChange={(event) => setCompany(event.target.value)}
                        />
                    </FlexContainer>
                    <FlexContainer
                        alignItems='center'
                        justifyContent='center'
                        className={surfaceStyles.infoBanner}
                    >
                        <Info
                            className={mergeClasses(
                                iconStyles.xxxlg,
                                iconStyles.infoBanner
                            )}
                        />
                        <Typography
                            as='p'
                            size='md'
                            weight='normal'
                            className={typographyStyles.infoBannerText}
                        >
                            {activeTexts.disclaimer}
                        </Typography>
                    </FlexContainer>
                    <Button
                        type='submit'
                        disabled={isLoading}
                        className={buttonStyles.primaryForm}
                    >
                        {isLoading
                            ? activeTexts.button_load
                            : activeTexts.button_default
                        }
                    </Button>
                </FlexContainer>
            </FlexContainer>
        </FlexContainer>
    )
}
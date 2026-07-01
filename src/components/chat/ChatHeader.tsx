'use client'
import { useState, useRef, useEffect } from 'react'
import { Menu } from 'lucide-react'
import { Logo } from './Logo'
import { Avatar } from '@/components/ui/Avatar'
import { TechStack } from './TechStack'
import { LanguageSelector } from './LanguageSelector'
import { ThemeToggle } from './ThemeToggle'
import { SocialLinks } from './SocialLinks'
import { Typography } from '@/components/ui/Typography'
import { FlexContainer } from '@/components/ui/FlexContainer'
import { Divider } from '@/components/ui/Divider'
import { mergeClasses } from '@/lib/utils'
import {
    surfaceStyles,
    layoutStyles,
    animationStyles,
    typographyStyles,
    dividerStyles,
    buttonStyles,
    popoverStyles
} from '@/constants/styles'

interface ChatHeaderProps {
    avatarUrl: string
}

export function ChatHeader({ avatarUrl }: ChatHeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <FlexContainer
            as='header'
            alignItems='center'
            justifyContent='between'
            className={mergeClasses(
                surfaceStyles.header,
                layoutStyles.header,
                animationStyles.transition,
                'flex-wrap'
            )}
        >
            <FlexContainer
                alignItems='center'
                className={layoutStyles.fullContain}
            >
                <Logo />
                <FlexContainer
                    alignItems='center'
                    className={`${layoutStyles.flexContain} mx-5`}
                >
                    <Avatar
                        url={avatarUrl}
                        showStatus={false}
                        size='lg'
                    />
                    <FlexContainer
                        direction='col'
                        className={`${layoutStyles.textContain} mx-2`}
                    >
                        <FlexContainer className={layoutStyles.inlineBaseline}>
                            <Typography
                                as='h1'
                                weight='bold'
                                className={typographyStyles.headerTitle}
                            >
                                Irineu Marcelo Maioli
                            </Typography>
                            <Typography
                                as='span'
                                weight='medium'
                                color='muted'
                                className={typographyStyles.headerSubtitle}
                            >
                                {'<Full-Stack Engineer>'}
                            </Typography>
                        </FlexContainer>
                        <TechStack className="hidden md:flex" />
                    </FlexContainer>
                </FlexContainer>
            </FlexContainer>
            <FlexContainer
                alignItems='center'
                className={`${layoutStyles.headerActions} hidden md:flex`}
            >
                <SocialLinks />
                <LanguageSelector />
                <ThemeToggle />
            </FlexContainer>

            {/* Mobile Actions Menu */}
            <div className="relative flex md:hidden shrink-0" ref={menuRef}>
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={mergeClasses(buttonStyles.themeToggle, 'flex items-center justify-center')}
                    aria-label="Menu"
                >
                    <Menu size={20} />
                </button>

                {isMenuOpen && (
                    <div className={mergeClasses(
                        surfaceStyles.popover, 
                        popoverStyles.base, 
                        popoverStyles.layouts.col, 
                        'absolute right-0 top-full mt-0 items-center min-w-[200px]',
                        'border-blue-600 dark:border-blue-600'
                    )}>
                        <SocialLinks />
                        <Divider className={dividerStyles.horizontal} />
                        <LanguageSelector />
                        <Divider className={dividerStyles.horizontal} />
                        <ThemeToggle />
                    </div>
                )}
            </div>

            {/* Mobile TechStack */}
            <TechStack className="flex md:hidden w-full mt-1" />
        </FlexContainer>
    )
}
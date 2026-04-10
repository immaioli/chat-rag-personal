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
    dividerStyles
} from '@/constants/styles'

interface ChatHeaderProps {
    avatarUrl: string
}

export function ChatHeader({ avatarUrl }: ChatHeaderProps) {
    return (
        <FlexContainer
            as='header'
            direction='col'
            justifyContent='between'
            className={mergeClasses(
                surfaceStyles.header,
                layoutStyles.header,
                animationStyles.transition
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
                        <TechStack />
                    </FlexContainer>
                </FlexContainer>
            </FlexContainer>
            <FlexContainer
                alignItems='center'
                className={layoutStyles.headerActions}
            >
                <SocialLinks />
                <LanguageSelector />
                <ThemeToggle />
            </FlexContainer>
        </FlexContainer>
    )
}
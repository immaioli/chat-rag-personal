import { ReactNode } from 'react'
import { FlexContainer } from '@/components/ui/FlexContainer'
import { buttonStyles } from '@/constants/styles'

interface SocialButtonProps {
    href: string
    title: string
    children: ReactNode
}

export function SocialButton({ 
    href, 
    title, 
    children 
}: SocialButtonProps) {
    return (
        <FlexContainer
            as='a'
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            title={title}
            alignItems='center'
            justifyContent='center'
            className={buttonStyles.social}
        >
            {children}
        </FlexContainer>
    )
}
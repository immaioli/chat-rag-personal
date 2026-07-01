import { SocialButton } from './SocialButton'
import {
    FaLinkedin,
    FaWhatsapp,
    FaEnvelope
} from 'react-icons/fa'
import { FlexContainer } from '@/components/ui/FlexContainer'
import { layoutStyles } from '@/constants/styles'

export function SocialLinks() {
    return (
        <FlexContainer
            alignItems='center'
            className={layoutStyles.selector}
        >
            <SocialButton
                href='https://linkedin.com/in/irineu-marcelo-maioli'
                title='LinkedIn'
            >
                <FaLinkedin size={20} />
            </SocialButton>
            <SocialButton
                href='https://wa.me/5544999188624'
                title='WhatsApp'
            >
                <FaWhatsapp size={20} />
            </SocialButton>
            <SocialButton
                href='mailto:irineu_marcelo@outlook.com'
                title='Email'
            >
                <FaEnvelope size={20} />
            </SocialButton>
        </FlexContainer>
    )
}
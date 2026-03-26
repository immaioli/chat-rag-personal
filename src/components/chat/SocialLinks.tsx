import { SocialButton } from './SocialButton';
import { FaLinkedin, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

export function SocialLinks() {
    return (
        <div className="flex items-center gap-2 pr-3 border-r border-gray-200 dark:border-[#283039] transition-colors">
            <SocialButton href="https://linkedin.com/in/irineu-marcelo-maioli" title="LinkedIn">
                <FaLinkedin size={20} />
            </SocialButton>
            <SocialButton href="https://wa.me/5544999188624" title="WhatsApp">
                <FaWhatsapp size={20} />
            </SocialButton>
            <SocialButton href="mailto:irineu_marcelo@outlook.com" title="Email">
                <FaEnvelope size={20} />
            </SocialButton>

        </div>
    );
}
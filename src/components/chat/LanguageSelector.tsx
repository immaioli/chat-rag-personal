import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing'
import { LanguageButton } from './LanguageButton';
import { BR, US, ES } from 'country-flag-icons/react/3x2'
import { useTransition } from 'react';

export function LanguageSelector() {
    const currentLocale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const handleLanguageChange = (newLocale: string) => {
        if (currentLocale !== newLocale) {
            startTransition(() => {
                router.replace(pathname, { locale: newLocale })
            })
        }
    };

    return (
        <div className="flex items-center gap-2 pr-3 border-r border-gray-200 dark:border-custom_surface transition-colors">
            <LanguageButton
                title="Português"
                icon={BR}
                isShowTitle={false}
                isActive={currentLocale === 'pt-BR'}
                onClick={() => handleLanguageChange('pt-BR')}
            />
            <LanguageButton
                title="English"
                isShowTitle={false}
                icon={US}
                isActive={currentLocale === 'en-US'}
                onClick={() => handleLanguageChange('en-US')}
            />
            <LanguageButton
                title="Español"
                isShowTitle={false}
                icon={ES}
                isActive={currentLocale === 'es-LA'}
                onClick={() => handleLanguageChange('es-LA')}
            />
        </div>
    );
}
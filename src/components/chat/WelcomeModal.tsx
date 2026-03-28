'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter, usePathname } from '@/i18n/routing';
import { registerVisitor } from '@/actions/visitor';
import { Info } from 'lucide-react';
import { LanguageButton } from './LanguageButton';
import { BR, US, ES } from 'country-flag-icons/react/3x2';

// IMPORT: Loading the JSON translation files directly from the root folder
import ptBR from '../../../translate/pt-BR.json';
import enUS from '../../../translate/en-US.json';
import esLA from '../../../translate/es-LA.json';

// DICTIONARY: Single Source of Truth mapping the specific WelcomeModal namespace
const modalDict = {
    'pt-BR': ptBR.WelcomeModal,
    'en-US': enUS.WelcomeModal,
    'es-LA': esLA.WelcomeModal
};

// COMPONENT: Intercepts the user before accessing the main chat interface
export function WelcomeModal() {
    const router = useRouter();
    const pathname = usePathname();

    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [selectedLocale, setSelectedLocale] = useState('en-US'); // Default locale
    const [isLoading, setIsLoading] = useState(false);

    // EFFECT: Check if the visitor is already registered in this browser
    useEffect(() => {
        const storedVisitorId = localStorage.getItem('mAIo_visitorId');
        if (!storedVisitorId) {
            setIsOpen(true);
        }
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setIsLoading(true);

        const response = await registerVisitor(name, company);

        if (response.success && response.visitorId) {
            localStorage.setItem('mAIo_visitorId', response.visitorId);
            localStorage.setItem('mAIo_visitorName', name);

            setIsOpen(false);
            router.replace(pathname, { locale: selectedLocale });
        }

        setIsLoading(false);
    };

    if (!isOpen) return null;

    // LOCALIZATION: Derive current messages, mapped directly to the JSON keys
    const activeTexts = modalDict[selectedLocale as keyof typeof modalDict] || modalDict['en-US'];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
            <div className="w-full max-w-md bg-white dark:bg-custom_bg-dark rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-custom_border">
                <div className="p-6 border-b border-gray-100 dark:border-custom_border text-center">
                    {/* IMPLEMENTATION: Matched the 'title' key from the JSON file */}
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white"> {activeTexts.title} </h2>
                    <p className="text-sm text-gray-500 dark:text-custom_text-muted mt-2"> {activeTexts.description} </p>
                </div>
                <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
                    <div className="flex flex-col gap-3 mb-2 items-center">
                        <div className="flex gap-4 justify-between w-full">
                            <LanguageButton
                                title="Português"
                                icon={BR}
                                onClick={() => setSelectedLocale('pt-BR')}
                                isActive={selectedLocale === 'pt-BR'}
                            />
                            <LanguageButton
                                title="English"
                                icon={US}
                                onClick={() => setSelectedLocale('en-US')}
                                isActive={selectedLocale === 'en-US'}
                            />
                            <LanguageButton
                                title="Español"
                                icon={ES}
                                onClick={() => setSelectedLocale('es-LA')}
                                isActive={selectedLocale === 'es-LA'}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <input
                            type="text"
                            placeholder={activeTexts.name_ph}
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-custom_bg-main border border-gray-200 dark:border-custom_border outline-none focus:ring-2 focus:ring-custom_primary text-gray-900 dark:text-white transition-all"
                        />
                        <input
                            type="text"
                            placeholder={activeTexts.company_ph}
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-custom_bg-main border border-gray-200 dark:border-custom_border outline-none focus:ring-2 focus:ring-custom_primary text-gray-900 dark:text-white transition-all"
                        />
                    </div>
                    <div className="flex items-center justify-center gap-2.5 bg-blue-50 dark:bg-custom_primary/10 p-3.5 rounded-xl">
                        <Info className="w-10 h-10 text-custom_primary shrink-0 mt-[-2px]" />
                        <p className="text-sm font-semibold text-custom_primary dark:text-custom_primary/80 leading-snug"> {activeTexts.disclaimer} </p>
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3.5 mt-0 bg-custom_primary hover:bg-custom_primary-hover text-white font-bold rounded-xl transition-colors disabled:opacity-50"
                    >
                        {isLoading ? activeTexts.button_load : activeTexts.button_default}
                    </button>
                </form>
            </div>
        </div>
    );
}
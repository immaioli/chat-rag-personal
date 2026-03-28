import { Info } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function TrainingDisclaimer() {
    const chatTranslations = useTranslations('ChatInterface');

    return (
        <div className="flex items-center justify-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity cursor-default">
            <Info className="w-8 h-8 text-red-600 dark:text-red-600 animate-pulse" />
            <p className="text-left font-semibold text-gray-500 dark:text-custom_text-muted text-[20px] transition-colors leading-tight">
                {chatTranslations('disclaimer')}
            </p>
        </div>
    );
}
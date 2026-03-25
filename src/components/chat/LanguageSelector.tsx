import { LanguageButton } from './LanguageButton';

export function LanguageSelector() {
    return (
        <div className="flex items-center gap-2 pr-3 border-r border-gray-200 dark:border-[#283039] transition-colors">
            <LanguageButton
                title="English"
                flagUrl="https://flagcdn.com/w80/us.png"
            />
            <LanguageButton
                title="Português"
                flagUrl="https://flagcdn.com/w80/br.png"
                isActive={true}
            />
            <LanguageButton
                title="Español"
                flagUrl="https://flagcdn.com/w80/es.png"
            />
        </div>
    );
}
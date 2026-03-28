import { useState } from 'react';
import { FileText, Briefcase, GraduationCap, Code2, LayoutGrid, Mail } from 'lucide-react';
import { QuickActionButton } from './QuickActionButton';
import { QuickActionsToggle } from './QuickActionsToggle';
// IMPORT: next-intl hook for translations
import { useTranslations } from 'next-intl';

// CONFIGURATION: Array of quick actions using translation keys instead of hardcoded labels.
// The 'id' property strictly matches the keys defined in your JSON translation files.
const quickActionsConfig = [
    { id: 'summary', icon: FileText },
    { id: 'experience', icon: Briefcase },
    { id: 'education', icon: GraduationCap },
    { id: 'skills', icon: Code2 },
    { id: 'portfolio', icon: LayoutGrid },
    { id: 'contact', icon: Mail }
];

export function QuickActionsMenu({ onAction }: { onAction: (action: string) => void }) {
    const [isOpen, setIsOpen] = useState(false);

    // HOOK: Load translations targeting the QuickActions namespace
    // Clean Code: Using a descriptive variable name
    const quickActionsTranslations = useTranslations('QuickActions');

    const handleSelect = (translatedLabel: string) => {
        // ACTION: Sends the localized text to the chat input, 
        // allowing the AI to naturally reply in the user's chosen language.
        onAction(translatedLabel);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full max-w-full">
            <QuickActionsToggle
                isOpen={isOpen}
                onClick={() => setIsOpen(!isOpen)}
            />
            {isOpen && (
                <div className="absolute bottom-[calc(100%+8px)] left-0 w-full bg-white dark:bg-custom_surface border border-gray-200 dark:border-custom_border rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2 transition-colors">
                    <div className="grid grid-cols-2 gap-px bg-gray-100 dark:bg-custom_border">
                        {quickActionsConfig.map((action) => {
                            const localizedLabel = quickActionsTranslations(action.id as any);
                            return (
                                <QuickActionButton
                                    key={action.id}
                                    label={localizedLabel}
                                    Icon={action.icon}
                                    onClick={() => handleSelect(localizedLabel)}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
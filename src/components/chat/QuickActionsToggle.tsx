import { ChevronDown, Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface QuickActionsToggleProps {
    isOpen: boolean;
    onClick: () => void;
}

export function QuickActionsToggle({ isOpen, onClick }: QuickActionsToggleProps) {
    const quickActionsTranslations = useTranslations('QuickActions');
    return (
        <button
            onClick={onClick}
            type="button"
            className="flex w-full h-11 items-center justify-between px-4 rounded-xl bg-gray-50 dark:bg-custom_surface hover:bg-gray-100 dark:hover:bg-custom_surface-hover border border-gray-200 dark:border-custom_border transition-all"
        >
            <span className="text-gray-700 dark:text-white text-sm font-medium flex items-center gap-2 transition-colors">
                <Menu size={18} className="text-gray-500 dark:text-custom_text-muted" />
                {quickActionsTranslations('title')}
            </span>
            <ChevronDown
                size={18}
                className={`text-gray-500 dark:text-custom_text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
        </button>
    );
}
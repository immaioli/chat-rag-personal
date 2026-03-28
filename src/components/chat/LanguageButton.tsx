import { ElementType } from 'react';

interface LanguageButtonProps {
    title: string;
    icon: ElementType;
    isActive?: boolean;
    onClick?: () => void;
    isShowTitle?: boolean;
}

export function LanguageButton({ title, icon: FlagIcon, isActive = false, isShowTitle = true, onClick }: LanguageButtonProps) {
    const baseClasses = "cursor-pointer flex items-center justify-center transition-all hover:scale-110 rounded-[2px]";

    // REMINDER: Consider replacing hex codes with your new Design System variables 
    // e.g., ring-custom_primary and dark:ring-offset-custom_bg-main
    const activeClasses = isActive
        ? "opacity-100 ring-2 ring-[#137fec] ring-offset-2 ring-offset-white dark:ring-offset-[#111418]"
        : "opacity-80 hover:opacity-100";

    const showTitle = isShowTitle ? "w-28 px-2 py-2" : "w-8";

    return (
        <button
            type="button"
            onClick={onClick}
            className={`${baseClasses} ${activeClasses} ${showTitle}`}
            title={title}
        >
            <FlagIcon className={`w-8 h-auto shrink-0 shadow-sm rounded-[2px] ${isShowTitle ? 'mr-1' : ''}`} />
            {isShowTitle && (
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {title}
                </span>
            )}
        </button>
    );
}
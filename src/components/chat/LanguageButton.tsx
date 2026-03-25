interface LanguageButtonProps {
    title: string;
    flagUrl: string;
    isActive?: boolean;
    onClick?: () => void;
}

export function LanguageButton({ title, flagUrl, isActive = false, onClick }: LanguageButtonProps) {
    const baseClasses = "cursor-pointer flex items-center justify-center transition-all hover:scale-110 rounded-full";
    const activeClasses = isActive
        ? "opacity-100 ring-2 ring-[#137fec] ring-offset-2 ring-offset-white dark:ring-offset-[#111418]"
        : "opacity-80 hover:opacity-100";

    return (
        <button
            type="button"
            onClick={onClick}
            className={`${baseClasses} ${activeClasses}`}
            title={title}
        >
            <img
                alt={`${title} Flag`}
                className="rounded-full object-cover w-7 h-7 shadow-sm border border-gray-100 dark:border-transparent"
                src={flagUrl}
            />
        </button>
    );
}
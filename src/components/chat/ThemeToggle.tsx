import { useTheme } from 'next-themes';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex size-10 cursor-pointer items-center justify-center rounded-lg bg-gray-100 dark:bg-[#283039] text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-[#323b46] transition-colors"
        >
            <span className="material-symbols-outlined text-[24px]">
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
        </button>
    );
}
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex size-10 border border-gray-200 dark:border-[#283039] cursor-pointer items-center justify-center rounded-lg bg-gray-100 dark:bg-[#283039] text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-[#323b46] transition-colors"
        >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
}
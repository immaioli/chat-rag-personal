import { Logo } from './Logo';
import { Avatar } from './Avatar';
import { TechStack } from './TechStack';
import { LanguageSelector } from './LanguageSelector';
import { ThemeToggle } from './ThemeToggle';
import { SocialLinks } from './SocialLinks';

interface ChatHeaderProps {
    avatarUrl: string;
}

export function ChatHeader({ avatarUrl }: ChatHeaderProps) {
    return (
        <header className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-[#283039] bg-white/95 dark:bg-[#111418]/95 backdrop-blur-sm shrink-0 z-20 gap-4 transition-colors duration-300">
            <div className="flex items-center gap-4 min-w-0 w-full">
                <Logo />
                <div className="w-px h-10 bg-gray-200 dark:bg-[#283039] hidden sm:block shrink-0 transition-colors"></div>
                <div className="flex items-center gap-3 min-w-0 flex-1">
                    <Avatar url={avatarUrl} showStatus={false} />
                    <div className="flex flex-col min-w-0 flex-1">
                        <div className='flex items-baseline flex-wrap gap-x-2'>
                            <h1 className="text-gray-900 dark:text-white text-base sm:text-lg font-bold leading-tight truncate transition-colors">Irineu Marcelo Maioli</h1>
                            <span className="text-gray-300 dark:text-[#3d4650] hidden sm:inline transition-colors">|</span>
                            <span className="text-gray-500 dark:text-[#9dabb9] text-xs sm:text-sm font-medium mt-0.5 whitespace-nowrap transition-colors">{'<Full-Stack Engineer>'}</span>
                        </div>
                        <TechStack />
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-3 self-end sm:self-auto shrink-0 mt-2 sm:mt-0">
                <SocialLinks />
                <LanguageSelector />
                <ThemeToggle />
            </div>

        </header>
    );
}
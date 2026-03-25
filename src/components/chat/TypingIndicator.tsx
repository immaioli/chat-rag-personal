import { Avatar } from './Avatar';

interface TypingIndicatorProps {
    avatarAI: string;
}

export function TypingIndicator({ avatarAI }: TypingIndicatorProps) {
    return (
        <div className="flex items-center gap-3 opacity-50 mt-2">
            <Avatar url={avatarAI} showStatus={true} />
            <div className="bg-white dark:bg-[#283039] border border-gray-100 dark:border-transparent rounded-2xl rounded-bl-none px-4 py-3 flex gap-1 transition-colors">
                <div className="size-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                <div className="size-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="size-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
        </div>
    );
}
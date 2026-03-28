interface MessageInfoProps {
    isUser: boolean;
    currentDate: string;
    nameUser?: string;
}

export function MessageInfo({ isUser, currentDate, nameUser }: MessageInfoProps) {
    return (
        <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {isUser ? nameUser : 'mAIo'}
            </span>
            <span className="text-xs text-gray-500 dark:text-custom_text-muted">
                {currentDate}
            </span>
        </div>
    );
}
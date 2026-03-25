interface MessageInfoProps {
    isUser: boolean;
    currentDate: string;
}

export function MessageInfo({ isUser, currentDate }: MessageInfoProps) {
    const senderName = isUser ? 'Visitante' : 'mAIo';
    const marginClass = isUser ? 'mr-1' : 'ml-1';

    return (
        <span className={`text-gray-500 dark:text-[#9dabb9] text-xs transition-colors ${marginClass}`}>
            {senderName} • {currentDate}
        </span>
    );
}
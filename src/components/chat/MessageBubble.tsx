import { useEffect, useState } from 'react';
import { MarkdownBlock } from './MarkdownBlock';
import { MessageAvatar } from './MessageAvatar';
import { MessageInfo } from './MessageInfo';

interface MessageBubbleProps {
    isUser: boolean;
    content: any;
    parts?: any[];
    currentDate: string;
    avatarAI: string;
}

export function MessageBubble({ isUser, content, parts, currentDate, avatarAI }: MessageBubbleProps) {
    const [visitorName, setVisitorName] = useState<string>('Você');

    useEffect(() => {
        const storedName = localStorage.getItem('mAIo_visitorName');
        if (storedName) {
            const firstName = storedName.split(' ')[0];
            setVisitorName(firstName);
        }
    }, []);

    if (isUser) {
        return (
            <div className="flex items-center gap-3 justify-end group">
                <div className="flex flex-col gap-1 items-end max-w-[80%]">
                    <MessageInfo isUser={true} currentDate={currentDate} nameUser={visitorName} />
                    <div className="px-4 py-3 rounded-2xl rounded-br-none bg-custom_primary text-white text-[15px] font-medium shadow-md shadow-custom_primary/20">
                        {parts?.map((part, index) => part.type === 'text' ? <span key={index}>{part.text}</span> : null)}
                        {!parts && <span>{content}</span>}
                    </div>
                </div>
                <MessageAvatar isUser={true} />
            </div>
        );
    }

    return (
        <div className="flex items-center gap-3 group">
            <MessageAvatar isUser={false} avatarAI={avatarAI} />
            <div className="flex flex-col gap-1 items-start max-w-[85%] sm:max-w-[70%]">
                <MessageInfo isUser={false} currentDate={currentDate} />
                <div className="p-5 rounded-2xl rounded-bl-none bg-white dark:bg-custom_surface text-gray-800 dark:text-white text-[15px] shadow-sm border border-gray-100 dark:border-custom_border w-full transition-colors">
                    <div className="flex flex-col space-y-2">
                        {parts?.map((part, index) => part.type === 'text' ? (
                            <MarkdownBlock key={index} content={part.text} />
                        ) : null)}
                        {!parts && <MarkdownBlock content={content} />}
                    </div>
                </div>
            </div>
        </div>
    );
}
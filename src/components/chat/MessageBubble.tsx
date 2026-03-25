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
    if (isUser) {
        return (
            <div className="flex items-center gap-3 justify-end group">
                <div className="flex flex-col gap-1 items-end max-w-[80%]">
                    <MessageInfo isUser={true} currentDate={currentDate} />
                    <div className="px-4 py-3 rounded-2xl rounded-br-none bg-[#137fec] text-white text-[15px] font-medium shadow-md shadow-[#137fec]/20">
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
                {/* Substituído pelo novo componente */}
                <MessageInfo isUser={false} currentDate={currentDate} />
                <div className="p-5 rounded-2xl rounded-bl-none bg-white dark:bg-[#283039] text-gray-800 dark:text-white text-[15px] shadow-sm border border-gray-100 dark:border-transparent w-full transition-colors">
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
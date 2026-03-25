import { Avatar } from './Avatar'; // <-- Importação do componente universal

interface MessageAvatarProps {
    isUser: boolean;
    avatarAI?: string;
}

export function MessageAvatar({ isUser, avatarAI }: MessageAvatarProps) {
    if (isUser) {
        return (
            <Avatar url="/visitor.png" showStatus={false} />
        );
    }

    return (
        <Avatar url={avatarAI || ''} showStatus={true} />
    );
}
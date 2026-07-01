import { Avatar } from '@/components/ui/Avatar'

interface MessageAvatarProps {
    isUser: boolean
    avatarAI?: string
}

export function MessageAvatar({
    isUser,
    avatarAI
}: MessageAvatarProps) {
    return isUser ? (
        <Avatar
            url='/visitor.png'
            showStatus={false}
            size='lg'
        />
    ) : (
        <Avatar
            url={avatarAI || ''}
            showStatus={true}
            size='lg'
        />
    )
}
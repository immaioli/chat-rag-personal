import { FlexContainer } from '@/components/ui/FlexContainer'
import { Typography } from '@/components/ui/Typography'

interface MessageInfoProps {
    isUser: boolean
    currentDate: string
    nameUser?: string
}

export function MessageInfo({ 
    isUser, 
    currentDate, 
    nameUser 
}: MessageInfoProps) {
    return (
        <FlexContainer 
            alignItems='center' 
            className='gap-2 mb-1'
        >
            <Typography 
                as='span' 
                size='sm' 
                weight='semibold' 
                color='default'
            >
                {isUser 
                    ? nameUser 
                    : 'mAIo'
                }
            </Typography>
            <Typography 
                as='span' 
                size='xs' 
                color='muted'
            >
                {currentDate}
            </Typography>
        </FlexContainer>
    )
}
import { Send } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FlexContainer } from '@/components/ui/FlexContainer'
import { Button } from '@/components/ui/Button'
import { 
    surfaceStyles, 
    inputStyles, 
    buttonStyles, 
    iconStyles 
} from '@/constants/styles'

interface ChatInputFormProps {
    inputValue: string
    setInputValue: (value: string) => void
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    disabled: boolean
}

export function ChatInputForm({ 
    inputValue, 
    setInputValue, 
    onSubmit, 
    disabled 
}: ChatInputFormProps) {
    const translate = useTranslations('ChatInterface')
    return (
        <FlexContainer 
            as='form' 
            onSubmit={onSubmit} 
            alignItems='center' 
            className='gap-3 max-w-full'
        >
            <FlexContainer 
                alignItems='center' 
                className={surfaceStyles.chatInput}
            >
                <input
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    disabled={disabled}
                    className={inputStyles.chat}
                    placeholder={translate('inputPlaceholder')}
                    type='text'
                />
            </FlexContainer>
            <Button
                type='submit'
                disabled={disabled || !inputValue.trim()}
                variant='default'
                className={buttonStyles.send}
                title='Send Message'
            >
                <Send className={iconStyles.md} />
            </Button>
        </FlexContainer>
    )
}
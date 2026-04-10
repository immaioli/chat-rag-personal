import { 
    Code2, 
    Braces, 
    Atom, 
    Server, 
    Smartphone, 
    Brain, 
    Mic 
} from 'lucide-react'
import { Stack } from './Stack'
import { TooltipAdd } from './TooltipAdd'
import { useTranslations } from 'next-intl'
import { FlexContainer } from '@/components/ui/FlexContainer'
import { layoutStyles } from '@/constants/styles'

export function TechStack() {
    const translate = useTranslations('TechStack')
    return (
        <FlexContainer 
            direction='col' 
            className='gap-1 mt-1.5 min-w-0'
        >
            <FlexContainer 
                alignItems='center' 
                className={layoutStyles.stackRow}
            >
                <Stack 
                    Icon={Code2} 
                    label='JavaScript' 
                    iconColor='text-yellow-500 dark:text-yellow-400' 
                />
                <Stack 
                    Icon={Braces} 
                    label='TypeScript' 
                    iconColor='text-blue-600 dark:text-blue-500' 
                />
                <Stack 
                    Icon={Atom} 
                    label='React' 
                    iconColor='text-blue-500 dark:text-blue-400' 
                />
                <Stack 
                    Icon={Server} 
                    label='Node.js' 
                    iconColor='text-green-600 dark:text-green-500' 
                    showSeparator={false} 
                />
            </FlexContainer>
            <FlexContainer 
                alignItems='center' 
                className={layoutStyles.stackRow}
            >
                <Stack 
                    Icon={Smartphone} 
                    label='React Native' 
                    iconColor='text-blue-400 dark:text-blue-300' 
                />
                <Stack 
                    Icon={Brain} 
                    label='AI/NLP' 
                    iconColor='text-purple-500 dark:text-purple-400' 
                />
                <Stack 
                    Icon={Mic} 
                    label='Voice Assistants' 
                    iconColor='text-red-500 dark:text-red-400' 
                />
                <TooltipAdd text={translate('tooltip')} />
            </FlexContainer>
        </FlexContainer>
    )
}
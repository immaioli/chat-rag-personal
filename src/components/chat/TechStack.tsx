import { Code2, Braces, Atom, Server, Smartphone, Brain, Mic } from 'lucide-react';
import { Stack } from './Stack';
import { TooltipAdd } from './TooltipAdd';
import { useTranslations } from 'next-intl';

export function TechStack() {
    const translate = useTranslations('TechStack');
    return (
        <div className="flex flex-col gap-1 mt-1.5 min-w-0">
            <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-gray-500 dark:text-custom_text-muted text-[10px] sm:text-xs pb-0.5 transition-colors">
                <Stack Icon={Code2} label="JavaScript" iconColor="text-yellow-500 dark:text-yellow-400" />
                <Stack Icon={Braces} label="TypeScript" iconColor="text-blue-600 dark:text-blue-500" />
                <Stack Icon={Atom} label="React" iconColor="text-blue-500 dark:text-blue-400" />
                <Stack Icon={Server} label="Node.js" iconColor="text-green-600 dark:text-green-500" showSeparator={false} />
            </div>
            <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-gray-500 dark:text-custom_text-muted text-[10px] sm:text-xs pb-0.5 transition-colors">
                <Stack Icon={Smartphone} label="React Native" iconColor="text-blue-400 dark:text-blue-300" />
                <Stack Icon={Brain} label="AI/NLP" iconColor="text-purple-500 dark:text-purple-400" />
                <Stack Icon={Mic} label="Voice Assistants" iconColor="text-red-500 dark:text-red-400" />
                <TooltipAdd text={translate('tooltip')} />
            </div>
        </div>
    );
}
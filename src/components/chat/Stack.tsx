import { LucideIcon } from 'lucide-react';

interface StackProps {
    Icon: LucideIcon;
    label: string;
    iconColor: string;
    showSeparator?: boolean;
}

export function Stack({ Icon, label, iconColor, showSeparator = true }: StackProps) {
    return (
        <>
            <span className="flex items-center gap-1">
                <Icon size={12} className={iconColor} />
                {label}
            </span>
            {showSeparator && (
                <span className="text-gray-300 dark:text-[#3d4650]">|</span>
            )}
        </>
    );
}
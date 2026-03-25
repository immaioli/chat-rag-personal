import { LucideIcon } from 'lucide-react';

interface QuickActionButtonProps {
    label: string;
    Icon: LucideIcon;
    onClick: () => void;
}

export function QuickActionButton({ label, Icon, onClick }: QuickActionButtonProps) {
    return (
        <button
            onClick={onClick}
            type="button"
            className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-[#283039] hover:bg-gray-50 dark:hover:bg-[#323b46] active:bg-[#137fec] transition-colors text-left group"
        >
            <Icon size={18} className="text-gray-500 dark:text-[#9dabb9] group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
            <span className="text-gray-700 dark:text-white text-sm font-medium group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                {label}
            </span>
        </button>
    );
}
import { ChevronDown, Menu } from 'lucide-react';

interface QuickActionsToggleProps {
    isOpen: boolean;
    onClick: () => void;
}

export function QuickActionsToggle({ isOpen, onClick }: QuickActionsToggleProps) {
    return (
        <button
            onClick={onClick}
            type="button"
            className="flex w-full h-11 items-center justify-between px-4 rounded-xl bg-gray-50 dark:bg-[#283039] hover:bg-gray-100 dark:hover:bg-[#323b46] border border-gray-200 dark:border-[#3d4650] transition-all"
        >
            <span className="text-gray-700 dark:text-white text-sm font-medium flex items-center gap-2 transition-colors">
                <Menu size={18} className="text-gray-500 dark:text-[#9dabb9]" />
                Selecione um tópico rápido
            </span>
            <ChevronDown 
                size={18} 
                className={`text-gray-500 dark:text-[#9dabb9] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
            />
        </button>
    );
}
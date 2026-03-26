import { MessageSquarePlus } from "lucide-react";

interface TooltipAddProps {
    text: string;
}

export function TooltipAdd({ text }: TooltipAddProps) {
    return (
        <div className="relative group flex items-center cursor-help">
            <span className="flex items-center gap-1 text-yellow-500 text-[16px] transition-transform duration-300 group-hover:rotate-90">
                <MessageSquarePlus size={20} />
            </span>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 flex flex-col items-center">
                <span className="bg-gray-800 dark:bg-[#283039] text-white text-xs px-3 py-1.5 rounded-md shadow-lg whitespace-nowrap border border-gray-700 dark:border-[#3d4650]">
                    {text}
                </span>
                <div className="w-2 h-2 -mt-1 rotate-45 bg-gray-800 dark:bg-[#283039] border-r border-b border-gray-700 dark:border-[#3d4650]"></div>
            </div>
        </div>
    );
}
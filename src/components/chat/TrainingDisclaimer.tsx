// src/components/chat/TrainingDisclaimer.tsx
import { Info } from 'lucide-react';

export function TrainingDisclaimer() {
    return (
        <div className="flex items-center justify-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity cursor-default">
            <Info className="w-4 h-4 text-red-600 dark:text-red-600 animate-pulse" />
            <p className="text-left font-semibold text-gray-500 dark:text-[#9dabb9] text-[12px] transition-colors leading-tight">
                O mAIo é uma IA em contínua evolução e pode cometer equívocos.
            </p>
        </div>
    );
}
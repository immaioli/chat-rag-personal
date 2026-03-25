export function TrainingDisclaimer() {
    return (
        <div className="flex items-center justify-center gap-1.5 mt-2">
            <span className="material-symbols-outlined text-[14px] text-red-500 dark:text-red-500 animate-pulse">
                info
            </span>
            <div className="flex flex-col gap-1">
                <p className="text-left font-semibold text-gray-500 dark:text-[#9dabb9] text-[14px] transition-colors leading-tight">
                    O mAIo é uma IA em contínua evolução e pode cometer equívocos.
                </p>
                <p className="text-left font-semibold text-gray-500 dark:text-[#9dabb9] text-[12px] transition-colors leading-tight">
                    O objetivo principal deste projeto é demonstrar as minhas habilidades de engenharia de software na construção desta arquitetura.
                </p>
            </div>
        </div>
    );
}
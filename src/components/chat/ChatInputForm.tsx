interface ChatInputFormProps {
    inputValue: string;
    setInputValue: (val: string) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    disabled: boolean;
}

export function ChatInputForm({ inputValue, setInputValue, onSubmit, disabled }: ChatInputFormProps) {
    return (
        <form onSubmit={onSubmit} className="flex gap-3 items-center max-w-full">
            <div className="flex-1 bg-gray-100 dark:bg-[#283039] rounded-xl flex items-center px-4 h-12 border border-transparent focus-within:border-[#137fec] focus-within:bg-white dark:focus-within:bg-[#283039] transition-colors shadow-sm">
                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={disabled}
                    className="bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white w-full placeholder-gray-400 dark:placeholder-[#5a6b7c] text-sm outline-none"
                    placeholder="Ou digite sua mensagem aqui..."
                    type="text"
                />
            </div>
            <button
                type="submit"
                disabled={disabled || !inputValue.trim()}
                className="bg-[#137fec] text-white p-3 rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-[#137fec]/20 disabled:opacity-50"
            >
                <span className="material-symbols-outlined">send</span>
            </button>
        </form>
    );
}
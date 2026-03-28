import { Send } from "lucide-react";
import { useTranslations } from "next-intl";

interface ChatInputFormProps {
    inputValue: string;
    setInputValue: (val: string) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    disabled: boolean;
}

export function ChatInputForm({ inputValue, setInputValue, onSubmit, disabled }: ChatInputFormProps) {
    const translate = useTranslations('ChatInterface');

    return (
        <form onSubmit={onSubmit} className="flex gap-3 items-center max-w-full">
            <div className="flex-1 bg-gray-100 dark:bg-custom_surface rounded-xl flex items-center px-4 h-12 border border-transparent focus-within:border-custom_primary focus-within:bg-white dark:focus-within:bg-custom_surface transition-colors shadow-sm">
                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={disabled}
                    className="bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white w-full placeholder-gray-400 dark:placeholder-custom_text-placeholder text-sm outline-none"
                    placeholder={translate('inputPlaceholder')}
                    type="text"
                />
            </div>
            <button
                type="submit"
                disabled={disabled || !inputValue.trim()}
                className="bg-custom_primary text-white p-3 rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-custom_primary/20 disabled:opacity-50"
            >
                <Send size={20} />
            </button>
        </form>
    );
}
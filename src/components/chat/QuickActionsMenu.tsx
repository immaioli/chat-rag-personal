import { useState } from 'react';
import { FileText, Briefcase, GraduationCap, Code2, LayoutGrid, Mail } from 'lucide-react';
import { QuickActionButton } from './QuickActionButton';
import { QuickActionsToggle } from './QuickActionsToggle';

const quickActions = [
    { id: 'resumo', label: 'Resumo', icon: FileText },
    { id: 'experiencia', label: 'Experiência', icon: Briefcase },
    { id: 'graduacao', label: 'Graduação', icon: GraduationCap },
    { id: 'habilidades', label: 'Habilidades', icon: Code2 },
    { id: 'portfolio', label: 'Portfólio', icon: LayoutGrid },
    { id: 'contato', label: 'Contato', icon: Mail }
];

export function QuickActionsMenu({ onAction }: { onAction: (action: string) => void }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (label: string) => {
        onAction(label);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full max-w-full">
            <QuickActionsToggle
                isOpen={isOpen}
                onClick={() => setIsOpen(!isOpen)}
            />
            {isOpen && (
                <div className="absolute bottom-[calc(100%+8px)] left-0 w-full bg-white dark:bg-[#283039] border border-gray-200 dark:border-[#3d4650] rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2 transition-colors">
                    <div className="grid grid-cols-2 gap-px bg-gray-100 dark:bg-[#3d4650]">
                        {quickActions.map((action) => (
                            <QuickActionButton
                                key={action.id}
                                label={action.label}
                                Icon={action.icon}
                                onClick={() => handleSelect(action.label)}
                            />
                        ))}

                    </div>
                </div>
            )}
        </div>
    );
}
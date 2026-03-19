'use client';

import { useChat } from '@ai-sdk/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import {
    FileText, Briefcase, GraduationCap, Code2, LayoutGrid, Mail,
    ChevronDown, Menu, Atom, Server, Smartphone, Brain, Mic, Braces
} from 'lucide-react';

export function ChatInterface({ visitorId }: { visitorId: string }) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState('');

    const { messages, sendMessage, status } = useChat({
        api: '/api/chat',
        body: { visitorId }
    } as any);

    const quickActions = [
        { id: 'resumo', label: 'Resumo', icon: FileText },
        { id: 'experiencia', label: 'Experiência', icon: Briefcase },
        { id: 'graduacao', label: 'Graduação', icon: GraduationCap },
        { id: 'habilidades', label: 'Habilidades', icon: Code2 },
        { id: 'portfolio', label: 'Portfólio', icon: LayoutGrid },
        { id: 'contato', label: 'Contato', icon: Mail }
    ];

    useEffect(() => {
        setMounted(true);
        const now = new Date();
        const formatted = new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        }).format(now);

        setCurrentDate(formatted);
    }, []);

    const handleQuickAction = (action: string) => {
        if (!action) return;
        sendMessage({ text: action });
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        sendMessage({ text: inputValue });
        setInputValue('');
    };

    if (!mounted) return null;

    const avatarUrl = 'https://media.licdn.com/dms/image/v2/D4D03AQGLerRFEXKPPA/profile-displayphoto-scale_400_400/B4DZpaZM19GQAk-/0/1762453152007?e=1775692800&v=beta&t=TfnUCba3xfXywcttn-tbRGRbNnlrSxzQumb4UVWoeFg';

    return (
        <div className="bg-gray-100 dark:bg-[#101922] font-sans text-gray-900 dark:text-white overflow-hidden h-screen w-full flex justify-center transition-colors duration-300">
            <div className="flex flex-col w-full max-w-[1024px] h-full bg-white dark:bg-[#111418] shadow-2xl border-x border-gray-200 dark:border-[#283039] relative transition-colors duration-300">

                {/* Header */}
                <header className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-[#283039] bg-white/95 dark:bg-[#111418]/95 backdrop-blur-sm shrink-0 z-20 gap-4 transition-colors duration-300">
                    <div className="flex items-center gap-4 min-w-0 w-full">
                        <div className="w-12 h-12 shrink-0 bg-white rounded-lg flex items-center justify-center border border-gray-200 dark:border-[#283039] p-0.5 transition-colors">
                            <img src="/logoHeader.png" alt="Logo" className="w-full h-full object-contain" />
                        </div>
                        <div className="w-px h-10 bg-gray-200 dark:bg-[#283039] hidden sm:block shrink-0 transition-colors"></div>
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div className="relative shrink-0 group cursor-pointer">
                                <div
                                    className="size-11 rounded-full bg-cover bg-center border-2 border-gray-200 dark:border-[#283039] group-hover:border-[#137fec] transition-colors"
                                    style={{ backgroundImage: `url('${avatarUrl}')` }}
                                ></div>
                                <div className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-white dark:border-[#111418] rounded-full transition-colors" title="Online"></div>
                            </div>

                            <div className="flex flex-col min-w-0 flex-1">
                                <div className='flex items-baseline flex-wrap gap-x-2'>
                                    <h1 className="text-gray-900 dark:text-white text-base sm:text-lg font-bold leading-tight truncate transition-colors">Irineu Marcelo Maioli</h1>
                                    <span className="text-gray-300 dark:text-[#3d4650] hidden sm:inline transition-colors">|</span>
                                    <span className="text-gray-500 dark:text-[#9dabb9] text-xs sm:text-sm font-medium mt-0.5 whitespace-nowrap transition-colors">{'<Full-Stack Engineer>'}</span>
                                </div>
                                <div className="flex flex-col gap-1 mt-1.5 min-w-0">
                                    <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-gray-500 dark:text-[#9dabb9] text-[10px] sm:text-xs pb-0.5 transition-colors">
                                        <span className="flex items-center gap-1"><Code2 size={12} className="text-yellow-500 dark:text-yellow-400" /> JavaScript</span>
                                        <span className="text-gray-300 dark:text-[#3d4650]">|</span>
                                        <span className="flex items-center gap-1"><Braces size={12} className="text-blue-600 dark:text-blue-500" /> TypeScript</span>
                                        <span className="text-gray-300 dark:text-[#3d4650]">|</span>
                                        <span className="flex items-center gap-1"><Atom size={12} className="text-blue-500 dark:text-blue-400" /> React</span>
                                        <span className="text-gray-300 dark:text-[#3d4650]">|</span>
                                        <span className="flex items-center gap-1"><Server size={12} className="text-green-600 dark:text-green-500" /> Node.js</span>
                                    </div>
                                    <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-gray-500 dark:text-[#9dabb9] text-[10px] sm:text-xs pb-0.5 transition-colors">
                                        <span className="flex items-center gap-1"><Smartphone size={12} className="text-blue-400 dark:text-blue-300" /> React Native</span>
                                        <span className="text-gray-300 dark:text-[#3d4650]">|</span>
                                        <span className="flex items-center gap-1"><Brain size={12} className="text-purple-500 dark:text-purple-400" /> AI/NLP</span>
                                        <span className="text-gray-300 dark:text-[#3d4650]">|</span>
                                        <span className="flex items-center gap-1"><Mic size={12} className="text-red-500 dark:text-red-400" /> Voice Assistants</span>
                                        <span className="text-gray-300 dark:text-[#3d4650]">|</span>

                                        {/* Ícone de Plus (+) com Tooltip Customizado */}
                                        <div className="relative group flex items-center cursor-help">
                                            <span className="flex items-center gap-1 material-symbols-outlined text-yellow-500 text-[16px] transition-transform duration-300 group-hover:rotate-90">add</span>

                                            {/* Tooltip */}
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 flex flex-col items-center">
                                                <span className="bg-gray-800 dark:bg-[#283039] text-white text-[10px] px-2.5 py-1 rounded-md shadow-lg whitespace-nowrap border border-gray-700 dark:border-[#3d4650]">
                                                    Estou em constante aprendizado de outras stacks
                                                </span>
                                                <div className="w-2 h-2 -mt-1 rotate-45 bg-gray-800 dark:bg-[#283039] border-r border-b border-gray-700 dark:border-[#3d4650]"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto shrink-0 mt-2 sm:mt-0">
                        <div className="flex items-center gap-2 pr-3 border-r border-gray-200 dark:border-[#283039] transition-colors">
                            <button className="cursor-pointer flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity hover:scale-110" title="English">
                                <img alt="USA Flag" className="rounded-full object-cover w-7 h-7 shadow-sm border border-gray-100 dark:border-transparent" src="https://flagcdn.com/w80/us.png" />
                            </button>
                            <button className="cursor-pointer flex items-center justify-center opacity-100 ring-2 ring-[#137fec] ring-offset-2 ring-offset-white dark:ring-offset-[#111418] rounded-full transition-transform hover:scale-110" title="Português">
                                <img alt="Brazil Flag" className="rounded-full object-cover w-7 h-7 shadow-sm border border-gray-100 dark:border-transparent" src="https://flagcdn.com/w80/br.png" />
                            </button>
                            <button className="cursor-pointer flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity hover:scale-110" title="Español">
                                <img alt="Spain Flag" className="rounded-full object-cover w-7 h-7 shadow-sm border border-gray-100 dark:border-transparent" src="https://flagcdn.com/w80/es.png" />
                            </button>
                        </div>

                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="flex size-10 cursor-pointer items-center justify-center rounded-lg bg-gray-100 dark:bg-[#283039] text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-[#323b46] transition-colors"
                        >
                            <span className="material-symbols-outlined text-[24px]">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
                        </button>
                    </div>
                </header>

                {/* Chat History Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50 dark:bg-[#0f1216] scroll-smooth transition-colors duration-300">
                    <div className="flex justify-center">
                        <span className="text-xs font-medium text-gray-500 dark:text-[#4f5b69] bg-gray-200 dark:bg-[#1a2027] px-3 py-1 rounded-full transition-colors">Hoje</span>
                    </div>

                    {/* Hardcoded Initial Welcome Message */}
                    {/* Alterado para items-center para centralizar avatar */}
                    <div className="flex items-center gap-3 group">
                        <div className="size-10 shrink-0 rounded-full bg-cover bg-center border border-gray-200 dark:border-transparent" style={{ backgroundImage: `url('${avatarUrl}')` }}></div>
                        <div className="flex flex-col gap-1 items-start max-w-[80%]">
                            <span className="text-gray-500 dark:text-[#9dabb9] text-xs ml-1 transition-colors">Irineu Marcelo Maioli • {currentDate}</span>
                            <div className="p-4 rounded-2xl rounded-bl-none bg-white dark:bg-[#283039] text-gray-800 dark:text-white text-[15px] leading-relaxed shadow-sm border border-gray-100 dark:border-transparent transition-colors">
                                Olá! Bem-vindo ao meu portfólio. Sou um assistente virtual com Inteligência Artificial treinado para responder a questões sobre a trajetória profissional, competências e projetos do Irineu. Sinta-se à vontade para selecionar um tópico rápido abaixo ou escrever livremente a sua pergunta!
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Messages Loop */}
                    {messages.map((m) => m.role === 'user' ? (
                        // Alterado para items-center para centralizar avatar
                        <div key={m.id} className="flex items-center gap-3 justify-end group">
                            <div className="flex flex-col gap-1 items-end max-w-[80%]">
                                {/* Adicionado a currentDate para o Visitante */}
                                <span className="text-gray-500 dark:text-[#9dabb9] text-xs mr-1 transition-colors">Visitante • {currentDate}</span>
                                <div className="px-4 py-3 rounded-2xl rounded-br-none bg-[#137fec] text-white text-[15px] font-medium shadow-md shadow-[#137fec]/20">
                                    {m.parts?.map((part: any, index: number) => part.type === 'text' ? <span key={index}>{part.text}</span> : null)}
                                    {!m.parts && <span>{m.parts as any}</span>}
                                </div>
                            </div>
                            <div className="size-10 shrink-0 rounded-full bg-gray-200 dark:bg-[#283039] flex items-center justify-center transition-colors">
                                <span className="material-symbols-outlined text-gray-500 dark:text-[#9dabb9]">account_circle</span>
                            </div>
                        </div>
                    ) : (
                        // Alterado para items-center para centralizar avatar
                        <div key={m.id} className="flex items-center gap-3 group">
                            <div className="size-10 shrink-0 rounded-full bg-cover bg-center border border-gray-200 dark:border-transparent" style={{ backgroundImage: `url('${avatarUrl}')` }}></div>
                            <div className="flex flex-col gap-1 items-start max-w-[85%] sm:max-w-[70%]">
                                {/* Adicionado a currentDate nas respostas dinâmicas também */}
                                <span className="text-gray-500 dark:text-[#9dabb9] text-xs ml-1 transition-colors">Irineu Marcelo Maioli • {currentDate}</span>
                                <div className="p-5 rounded-2xl rounded-bl-none bg-white dark:bg-[#283039] text-gray-800 dark:text-white text-[15px] shadow-sm border border-gray-100 dark:border-transparent w-full transition-colors">
                                    {m.parts?.map((part: any, index: number) => part.type === 'text' ? <div key={index} className="whitespace-pre-wrap">{part.text}</div> : null)}
                                    {!m.parts && <div className="whitespace-pre-wrap">{m.parts as any}</div>}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Loading/Typing Indicator */}
                    {(status === 'submitted' || status === 'streaming') && messages[messages.length - 1]?.role === 'user' && (
                        // Alterado para items-center para centralizar avatar
                        <div className="flex items-center gap-3 opacity-50 mt-2">
                            <div className="size-8 shrink-0 rounded-full bg-cover bg-center border border-gray-200 dark:border-transparent" style={{ backgroundImage: `url('${avatarUrl}')` }}></div>
                            <div className="bg-white dark:bg-[#283039] border border-gray-100 dark:border-transparent rounded-2xl rounded-bl-none px-4 py-3 flex gap-1 transition-colors">
                                <div className="size-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                                <div className="size-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="size-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer / Input Area */}
                <div className="flex flex-col gap-3 p-4 bg-white dark:bg-[#111418] border-t border-gray-200 dark:border-[#283039] shrink-0 z-20 transition-colors duration-300">

                    {/* Dropdown de Quick Actions */}
                    <div className="relative w-full max-w-full">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            type="button"
                            className="flex w-full h-11 items-center justify-between px-4 rounded-xl bg-gray-50 dark:bg-[#283039] hover:bg-gray-100 dark:hover:bg-[#323b46] border border-gray-200 dark:border-[#3d4650] transition-all"
                        >
                            <span className="text-gray-700 dark:text-white text-sm font-medium flex items-center gap-2 transition-colors">
                                <Menu size={18} className="text-gray-500 dark:text-[#9dabb9]" />
                                Selecione um tópico rápido
                            </span>
                            <ChevronDown size={18} className={`text-gray-500 dark:text-[#9dabb9] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Menu Dropdown */}
                        {isDropdownOpen && (
                            <div className="absolute bottom-[calc(100%+8px)] left-0 w-full bg-white dark:bg-[#283039] border border-gray-200 dark:border-[#3d4650] rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2 transition-colors">
                                <div className="grid grid-cols-2 gap-px bg-gray-100 dark:bg-[#3d4650]">
                                    {quickActions.map((action) => (
                                        <button
                                            key={action.id}
                                            onClick={() => {
                                                handleQuickAction(action.label);
                                                setIsDropdownOpen(false);
                                            }}
                                            type="button"
                                            className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-[#283039] hover:bg-gray-50 dark:hover:bg-[#323b46] active:bg-[#137fec] transition-colors text-left group"
                                        >
                                            <action.icon size={18} className="text-gray-500 dark:text-[#9dabb9] group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                                            <span className="text-gray-700 dark:text-white text-sm font-medium group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{action.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Formulário de Input */}
                    <form onSubmit={onSubmit} className="flex gap-3 items-center max-w-full">
                        <div className="flex-1 bg-gray-100 dark:bg-[#283039] rounded-xl flex items-center px-4 h-12 border border-transparent focus-within:border-[#137fec] focus-within:bg-white dark:focus-within:bg-[#283039] transition-colors shadow-sm">
                            <input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                disabled={status !== 'ready'}
                                className="bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white w-full placeholder-gray-400 dark:placeholder-[#5a6b7c] text-sm outline-none"
                                placeholder="Ou digite sua mensagem aqui..."
                                type="text"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={status !== 'ready' || !inputValue.trim()}
                            className="bg-[#137fec] text-white p-3 rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-[#137fec]/20 disabled:opacity-50"
                        >
                            <span className="material-symbols-outlined">send</span>
                        </button>
                    </form>
                    <p className="text-center text-gray-500 dark:text-[#4f5b69] text-[10px] mt-1 transition-colors">Selecione um tópico ou digite sua pergunta para continuar a conversa.</p>

                </div>
            </div>
        </div>
    );
}
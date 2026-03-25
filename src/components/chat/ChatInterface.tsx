'use client';

import { useChat } from '@ai-sdk/react';
import { useEffect, useState, useRef } from 'react';
import { ChatHeader } from '@/components/chat/ChatHeader';
import { MessageBubble } from '@/components/chat/MessageBubble';
import { TypingIndicator } from '@/components/chat/TypingIndicator';
import { QuickActionsMenu } from '@/components/chat/QuickActionsMenu';
import { ChatInputForm } from '@/components/chat/ChatInputForm';

const avatar = '/avatar.jpg'
const avatarAI = '/avatar_mAIo.png'

export function ChatInterface({ visitorId }: { visitorId: string }) {
    const [mounted, setMounted] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const { messages, sendMessage, status } = useChat({
        api: '/api/chat',
        body: { visitorId }
    } as any);

    const scrollBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollBottom();
    }, [messages]);

    useEffect(() => {
        setMounted(true);
        const now = new Date();
        const formatted = new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit', timeZoneName: 'short'
        }).format(now);
        setCurrentDate(formatted);
    }, []);

    const handleQuickAction = (action: string) => {
        if (action) sendMessage({ text: action });
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputValue.trim()) {
            sendMessage({ text: inputValue });
            setInputValue('');
        }
    };

    if (!mounted) return null;

    const isAITyping = (status === 'submitted' || status === 'streaming') && messages[messages.length - 1]?.role === 'user';

    return (
        <div className="bg-gray-100 dark:bg-[#101922] font-sans text-gray-900 dark:text-white overflow-hidden h-screen w-full flex justify-center transition-colors duration-300">
            <div className="flex flex-col w-full max-w-[1024px] h-full bg-white dark:bg-[#111418] shadow-2xl border-x border-gray-200 dark:border-[#283039] relative transition-colors duration-300">
                <ChatHeader avatarUrl={avatar} />
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50 dark:bg-[#0f1216] scroll-smooth transition-colors duration-300">
                    <div className="flex justify-center">
                        <span className="text-xs font-medium text-gray-500 dark:text-[#4f5b69] bg-gray-200 dark:bg-[#1a2027] px-3 py-1 rounded-full transition-colors">Hoje</span>
                    </div>
                    <MessageBubble
                        isUser={false}
                        content="Olá e bem-vindo! Eu sou o mAIo, a Inteligência Artificial do portfólio do Irineu. Fui treinado para lhe contar tudo sobre a trajetória profissional dele, os seus projetos de destaque e as suas principais habilidades técnicas. Sinta-se à vontade para escolher um dos tópicos rápidos abaixo ou digitar a sua pergunta!"
                        currentDate={currentDate}
                        avatarAI={avatarAI}
                    />
                    {messages.map((m) => (
                        <MessageBubble
                            key={m.id}
                            isUser={m.role === 'user'}
                            content={(m as any).content}
                            parts={m.parts}
                            currentDate={currentDate}
                            avatarAI={avatarAI}
                        />
                    ))}
                    {isAITyping && <TypingIndicator avatarAI={avatarAI} />}
                    <div ref={messagesEndRef} className="h-px w-full" />
                </div>
                <div className="flex flex-col gap-3 p-4 bg-white dark:bg-[#111418] border-t border-gray-200 dark:border-[#283039] shrink-0 z-20 transition-colors duration-300">
                    <QuickActionsMenu onAction={handleQuickAction} />
                    <ChatInputForm
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        onSubmit={onSubmit}
                        disabled={status !== 'ready'}
                    />
                    <p className="text-center text-gray-500 dark:text-[#4f5b69] text-[10px] mt-1 transition-colors">
                        Selecione um tópico ou digite sua pergunta para continuar a conversa.
                    </p>
                </div>
            </div>
        </div>
    );
}
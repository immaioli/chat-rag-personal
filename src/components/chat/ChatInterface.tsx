'use client';

import { useChat } from '@ai-sdk/react';
import { useEffect, useState, useRef } from 'react';
import { ChatHeader } from '@/components/chat/ChatHeader';
import { MessageBubble } from '@/components/chat/MessageBubble';
import { TypingIndicator } from '@/components/chat/TypingIndicator';
import { QuickActionsMenu } from '@/components/chat/QuickActionsMenu';
import { ChatInputForm } from '@/components/chat/ChatInputForm';
import { TrainingDisclaimer } from './TrainingDisclaimer';
import { useTranslations } from 'next-intl';

const avatar = '/avatar.jpg';
const avatarAI = '/avatar_mAIo.png';

export function ChatInterface({ visitorId }: { visitorId: string }) {
    const [mounted, setMounted] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const chatTranslations = useTranslations('ChatInterface');
    const [activeVisitorId, setActiveVisitorId] = useState(visitorId || '')

    // STATE: Holds the welcome message. Defaults to generic text for server-side rendering.
    const [visitorFirstName, setVisitorFirstName] = useState('Visitante');

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const { messages, setMessages, sendMessage, status } = useChat({
        api: '/api/chat',
    } as any);

    // EFFECT (BACKUP): Save chat history to Session Storage whenever it changes
    useEffect(() => {
        if (messages.length > 0) {
            sessionStorage.setItem('mAIo_chat_history', JSON.stringify(messages))
        }
    }, [messages]);

    // EFFECT (RESTORE): Hydrate chat history from Session Storage on component mount (after language change)
    useEffect(() => {
        const storedChatHistory = sessionStorage.getItem('mAIo_chat_history');
        if (storedChatHistory) {
            try {
                const parsedHistory = JSON.parse(storedChatHistory)
                setMessages(parsedHistory)
            } catch (error) {
                console.error("Error to parse chat history. ", error);
            }
        }
    }, []);

    const scrollBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollBottom();
    }, [messages]);

    useEffect(() => {
        // HYDRATION: Read visitor name from local storage and update the welcome message
        const storedName = localStorage.getItem('mAIo_visitorName')
        const storedId = localStorage.getItem('mAIo_visitorId')
        if (storedName) {
            const firstName = storedName.split(' ')[0].toUpperCase()
            setVisitorFirstName(firstName);
        }
        if (storedId) {
            setActiveVisitorId(storedId)
        }

        const now = new Date();
        const formatted = new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit', timeZoneName: 'short'
        }).format(now);
        setCurrentDate(formatted);

        setMounted(true);
    }, []);

    const handleQuickAction = (action: string) => {
        if (action) {
            sendMessage(
                { text: action },
                { body: { visitorId: activeVisitorId } }
            )
        }
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputValue.trim()) {
            sendMessage({ text: inputValue }, { body: { visitorId: activeVisitorId } })
            setInputValue('');
        }
    };

    if (!mounted) return null;

    const isAITyping = (status === 'submitted' || status === 'streaming') && messages[messages.length - 1]?.role === 'user';

    return (
        <div className="bg-gray-100 dark:bg-custom_bg-alt font-sans text-gray-900 dark:text-white overflow-hidden h-screen w-full flex justify-center transition-colors duration-300">
            <div className="flex flex-col w-full max-w-[1024px] h-full bg-white dark:bg-custom_bg-main shadow-2xl border-x border-gray-200 dark:border-custom_surface relative transition-colors duration-300">
                <ChatHeader avatarUrl={avatar} />
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50 dark:bg-custom_bg-alt scroll-smooth transition-colors duration-300">
                    <div className="flex justify-center">
                        <span className="text-xs font-medium text-gray-500 dark:text-custom_text-secondary bg-gray-200 dark:bg-custom_surface px-3 py-1 rounded-full transition-colors">Hoje</span>
                    </div>

                    {/* IMPLEMENTATION: Injecting the dynamic welcome message state */}
                    <MessageBubble
                        isUser={false}
                        content={chatTranslations('welcomeMessage', { name: visitorFirstName })}
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
                <div className="flex flex-col gap-3 p-4 bg-white dark:bg-custom_bg-main border-t border-gray-200 dark:border-custom_surface shrink-0 z-20 transition-colors duration-300">
                    <QuickActionsMenu onAction={handleQuickAction} />
                    <ChatInputForm
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        onSubmit={onSubmit}
                        disabled={status !== 'ready'}
                    />
                    <TrainingDisclaimer />
                </div>
            </div>
        </div>
    );
}
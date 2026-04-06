import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChatInterface } from '@/components/chat/ChatInterface';

// MOCK 0: Polyfill for JSDOM missing the scrollIntoView browser API
beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn()
})

// MOCK 1: Next.js native routing
vi.mock('next/navigation', () => ({
    useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
    usePathname: () => '/',
    useSearchParams: () => new URLSearchParams(),
}));

// MOCK 2: Core translations and locale
vi.mock('next-intl', () => ({
    useTranslations: () => (key: string) => key,
    useLocale: () => 'en-US',
}));

// MOCK 3: The next-intl navigation wrapper (This stops the "Cannot find module" error)
vi.mock('next-intl/navigation', () => ({
    useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
    usePathname: () => '/',
    Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
}));

// MOCK 4: Your custom localized routing file (if imported by the component)
vi.mock('@/i18n/routing', () => ({
    useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
    usePathname: () => '/',
    Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
}));

// MOCK 5: Vercel AI SDK
vi.mock('@ai-sdk/react', () => ({
    useChat: () => ({
        messages: [],
        input: '',
        handleInputChange: vi.fn(),
        handleSubmit: vi.fn(),
        status: 'idle',
        sendMessage: vi.fn(),
        setMessages: vi.fn(),
    }),
}));

// TEST SUITE
describe('ChatInterface Component', () => {
    it('should render the chat interface without crashing', () => {
        render(<ChatInterface visitorId="test-visitor-123" />);

        // ASSERTION: Ensures the input box is rendered
        const chatInput = screen.getByRole('textbox');
        expect(chatInput).toBeInTheDocument();
    });

});
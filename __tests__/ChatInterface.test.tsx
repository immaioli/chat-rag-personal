import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ChatInterface } from '@/components/chat/ChatInterface'
import { useChat } from '@ai-sdk/react'


// Mock next-theme to avoid hydration mismatches in tests
vi.mock('next-themes', () => ({
    useTheme: () => ({ theme: 'dark', setTheme: vi.fn() })
}))

// Hoisted module mock to prevent ESM read-only namespace errors
vi.mock('@ai-sdk/react', () => ({
    useChat: vi.fn(),
}));

describe('ChatInterface UI', () => {
    it('should render quick action dropdown and trigger sendMessage on selection', () => {
        const sendMessageMock = vi.fn()

        // Safely apply runtime mock implementations using vi.mocked
        vi.mocked(useChat).mockReturnValue({
            messages: [],
            status: 'ready',
            sendMessage: sendMessageMock
        } as any)

        render(<ChatInterface visitorId='test-id' />)

        // Find the select element by its acessible role (combobox)
        const selectElement = screen.getByRole('combobox')
        expect(selectElement).toBeDefined()

        // Simulate selecting an option from the dropdown
        fireEvent.change(selectElement, { target: { value: 'Experiência' } })

        // Verify sendMessage was called correctly with the selected payload
        expect(sendMessageMock).toHaveBeenCalledWith({ text: 'Experiência' })
    })
})
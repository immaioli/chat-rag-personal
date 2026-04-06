import { LogOutButton } from '@/components/admin/LogoutButton';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as nextAuthReact from 'next-auth/react'

// MOCK: Intercept next-auth client library
vi.mock('next-auth/react', () => ({
    signOut: vi.fn()
}))

// TEST SUITE: Administrative Logout Action
describe('LogoutButton component', () => {
    beforeEach(() => {
        // SETUP: Clear mock history before each test to ensure complete isolation
        vi.clearAllMocks()
    })

    it('should render the logout button correctly', () => {
        // ACTION: Render the isolated component
        render(<LogOutButton />)

        // ASSERTION: Ensure the button exists with the correct text
        const buttonElement = screen.getByRole('button', { name: /sign out/i });
        expect(buttonElement).toBeInTheDocument()
    })

    it('should call signOut with the correct callback URL when clicked', () => {
        render(<LogOutButton />)
        const buttonElement = screen.getByRole('button', { name: /sign out/i })

        // ACTION: Simulate a physical user click on the button
        fireEvent.click(buttonElement)

        // ASSERTION: Verify if the mocked signOut function was called exactly once
        expect(nextAuthReact.signOut).toHaveBeenCalledTimes(1)
    })


}) 
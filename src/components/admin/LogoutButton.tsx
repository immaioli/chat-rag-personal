'use client'

import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

export function LogOutButton() {
    return (
        <button
            onClick={() => {
                const absoluteUrl = `${window.location.origin}/system/login`
                signOut({ callbackUrl: absoluteUrl })
            }}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-400 rounded-lg transition-colors border border-red-500/20 text-sm font-semibold shadow-sm"
        >
            <LogOut className='w-4 h-4' />
            <span>Sign Out</span>
        </button>
    )
}
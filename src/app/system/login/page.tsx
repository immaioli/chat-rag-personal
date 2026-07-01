'use client'

import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Shield } from 'lucide-react'

export default function AdminLoginPage() {
    const [adminEmail, setAdminEmail] = useState('')
    const [adminPassword, setAdminPassword] = useState('')
    const [loginError, setLoginError] = useState('')
    const router = useRouter()

    const handleAdminSubmit = async (submitEvent: React.FormEvent) => {
        submitEvent.preventDefault()
        setLoginError('')

        // ACTION: Attempt to authenticate using the configured credentials provider
        const response = await signIn('credentials', {
            email: adminEmail,
            password: adminPassword,
            redirect: false,
        })

        if (response?.error) {
            setLoginError('Credenciais inválidas. Acesso negado.')
        } else {
            // ROUTING: Redirect to the dashboard upon successful authentication
            router.push('/system')
            router.refresh()
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-950 p-4'>
            <form onSubmit={handleAdminSubmit} className='w-full max-w-md bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-2xl space-y-6'>
                <div className='flex flex-col items-center justify-center space-y-3 mb-8'>
                    <div className='w-12 h-12 bg-blue-500/20 text-blue-500 rounded-full flex items-center justify-center border border-blue-500/30'>
                        <Shield className='w-6 h-6' />
                    </div>
                    <h1 className='text-2xl font-bold text-white tracking-tight'>System Access</h1>
                    <p className="text-gray-500 text-sm text-center">Restrited area. Please enter your administrator credentials.</p>
                </div>
                {loginError && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg text-center">
                        {loginError}
                    </div>
                )}
                <input
                    type="email"
                    placeholder='Admin Email'
                    required
                    className='w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all'
                    onChange={(inputEvent) => setAdminEmail(inputEvent.target.value)}
                />
                <input
                    type="password"
                    placeholder='Password'
                    required
                    className='w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all'
                    onChange={(inputEvent) => setAdminPassword(inputEvent.target.value)}
                />
                <button type='submit' className='w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20 mt-4 '>
                    Authorize
                </button>
            </form>
        </div>
    )
}
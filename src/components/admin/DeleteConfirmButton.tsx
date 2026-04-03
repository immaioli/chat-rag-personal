'use client'

import { deleteVisitorConversation } from '@/app/system/actions'
import { AlertTriangle, Check, Trash2, X } from 'lucide-react'
import { useState } from 'react'

interface DeleteButtonProps {
    visitorIdentifier: string
}

export function DeleteConfirmButton({ visitorIdentifier }: DeleteButtonProps) {
    const [isConfirming, setIsConfirming] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleConfirmDelete = async () => {
        setIsDeleting(true)
        try {
            await deleteVisitorConversation(visitorIdentifier)
        } catch (error) {
            console.error('Failed to delete', error)
            setIsDeleting(false)
            setIsConfirming(false)
        }
    }

    return (
        <div className="relative flex items-center">
            <button
                onClick={() => setIsConfirming(true)}
                disabled={isDeleting}
                className={`p-2 rounded-lg transition-colors 
                    ${isConfirming
                        ? 'bg-red-500/20 text-red-400'
                        : 'text-gray-500 hover:bg-gray-800 hover:text-red-400'
                    }`}
                title='Delete Conversation'
            >
                <Trash2 className='w-4 h-4' />
            </button>
            {isConfirming && (
                <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-gray-800 border border-gray-700 shadow-xl rounded-lg p-3 flex items-center gap-3 w-max animate-in fade-in slide-in-from-right-2 z-50">
                    <AlertTriangle className='w-4 h-4 text-yellow-500' />
                    <span className="text-sm text-gray-200 font-medium mr-2">Confirm deletion?</span>
                    <button
                        onClick={handleConfirmDelete}
                        disabled={isDeleting}
                        className='p-1.5 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded transition-colors'
                        title='Yes, delete'
                    >
                        <Check className='w-4 h-4' />
                    </button>
                    <button
                        onClick={() => setIsConfirming(false)}
                        disabled={isDeleting}
                        className='p-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition-colors'
                        title='Cancel'
                    >
                        <X className='w-4 h-4' />
                    </button>
                </div>
            )}
        </div>
    )
}
'use client'

import { deleteVisitorConversation } from '@/app/system/actions'
import { Trash2 } from 'lucide-react'

interface DeleteButtonProps {
    visitorIdentifier: string;
}

export function DeleteButton({ visitorIdentifier }: DeleteButtonProps) {
    const handleDeleteAction = async () => {
        // SECURITY: Prompt the admin for confimation before executing the destructive action
        const isConfirmed = window.confirm('Are you sure you want to delete this conversation? This action cannot be undone.')

        if (isConfirmed) {
            await deleteVisitorConversation(visitorIdentifier)
        }
    }

    return (
        <button
            onClick={handleDeleteAction}
            className='p-2 hover:bg-red-500/20 text-gray-500 hover:text-red-500 rounded-lg transition-colors group'
            title='Delete Conversation'
        >
            <Trash2 className='w-4 h-4' />
        </button>
    )
}

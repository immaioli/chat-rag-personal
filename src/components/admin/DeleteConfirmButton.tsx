'use client'
import { deleteVisitorConversation } from '@/app/system/actions'
import { AlertTriangle, Check, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { mergeClasses } from '@/lib/utils'
import { PopoverPanel } from '../ui/PopoverPanel'
import { Typography } from '../ui/Typography'
import {
    buttonStyles,
    popoverStyles,
    iconStyles
} from '@/constants/styles'

interface DeleteConfirmButtonProps {
    visitorIdentifier: string
}

export function DeleteConfirmButton({ visitorIdentifier }: DeleteConfirmButtonProps) {
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
        <div className={popoverStyles.wrapper}>
            <Button
                onClick={() => setIsConfirming(true)}
                disabled={isDeleting || isConfirming}
                variant='ghostDestructive'
                size='icon'
                className={mergeClasses(isConfirming && buttonStyles.dangerActive)}
                title='Delete Conversation'
            >
                <Trash2 className={iconStyles.sm} />
            </Button>
            {isConfirming && (
                <PopoverPanel
                    position='left'
                    layout='row'
                >
                    <AlertTriangle
                        className={mergeClasses(iconStyles.sm, 'text-yellow-500')}
                    />
                    <Typography
                        as='span'
                        size='sm'
                        weight='medium'
                        color='gray'
                        className='mr-2'
                    >
                        Confirm deletion?
                    </Typography>
                    <Button
                        onClick={handleConfirmDelete}
                        disabled={isDeleting}
                        variant='ghostDestructive'
                        size='icon'
                        className={buttonStyles.dangerSoft}
                        title='Yes, delete'
                    >
                        <Check className={iconStyles.sm} />
                    </Button>
                    <Button
                        onClick={() => setIsConfirming(false)}
                        disabled={isDeleting}
                        variant='ghost'
                        size='icon'
                        className={buttonStyles.ghostInset}
                        title='Cancel'
                    >
                        <X className={iconStyles.sm} />
                    </Button>
                </PopoverPanel>
            )}
        </div>
    )
}
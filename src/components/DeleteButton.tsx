import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { buttonStyles } from '@/constants/styles'
import { mergeClasses } from '@/lib/utils'

interface DeleteButtonProps {
    onClick: () => void
}

export function DeleteButton({ onClick }: DeleteButtonProps) {
    return (
        <Button
            onClick={onClick}
            variant='ghost'
            className={mergeClasses(
                'size-10 p-0',
                buttonStyles.action,
                buttonStyles.danger
            )}
            title='Apagar conversa'
        >
            <Trash2 size={20} />
        </Button>
    )
}
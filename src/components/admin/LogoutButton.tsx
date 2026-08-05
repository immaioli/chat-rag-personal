'use client'
import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Typography } from '@/components/ui/Typography'
import { iconStyles, buttonStyles } from '@/constants/styles'

export function LogOutButton() {
    const handleLogoutAction = async () => {
        await signOut({ callbackUrl: '/login' })
    }
    return (
        <Button
            onClick={handleLogoutAction}
            variant='ghostDestructive'
            size='default'
            className='w-auto px-4 py-2 gap-2 h-10 shrink-0'
            title='Sign Out'
        >
            <LogOut
                className={iconStyles.sm}
            />
            <Typography
                as='span'
                size='sm'
                weight='medium'
                className='text-inherit'
            >
                Sign Out
            </Typography>
        </Button>
    )
}
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
            variant='ghost'
            size='default'
            className={buttonStyles.sidebarAction}
            title='Sign Out'
        >
            <LogOut
                className={iconStyles.sm + ' text-custom_text-muted'}
            />
            <Typography
                as='span'
                size='sm'
                weight='medium'
                color='default'
            >
                Sign Out
            </Typography>
        </Button>
    )
}
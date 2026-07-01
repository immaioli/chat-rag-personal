import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/Button'
import { buttonStyles } from '@/constants/styles'

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    return (
        <Button
            onClick={() => setTheme(theme === 'dark'
                ? 'light'
                : 'dark'
            )}
            variant='ghost'
            className={buttonStyles.themeToggle}
        >
            {theme === 'dark'
                ? (
                    <Sun size={20} />
                )
                : (
                    <Moon size={20} />
                )
            }
        </Button>
    )
}
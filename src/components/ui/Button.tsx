import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { mergeClasses } from '@/lib/utils'
import { buttonStyles } from '@/constants/styles'

const buttonVariants = cva(
    buttonStyles.base,
    {
        variants: {
            variant: {
                default: buttonStyles.variantDefault,
                ghost: buttonStyles.variantGhost,
                ghostDestructive: buttonStyles.variantGhostDestructive,
            },
            size: {
                default: 'px-4 py-2',
                sm: 'px-3 py-1.5 text-sm',
                lg: 'px-6 py-3 text-lg',
                icon: 'p-2'
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        }
    }
)

export interface ButtonProps extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { }

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({
        className,
        variant,
        size,
        ...elementProperties
    }, forwardedReference) => {
        return (
            <button
                className={mergeClasses(
                    buttonVariants({
                        variant,
                        size,
                        className
                    })
                )}
                ref={forwardedReference}
                {...elementProperties}
            />
        )
    }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
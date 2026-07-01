import {
    ReactNode,
    ElementType
} from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { mergeClasses } from '@/lib/utils'

const typographyVariants = cva(
    'transition-colors ',
    {
        variants: {
            weight: {
                normal: 'font-normal',
                medium: 'font-medium',
                semibold: 'font-semibold',
                bold: 'font-bold',
            },
            color: {
                default: 'text-custom_foreground',
                muted: 'text-custom_text-muted',
                gray: 'text-gray-200',
            },
            size: {
                xs: 'text-xs',
                sm: 'text-sm',
                md: 'text-md',
                base: 'text-base',
                lg: 'text-lg',
                '2xl': 'text-2xl',
                '3xl': 'text-3xl',
            }
        },
        defaultVariants: {
            weight: 'normal',
            size: 'base',
            color: 'default',
        },
    }
)

interface TypographyProps extends VariantProps<typeof typographyVariants> {
    children: ReactNode
    as?: ElementType
    className?: string
}

export function Typography({
    children,
    as: Component = 'span',
    weight,
    size,
    color,
    className,
}: TypographyProps) {
    return (
        <Component
            className={mergeClasses(
                typographyVariants({
                    weight,
                    size,
                    color
                }),
                className
            )}
        >
            {children}
        </Component>
    )
}
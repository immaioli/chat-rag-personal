import {
    forwardRef,
    HTMLAttributes
} from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { mergeClasses } from '@/lib/utils'
import { surfaceStyles } from '@/constants/styles'

const dividerVariants = cva(
    surfaceStyles.divider,
    {
        variants: {
            orientation: {
                horizontal: 'h-px w-full',
                vertical: 'w-px h-full',
            }
        },
        defaultVariants: {
            orientation: 'horizontal',
        }
    }
)

export interface DividerProps extends
    HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dividerVariants> { }

const Divider = forwardRef<HTMLDivElement, DividerProps>(
    ({
        className,
        orientation,
        ...elementProperties
    }, forwardedReference) => {
        return (
            <div
                ref={forwardedReference}
                role='separator'
                className={mergeClasses(
                    dividerVariants({ orientation }),
                    className
                )}
                {...elementProperties}
            />
        )
    }
)

Divider.displayName = 'Divider'

export { Divider, dividerVariants }
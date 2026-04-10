import { 
    ReactNode, 
    HTMLAttributes, 
    forwardRef 
} from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { mergeClasses } from '@/lib/utils'
import { surfaceStyles, popoverStyles } from '@/constants/styles'

const popoverVariants = cva(
    mergeClasses(
        surfaceStyles.popover, 
        popoverStyles.base
    ),
    {
        variants: {
            position: {
                left: popoverStyles.placements.left,
                right: popoverStyles.placements.right,
                top: popoverStyles.placements.top,
                bottom: popoverStyles.placements.bottom
            },
            layout: {
                default: popoverStyles.layouts.default,
                row: popoverStyles.layouts.row,
                col: popoverStyles.layouts.col
            }
        },
        defaultVariants: {
            position: 'left',
            layout: 'default',
        }
    }
)

export interface PopoverPanelProps extends 
    HTMLAttributes<HTMLDivElement>, 
    VariantProps<typeof popoverVariants> {
    children: ReactNode
}

const PopoverPanel = forwardRef<HTMLDivElement, PopoverPanelProps>(
    ({ 
        className, 
        position, 
        layout, 
        children, 
        ...elementProperties 
    }, forwardedReference) => {
        return (
            <div
                ref={forwardedReference}
                className={mergeClasses(
                    popoverVariants({ 
                        position, 
                        layout 
                    }), 
                    className
                )}
                {...elementProperties}
            >
                {children}
            </div>
        )
    }
)

PopoverPanel.displayName = 'PopoverPanel'

export { PopoverPanel, popoverVariants }
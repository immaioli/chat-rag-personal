import {
    ComponentPropsWithoutRef,
    ElementType,
    ReactNode
} from 'react'
import { mergeClasses } from '@/lib/utils'

type GridContainerProps<CurrentElementType extends ElementType> = {
    as?: CurrentElementType
    children?: ReactNode
    cols?: '1' | '2' | '3' | '4'
    gap?: '0' | 'px' | '1' | '2' | '3' | '4'
    className?: string
} & ComponentPropsWithoutRef<CurrentElementType>

const colsClasses: Record<string, string> = {
    '1': 'grid-cols-1',
    '2': 'grid-cols-2',
    '3': 'grid-cols-3',
    '4': 'grid-cols-4',
}

const gapClasses: Record<string, string> = {
    '0': 'gap-0',
    'px': 'gap-px',
    '1': 'gap-1',
    '2': 'gap-2',
    '3': 'gap-3',
    '4': 'gap-4',
}

export function GridContainer<CurrentElementType extends ElementType = 'div'>({
    children,
    as,
    cols = '1',
    gap = '0',
    className,
    ...nativeProperties
}: GridContainerProps<CurrentElementType>) {
    const Component = as || 'div'
    return (
        <Component
            className={mergeClasses(
                'grid',
                colsClasses[cols],
                gapClasses[gap],
                className
            )}
            {...nativeProperties}
        >
            {children}
        </Component>
    )
}
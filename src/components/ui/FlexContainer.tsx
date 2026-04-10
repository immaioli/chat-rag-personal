import {
    ComponentPropsWithoutRef,
    ElementType,
    ReactNode
} from 'react'
import { mergeClasses } from '@/lib/utils'

const alignmentClasses: Record<'start' | 'center' | 'end' | 'stretch', string> = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
}

const justificationClasses: Record<'start' | 'center' | 'between' | 'around' | 'evenly', string> = {
    start: 'justify-start',
    center: 'justify-center',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
}

const directionClasses: Record<'row' | 'col', string> = {
    row: 'flex-row',
    col: 'flex-col'
}

type FlexContainerProps<CurrentElementType extends ElementType> = {
    as?: CurrentElementType
    children?: ReactNode
    alignItems?: 'start' | 'center' | 'end' | 'stretch'
    justifyContent?: 'start' | 'center' | 'between' | 'around' | 'evenly'
    direction?: 'row' | 'col'
    className?: string
} & ComponentPropsWithoutRef<CurrentElementType>

export function FlexContainer<CurrentElementType extends ElementType = 'div'>({
    children,
    as,
    alignItems = 'stretch',
    justifyContent = 'start',
    direction = 'row',
    className,
    ...nativeProperties
}: FlexContainerProps<CurrentElementType>) {
    const Component = as || 'div'
    return (
        <Component
            className={mergeClasses(
                'flex',
                alignmentClasses[alignItems],
                justificationClasses[justifyContent],
                directionClasses[direction],
                className
            )}
            {...nativeProperties}
        >
            {children}
        </Component>
    )
}
import {
    forwardRef,
    InputHTMLAttributes
} from 'react'
import { mergeClasses } from '@/lib/utils'
import { inputStyles } from '@/constants/styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({
        className,
        ...nativeProperties
    }, ref) => {
        return (
            <input
                ref={ref}
                className={mergeClasses(
                    inputStyles.base,
                    inputStyles.colors,
                    inputStyles.border,
                    inputStyles.placeholder,
                    inputStyles.focus,
                    inputStyles.disabled,
                    className
                )}
                {...nativeProperties}
            />
        )
    }
)

Input.displayName = 'Input'
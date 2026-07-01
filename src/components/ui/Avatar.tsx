import { cva, type VariantProps } from 'class-variance-authority'
import { mergeClasses } from '@/lib/utils'
import { surfaceStyles } from '@/constants/styles'

const avatarVariants = cva(
    surfaceStyles.avatarBase,
    {
        variants: {
            size: {
                sm: 'size-10',
                md: 'size-14',
                lg: 'size-20',
            }
        },
        defaultVariants: {
            size: 'lg',
        }
    }
)

const statusVariants = cva(
    surfaceStyles.statusBase,
    {
        variants: {
            size: {
                sm: 'bottom-0 right-0 size-3',
                md: 'bottom-0 right-0 size-4',
                lg: 'bottom-0 right-1 size-5',
            }
        },
        defaultVariants: {
            size: 'lg',
        }
    }
)

export interface AvatarProps extends VariantProps<typeof avatarVariants> {
    url: string
    showStatus?: boolean
    className?: string
}

export function Avatar({
    url,
    showStatus = false,
    size,
    className
}: AvatarProps) {
    return (
        <div
            className={mergeClasses(
                "relative shrink-0 group",
                className
            )}
        >
            <div
                className={avatarVariants({ size })}
                style={{ backgroundImage: `url('${url}')` }}
            />
            {showStatus
                ? (
                    <div
                        className={statusVariants({ size })}
                        title="Online"
                    />
                )
                : null
            }
        </div>
    )
}
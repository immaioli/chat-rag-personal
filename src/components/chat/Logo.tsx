import { FlexContainer } from '@/components/ui/FlexContainer'
import { mergeClasses } from '@/lib/utils'
import { surfaceStyles, animationStyles } from '@/constants/styles'

export function Logo() {
    return (
        <FlexContainer 
            alignItems='center' 
            justifyContent='center' 
            className={mergeClasses(
                surfaceStyles.logo, 
                animationStyles.transition
            )}
        >
            <img 
                src='/logoHeader.png' 
                alt='Logo' 
                className='w-full h-full object-contain' 
            />
        </FlexContainer>
    )
}
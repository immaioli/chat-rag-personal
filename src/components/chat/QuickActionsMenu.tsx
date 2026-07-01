import { useState } from 'react'
import {
    CircleStar,
    Briefcase,
    GraduationCap,
    Code2,
    LayoutGrid,
    Languages,
    FileText,
    Mail,
} from 'lucide-react'
import { QuickActionButton } from './QuickActionButton'
import { QuickActionsToggle } from './QuickActionsToggle'
import { useTranslations } from 'next-intl'
import { FlexContainer } from '@/components/ui/FlexContainer'
import { PopoverPanel } from '@/components/ui/PopoverPanel'
import { GridContainer } from '@/components/ui/GridContainer'
import { layoutStyles } from '@/constants/styles'
import { mergeClasses } from '@/lib/utils'

const quickActionsConfig = [
    { id: 'summary', icon: CircleStar },
    { id: 'experience', icon: Briefcase },
    { id: 'education', icon: GraduationCap },
    { id: 'skills', icon: Code2 },
    { id: 'portfolio', icon: LayoutGrid },
    { id: 'language', icon: Languages },
    { id: 'resume', icon: FileText },
    { id: 'contact', icon: Mail }
]

export function QuickActionsMenu({ onAction }: { onAction: (action: string) => void }) {
    const [isOpen, setIsOpen] = useState(false)
    const quickActionsTranslations = useTranslations('QuickActions')

    const handleSelect = (translatedLabel: string) => {
        onAction(translatedLabel)
        setIsOpen(false)
    }

    return (
        <FlexContainer className='relative w-full max-w-full'>
            <QuickActionsToggle
                isOpen={isOpen}
                onClick={() => setIsOpen(!isOpen)}
            />
            {isOpen
                ? (
                    <PopoverPanel
                        className={mergeClasses(layoutStyles.quickActionsMenu, 'border-blue-600 dark:border-blue-600')}
                        position='top'
                    >
                        <GridContainer
                            cols='2'
                            gap='px'
                            className={layoutStyles.quickActionsGrid}
                        >
                            {quickActionsConfig.map((action) => {
                                const localizedLabel = quickActionsTranslations(action.id as any)
                                return (
                                    <QuickActionButton
                                        key={action.id}
                                        label={localizedLabel}
                                        Icon={action.icon}
                                        onClick={() => handleSelect(localizedLabel)}
                                    />
                                )
                            })}
                        </GridContainer>
                    </PopoverPanel>
                )
                : null
            }
        </FlexContainer>
    )
}
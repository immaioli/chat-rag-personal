import React, { ButtonHTMLAttributes } from 'react'
import { mergeClasses } from '@/lib/utils'
import { buttonStyles } from '@/constants/styles'

// Extended interface for custom button properties defining variants and loading state
interface ButtonProperties extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'danger' | 'ghost' | 'ghostDestructive' | 'ghostInset' | 'language' | 'primaryForm' | 'quickAction' | 'send' | 'sidebarAction' | 'social' | 'themeToggle'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  isLoadingState?: boolean
}

export function Button({ variant = 'default', isLoadingState = false, className, children, ...restProperties }: ButtonProperties) {
  // Determine variant style from buttonStyles or fallback to default
  let appliedVariantStyle = buttonStyles.variantDefault
  if (variant === 'ghost') appliedVariantStyle = buttonStyles.variantGhost
  else if (variant === 'ghostDestructive') appliedVariantStyle = buttonStyles.variantGhostDestructive
  else if (variant === 'danger') appliedVariantStyle = buttonStyles.danger
  else if (variant === 'ghostInset') appliedVariantStyle = buttonStyles.ghostInset
  else if (variant === 'language') appliedVariantStyle = buttonStyles.language
  else if (variant === 'primaryForm') appliedVariantStyle = buttonStyles.primaryForm
  else if (variant === 'quickAction') appliedVariantStyle = buttonStyles.quickAction
  else if (variant === 'send') appliedVariantStyle = buttonStyles.send
  else if (variant === 'sidebarAction') appliedVariantStyle = buttonStyles.sidebarAction
  else if (variant === 'social') appliedVariantStyle = buttonStyles.social
  else if (variant === 'themeToggle') appliedVariantStyle = buttonStyles.themeToggle

  // Backward compatibility for old manual styles if they were used
  else if (variant === 'primary') appliedVariantStyle = 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/20'
  else if (variant === 'secondary') appliedVariantStyle = 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200'

  // Combine styles safely and handle the loading state visual changes
  const combinedClasses = mergeClasses(
    buttonStyles.base,
    appliedVariantStyle,
    isLoadingState ? 'opacity-50 pointer-events-none' : '',
    className
  )

  return (
    <button className={combinedClasses} disabled={isLoadingState} {...restProperties}>
      {isLoadingState ? <span>Carregando...</span> : children}
    </button>
  )
}
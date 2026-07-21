import React, { ButtonHTMLAttributes } from 'react'

// Extended interface for custom button properties defining variants and loading state
interface ButtonProperties extends ButtonHTMLAttributes<HTMLButtonElement> {
  variantStyle?: 'primary' | 'secondary' | 'danger'
  isLoadingState?: boolean
}

export function Button({ variantStyle = 'primary', isLoadingState = false, children, ...restProperties }: ButtonProperties) {
  // Define base style shared across all variants ensuring structural scalability
  const baseButtonStyle = 'flex items-center justify-center rounded-lg px-4 py-2 font-medium transition-all active:scale-95'
  
  // Resolve variant specific classes mapping to the design system tokens
  const primaryStyle = 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/20'
  const secondaryStyle = 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200'
  const dangerStyle = 'bg-red-500 text-white hover:bg-red-600'
  
  // Conditionally apply the correct style based on the variant prop
  let appliedVariantStyle = primaryStyle
  if (variantStyle === 'secondary') {
    appliedVariantStyle = secondaryStyle
  } else if (variantStyle === 'danger') {
    appliedVariantStyle = dangerStyle
  }

  // Combine styles safely and handle the loading state visual changes
  const combinedClasses = `${baseButtonStyle} ${appliedVariantStyle} ${isLoadingState ? 'opacity-50 pointer-events-none' : ''}`

  return (
    <button className={combinedClasses} disabled={isLoadingState} {...restProperties}>
      {isLoadingState ? <span>Carregando...</span> : children}
    </button>
  )
}
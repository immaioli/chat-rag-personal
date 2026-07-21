import React, { InputHTMLAttributes } from 'react'

// Extended interface for the input field properties including validation states
interface InputFieldProperties extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  hasErrorState?: boolean
}

export function InputField({ errorMessage, hasErrorState = false, className, ...restProperties }: InputFieldProperties) {
  // Define base container and input styles for consistent rendering across mobile and web
  const inputContainerStyle = 'flex flex-col gap-1 w-full'
  const baseInputStyle = 'rounded-lg border px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-blue-600'
  const errorInputStyle = 'border-red-500 text-red-500 focus:ring-red-600'
  const defaultInputStyle = 'border-gray-200 text-gray-900 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white'
  
  // Determine final input class based on error state flag
  const appliedInputStyle = hasErrorState ? errorInputStyle : defaultInputStyle
  const finalInputClass = `${baseInputStyle} ${appliedInputStyle}`

  return (
    <div className={inputContainerStyle}>
      <input className={finalInputClass} {...restProperties} />
      {hasErrorState && errorMessage && <span className='text-sm text-red-500'>{errorMessage}</span>}
    </div>
  )
}

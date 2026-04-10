import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// UTILITY: Merges Tailwind classes intelligently, resolving conflicts (e.g.: px-2 and px-4)
export function mergeClasses(...classInputs: ClassValue[]) {
    return twMerge(clsx(classInputs))
}
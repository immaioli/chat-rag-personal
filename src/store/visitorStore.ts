import { create } from 'zustand'

interface VisitorStateProperties {
    visitorIdentifier: string
    visitorFullName: string
    hasValidVisitorName: boolean
    setVisitorInformation: (identifier: string, fullName: string) => void
    clearVisitorInformation: () => void
}

export const useVisitorStore = create<VisitorStateProperties>((setStoreState) => ({
    visitorIdentifier: '',
    visitorFullName: 'Visitante',
    hasValidVisitorName: false,
    setVisitorInformation: (identifier: string, fullName: string) =>
        setStoreState({
            visitorIdentifier: identifier,
            visitorFullName: fullName,
            hasValidVisitorName: true
        }),
    clearVisitorInformation: () =>
        setStoreState({
            visitorIdentifier: '',
            visitorFullName: 'Visitante',
            hasValidVisitorName: false
        })
}))

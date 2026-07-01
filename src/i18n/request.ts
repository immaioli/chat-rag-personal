import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async({requestLocale})=>{
    let locale = await requestLocale

    if (!locale || !routing.locales.includes(locale as any)) {
        locale = routing.defaultLocale
    }

    let translates = {}

    try {
        translates = (await import(`../../translate/${locale}.json`)).default
    } catch (error) {
        console.warn(`[i18n] WARINING: Missing translation dictionary for locale -> ${locale}.json`)
    }

    return {
        locale,
        messages: translates,
    }
})
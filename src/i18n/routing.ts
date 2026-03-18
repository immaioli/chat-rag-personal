import { defineRouting } from 'next-intl/routing';

// Defines the strict supported locales and the fallback
export const routing = defineRouting({
    locales: ['pt-BR', 'en-US', 'es-LA'],
    defaultLocale: 'pt-BR'
});
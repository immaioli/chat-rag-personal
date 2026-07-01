import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

// Defines the strict supported locales and the fallback
export const routing = defineRouting({
    locales: ['pt-BR', 'en-US', 'es-LA'],
    defaultLocale: 'pt-BR'
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
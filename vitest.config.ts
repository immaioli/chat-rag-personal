import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

// CONFIGURATION: Vitest setup tailored for Next.js and Node 22 stability
export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./vitest.setup.ts'],
        alias: {
            '@': path.resolve(__dirname, './src')
        },
        // to prevent ESM require() errors and bypass the Node 22 worker crash.
        isolate: false,
    }
});
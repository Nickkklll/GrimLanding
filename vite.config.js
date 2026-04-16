import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
    base: '/GrimLanding/',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        outDir: 'dist',
        cssCodeSplit: true,
        chunkSizeWarningLimit: 500,

        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.includes('node_modules/swiper')) {
                        return 'swiper'
                    }
                },
            },
        },
    },

    assetsInlineLimit: 4096,

    css: {
        devSourcemap: true,
    },
})
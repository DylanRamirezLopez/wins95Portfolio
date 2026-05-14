// Dylan Ramirez Lopez — Windows 95 Portfolio
// Configuración de Vite

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@context': '/src/context',
      '@data': '/src/data',
      '@utils': '/src/utils',
      '@styles': '/src/styles',
      '@assets': '/src/assets',
    },
  },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
  },
})

/**
 * Vite Configuration
 * - Menggunakan plugin React untuk JSX transform
 * - Development server berjalan di port default (5173)
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})

/**
 * Vite config for the Marginalia React SPA (@vitejs/plugin-react).
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

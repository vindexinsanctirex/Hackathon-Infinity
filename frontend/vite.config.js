import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Hackathon-Infinity/',
  build: {
    sourcemap: false, // Disable source maps in production to avoid 404 errors
    outDir: 'dist',
  },
})

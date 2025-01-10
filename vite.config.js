import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensures output goes to the "dist" directory
    assetsDir: 'assets', // Optional: Customize where assets go inside dist
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Default '/' works for Vercel/root hosting. GitHub Pages serves under a
  // subpath, so the Pages build sets PAGES_BASE=/sailsafe-survey/.
  base: process.env.PAGES_BASE || '/',
})

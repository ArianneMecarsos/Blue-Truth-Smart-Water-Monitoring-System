import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,      // <--- Forces this exact port
    strictPort: true // <--- If 5174 is busy, it fails instead of switching to 5175
  }
})
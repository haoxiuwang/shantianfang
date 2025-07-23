import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [tailwindcss(),react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/pages/')) {
            return id.split('/pages/')[1].split('.')[0] // home, about
          }
        }
      }
    }
  }
})

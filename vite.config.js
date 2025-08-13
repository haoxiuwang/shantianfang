import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
   server: {
    host: '0.0.0.0', // 监听所有网络接口（包括局域网）
    port: 5173,      // 默认端口（可修改）
    strictPort: true, // 如果端口被占用，直接报错，而不是尝试其他端口
  },
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

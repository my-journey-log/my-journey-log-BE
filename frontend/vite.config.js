import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://host.docker.internal:8080',
        changeOrigin: true,
      },
      '/chatbot': {
        target: 'http://host.docker.internal:8080',
        changeOrigin: true,
      },
      '/post': {
        target: 'http://host.docker.internal:8080',
        changeOrigin: true,
      },
    }
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Todo lo que empiece por /api se reenvía a Spring Boot.
    // Así no necesitas configurar CORS en desarrollo.
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
})

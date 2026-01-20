import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 5173,
    open: true
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: [],
  }
})

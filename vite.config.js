import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 5173,
    hmr: true,
    middlewareMode: false,
    watch: {
      usePolling: false
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    },
    reportCompressedSize: true,
    chunkSizeWarningLimit: 500
  },
  resolve: {
    alias: {}
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/editor/schema",
  server: {
    port: 3002,
    proxy: {
      "/admin": {
        target: "http://localhost:3000/",
        changeOrigin: true,
      },
      "/editor/flow": {
        target: "http://localhost:3001/",
        changeOrigin: true,
      },
      "/errors": {
        target: "http://localhost:3003/",
        changeOrigin: true,
      },
    },
  },
});

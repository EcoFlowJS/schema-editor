import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/editor/schema",
  server: {
    port: 3003,
    proxy: {
      "/admin": {
        target: "http://localhost:3001/",
        changeOrigin: true,
      },
      "/editor/flow": {
        target: "http://localhost:3002/",
        changeOrigin: true,
      },
      "/auth": {
        target: "http://localhost:3000/",
        changeOrigin: true,
      },
    },
  },
  build: {
    minify: true,
    chunkSizeWarningLimit: 2000,
  },
});

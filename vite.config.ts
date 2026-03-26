import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api/librivox": {
        target: "https://librivox.org",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api\/librivox/, "/api/feed"),
      },
      "/proxy/archive": {
        target: "https://archive.org",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/proxy\/archive/, ""),
      },
    },
  },
})

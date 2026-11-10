import { resolve } from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// the components, with React left to the application
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: false,
    lib: { entry: resolve(__dirname, "src/index.ts"), formats: ["es"], fileName: () => "index.js", cssFileName: "style" },
    rollupOptions: { external: ["react", "react-dom", "react/jsx-runtime", "react-dom/client"] },
  },
  test: { environment: "jsdom", root: resolve(__dirname, "src") },
})

import { resolve } from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// <activity-log> and <activity-timeline> for any page: React and the styles inside
export default defineConfig({
  plugins: [react()],
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: false,
    lib: { entry: resolve(__dirname, "src/element.tsx"), formats: ["es"], fileName: () => "element.js" },
  },
})

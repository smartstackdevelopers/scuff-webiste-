import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "next/image": path.resolve(__dirname, "./src/shims/next-image.tsx"),
      "next/link": path.resolve(__dirname, "./src/shims/next-link.tsx"),
      "next/navigation": path.resolve(__dirname, "./src/shims/next-navigation.ts"),
      "next/dynamic": path.resolve(__dirname, "./src/shims/next-dynamic.tsx"),
      "next/font/google": path.resolve(__dirname, "./src/shims/next-font-google.ts"),
      next: path.resolve(__dirname, "./src/shims/next-index.ts"),
    },
  },
  server: {
    host: "127.0.0.1",
    port: 3000,
    strictPort: true,
  },
  preview: {
    host: "127.0.0.1",
    port: 3000,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    chunkSizeWarningLimit: 1800,
  },
});

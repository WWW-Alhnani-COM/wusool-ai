import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config — no Next.js. Plain React + TS SPA.
export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2019",
    // Keep the vendor chunk separate so route code can be lazy-loaded
    // without re-downloading react/react-dom on every navigation.
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          motion: ["framer-motion"],
        },
      },
    },
  },
});

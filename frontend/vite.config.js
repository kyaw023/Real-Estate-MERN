import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
 
  plugins: [react()],

  build: {
    outDir: "dist", // Make sure this is relative to the `frontend` directory
    assetsDir: "assets", // Ensure assets are being placed correctly
  },
});

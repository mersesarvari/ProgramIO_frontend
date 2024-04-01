import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
//import WindiCSS from "vite-plugin-windicss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    //Causing an error when starting
    //WindiCSS()
  ],
});

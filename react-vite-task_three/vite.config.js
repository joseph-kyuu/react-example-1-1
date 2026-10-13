import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  // 開發環境還是正式環境
  base: process.env.NODE_ENV === "production" ? "/react-gh-pages-sample/" : "/",
  plugins: [react()],
});

//   base: process.env.NODE_ENV === "production" ? "/react-gh-pages-sample/" : "/",
// base: import.meta.env.MODE === "production" ? "/加上正確repo路徑/" : "/",

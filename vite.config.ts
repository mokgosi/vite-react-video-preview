import dotenv from 'dotenv';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/proxy": {
        target: "https://localhost:5173",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy/, '')
      },
    },
  },
  plugins: [react()],
  define: {
    'process.env': process.env
  }
})

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  mode: 'development',
  base: '/',
  build: {
    outDir: '../../simple-json-server-master/simple-json-server-master/public',
  },
  resolve: {
    alias: {
      '@assets': '/src/assets' // 실제 프로젝트 경로에 따라 경로를 수정해야 합니다.
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/,'') // URL에서 '/api'부분을 제거
      },
      '/uploads': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/uploads/, '/uploads')
      }
    }
  }
});
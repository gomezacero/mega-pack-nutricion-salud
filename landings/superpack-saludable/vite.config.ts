import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/superpack-saludable/',
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  build: {
    outDir: '../../dist/superpack-saludable',
    emptyOutDir: false,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});

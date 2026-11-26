import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// GitHub Pages serves the site at https://azbz0987.github.io/RIOTVERSE/
// The base must match the repository name exactly (case-sensitive).
export default defineConfig({
  base: '/RIOTVERSE/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});

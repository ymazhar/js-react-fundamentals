import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Base path for GitHub Pages deployment
  // Uses repo name when deploying to GitHub Pages, '/' for local dev
  base: process.env.GITHUB_ACTIONS ? '/js-react-fundamentals/' : '/',
});

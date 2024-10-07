import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  plugins: [angular()],
  build: {
    rollupOptions: {
      input: {
        main: 'assets/sil-form-renderer/browser/index.html',
        polyfills: 'assets/sil-form-renderer/browser/polyfills.js',
        webComponentMain: 'assets/sil-form-renderer/browser/main.js',
      },
    },
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
});
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      input: {
        widget: fileURLToPath(new URL('./src/main.js', import.meta.url)),
        style: './src/style.css',
      },
      output: {
        inlineDynamicImports: false,
        entryFileNames: '[name].js', // for JS files
        chunkFileNames: '[name].js', // for code-splitted chunks
        assetFileNames: '[name].[ext]', // for other assets
      },
    },
  },
  server: {
    open: true,
    port: 5137,
    entry: fileURLToPath(new URL('./src/dev.js', import.meta.url)),
  },
  // Ensure preview mode is correctly handled
  preview: {
    open: true,
    port: 5137,
    entry: fileURLToPath(new URL('./src/dev.js', import.meta.url)),
  },
});

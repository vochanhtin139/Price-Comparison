import path from 'path';
import checker from 'vite-plugin-checker';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const PORT = 3039;

export default defineConfig({
  base: '/admin/', // Base URL for the application
  publicDir: 'admin', // Static assets directory (accessible at both / and /admin)
  plugins: [
    react(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
        dev: { logLevel: ['error'] },
      },
      overlay: {
        position: 'tl',
        initialIsOpen: false,
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), 'node_modules/$1'),
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), 'src/$1'),
      },
    ],
  },
  server: {
    port: PORT,
    host: true,
    // Ensure the dev server respects the /admin base path
    origin: `http://localhost:${PORT}/admin`,
  },
  preview: {
    port: PORT,
    host: true,
  },
  build: {
    assetsDir: '', // Output assets directly to dist/
    rollupOptions: {
      output: {
        // Hashed filenames for cache busting
        assetFileNames: '[name].[hash][extname]',
        entryFileNames: '[name].[hash].js',
        // Preserve directory structure for public files
        chunkFileNames: 'chunks/[name].[hash].js',
      },
    },
    // Ensure publicDir files are copied exactly
    copyPublicDir: true,
  },
  // Custom middleware for development (optional)
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});
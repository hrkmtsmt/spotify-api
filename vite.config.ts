import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const srcDir = path.join(__dirname, 'src/');
const publicDir = path.join(__dirname, 'public/');

export default defineConfig({
  root: srcDir,
  publicDir,
  envDir: __dirname,
  plugins: [react()],
  resolve: {
    alias: {
      '@src/': srcDir
    }
  }
});

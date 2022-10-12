import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import inject from '@rollup/plugin-inject';

const srcDir = path.join(__dirname, 'src/');
const publicDir = path.join(__dirname, 'public/');

export default defineConfig({
  root: srcDir,
  publicDir,
  plugins: [react()],
  resolve: {
    alias: {
      '@src/': srcDir
    }
  }
});

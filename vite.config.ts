import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import { reactRouter } from '@react-router/dev/vite';
import path from 'path';
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    reactRouter(),
    checker({ typescript: true }) 
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'app'),
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },
});

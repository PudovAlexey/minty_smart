import { defineConfig } from 'vite';
import alias from '@rollup/plugin-alias';
import svgr from "vite-plugin-svgr";
import path from 'path';

export default defineConfig({
  define: {
    'process': {
      env: {
        NODE_DEBUG: false
      }
    }
  },
  // ... другие конфигурации ...
  plugins: [
    svgr(),
    alias({
      entries: [
        { find: '@app', replacement: path.resolve(__dirname, 'src/app') },
        { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
        { find: '@widgets', replacement: path.resolve(__dirname, 'src/widgets') },
        { find: '@entities', replacement: path.resolve(__dirname, 'src/entities') },
        { find: '@features', replacement: path.resolve(__dirname, 'src/features') },
        { find: '@shared', replacement: path.resolve(__dirname, 'src/shared') },
      ],
    }),
  ],
});

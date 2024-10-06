import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import dts from 'vite-plugin-dts';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteTsconfigPaths(),
    dts({
      tsconfigPath: 'tsconfig.json',
      insertTypesEntry: true,
      outDir: 'dist/types',
      cleanVueFileName: true,
      staticImport: true,
    }),
    cssInjectedByJsPlugin(),
  ],
  server: {
    port: 3001
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    }
  }
})

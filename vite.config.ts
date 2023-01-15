import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/packages/main.ts'),
      name: 'ByteUi',
      fileName: format => `lib.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  esbuild: {
    jsx: 'preserve',
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
})

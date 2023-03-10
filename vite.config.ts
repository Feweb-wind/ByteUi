import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path';
import DefineOptions from 'unplugin-vue-define-options/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/]
    }),
    vueJsx(),
    DefineOptions()
  ],
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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/') // @代替src
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: '@import "./src/assets/styles/style.less";'
      }
    }
  }
})

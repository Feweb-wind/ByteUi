import { defineConfig } from "vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import DefineOptions from 'unplugin-vue-define-options/vite';
import path from "path";
// import Unocss from "../config/unocss";
// https://vitejs.dev/config/

export default defineConfig({
    plugins: [
        // 添加JSX插件
        vueJsx(),
        DefineOptions()
        // Unocss(),
    ],
    // 这里变更一下端口
    server: {
        port: 5555
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src/') // @代替src
        }
    },
});
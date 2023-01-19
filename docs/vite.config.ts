import { defineConfig } from "vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
// import Unocss from "../config/unocss";
// https://vitejs.dev/config/

export default defineConfig({
    plugins: [
        // 添加JSX插件
        vueJsx(),
        // Unocss(),
    ],
    // 这里变更一下端口
    server: {
        port: 5555
    }
});
import { AntDesignContainer } from '@vitepress-demo-preview/component';
import '@vitepress-demo-preview/component/dist/style.css';
// @ts-ignore
import DefaultTheme from 'vitepress/dist/client/theme-default/index.js';
import {App} from "vue";
// @ts-ignore
import ByteUI from "byte-ui-test";
import "byte-ui-test/dist/style.css";

console.log(AntDesignContainer)

export default {
    ...DefaultTheme,
    enhanceApp({ app }: { app: App }) {
        app.use(ByteUI)
        app.component('demo-preview', AntDesignContainer)
    }
}
import CodePreview from "../../../src/components/CodePreview/index.vue";
import hljsVuePlugin from '@highlightjs/vue-plugin';
import DefaultTheme from 'vitepress/theme';
import {App} from "vue";
import ByteUI from "byte-ui";

export default {
    ...DefaultTheme,
    enhanceApp({ app }: { app: App }) {
        app.use(ByteUI);
        app.use(hljsVuePlugin);
        app.component('CodePreview', CodePreview);
    }
}
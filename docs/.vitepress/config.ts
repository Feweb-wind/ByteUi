import { defineConfig } from 'vitepress';
// @ts-ignore
import { componentPreview, containerPreview } from '@vitepress-demo-preview/plugin';
import sidebar from "./config/sidebar";
import nav from "./config/nav"

export default defineConfig({
    markdown: {
        theme: {
            light: 'vitesse-light',
            dark: 'vitesse-dark'
        },
        lineNumbers: true,
        config(md) {
            md.use(componentPreview)
            md.use(containerPreview)
        }
    },
    themeConfig: {
        siteTitle: "ByteUI",
        logo: '/images/element-plus-logo.svg',
        nav,
        sidebar
    },

});
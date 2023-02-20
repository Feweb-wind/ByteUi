import { defineConfig } from 'vitepress';
import sidebar from "./config/sidebar";
import nav from "./config/nav";

export default defineConfig({
    markdown: {
        theme: {
            light: 'vitesse-light',
            dark: 'vitesse-dark'
        },
        lineNumbers: true,
    },
    locales: {
        root: {
            label: "Chinese",
            lang: "zh"
        },

    },
    themeConfig: {
        siteTitle: "ByteUI",
        nav,
        sidebar,
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2023-present Evan You'
        }
    },

});

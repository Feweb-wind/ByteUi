import { defineConfig } from 'vitepress';
// @ts-ignore
import { componentPreview, containerPreview } from '@vitepress-demo-preview/plugin';

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
        nav: [
            {text: '组件', link: '/components'},
        ],
        sidebar: {
            '/components/' : [
                {
                    text: 'Basic 基础组件',
                    items: [
                        {text: 'Button 按钮', link: '/components/button'},
                        {text: 'Border 边框', link: '/components/border'},
                    ]
                },
                {
                    text: 'Data 数据展示',
                    items: [
                        {text: 'Button 按钮', link: '/components/button'},
                        {text: 'Tag 标签', link: '/components/tag'},
                    ]
                },
                {
                    text: 'Navigation 导航',
                    items: [
                        {text: 'Button 按钮', link: '/components/button'},
                        {text: 'Border 边框', link: '/components/border'},
                    ]
                },
                {
                    text: 'Feedback 反馈组件',
                    items: [
                        {text: 'Button 按钮', link: '/components/button'},
                        {text: 'Border 边框', link: '/components/border'},
                    ]
                },
                {
                    text: 'Others 其他',
                    items: [
                        {text: 'Button 按钮', link: '/component/button'},
                        {text: 'Border 边框', link: '/component/border'},
                    ]
                }
            ],
        }
    },

});
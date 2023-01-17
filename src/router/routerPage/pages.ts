// @ts-ignore
export default [
    {
        path: '/',
        name: 'home',
        component: () => import("@/views/HomePage.vue"),
    },
    {
        path: '/components',
        name: 'components',
        component: () => import("@/views/ComponentsGuide.vue"),
        children: [
            {
                path: 'select',
                name: 'select 选择器',
                component: () => import("@/components/byte-select/doc/doc.md")
            },
            {
                path: 'tag',
                name: 'tag 标签',
                component: () => import("@/components/byte-tag/doc/doc.md")
            }
        ]
    }
]
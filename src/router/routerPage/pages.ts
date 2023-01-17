export default [
    {
        path: '/',
        name: 'home',
        component: () => import("@/App.vue")
    },
    {
        path: '/byte-select',
        name: 'byte-select',
        component: () => import("@/components/byte-select/byte-select.vue"),
        children: [
            {
                path: '/',
                name: 'Select',
                component: () => import("@/components/byte-select/doc/doc.md"),
            }
        ]
    },
]
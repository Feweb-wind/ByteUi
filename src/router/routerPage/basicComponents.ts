import {RouteRecordRaw} from "vue-router";

const basicComponents: RouteRecordRaw[] = [
    {
        path: 'button',
        name: 'Button 按钮',
        component: () => import('@/components/byte-button.vue')
    },
    {
        path: 'border',
        name: 'Border 边框',
        component: () => import('@/components/byte-button.vue')
    },
    {
        path: 'container',
        name: 'Container 布局容器',
        component: () => import('@/components/byte-button.vue')
    },
    {
        path: 'icon',
        name: 'Icon 图标',
        component: () => import('@/components/byte-button.vue')
    },
    {
        path: 'layout',
        name: 'Layout 布局',
        component: () => import('@/components/byte-button.vue')
    },
    {
        path: 'link',
        name: 'Link 链接',
        component: () => import('@/components/byte-button.vue')
    },
    {
        path: 'scrollbar',
        name: 'Scrollbar 滚动条',
        component: () => import('@/components/byte-button.vue')
    },
    {
        path: 'space',
        name: 'Space 间距',
        component: () => import('@/components/byte-button.vue')
    },
    {
        path: 'typography',
        name: 'Typography 排版',
        component: () => import('@/components/byte-button.vue')
    }
];

export default basicComponents;
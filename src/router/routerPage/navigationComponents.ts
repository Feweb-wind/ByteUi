import {RouteRecordRaw} from "vue-router";

const navigationComponents: RouteRecordRaw[] = [
    {
        path: 'affix',
        name: 'Affix 固钉',
        component: () => import('@/components/byte-tag/doc/doc.md')
    },
    {
        path: 'backtop',
        name: 'Backtop 回到顶部',
        component: () => import('@/components/byte-tag/doc/doc.md')
    },
    {
        path: 'breadcrumb',
        name: 'Breadcrumb 面包屑',
        component: () => import('@/components/byte-tag/doc/doc.md')
    },
    {
        path: 'dropdown',
        name: 'Dropdown 下拉菜单',
        component: () => import('@/components/byte-tag/doc/doc.md')
    },
    {
        path: 'menu',
        name: 'Menu 菜单',
        component: () => import('@/components/byte-tag/doc/doc.md')
    },
    {
        path: 'pageheader',
        name: 'Page Header 页头',
        component: () => import('@/components/byte-tag/doc/doc.md')
    },
    {
        path: 'steps',
        name: 'Steps 步骤条',
        component: () => import('@/components/byte-tag/doc/doc.md')
    },
    {
        path: 'tabs',
        name: 'Tabs 标签页',
        component: () => import('@/components/byte-tag/doc/doc.md')
    }
];

export default navigationComponents;
import {RouteRecordRaw} from "vue-router";

const navigationComponents: RouteRecordRaw[] = [
    {
        path: 'affix',
        name: 'Affix 固钉',// @ts-ignore
        component: () => import('@/components/byte-tag/doc/doc.md')
    },
    {
        path: 'backtop',
        name: 'Backtop 回到顶部',// @ts-ignore
        component: () => import('@/components/byte-tag/doc/doc.md')
    },
    {
        path: 'breadcrumb',
        name: 'Breadcrumb 面包屑',// @ts-ignore
        component: () => import('@/components/byte-tag/doc/doc.md')
    },
    {
        path: 'dropdown',
        name: 'Dropdown 下拉菜单',// @ts-ignore
        component: () => import('@/components/byte-tag/doc/doc.md')
    },
    {
        path: 'menu',
        name: 'Menu 菜单',// @ts-ignore
        component: () => import('@/components/byte-tag/doc/doc.md')
    },
    {
        path: 'pageheader',
        name: 'Page Header 页头',// @ts-ignore
        component: () => import('@/components/byte-tag/doc/doc.md')
    },
    {
        path: 'steps',
        name: 'Steps 步骤条',// @ts-ignore
        component: () => import('@/components/byte-tag/doc/doc.md')
    },
    {
        path: 'tabs',
        name: 'Tabs 标签页',
        // @ts-ignore
        component: () => import('@/components/byte-tag/doc/doc.md')
    }
];

export default navigationComponents;
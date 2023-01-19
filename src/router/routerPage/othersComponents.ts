import {RouteRecordRaw} from "vue-router";

const othersComponents: RouteRecordRaw[] = [
    {
        path: 'divider',
        name: 'Divider 分割线',// @ts-ignore
        component: () => import('@/components/byte-divider/doc/doc.md')
    }
];

export default othersComponents;
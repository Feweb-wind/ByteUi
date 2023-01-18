import {RouteRecordRaw} from "vue-router";

const dataComponents: RouteRecordRaw[] = [
    {
        path: 'tag',
        name: 'Tag 标签',
        component: () => import('@/components/byte-tag/doc/doc.md')
    }
];

export default dataComponents;
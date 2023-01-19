import {RouteRecordRaw} from "vue-router";

const dataComponents: RouteRecordRaw[] = [
    {
        path: 'tag',
        name: 'Tag 标签',
        // @ts-ignore
        component: () => import('@/components/byte-tag/byte-tag.vue')
    }
];

export default dataComponents;
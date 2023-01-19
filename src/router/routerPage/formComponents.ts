import {RouteRecordRaw} from "vue-router";

const formComponents: RouteRecordRaw[] = [
    {
        path: 'autocomplete',
        name: 'Autocomplete 自动补全输入框',
        // @ts-ignore
        component: () => import('@/components/byte-button.vue')
    },
    {
        path: 'cascader',
        name: 'Cascader 级联选择器',
        // @ts-ignore
        component: () => import('@/components/byte-button.vue')
    },
    {
        path: 'checkbox',
        name: 'Checkbox 多选框',
        // @ts-ignore
        component: () => import('@/components/byte-button.vue')
    },
    {
        path: 'colorpicker',
        name: 'Color Picker 取色器',
        // @ts-ignore
        component: () => import('@/components/byte-button.vue')
    },
    {
        path: 'datepicker',
        name: 'Date Picker 日期选择器',
        // @ts-ignore
        component: () => import('@/components/byte-button.vue')
    },
    {
        path: 'datetimepicker',
        name: 'DateTime Picker 日期时间选择器',
        // @ts-ignore
        component: () => import('@/components/byte-button.vue')
    },
    {
        path: 'scrollbar',
        name: 'Scrollbar 滚动条',
        // @ts-ignore
        component: () => import('@/components/byte-button.vue')
    },
    {
        path: 'form',
        name: 'Form 表单',
        // @ts-ignore
        component: () => import('@/components/byte-button.vue')
    },
    {
        path: 'input',
        name: 'Input 输入框',
        // @ts-ignore
        component: () => import('@/components/byte-button.vue')
    },
    {
        path: 'inputnumber',
        name: 'Input Number 数字输入框',
        // @ts-ignore
        component: () => import('@/components/byte-button.vue')
    },
    {
        path: 'radio',
        name: 'Radio 单选框',
        // @ts-ignore
        component: () => import('@/components/byte-button.vue')
    },
    {
        path: 'rate',
        name: 'Rate 评分',
        // @ts-ignore
        component: () => import('@/components/byte-button.vue')
    },
    {
        path: 'select',
        name: 'Select 选择器',
        // @ts-ignore
        component: () => import('@/components/byte-select/doc/doc.md')
    },
    {
        path: 'virtualizedselect',
        name: 'Virtualized Select 虚拟化选择器',
        // @ts-ignore
        component: () => import('@/components/byte-button.vue')
    },
    {
        path: 'slider',
        name: 'Slider 滑块',
        // @ts-ignore
        component: () => import('@/components/byte-button.vue')
    },
    {
        path: 'switch',
        name: 'Switch 开关',
        // @ts-ignore
        component: () => import('@/components/byte-button.vue')
    },
    {
        path: 'timepicker',
        name: 'Time Picker 时间选择器',
        // @ts-ignore
        component: () => import('@/components/byte-button.vue')
    },
    {
        path: 'timeselect',
        name: 'Time Select 时间选择',
        // @ts-ignore
        component: () => import('@/components/byte-button.vue')
    },
    {
        path: 'transfer',
        name: 'Transfer 穿梭框',
        // @ts-ignore
        component: () => import('@/components/byte-button.vue')
    },
    {
        path: 'upload',
        name: 'Upload 上传',
        // @ts-ignore
        component: () => import('@/components/byte-button.vue')
    }
];

export default formComponents;
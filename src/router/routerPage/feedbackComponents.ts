import {RouteRecordRaw} from "vue-router";

const feedbackComponents: RouteRecordRaw[] = [
    {
        path: 'alert',
        name: 'Alert 提示',
        component: () => import('@/components/byte-tag/doc/doc.md')
    },
    {
        path: 'dialog',
        name: 'Dialog 对话框',
        component: () => import('@/components/byte-tag/doc/doc.md')
    },
    {
        path: 'drawer',
        name: 'Drawer 抽屉',
        component: () => import('@/components/byte-tag/doc/doc.md')
    },
    {
        path: 'loading',
        name: 'Loading 加载',
        component: () => import('@/components/byte-tag/doc/doc.md')
    },
    {
        path: 'message',
        name: 'Message 消息提示',
        component: () => import('@/components/byte-tag/doc/doc.md')
    },
    {
        path: 'messagebox',
        name: 'Message Box 消息弹出框',
        component: () => import('@/components/byte-tag/doc/doc.md')
    },
    {
        path: 'notification',
        name: 'Notification 通知',
        component: () => import('@/components/byte-tag/doc/doc.md')
    },
    {
        path: 'popconfirm',
        name: 'Popconfirm 气泡确认框',
        component: () => import('@/components/byte-tag/doc/doc.md')
    },
    {
        path: 'popover',
        name: 'Popover 弹出框',
        component: () => import('@/components/byte-tag/doc/doc.md')
    },
    {
        path: 'tooltip',
        name: 'Tooltip 文字提示',
        component: () => import('@/components/byte-tag/doc/doc.md')
    }
];

export default feedbackComponents;
// @ts-nocheck
import {
    Fragment,
    computed,
    defineComponent,
    getCurrentInstance,
    h,
    onBeforeMount,
    onBeforeUnmount,
    onMounted,
    ref,
} from 'vue'
import defaultProps from './default'
let columnIdSeed = 1
export interface Column {
    label: String,
    property: String,
    renderCell: Function
}
export default defineComponent({
    name: 'ElTableColumn',
    props: defaultProps,
    setup(props, { slots }) {
        const instance = getCurrentInstance()
        const parent: TableInstance<7> = instance?.parent as TableInstance<7>
        let column: Column = {
            label: props.label,//列表头显示名称
            property: props.prop,//列用到的字段名称
            renderCell: null//渲染用的方法
        };
        parent.store.commit("insertColumn", column)
        return {
            instance,
            parent
        }

    },
    render() {
    },
})

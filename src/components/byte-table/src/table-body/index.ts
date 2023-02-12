import {
    defineComponent,
    getCurrentInstance,
    h,
    watch,
} from 'vue'
import { TableInstance } from '../store'
import useRender from './render'
import defaultProps from './default'
import { TableBodyProps } from './default'
import type { VNode } from 'vue'
export default defineComponent({
    name: 'ElTableBody',
    props: defaultProps,
    setup(props) {
        const { rowRender } = useRender(props)
        const instance = getCurrentInstance()
        return {
            instance,
            rowRender
        }
    },
    render() {
        const { rowRender, instance } = this
        const parent: TableInstance<7> = instance?.parent as TableInstance<7>
        const data: Array<Object> = parent.store.getStates().data as Array<Object>
        return h('tbody', {}, data.map((currentValue, index) => {
            return rowRender(currentValue, index)
        }))
    },
})

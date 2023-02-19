import { ref, defineComponent, computed, getCurrentInstance, h } from 'vue'
import { TableInstance } from '../store'
import defaultProps from './default'
import { Column } from '../table-column'
import './style.less'
export default defineComponent({
    name: 'ElTableHeader',
    props: defaultProps,
    setup(props, ctx) {
        const instance = getCurrentInstance()
        const parent: TableInstance<7> = instance?.parent as TableInstance<7>
        const column = computed(() => {
            return parent.store.getStates().columns
        })
        return {
            column
        }
    },
    render() {
        return h('thead', { class: 'byte-table-thead' }, h('tr', { class: 'byte-table-tr' }, this.column.map((currentValue) => {
            return h('th', { class: 'byte-table-th byte-table-cell' }, currentValue.label.toString() || 'null')
        })))
    }
})
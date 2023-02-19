import { h } from 'vue'
import { TableBodyProps } from './default'
import defaultProps from './default'
import useStyle from './style-helper'

const useRender = function (props: TableBodyProps) {
    const { getRowClass } = useStyle(props)
    const rowRender = function (nodeData: Object, rowIndex: number) {
        const key = Object.keys(nodeData)
        const trChild: Array<any> = []
        key.forEach(item => {
            let valueKey: keyof typeof nodeData = item as keyof typeof nodeData
            trChild.push(h('td', { class: 'byte-table-cell byte-table-col' }, nodeData[valueKey].toString()))
        })
        return h('tr', { class: ['byte-table-row'].concat(getRowClass(nodeData, rowIndex)) }, trChild)
    }
    return {
        rowRender,
    }
}
export default useRender
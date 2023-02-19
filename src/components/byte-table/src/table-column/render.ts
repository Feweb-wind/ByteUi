import { ref } from 'vue'
import { TableColumCtx } from './default'
import { parseWidth, parseMinWidth } from '../util'
function useRender<T>(props: TableColumCtx) {
    const realWidth = ref(parseWidth(props.width))
    const realMinWidth = ref(parseMinWidth(props.minWidth))
    const setColumnWidth = (column: TableColumCtx) => {
        if (realWidth.value) column.width = realWidth.value
        if (realMinWidth.value) {
            column.minWidth = realMinWidth.value
        }
        if (!realWidth.value && realMinWidth.value) {
        }
        if (!column.minWidth) {
            column.minWidth = 80
        }
        column.realWidth = Number(
            column.width === undefined ? column.minWidth : column.width
        )
        return column
    }
    return {
        setColumnWidth
    }
}
export default useRender
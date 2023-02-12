import { getCurrentInstance } from "vue"
import { TableBodyProps } from "./default"
function useStyle<T>(props: TableBodyProps) {
    const getRowClass = function (row: T, rowIndex: number) {
        const parent = getCurrentInstance()?.parent
        const classes = []
        if (props.stripe === true && rowIndex % 2 === 1) {
            classes.push('stripe')
        }
        //row-class-name
        const rowClassName = parent?.props.rowClassName
        if (typeof rowClassName === 'string') {
            classes.push(rowClassName)
        } else if (typeof rowClassName === 'function') {
            classes.push(
                rowClassName.call(null, {
                    row,
                    rowIndex
                })
            )
        }
        return classes
    }
    return {
        getRowClass
    }
}
export default useStyle
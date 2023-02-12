import { TableBodyProps } from "./default"
function useStyle(props: TableBodyProps) {
    const getRowClass = function (rowIndex: number) {
        const classes = []
        if (props.stripe === true && rowIndex % 2 === 1) {
            classes.push('stripe')
        }
        return classes
    }
    return {
        getRowClass
    }
}
export default useStyle
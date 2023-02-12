import { helpStore } from '../store/index'
export interface TableBodyProps {
    store: helpStore['return'],
    stripe: Boolean
}
const defaultProps = {
    store: {
        require: true,
        type: Object
    },
    stripe: {
        type: Boolean,
        default: false
    }
}
export default defaultProps
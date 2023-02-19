export interface TableColumCtx {
    prop: String;
    label: String;
    width: number | string
    minWidth: number | string
    realWidth: number | string
}
const defaultProps = {
    type: {
        type: String,
    },
    prop: String,
    label: String,
    width: {
        type: [Number, String],
        default: ''
    },
    minWidth: {
        type: [Number, String],
        default: ''
    }
}
export default defaultProps
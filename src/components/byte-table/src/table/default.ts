export const tableProps = {
    data: {
        type: Array,
        required: true
    },
    stripe: {
        type: Boolean,
        default: false
    },
    border: {
        type: Boolean,
        default: false
    },
    rowClassName: [String, Function],
    //布局方式
    tableLayout: {
        type: String,
        default: 'fixed',
        validator(value: string) {
            // The value must match one of these strings
            return ['fixed', 'auto'].includes(value)
        }
    },
    showHeader: {
        type: Boolean,
        default: true
    }
}
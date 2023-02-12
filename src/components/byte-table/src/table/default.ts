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
    rowClassName: [String, Function]
}
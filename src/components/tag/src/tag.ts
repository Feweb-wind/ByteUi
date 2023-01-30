import {ExtractPropTypes} from "vue";

export const tagProps = {
    type: {
        type: String,
        default: ''
    },
    closable: Boolean,
    disableTransitions: Boolean,
    hit: Boolean,
    color: {
        type: String,
        default: '',
    },
    size: {
        type: String,
        default: "default"
    },
    effect: {
        type: String,
        default: "light"
    },
    round: Boolean
}
export type TagProps = ExtractPropTypes<typeof tagProps>

export const tagEmits = {
    close: (evt: MouseEvent) => evt instanceof MouseEvent,
    click: (evt: MouseEvent) => evt instanceof MouseEvent,
}
export type TagEmits = typeof tagEmits
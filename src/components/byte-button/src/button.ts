import type {Component, PropType} from "vue";
const definePropType = <T>(val: any): PropType<T> => val;
const iconPropType = definePropType<string | Component>([
    String,
    Object,
    Function,
]);

export const buttonProps = {
    size: {
        type: String,
        value: ['large', 'default', 'small'],
        default: 'default'
    },
    type: {
        type: String,
        value: ['primary', 'success', 'warning', 'danger', 'info'],
        default: undefined,
    },
    //plain: 是否为朴素按钮
    plain: Boolean,
    text: Boolean,
    bg: Boolean,
    link: Boolean,
    round: Boolean,
    circle: Boolean,
    loading: Boolean,
    loadingIcon: {
        // @ts-ignore
        type: iconPropType,
        default: "Loading"
    },
    disabled: Boolean,
    icon: {
        type: iconPropType,
        default: undefined
    },
    autoFocus: Boolean,
    nativeType: {
        type: String,
        value: ['button', 'submit', 'reset'],
        default: 'button'
    },
    autoInsertSpace: Boolean,
    color: String,
    dark: Boolean
};

export const buttonEmits = {
    click: (evt: MouseEvent) => evt instanceof MouseEvent,
}
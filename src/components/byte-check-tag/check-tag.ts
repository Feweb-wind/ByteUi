import type { ExtractPropTypes } from 'vue'

export const checkTagProps = {
    checked: {
        type: Boolean,
        default: false,
    },
};
export type CheckTagProps = ExtractPropTypes<typeof checkTagProps>

export const checkTagEmits = {
    // 'update:checked': (value: boolean) => isBoolean(value)
    'update:checked': (value: boolean) => value,
    'change': (value: boolean) => value
}
export type CheckTagEmits = typeof checkTagEmits

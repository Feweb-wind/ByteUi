import type { ExtractPropTypes } from 'vue';

export const dividerProps = {
    direction: {
        type: String,
        values: ['horizontal', 'vertical'],
        default: 'horizontal',
    },
    contentPosition: {
        type: String,
        values: ['left', 'center', 'right'],
        default: 'center',
    },
    borderStyle: {
        type: String,
        default: 'solid',
    },
}
export type DividerProps = ExtractPropTypes<typeof dividerProps>
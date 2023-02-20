import type { ExtractPropTypes, Component, PropType } from 'vue'
import { Star, StarFilled } from '@element-plus/icons-vue'
export const definePropType = <T>(val: any): PropType<T> => val
export const iconPropType = definePropType<string | Component>([
    String,
    Object,
    Function,
])
export const rateProps = {
    modelValue: {
        type: Number,
        default: 0,
    },
    max: {
        type: Number,
        default: 5
    },
    disabled: {
        type: Boolean,
        default: false
    },
    allowHalf: {
        type: Boolean,
        default: false
    },
    lowThreshold: {
        type: Number,
        default: 2
    },
    highThreshold: {
        type: Number,
        default: 4
    },
    color: {//三个分段的颜色
        type: Array<String>,
        default: () => ['#F7BA2A', '#F7BA2A', '#F7BA2A']
    },
    voidColor: {//未选中的颜色
        type: String,
        default: '#C6D1DE'
    },
    disabledVoidColor: {//只读时未选中的颜色
        type: String,
        default: '#EFF2F7'
    },
    icons: {//传入的图标，默认为starfilled
        type: Array<Component>,
        default: [StarFilled, StarFilled, StarFilled]
    },
    voidIcon: {//未被选中的图标
        type: iconPropType,
        default: Star
    },
    disabledVoidIcon: {//禁用状态的未选择图标
        type: iconPropType,
        default: StarFilled
    },
    showText: {
        type: Boolean,
        default: false
    },
    showScore: {
        type: Boolean,
        default: false
    },
    textColor: {
        type: String,
        default: '#1F2D3D'
    },
    texts: {
        type: Array<String>, 
        default: () => ['极差', '失望', '一般', '满意', '惊喜']
    },
    scoreTemplate: {
        type: String,
        default: '{value}'
    }
}
export type RateProps = ExtractPropTypes<typeof rateProps>

export const rateEmits = {
    'update:modelValue': (newvalue: Number) => newvalue
}
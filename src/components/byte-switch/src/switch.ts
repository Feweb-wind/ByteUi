export const switchProps = {
    modelValue: Boolean,
    disabled: {//是否禁用
        type: Boolean,
        default: false
    },
    loading: {
        type: Boolean,
        default: false
    },
    activeColor: {// 开关on 时的颜色 
        type: String,
        default: '#409eff'
    },
    inactiveColor: {// 开关off 时的颜色 
        type: String,
        default: '#dcdfe6'
    },
    //文字描述
    activeText: String,
    inactiveText: String,
    //文字描述是否显示在开关里
    inlinePrompt: {
        type: Boolean,
        default: false
    }

}
export const switchEmits = {
    'update:modelValue': (newvalue: Boolean) => newvalue
}
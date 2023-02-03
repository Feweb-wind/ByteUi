import {reactive} from "vue";

export function useSelectStates(props: any) {
    return reactive({
        // options: 所有的选项
        options: new Map(),
        cachedOptions: new Map(),
        createdLabel: null,
        // 生成即被选中
        createdSelected: false,
        // 当前选中的选项  多选 or 单选
        selected: props.multiple ? [] : ({} as any),
        inputLength: 20,
        inputWidth: 0,
        optionsCount: 0,
        filteredOptionsCount: 0,
        visible: false,
        softFocus: false,
        selectedLabel: '',
        hoverIndex: -1,
        query: '',
        previousQuery: null,
        inputHovering: false,
        cachedPlaceHolder: '',
        // 输入框中显示的内容
        currentPlaceholder: "Placeholder",
        menuVisibleOnFocus: false,
        isOnComposition: false,
        isSilentBlur: false,
        // 前缀icon宽度
        prefixWidth: 11,
        tagInMultiLine: false,
        mouseEnter: false,
    })
}
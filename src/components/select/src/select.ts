import {buildProps} from "@byte-ui/utils";
import {Component, PropType} from "vue";
import {CircleClose, ArrowDown} from "@element-plus/icons-vue"

const definePropType = <T>(val: any): PropType<T> => val;
const iconPropType = definePropType<string | Component>([
    String,
    Object,
    Function,
]);
export const selectProps = buildProps({
    // 是否多选
    multiple: Boolean,
    // 是否禁用
    disabled: Boolean,
    // 作为 value 唯一标识的键名，绑定值为对象类型时必填
    valueKey: {
        type: String,
        default: "value"
    },
    size: {
        type: String,
        // value: ["large", "default", "small"],
        // default: "default"
        value: ['medium', 'small', 'mini'],
        default: 'medium'
    },
    // 是否可清空选项
    clearable: Boolean,
    // 多选时是否将选中值按文字的形式展示
    collapseTags: Boolean,
    // 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此属性，collapse-tags属性必须设定为 true
    collapseTagsTooltip: Boolean,
    multipleLimit: {
        type: Number,
        default: 0
    },
    name: String,
    effect: {
        type: String,
        value: ['dark', 'light'],
        default: 'light'
    },
    autoComplete: {
        type: String,
        default: 'off'
    },
    placeholder: {
        type: String,
        default: "Select"
    },
    //Select 组件是否可筛选
    filterable: Boolean,
    // 是否允许用户创建新条目， 只有当 filterable 设置为 true 时才会生效。
    allowCreate: Boolean,
    filterMethod: Function,
    // 其中的选项是否从服务器远程加载
    remote: Boolean,
    // 自定义远程搜索方法
    remoteMethod: Function,
    // 远程搜索方法显示后缀图标
    remoteShowSuffix: Boolean,
    // 是否正在从远程获取数据
    loading: Boolean,
    loadingText: {
        type: String,
        default: "Loading"
    },
    noMathText: {
        type: String,
        default: "No data"
    },
    popperClass: String,
    // 当 multiple 和 filter被设置为 true 时，是否在选中一个选项后保留当前的搜索关键词
    reserveKeyword: {
        type: Boolean,
        default: true
    },
    // 是否在输入框按下回车时，选择第一个匹配项。 需配合 filterable 或 remote 使用
    defaultFirstOption: Boolean,
    teleported: {
        type: Boolean,
        default: true
    },
    // 当下拉选择器未被激活并且persistent设置为false，选择器会被删除。
    persistent: {
        type: Boolean,
        default: true
    },
    // 对于不可过滤的 Select 组件，此属性决定是否在输入框获得焦点后自动弹出选项菜单
    automaticDropdown: Boolean,
    // 自定义清除图标
    clearIcon: {
        type: iconPropType,
        default: CircleClose
    },
    fitInputWidth: Boolean,
    suffixIcon: {
        type: iconPropType,
        default: ArrowDown
    },
    tagType: {
        type: String,
        value: ['success', 'info', 'warning', 'danger'],
        default: 'info'
    },
    validateEvent: {
        type: Boolean,
        default: true
    },
    placement: {
        type: String,
        default: 'bottom-start'
    }
});
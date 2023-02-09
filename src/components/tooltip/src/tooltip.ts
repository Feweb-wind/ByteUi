export const tooltipProps = {
    effect: {
        type: String,
        value: ["dark", "light"],
        default: "dark"
    },
    content: String,
    rawContent: {
        type: Boolean,
        default: false
    },
    placement: {
        type: String,
        value: ["top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end", "left", "left-start", "left-end", "right", "right-start", "right-end"],
        default: "top"
    },
    visible: {
        type: Boolean,
        default: false
    },
    // Tooltip 组件是否禁用
    disabled:  Boolean,
    // 出现位置的偏移量
    offset: {
        type: Number,
        default: 0
    },
    // 在触发后多久显示内容，单位毫秒
    showAfter: {
        type: Number,
        default: 0
    },
    showArrow: {
        type: Boolean,
        default: true
    },
    // 延迟关闭，单位毫秒
    hideAfter: {
        type: Number,
        default: 200
    },
    // tooltip 出现后自动隐藏延时，单位毫秒
    autoClose: {
        type: Number,
        default: 0
    },
    // 是否手动控制 Tooltip。 如果设置为 true，则 mouseenter 和 mouseleave 将不会生效
    manual: Boolean,
    // 鼠标是否可进入到 tooltip 中
    enterable: {
        type: Boolean,
        default: true
    },
    // 是否使用 teleport。设置成 true则会被追加到 append-to 的位置
    teleported: {
        type: Boolean,
        default: true
    },
    // 是否启用虚拟触发器 https://popper.js.org/docs/v2/virtual-elements/
    virtualTriggering: {
        type: Boolean,
        default: true
    },
    trigger: {
        type: String,
        value: ["hover", "click", "focus", "contextmenu"],
        default: "hover"
    }
};

// 判断鼠标是否落在一个块级元素内部
export function checkIn(obj: HTMLElement) {
    let x = Number(window.event.clientX) // 鼠标相对屏幕横坐标
    let y = Number(window.event.clientY) // 鼠标相对屏幕纵坐标

    let div_x = Number(obj.getBoundingClientRect().left) // obj相对屏幕的横坐标
    let div_x_width = Number(
        obj.getBoundingClientRect().left + obj.clientWidth
    ) // obj相对屏幕的横坐标+width

    let div_y = Number(obj.getBoundingClientRect().top) // obj相对屏幕的纵坐标
    let div_y_height = Number(
        obj.getBoundingClientRect().top + obj.clientHeight
    ) // obj相对屏幕的纵坐标+height

    if (x > div_x && x < div_x_width && y > div_y && y < div_y_height) {
        return true
    } else {
        return false
    }
}

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
        default: true
    },
    disabled:  Boolean,
    offset: {
        type: Number,
        default: 0
    },
    showAfter: {
        type: Number,
        default: 0
    },
    showArrow: {
        type: Boolean,
        default: true
    },
    hideAfter: {
        type: Number,
        default: 200
    },
    autoClose: {
        type: Number,
        default: 0
    },
    manual: Boolean,
    trigger: {
        type: String,
        value: ["hover", "click", "focus", "contextmenu"],
        default: "hover"
    }
};
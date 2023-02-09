const componentSizes = ['', 'default', 'small', 'large'] as const

type ComponentSize = typeof componentSizes[number]

const componentSizeMap = {
    large: 40,
    default: 32,
    small: 24,
} as const


export const getComponentSize = (size?: ComponentSize) => {
    return componentSizeMap[size || 'default']
}
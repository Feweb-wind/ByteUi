import type { CSSProperties, ExtractPropTypes, PropType, InjectionKey } from 'vue'

// 预留滑轨位置
export const GAP = 4 // top 2 + bottom 2 of bar instance

// 根据朝向设置参数
export const BAR_MAP = {
  vertical: {
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    key: 'vertical',
    axis: 'Y',
    client: 'clientY',
    direction: 'top',
  },
  horizontal: {
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    direction: 'left',
  },
} as const


const thumbProps = {
  vertical: Boolean,
  size: String,
  move: Number,
  ratio: {
    type: Number,
    required: true,
  },
  always: Boolean,
} as const

export type ThumbProps = ExtractPropTypes<typeof thumbProps>

// 动态滑动
export const renderThumbStyle = ({
  move,
  size,
  bar,
}: Pick<ThumbProps, 'move' | 'size'> & {
  bar: typeof BAR_MAP[keyof typeof BAR_MAP]
}): CSSProperties => ({
  [bar.size]: size,
  transform: `translate${bar.axis}(${move}%)`,
})


// 判断
export { isBoolean, isNumber, isObject, useEventListener, useResizeObserver, isClient } from '@vueuse/core';
// const isClient = typeof window !== "undefined";

// 获取唯一的key
export interface ScrollbarContext {
  scrollbarElement: HTMLDivElement
  wrapElement: HTMLDivElement
}

export const scrollbarContextKey: InjectionKey<ScrollbarContext> = Symbol(
  'scrollbarContextKey'
)

// 将val转为PropType类型
export const definePropType = <T>(val: any): PropType<T> => val


// 获取组件实例样式
import type Bar from './byte-bar.vue'
export type BarInstance = InstanceType<typeof Bar>

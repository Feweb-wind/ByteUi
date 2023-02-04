import type {  PropType, InjectionKey } from 'vue'

// 判断
export { isBoolean, isNumber, isObject, useEventListener, useResizeObserver, isClient } from '@vueuse/core';
// const isClient = typeof window !== "undefined";

// 预留滑轨位置
export const GAP = 4 // top 2 + bottom 2 of bar instance

// 获取唯一的key，为
export interface ScrollbarContext {
  scrollbarElement: HTMLDivElement
  wrapElement: HTMLDivElement
}
export const scrollbarContextKey: InjectionKey<ScrollbarContext> = Symbol(
  'scrollbarContextKey'
)

// 将val转为PropType<T>类型
export const definePropType = <T>(val: any): PropType<T> => val

// 获取组件实例样式
import type Bar from './bar.vue'
export type BarInstance = InstanceType<typeof Bar>

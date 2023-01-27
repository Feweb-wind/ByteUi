import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { Instance } from '@popperjs/core'

// type => 用来描述对象或函数的类型 => 给类型起别名
// DOMRect   =>   https://developer.mozilla.org/zh-CN/docs/Web/API/DOMRect
export type Measurable = {
    getBoundingClientRect: () => DOMRect
}

/**
 * triggerRef indicates the element that triggers popper
 * contentRef indicates the element of popper content
 * referenceRef indicates the element that popper content relative with
 */
export type BytePopperInjectionContext = {
    triggerRef: Ref<Measurable | undefined>
    contentRef: Ref<HTMLElement | undefined>
    popperInstanceRef: Ref<Instance | undefined>
    referenceRef: Ref<Measurable | undefined>
    role: ComputedRef<string>
}

export type BytePopperContentInjectionContext = {
    arrowRef: Ref<HTMLElement | undefined>
    arrowOffset: Ref<number | undefined>
}

// 用InjectionKey来定义类型，确保父传出去的值和子接收到的值类型是一样的
// 使用InjectionKey之后，provide和inject就不用字符串来定义名称了，要用定义好的InjectionKey
export const POPPER_INJECTION_KEY: InjectionKey<BytePopperInjectionContext> =
    Symbol('popper')

export const POPPER_CONTENT_INJECTION_KEY: InjectionKey<BytePopperContentInjectionContext> =
    Symbol('popperContent')

//@ts-nocheck
import type {Ref} from 'vue';
import {computed, getCurrentInstance, inject, toRaw, unref, watch} from 'vue';
import {get} from 'lodash-unified';
import type {QueryChangeCtx} from './token'
import {selectGroupKey, selectKey} from './token'

// 转义 RegExp 特殊字符
const escapeStringRegexp = (string = '') =>
    string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
        .replace(/-/g, '\\x2d')

export function useOption(props, states) {
    // inject
    const select = inject(selectKey)
    const selectGroup = inject(selectGroupKey, {disabled: false})

    // computed 判断props中的value变量类型是否为Object
    const isObject = computed(() => {
        return (
            Object.prototype.toString.call(props.value).toLowerCase() ===
            '[object object]'
        )
    })

    const itemSelected = computed(() => {
        // 单选
        if (!select.props.multiple) {
            return isEqual(props.value, select.props.modelValue)
        }
        // 多选
        else {
            return contains(select.props.modelValue as unknown[], props.value)
        }
    })

    const limitReached = computed(() => {
        if (select.props.multiple) {
            const modelValue = (select.props.modelValue || []) as unknown[]
            return (
                !itemSelected.value &&
                modelValue.length >= select.props.multipleLimit &&
                select.props.multipleLimit > 0
            )
        } else {
            return false
        }
    })

    const currentLabel = computed(() => {
        return props.label || (isObject.value ? '' : props.value)
    })

    const currentValue = computed(() => {
        return props.value || props.label || ''
    })

    const isDisabled = computed(() => {
        // return props.disabled || states.groupDisabled || limitReached.value
        return props.disabled || states.groupDisabled || limitReached.value
    })

    const instance = getCurrentInstance()

    const contains = (arr = [], target) => {
        // props.value是基本数据类型
        if (!isObject.value) {
            return arr && arr.includes(target)
        } else {
            const valueKey = select.props.valueKey
            return (
                arr &&
                arr.some((item) => {
                    return toRaw(get(item, valueKey)) === get(target, valueKey)
                })
            )
        }
    }

    const isEqual = (a: unknown, b: unknown) => {
        if (!isObject.value) {
            return a === b
        } else {
            const {valueKey} = select.props
            return get(a, valueKey) === get(b, valueKey)
        }
    }

    const hoverItem = () => {
        // 未被禁用的前提下  更新hoverIndex
        // hoverIndex、optionsArray 在 select 层面
        if (!props.disabled && !selectGroup.disabled) {
            select.hoverIndex = select.optionsArray.indexOf(instance.proxy)
        }
    }

    watch(
        () => currentLabel.value,
        () => {
            if (!props.created && !select.props.remote) select.setSelected()
        }
    )

    watch(
        () => props.value,
        (val, oldVal) => {
            const {remote, valueKey} = select.props

            if (!Object.is(val, oldVal)) {
                select.onOptionDestroy(oldVal, instance.proxy)
                select.onOptionCreate(instance.proxy)
            }

            if (!props.created && !remote) {
                if (
                    valueKey &&
                    typeof val === 'object' &&
                    typeof oldVal === 'object' &&
                    val[valueKey] === oldVal[valueKey]
                ) {
                    return
                }
                select.setSelected()
            }
        }
    )

    watch(
        () => selectGroup.disabled,
        () => {
            states.groupDisabled = selectGroup.disabled
        },
        {immediate: true}
    )

    // const {queryChange} = toRaw(select)
    // watch(queryChange, (changes: Ref<QueryChangeCtx>) => {
    //     const {query} = unref(changes)
    //
    //     const regexp = new RegExp(escapeStringRegexp(query), 'i')
    //     states.visible = regexp.test(currentLabel.value) || props.created
    //     if (!states.visible) {
    //         select.filteredOptionsCount--
    //     }
    // })

    return {
        select,
        currentLabel,
        currentValue,
        itemSelected,
        isDisabled,
        hoverItem,
    }
}

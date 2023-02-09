// @ts-nocheck
import {ComponentPublicInstance, computed, nextTick, reactive, ref, shallowRef, toRaw, triggerRef, watch} from "vue";
import {isFunction, isObject, isString, toRawType} from "@vue/shared";
import {isClient, isNumber} from '@vueuse/core';
import type ByteTooltip from "@byte-ui/components/tooltip";
import {QueryChangeCtx, SelectOptionProxy} from "@/components/select/src/token";
import {debounce as lodashDebounce, get, isEqual} from 'lodash-unified';
import {useSize} from "@byte-ui/hooks";
import {getComponentSize, scrollIntoView} from "@byte-ui/utils";
import {CHANGE_EVENT, EVENT_CODE, UPDATE_MODEL_EVENT,} from '@byte-ui/constants'

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

// ReturnTypeof  =>  从函数中获得返回值类型
type States = ReturnType<typeof useSelectStates>
export const useSelect = (props: any, states: States, ctx: any) => {

    // template refs
    // ComponentPublicInstance => 组件实例，包含了$el, emit, props等属性
    const reference = ref<ComponentPublicInstance<{
        // focus是返回void的函数类型
        focus: () => void
        blur: () => void
        input: HTMLInputElement
    }> | null>(null)
    const input = ref<HTMLInputElement | null>(null)
    const tooltipRef = ref<InstanceType<typeof ByteTooltip> | null>(null)
    const tags = ref<HTMLElement | null>(null)
    const selectWrapper = ref<HTMLElement | null>(null)
    const scrollbar = ref<{
        handleScroll: () => void
    } | null>(null)
    const hoverOption = ref(-1)
    const queryChange = shallowRef<QueryChangeCtx>({query: ''})
    const groupQueryChange = shallowRef('')

    // const { form, formItem } = useFormItem()

    const readonly = computed(
        // 不可筛选 || 多选的 || 不可见的
        () => !props.filterable || props.multiple || !states.visible
    )

    // 选择器是否整个量被禁用
    const selectDisabled = computed(() => props.disabled)

    const showClose = computed(() => {
        // hasValue => 是否有值被选中
        const hasValue = props.multiple
            ? Array.isArray(props.modelValue) && props.modelValue.length > 0
            : props.modelValue !== undefined &&
            props.modelValue !== null &&
            props.modelValue !== ''

        // select可清除 && select未被禁用 && 鼠标经过select的输入框 && 输入框里有选项
        const criteria =
            props.clearable &&
            !selectDisabled.value &&
            states.inputHovering &&
            hasValue
        return criteria
    })
    const iconComponent = computed(() =>
        props.remote && props.filterable && !props.remoteShowSuffix
            ? ''
            : props.suffixIcon
    )
    const iconReverse = computed(() =>
        iconComponent.value && states.visible && props.suffixTransition ? "is-reverse" : ""
    )

    const debounce = computed(() => (props.remote ? 300 : 0))

    const emptyText = computed(() => {
        // loading: 是否正在从远程获取数据
        if (props.loading) {
            // TODO: “No Data”需亚奥多语言判断
            return props.loadingText || "No Data"
        }
        else {
            if (props.remote && states.query === '' && states.options.size === 0)
                return false
            if (
                props.filterable &&
                states.query &&
                states.options.size > 0 &&
                states.filteredOptionsCount === 0
            ) {
                return props.noMatchText || "No Match"
            }
            if (states.options.size === 0) {
                return props.noDataText || "No Data"
            }
        }
        return null
    })

    // options是一个Map类型的
    const optionsArray = computed(() => Array.from(states.options.values()))

    const cachedOptionsArray = computed(() =>
        Array.from(states.cachedOptions.values())
    )

    const showNewOption = computed(() => {
        const hasExistingOption = optionsArray.value
            .filter((option) => {
                return !option.created
            })
            .some((option) => {
                return option.currentLabel === states.query
            })
        return (
            props.filterable &&
            props.allowCreate &&
            states.query !== '' &&
            !hasExistingOption
        )
    })

    // TODO: useSize()
    const selectSize = useSize()

    const collapseTagSize = computed(() =>
        ['small'].includes(selectSize.value) ? 'small' : 'default'
    )

    const dropMenuVisible = computed({
        get() {
            return states.visible && emptyText.value !== false
        },
        set(val: boolean) {
            states.visible = val
        },
    })

    // watch
    watch(
        [() => selectDisabled.value, () => selectSize.value],
        // [() => selectDisabled.value, () => selectSize.value, () => form?.size],
        () => {
            nextTick(() => {
                resetInputHeight()
            })
        }
    )

    watch(
        () => props.placeholder,
        (val) => {
            states.cachedPlaceHolder = states.currentPlaceholder = val
        }
    )

    watch(
        () => props.modelValue,
        (val, oldVal) => {
            if (props.multiple) {
                resetInputHeight()
                if ((val && val.length > 0) || (input.value && states.query !== '')) {
                    states.currentPlaceholder = ''
                } else {
                    states.currentPlaceholder = states.cachedPlaceHolder
                }
                if (props.filterable && !props.reserveKeyword) {
                    states.query = ''
                    handleQueryChange(states.query)
                }
            }
            setSelected()
            if (props.filterable && !props.multiple) {
                states.inputLength = 20
            }
            if (!isEqual(val, oldVal) && props.validateEvent) {
                // formItem?.validate('change').catch((err: Error) => console.warn(err))
            }
        },
        {
            flush: 'post',
            deep: true,
        }
    )

    watch(
        () => states.visible,
        (val) => {
            if (!val) {
                if (props.filterable) {
                    if (isFunction(props.filterMethod)) {
                        props.filterMethod('')
                    }
                    if (isFunction(props.remoteMethod)) {
                        props.remoteMethod('')
                    }
                }
                input.value && input.value.blur()
                states.query = ''
                states.previousQuery = null
                states.selectedLabel = ''
                states.inputLength = 20
                states.menuVisibleOnFocus = false
                resetHoverIndex()
                nextTick(() => {
                    if (
                        input.value &&
                        input.value.value === '' &&
                        states.selected.length === 0
                    ) {
                        states.currentPlaceholder = states.cachedPlaceHolder
                    }
                })

                if (!props.multiple) {
                    if (states.selected) {
                        if (
                            props.filterable &&
                            props.allowCreate &&
                            states.createdSelected &&
                            states.createdLabel
                        ) {
                            states.selectedLabel = states.createdLabel
                        } else {
                            states.selectedLabel = states.selected.currentLabel
                        }
                        if (props.filterable) states.query = states.selectedLabel
                    }

                    if (props.filterable) {
                        states.currentPlaceholder = states.cachedPlaceHolder
                    }
                }
            } else {
                tooltipRef.value?.updatePopper?.()

                if (props.filterable) {
                    states.filteredOptionsCount = states.optionsCount
                    states.query = props.remote ? '' : states.selectedLabel
                    if (props.multiple) {
                        input.value?.focus()
                    } else {
                        if (states.selectedLabel) {
                            states.currentPlaceholder = `${states.selectedLabel}`
                            states.selectedLabel = ''
                        }
                    }
                    handleQueryChange(states.query)
                    if (!props.multiple && !props.remote) {
                        queryChange.value.query = ''

                        triggerRef(queryChange)
                        triggerRef(groupQueryChange)
                    }
                }
            }
            ctx.$emit('visible-change', val)
        }
    )

    watch(
        // fix `Array.prototype.push/splice/..` cannot trigger non-deep watcher
        // https://github.com/vuejs/vue-next/issues/2116
        () => states.options.entries(),
        () => {
            if (!isClient) return
            tooltipRef.value?.updatePopper?.()
            if (props.multiple) {
                resetInputHeight()
            }
            const inputs = selectWrapper.value?.querySelectorAll('input') || []
            if (
                !Array.from(inputs).includes(document.activeElement as HTMLInputElement)
            ) {
                setSelected()
            }
            if (
                props.defaultFirstOption &&
                (props.filterable || props.remote) &&
                states.filteredOptionsCount
            ) {
                checkDefaultFirstOption()
            }
        },
        {
            flush: 'post',
        }
    )

    watch(
        () => states.hoverIndex,
        (val) => {
            if (isNumber(val) && val > -1) {
                hoverOption.value = optionsArray.value[val] || {}
            } else {
                hoverOption.value = <number>{}
            }
            optionsArray.value.forEach((option) => {
                option.hover = hoverOption.value === option
            })
        }
    )

    // methods
    const resetInputHeight = () => {
        if (props.collapseTags && !props.filterable) return
        nextTick(() => {
            if (!reference.value) return
            const input = reference.value.$el.querySelector(
                'input'
            ) as HTMLInputElement
            const _tags = tags.value

            const sizeInMap = getComponentSize(selectSize.value)
            // const sizeInMap = getComponentSize(selectSize.value || form?.size)
            // it's an inner input so reduce it by 2px.
            input.style.height = `${
                (states.selected.length === 0
                    ? sizeInMap
                    : Math.max(
                        _tags
                            ? _tags.clientHeight + (_tags.clientHeight > sizeInMap ? 6 : 0)
                            : 0,
                        sizeInMap
                    )) - 2
            }px`

            states.tagInMultiLine = Number.parseFloat(input.style.height) >= sizeInMap

            if (states.visible && emptyText.value !== false) {
                tooltipRef.value?.updatePopper?.()
            }
        })
    }

    const handleQueryChange = async (val: any) => {
        if (states.previousQuery === val || states.isOnComposition) return
        if (
            states.previousQuery === null &&
            (isFunction(props.filterMethod) || isFunction(props.remoteMethod))
        ) {
            states.previousQuery = val
            return
        }
        states.previousQuery = val
        nextTick(() => {
            if (states.visible) tooltipRef.value?.updatePopper?.()
        })
        states.hoverIndex = -1
        if (props.multiple && props.filterable) {
            nextTick(() => {
                const length = input.value!.value.length * 15 + 20
                states.inputLength = props.collapseTags ? Math.min(50, length) : length
                managePlaceholder()
                resetInputHeight()
            })
        }
        if (props.remote && isFunction(props.remoteMethod)) {
            states.hoverIndex = -1
            props.remoteMethod(val)
        } else if (isFunction(props.filterMethod)) {
            props.filterMethod(val)
            triggerRef(groupQueryChange)
        } else {
            states.filteredOptionsCount = states.optionsCount
            queryChange.value.query = val

            triggerRef(queryChange)
            triggerRef(groupQueryChange)
        }
        if (
            props.defaultFirstOption &&
            (props.filterable || props.remote) &&
            states.filteredOptionsCount
        ) {
            await nextTick()
            checkDefaultFirstOption()
        }
    }

    const managePlaceholder = () => {
        if (states.currentPlaceholder !== '') {
            states.currentPlaceholder = input.value!.value
                ? ''
                : states.cachedPlaceHolder
        }
    }

    /**
     * find and highlight first option as default selected
     * @remark
     * - if the first option in dropdown list is user-created,
     *   it would be at the end of the optionsArray
     *   so find it and set hover.
     *   (NOTE: there must be only one user-created option in dropdown list with query)
     * - if there's no user-created option in list, just find the first one as usual
     *   (NOTE: exclude options that are disabled or in disabled-group)
     */
    const checkDefaultFirstOption = () => {
        const optionsInDropdown = optionsArray.value.filter(
            (n) => n.visible && !n.disabled && !n.states.groupDisabled
        )
        const userCreatedOption = optionsInDropdown.find((n) => n.created)
        const firstOriginOption = optionsInDropdown[0]
        states.hoverIndex = getValueIndex(
            optionsArray.value,
            userCreatedOption || firstOriginOption
        )
    }

    const setSelected = () => {
        if (!props.multiple) {
            const option = getOption(props.modelValue)
            // @ts-ignore
            if (option.props?.created) {
                // @ts-ignore
                states.createdLabel = option.props.value
                states.createdSelected = true
            } else {
                states.createdSelected = false
            }
            states.selectedLabel = option.currentLabel
            states.selected = option
            if (props.filterable) states.query = states.selectedLabel
            return
        }
        else {
            states.selectedLabel = ''
        }
        const result: any[] = []
        if (Array.isArray(props.modelValue)) {
            props.modelValue.forEach((value: any) => {
                result.push(getOption(value))
            })
        }
        states.selected = result
        nextTick(() => {
            resetInputHeight()
        })
    }

    const getOption = (value) => {
        let option
        // toRawType  =>  Object.prototype.toString.call().slice(8)
        const isObjectValue = toRawType(value).toLowerCase() === 'object'
        const isNull = toRawType(value).toLowerCase() === 'null'
        const isUndefined = toRawType(value).toLowerCase() === 'undefined'

        for (let i = states.cachedOptions.size - 1; i >= 0; i--) {
            const cachedOption = cachedOptionsArray.value[i]
            // get(object, path, [defaultValue])
            // 根据object对象的path【Array|String】路径获取值，如果解析value是undefined会以defaultValue取代
            // 简单理解：在对象中解构数据
            const isEqualValue = isObjectValue
                ? get(cachedOption.value, props.valueKey) === get(value, props.valueKey)
                : cachedOption.value === value
            if (isEqualValue) {
                option = {
                    value,
                    currentLabel: cachedOption.currentLabel,
                    isDisabled: cachedOption.isDisabled,
                }
                break
            }
        }
        if (option) return option
        const label = isObjectValue
            ? value.label
            : !isNull && !isUndefined
                ? value
                : ''
        const newOption = {
            value,
            currentLabel: label,
        }
        if (props.multiple) {
            ;(newOption as any).hitState = false
        }
        return newOption
    }

    const resetHoverIndex = () => {
        setTimeout(() => {
            const valueKey = props.valueKey
            if (!props.multiple) {
                states.hoverIndex = optionsArray.value.findIndex((item) => {
                    return getValueKey(item) === getValueKey(states.selected)
                })
            } else {
                if (states.selected.length > 0) {
                    states.hoverIndex = Math.min.apply(
                        null,
                        states.selected.map((selected) => {
                            return optionsArray.value.findIndex((item) => {
                                return get(item, valueKey) === get(selected, valueKey)
                            })
                        })
                    )
                } else {
                    states.hoverIndex = -1
                }
            }
        }, 300)
    }

    const handleResize = () => {
        resetInputWidth()
        tooltipRef.value?.updatePopper?.()
        if (props.multiple && !props.filterable) resetInputHeight()
    }

    const resetInputWidth = () => {
        states.inputWidth = reference.value?.$el.offsetWidth
    }

    const onInputChange = () => {
        if (props.filterable && states.query !== states.selectedLabel) {
            states.query = states.selectedLabel
            handleQueryChange(states.query)
        }
    }

    const debouncedOnInputChange = lodashDebounce(() => {
        onInputChange()
    }, debounce.value)

    const debouncedQueryChange = lodashDebounce((e) => {
        handleQueryChange(e.target.value)
    }, debounce.value)

    const emitChange = (val) => {
        if (!isEqual(props.modelValue, val)) {
            ctx.$emit(CHANGE_EVENT, val)
        }
    }

    const deletePrevTag = (e: Event) => {
        // @ts-ignore
        if (e.target.value.length <= 0 && !toggleLastOptionHitState()) {
            const value = props.modelValue.slice()
            value.pop()
            ctx.$emit(UPDATE_MODEL_EVENT, value)
            emitChange(value)
        }

        // @ts-ignore
        if (e.target.value.length === 1 && props.modelValue.length === 0) {
            states.currentPlaceholder = states.cachedPlaceHolder
        }
    }

    const deleteTag = (event, tag) => {
        const index = states.selected.indexOf(tag)
        if (index > -1 && !selectDisabled.value) {
            const value = props.modelValue.slice()
            value.splice(index, 1)
            ctx.$emit(UPDATE_MODEL_EVENT, value)
            emitChange(value)
            ctx.$emit('remove-tag', tag.value)
        }
        event.stopPropagation()
    }

    const deleteSelected = (event: Event) => {
        event.stopPropagation()
        const value: string | any[] = props.multiple ? [] : ''
        if (!isString(value)) {
            for (const item of states.selected) {
                if (item.isDisabled) value.push(item.value)
            }
        }
        ctx.$emit(UPDATE_MODEL_EVENT, value)
        emitChange(value)
        states.hoverIndex = -1
        states.visible = false
        ctx.$emit('clear')
    }

    // byClick为true，通过鼠标点击的方式选中某个选项option
    // option是option.vue的实例
    const handleOptionSelect = (option, byClick) => {

        // 多选
        if (props.multiple) {
            const value = (props.modelValue || []).slice()
            const optionIndex = getValueIndex(value, option.value)
            if (optionIndex > -1) {
                value.splice(optionIndex, 1)
            }
            else if ( props.multipleLimit <= 0 || value.length < props.multipleLimit ) {
                value.push(option.value)
            }
            ctx.$emit(UPDATE_MODEL_EVENT, value)
            emitChange(value)
            if (option.created) {
                states.query = ''
                handleQueryChange('')
                states.inputLength = 20
            }
            if (props.filterable) input.value?.focus()
        }
        // 单选
        else {
            ctx.$emit(UPDATE_MODEL_EVENT, option.value)
            emitChange(option.value)
            states.visible = false
        }
        states.isSilentBlur = byClick
        setSoftFocus()
        if (states.visible) return
        nextTick(() => {
            scrollToOption(option)
        })
    }

    const getValueIndex = (arr: any[] = [], value) => {
        if (!isObject(value)) return arr.indexOf(value)

        const valueKey = props.valueKey
        let index = -1
        arr.some((item, i) => {
            if (toRaw(get(item, valueKey)) === get(value, valueKey)) {
                index = i
                return true
            }
            return false
        })
        return index
    }

    const setSoftFocus = () => {
        states.softFocus = true
        // input => multiple choice;    reference  =>  single choice
        // const _input = input.value || reference.value
        const _input = input.value || reference.value.$el
        if (_input) {
            _input?.focus()
        }
    }

    const scrollToOption = (option) => {
        const targetOption = Array.isArray(option) ? option[0] : option
        let target = null

        if (targetOption?.value) {
            const options = optionsArray.value.filter(
                (item) => item.value === targetOption.value
            )
            if (options.length > 0) {
                target = options[0].$el
            }
        }

        if (tooltipRef.value && target) {
            const menu = tooltipRef.value?.popperRef?.contentRef?.querySelector?.(
                `.${ns.be('dropdown', 'wrap')}`
            )
            if (menu) {
                scrollIntoView(menu as HTMLElement, target)
            }
        }
        scrollbar.value?.handleScroll()
    }

    // 创建options
    const onOptionCreate = (vm: SelectOptionProxy) => {
        // 选项数、可提供筛选的选项数   且嗾使Map类型
        states.optionsCount++
        states.filteredOptionsCount++
        states.options.set(vm.value, vm)
        states.cachedOptions.set(vm.value, vm)
    }

    const onOptionDestroy = (key, vm: SelectOptionProxy) => {
        if (states.options.get(key) === vm) {
            states.optionsCount--
            states.filteredOptionsCount--
            states.options.delete(key)
        }
    }

    const resetInputState = (e: KeyboardEvent) => {
        if (e.code !== EVENT_CODE.backspace) toggleLastOptionHitState(false)
        states.inputLength = input.value!.value.length * 15 + 20
        resetInputHeight()
    }

    const toggleLastOptionHitState = (hit?: boolean) => {
        if (!Array.isArray(states.selected)) return
        const option = states.selected[states.selected.length - 1]
        if (!option) return

        if (hit === true || hit === false) {
            option.hitState = hit
            return hit
        }

        option.hitState = !option.hitState
        return option.hitState
    }

    const handleComposition = (event: Event) => {
        // @ts-ignore
        const text = event.target.value
        if (event.type === 'compositionend') {
            states.isOnComposition = false
            nextTick(() => handleQueryChange(text))
        } else {
            const lastCharacter = text[text.length - 1] || ''
            // states.isOnComposition = !isKorean(lastCharacter)
        }
    }

    const handleMenuEnter = () => {
        nextTick(() => scrollToOption(states.selected))
    }

    const handleFocus = (event: FocusEvent) => {
        if (!states.softFocus) {
            if (props.automaticDropdown || props.filterable) {
                if (props.filterable && !states.visible) {
                    states.menuVisibleOnFocus = true
                }
                states.visible = true
            }
            ctx.$emit('focus', event)
        } else {
            states.softFocus = false
        }
    }

    const blur = () => {
        states.visible = false
        reference.value?.blur()
    }

    const handleBlur = (event: FocusEvent) => {
        // https://github.com/ElemeFE/element/pull/10822
        nextTick(() => {
            if (states.isSilentBlur) {
                states.isSilentBlur = false
            } else {
                ctx.$emit('blur', event)
            }
        })
        states.softFocus = false
    }

    const handleClearClick = (event: Event) => {
        deleteSelected(event)
    }

    const handleClose = () => {
        states.visible = false
    }

    const handleKeydownEscape = (event: KeyboardEvent) => {
        if (states.visible) {
            event.preventDefault()
            event.stopPropagation()
            states.visible = false
        }
    }

    const toggleMenu = (e?: PointerEvent) => {
        if (e && !states.mouseEnter) {
            return
        }
        if (!selectDisabled.value) {
            if (states.menuVisibleOnFocus) {
                states.menuVisibleOnFocus = false
            }
            else {
                // if (!tooltipRef.value || !tooltipRef.value.isFocusInsideContent()) {
                if (!tooltipRef.value) {
                    states.visible = !states.visible
                }
            }
            if (states.visible) {
                ;(input.value || reference.value.$el)?.focus()
            }
        }
    }

    const selectOption = () => {
        if (!states.visible) {
            toggleMenu()
        } else {
            if (optionsArray.value[states.hoverIndex]) {
                handleOptionSelect(optionsArray.value[states.hoverIndex], undefined)
            }
        }
    }

    const getValueKey = (item) => {
        return isObject(item.value) ? get(item.value, props.valueKey) : item.value
    }

    const optionsAllDisabled = computed(() =>
        optionsArray.value
            .filter((option) => option.visible)
            .every((option) => option.disabled)
    )

    const navigateOptions = (direction: string) => {
        if (!states.visible) {
            states.visible = true
            return
        }
        if (states.options.size === 0 || states.filteredOptionsCount === 0) return
        if (states.isOnComposition) return

        if (!optionsAllDisabled.value) {
            if (direction === 'next') {
                states.hoverIndex++
                if (states.hoverIndex === states.options.size) {
                    states.hoverIndex = 0
                }
            } else if (direction === 'prev') {
                states.hoverIndex--
                if (states.hoverIndex < 0) {
                    states.hoverIndex = states.options.size - 1
                }
            }
            const option = optionsArray.value[states.hoverIndex]
            if (
                option.disabled === true ||
                option.states.groupDisabled === true ||
                !option.visible
            ) {
                navigateOptions(direction)
            }
            nextTick(() => scrollToOption(hoverOption.value))
        }
    }

    const handleMouseEnter = () => {
        states.mouseEnter = true
    }

    const handleMouseLeave = () => {
        states.mouseEnter = false
    }

    return {
        optionsArray,
        selectSize,
        handleResize,
        debouncedOnInputChange,
        debouncedQueryChange,
        deletePrevTag,
        deleteTag,
        deleteSelected,
        handleOptionSelect,
        scrollToOption,
        readonly,
        resetInputHeight,
        showClose,
        iconComponent,
        iconReverse,
        showNewOption,
        collapseTagSize,
        setSelected,
        managePlaceholder,
        selectDisabled,
        emptyText,
        toggleLastOptionHitState,
        resetInputState,
        handleComposition,
        onOptionCreate,
        onOptionDestroy,
        handleMenuEnter,
        handleFocus,
        blur,
        handleBlur,
        handleClearClick,
        handleClose,
        handleKeydownEscape,
        toggleMenu,
        selectOption,
        getValueKey,
        navigateOptions,
        dropMenuVisible,
        queryChange,
        groupQueryChange,

        // DOM ref
        reference,
        input,
        tooltipRef,
        tags,
        selectWrapper,
        scrollbar,

        // Mouser Event
        handleMouseEnter,
        handleMouseLeave,
    }
}
<template>
  <label class="byte-radio">
    <span class="byte-radio--outer">
      <span
          class="byte-radio--inner"
          :class="{'is-checked': isChecked}"
      ></span>
      <input
          class="byte-radio-native"
          type="radio"
          :value="label"
          v-model="radioValue"
      >
    </span>
    <span class="byte-radio--label">
      {{label}}
    </span>
  </label>
</template>

<script>
export default {
  name: "byte-radio",
  inject: {
    RadioGroup: {
      default: ""
    }
  },
  props: {
    value: {
      type: [String, Number]
    },
    label: {
      type: [String, Number]
    }
  },
  computed: {
    isGroup() {
      return this.RadioGroup;
    },
    radioValue: {
      get() {
        return this.isGroup ? this.RadioGroup.value : this.value;
      },
      set(value) {
        if (this.isGroup) {
          this.RadioGroup.$emit("input", value);
        } else {
          this.$emit("input", value);
        }
      }
    },
    isChecked() {
      return this.radioValue === this.label;
    }
  }
};
</script>

<style scoped lang="less">
.byte-radio--outer {
  white-space: nowrap;

  outline: none;
  display: inline-block;
  line-height: 1;
  position: relative;
  vertical-align: middle;
}

.byte-radio--inner {
  border: 1px solid #dcdfe6;
  border-radius: 100%;
  width: 14px;
  height: 14px;
  background-color: #fff;
  position: relative;
  cursor: pointer;
  display: inline-block;
  box-sizing: border-box;
}

.byte-radio--inner.is-checked {
  border-color: #409eff;
  background: #409eff;
}

.byte-radio--inner::after {
  width: 4px;
  height: 4px;
  border-radius: 100%;
  background-color: #fff;
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.15s ease-in;
}

.byte-radio--inner.is-checked::after {
  transform: translate(-50%, -50%) scale(1);
}

.byte-radio--label {
  margin-left: 4px;
  font-size: 14px;

}

.byte-radio {
  margin-right: 20px;
  cursor: pointer;
}

.byte-radio:last-child {
  margin-right: 0;
}

.byte-radio-native {
  opacity: 0;
  display: none;
}
</style>
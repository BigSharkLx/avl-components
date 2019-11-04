<template>
  <div class="at-form--search">
    <component v-for="item in formConfig" :key="item.id" v-bind:is="item.type" 
      v-on="$listeners" :configData="item"></component>
    <!-- 自定义组件 -->
    <!-- 时间选择器 -->
    <slot name="timePicker"></slot>
    <!-- 日期选择器 -->
    <slot name="datePicker"></slot>
    <!-- 日期时间选择器 -->
    <slot name="dateTimePicker"></slot>
    <!-- 默认插槽 -->
    <slot></slot>
  </div>
</template>
<script>
import avlRadioGroup from "./searchFormComponents/AvlRadioGroup";
import avlCheckboxGroup from "./searchFormComponents/AvlCheckboxGroup";
import avlInput from "./searchFormComponents/AvlInput";
import avlSelect from "./searchFormComponents/AvlSelect";
import avlCascader from "./searchFormComponents/AvlCascader";
import avlSwitch from "./searchFormComponents/AvlSwitch";
export default {
  name: "AvlForm",
  data() {
    return {};
  },
  props: {
    formConfig: {
      type: Array,
      required: true
    }
  },
  components: {
    "avl-radio": avlRadioGroup,
    "avl-checkbox": avlCheckboxGroup,
    "avl-input": avlInput,
    "avl-select": avlSelect,
    "avl-cascader": avlCascader,
    "avl-switch": AvlSwitch
  }
};
</script>

<style>
.at-form--search {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.at-form-component:not(:last-child) {
  margin-right: 10px;
}

.at-form-component {
  margin-bottom: 10px;
}
</style>
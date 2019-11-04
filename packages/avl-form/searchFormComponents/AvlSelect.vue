<template>
  <div class="at-form-component" :class="configData.className||''">
    <el-select v-model="searchVal" :size="configData.size||''" :placeholder="configData.placeholder||''"
      v-bind="propAttrs" @change="handleSearch">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
        :disabled="item.disabled">
      </el-option>
    </el-select>
  </div>
</template>
<script>
import minxi from "./mixin";
export default {
  data() {
    return {
      options: this.configData.defaultOptions||[]
    };
  },
  mixins: [minxi],
  computed: {
    propAttrs() {
      let attrs = {};
      if (this.configData.clearable) {
        attrs = {
          ...attrs,
          clearable: true
        };
      }

      if (this.configData.filterable) {
        attrs = {
          ...attrs,
          filterable: true
        };
      }
      if (this.configData.filterable && this.configData.filterMethod) {
        attrs = {
          ...attrs,
          "filter-method": this.configData.filterMethod
        };
      }
      if (this.configData.multiple) {
        attrs = {
          ...attrs,
          multiple: true
        };
      }
      if (this.configData.multiple && this.configData.multipleLimit) {
        attrs = {
          ...attrs,
          "multiple-limit": this.configData.multipleLimit
        };
      }
      if (this.configData.multiple && this.configData.collapseTags) {
        attrs = {
          ...attrs,
          "collapse-tags": true
        };
      }

      return attrs;
    }
  },
  async created() {
    //   如果不能给初始值  那就传入一个方法去获取值
    if (
      !this.configData.defaultOptions ||
      this.configData.defaultOptions.length === 0
    ) {
      this.options = await this.configData.getInitData();
    }
  }
};
</script>
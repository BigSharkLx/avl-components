<template>
  <div class="at-form-component" :class="configData.className||''">
    <el-checkbox-group v-bind="propAttrs" v-model="searchVal" @change="handleSearch" :size="configData.size||''">
      <template v-if="configData.showBtnStyle">
        <el-checkbox-button v-for="item in options" :disabled="item.disabled" :key="item.value"
          :label="item.value" :border="configData.showBorder">{{item.label}}</el-checkbox-button>
      </template>
      <template v-else>
        <el-checkbox v-for="item in options" :disabled="item.disabled" :key="item.value"
          :label="item.value" :border="configData.showBorder">{{item.label}}</el-checkbox>
      </template>
    </el-checkbox-group>
  </div>
</template>

<script>
import minxi from "./mixin";
export default {
  data() {
    return {
      options: this.configData.defaultOptions || []
    };
  },
  mixins: [minxi],
  computed: {
    propAttrs() {
      let attrs = {};
      if (this.configData.showBtnStyle && this.configData.btnStyle) {
        attrs = {
          ...attrs,
          "text-color": this.configData.btnStyle.textColor || "ffffff",
          fill: this.configData.btnStyle.fill || "#409EFF"
        };
      }
      if (this.configData.min) {
        attrs = {
          ...attrs,
          min: this.configData.min
        };
      }

      if (this.configData.max) {
        attrs = {
          ...attrs,
          max: this.configData.max
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
<template>
  <div class="at-form-component" :class="configData.className||''">
    <el-radio-group v-bind="propAttrs" v-model="searchVal" @change="handleSearch" :size="configData.size||''">
      <template v-if="configData.showBtnStyle">
        <el-radio-button v-for="item in options" :disabled="item.disabled" :key="item.value"
          :label="item.value" :border="configData.showBorder">{{item.label}}</el-radio-button>
      </template>
      <template v-else>
        <el-radio v-for="item in options" :disabled="item.disabled" :key="item.value"
          :label="item.value" :border="configData.showBorder">{{item.label}}</el-radio>
      </template>
    </el-radio-group>
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
      if (this.configData.showBtnStyle && this.configData.btnStyle) {
        return {
          "text-color": this.configData.btnStyle.textColor || "ffffff",
          fill: this.configData.btnStyle.fill || "#409EFF"
        };
      } else {
        return {};
      }
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
<template>
  <div class="at-form-component" :class="configData.className||''">
    <el-cascader v-model="searchVal" :options="options" :size="configData.size||''" :placeholder="configData.placeholder||''"
      v-bind="propAttrs" @change="handleSearch">
    </el-cascader>
  </div>
</template>
<script>
import minxi from './mixin'
export default {
  mixins:[minxi],
  data() {
    return {
      options:this.configData.defaultOptions||[]
    };
  },
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
       if (this.configData.collapseTags) {
        attrs = {
          ...attrs,
          "collapse-tags": true
        };
      }
        if (this.configData.separator) {
        attrs = {
          ...attrs,
          separator: this.configData.separator
        };
      }
      
       if (this.configData.showLastLevel) {
        attrs = {
          ...attrs,
          'show-all-levels': false
        };
      }
      
        attrs = {
          ...attrs,
         props:this.configData.props
        };
      
  

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
  },
};
</script>
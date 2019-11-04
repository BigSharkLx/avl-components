<template>
  <div class="at-form-component" :class="configData.className||''">
   <el-switch
    v-model="searchVal"
     v-bind="configData.config"
     :disabled="configData.disabled"
     @change="handleSearch"
     :width="configData.width"
     >
  </el-switch>
  </div>
</template>
<script>
import minxi from './mixin'
export default {
 mixins:[minxi]
};
</script>
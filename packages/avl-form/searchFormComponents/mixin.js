export default {
 data() {
    return {
      searchVal: this.configData.defaultValue
    };
  },
 props: {
    configData: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleSearch() {
      this.$emit("handleEventChange", {
        [this.configData.propName]: this.searchVal,
      });
    }
  }
};
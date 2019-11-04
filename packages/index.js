// 这里是全局引入的地方
import AvlTable from "./avl-table/index";
import AvlForm from "./avl-form/index";
const components = {
  AvlTable,
  AvlForm
};

const install = function(Vue, opts = {}) {
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key]);
  });
};
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  AvlTable,
  AvlForm
};

// 这里是全局引入的地方
import AvlTabel from "./avl-tabel/index";
import AvlForm from "./avl-form/index";
const components = {
  AvlTabel,
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
  AvlTabel,
  AvlForm
};

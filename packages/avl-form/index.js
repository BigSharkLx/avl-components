// 这里是按需引入的地方
import AvlForm from "./avl-form";

AvlForm.install = function(Vue) {
  Vue.component(AvlForm.name, AvlForm);
};
if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(AvlForm);
}

export default AvlForm;

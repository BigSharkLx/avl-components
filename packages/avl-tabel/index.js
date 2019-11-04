// 这里是按需引入的地方
import AvlTabel from "./avl-tabel";

AvlTabel.install = function(Vue) {
  Vue.component(AvlTabel.name, AvlTabel);
};
if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(AvlTabel);
}

export default AvlTabel;

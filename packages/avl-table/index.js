// 这里是按需引入的地方
import AvlTable from "./avl-table";

AvlTable.install = function(Vue) {
  Vue.component(AvlTable.name, AvlTable);
};
if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(AvlTable);
}

export default AvlTable;

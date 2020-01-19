# avl-components

### 基于vue+element封装表格表单联动组件

### 组件引用方法

通过 npm 安装

```
npm install avl-components -D
```

在 vue 项目 main.js 里面引入(目前没有做按需加载 默认全局引入)

```
import AvlComponents from "avl-components";
import "avl-components/lib/avl-components.css";
Vue.use(AvlComponents);
```
### 下面是具体组件使用方法
#### 1.avl-table（表格组件）
全局引入之后 默认注册了 vue 全局组件 使用如下

```
下面是一个自定义表头和列内容的使用例子
 <avl-table
 ref="avlTable"
 :tableConfig="tableConfig"
 :requestFun="requestFun"
 :requestParamsOrData="requestParamsOrData" @onHandleSizeChange="onHandleSizeChange"
 @onHandleCurrentChange="onHandleCurrentChange" @onHandleSelectionChange="onHandleSelectionChange"
 @onOperateBtn="onHandleOperateBtn"
 @onHandleSortChange="onHandleSortChange"
 @onRowClick="onHandleRowClick"
 >

 <!-- 状态自定义表头 -->
           这里的slot  需要和配置项定义的一致
            <template slot="stateHeader">
              <el-dropdown @command="handleFilterTag">
                <span class="el-dropdown-link">
                  状态
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="all">全部</el-dropdown-item>
                  <el-dropdown-item command="1">进行中</el-dropdown-item>
                  <el-dropdown-item command="2">已完成</el-dropdown-item>
                  <el-dropdown-item command="3">已失败</el-dropdown-item>
                  <el-dropdown-item command="0">未检测</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
            <!-- 状态自定义列内容 -->
             这里的slot  需要和配置项定义的一致
            <template slot-scope="props" slot="analysisStatus">
              <div v-if="props.scope.row.analysisStatus=== 1">
                <el-tag>进行中</el-tag>
              </div>
              <el-tag v-else-if="props.scope.row.analysisStatus=== 3" type="danger">已失败</el-tag>
              <el-tag v-else-if="props.scope.row.analysisStatus=== 0" type="danger">未检测</el-tag>
              <el-tag v-else type="success">已完成</el-tag>
            </template>
            <!-- 也可以自定义操作列  这里的slot会覆盖下面的操作列配置项 -->
             <template slot-scope="props" slot="operation">
             xxx
             </template>
</avl-table>

下面是事件监听
   // 操作按钮事件监听
    onHandleOperateBtn(val) {
      console.log(val);
    },
    // 分页切换
    onHandleCurrentChange(val) {
      console.log(val);
    },
    onHandleSizeChange(val) {
       console.log(val);
    },
    // 表格排序监听
    onHandleSortChange(val) {
     console.log(val);
    },
    // 多选按钮操作监听
    onHandleSelectionChange(val) {
     console.log(val);
    },
    //行点击事件
   onHandleRowClick(val){
     console.log(val);
   }
```

一个完整的配置例子如下

建议自己新建一个相关表格的配置文件并引入 例如 pageConfig.js

```
export const tableConfig = {
  hasSelect: true, // 有无选中列
  hasOperation: true, // 有无操作列
  border: false, // 是否带有纵向边框 默认为false
  hasExpand: false, // 有无展开行功能 默认为false
  rowClick: false, //是否开启行点击 默认为false
  expands: [],开启行展开之后的数据
  columns: [  //自定义列 是一个数组 数组每一项代表一列
    {
      id: "1",  //唯一标识
      label: "状态",  //列名
      prop: "analysisStatus",  //列对应的后台字段名 和自定义列slot对应
      width: "320",  //列宽
      className: "", //只自定义class类
      minWidth: "100", //最小宽度
      show: "template",  //true 代表不做任何处理 false代表隐藏 template代表自定义模板
      sortable: "custom",  //排序统一采用后台控制 custom代表后台排序  默认不排序
      formatData: formatAddTime,  //代表数据格式化 类似于filter过滤器功能  默认为null
      showHeader: true,  //代表是否自定义表头  默认为false
      headerProp: "stateHeader"  //自定义表头slot  name值 需要showHeader配置为true
    }
  ],
  operation: {
    // 操作功能
    label: "操作", // 操作列的表头文字
    width: "200", // 操作列的宽度
    className: "", // 操作列的class名
    data: [
      // 操作列数据
      {
        id: 1, // 按钮循环组件的key值
        label: "保存", // 按钮文字
        Fun: "handleSubmit", // 点击按钮后触发的父组件事件
        size: "mini", // 按钮大小
        classname: "", // 按钮的类名
        type: "success" //可选的有primary / success / warning / danger / info / text
      }
    ]
  },
    //  搜索参数代表是什么形式传给后台  默认是params  但是post请求下可以配置data
  searchProp: {
    //   name:'data'
  },
  //  格式化数据一定要返回一个对象  代表数据和数量
  formatTableData: ({data}) => {
    return {
      data: data.apkAnalysis,
      totalCount: data.counts
    };
  }
};
// 列表请求配置 返回一个promise
export const requestFun = ({params,data})=>{
   return request({
     method: "get",
     url: "/apkAnalysis",
     params,
     data
   });
}
// 列表请求查询参数
export const requestParamsOrData = {
  page: 1,
  pageSize: 10
};
```

avl-table 使用注意事项 1.自定义列内容使用时默认数据 slot-scope="props" 使用方法为 props.scope.row.xx
#### 2.avl-form（表单组件）

```
下面是一个自定义表单的使用例子
  <avl-form @handleEventChange="onHandleEventChange" :formConfig="formConfig">
 </avl-form>

下面是事件监听
   // 表单变化事件监听
    onHandleEventChange(val) {
      console.log(val);
    },

```

一个完整的配置例子如下

```
// 搜索表单配置
export const formConfig = [
         {
           id: 1,  //唯一标识
           propName: "address1", //字段名
           className: "", //  自定义class样式
           type: "avl-radio", //  标识属于哪种form组件 avl-radio
           avl-checkbox avl-input avl-select avl-cascader avl-switch
           size: "small", //  大小
           defaultValue: "beijing", //  默认值string
           //  默认的选择项
           defaultOptions: [
             {
               label: "北京",
               value: "beijing"
             },
             {
               label: "上海",
               value: "shanghai"
             },
             {
               label: "武汉",
               value: "wuhan"
             }
           ],
           showBtnStyle: true // 是否为按钮样式
           //  按钮样式下自定义样式(默认自带样式)
           // btnStyle: {
           //   textColor: "#fff",
           //   fill: "#409E"
           // },

           //  showBorder: true     //  是否显示边框
         },
         {
           id: 2,
           propName: "address2",
           className: "", //  自定义class样式
           type: "avl-checkbox", //  标识属于哪种form组件
           size: "small", //  大小  medium / small / mini
           defaultValue: ["beijing"], //  默认值array
           //  默认的选择项
           defaultOptions: [
             {
               label: "北京",
               value: "beijing"
             },
             {
               label: "上海",
               value: "shanghai"
             },
             {
               label: "武汉",
               value: "wuhan"
             }
           ],
           // showBtnStyle: true   // 是否为按钮样式
           //  按钮样式下自定义样式(默认自带样式)
           //  btnStyle: {
           //    textColor: "#fff",
           //    fill: "#409EFF"
           //  },
           //  showBorder: true //  是否显示边框
           //  可勾选的最小与最大值
          //  min:1,
          //  max:2
         },
         {
           id: 3,
           propName: "search",
           className: "", //  自定义class样式
           type: "avl-input", //  标识属于哪种form组件
           size: "small", //  大小
           defaultValue: "", //  默认值string
           placeholder: "请输入内容", //  默认的提示语
           //  clearable: true,
          //  showWordLimit: true,  // 是否显示输入字数统计
           // 最小与最大值
           // minlength: 0,
           // maxlength: 10
         },
         {
           id: 4,
           propName: "address3",
           className: "", //  自定义class样式
           type: "avl-select", //  标识属于哪种form组件
           size: "small", //  大小
           defaultValue: "beijing", //  默认值
           //  默认的选择项
           defaultOptions: [],
           //  获取数据的方式(请求远程数据举例)
            getInitData() {
              if (!localStorage.getItem("defaultOptions1")) {
                return new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const defaultOptions = [
                      {
                        label: "北京",
                        value: "beijing"
                      },
                      {
                        label: "上海",
                        value: "shanghai"
                      },
                      {
                        label: "武汉",
                        value: "wuhan"
                      }
                    ];
                    resolve(defaultOptions);
                  }, 2000);
                });
              } else {
                return JSON.parse(localStorage.getItem("defaultOptions1"));
              }
            },
           //  clearable: true,  //  是否显示清除按钮
          //  multiple: true,   //  多选
           //  multipleLimit:0,   //  多选限制 0代表无限制
          //  collapseTags:true,  //  多选展示折叠
          //  filterable: true,  // 支持过滤
           //  filterMethod:null   //  自定义过滤方式 可以配合远程过滤
         },
         {
           id: 5,
           propName: "test",
           className: "", //  自定义class样式
           type: "avl-cascader", //  标识属于哪种form组件
           size: "small", //  大小
           defaultValue: "", //  默认值
           defaultOptions: [], //  默认的选择项
           //  获取数据的方式(请求远程数据)
           getInitData() {
             return [];
           },
            // showLastLevel: true, //  只展示最后一级名称
           //  collapseTags:true,  //   多选展示折叠
           //  separator:'/',  //  选项分隔符
           props: {
              // expandTrigger: "hover", //  次级菜单的展开方式 hover
             //  multiple: true, //是否多选
             //  checkStrictly: true, //是否严格的遵守父子节点不互相关联
             //  lazy: false, //是否动态加载子节点，需与 lazyLoad 方法结合使用
             //  lazyLoad: null, //加载动态数据的方法，仅在 lazy 为 true 时有效
             //  value: "value",
             //  label: "label",
             //  children: "children",
             //  disabled: "disabled",
             //  leaf: "leaf"
           }
           //  clearable: true,  //  是否显示清除按钮
           //  filterable: true,   // 支持过滤
           //  filterMethod:null  //  自定义过滤方式 可以配合远程过滤
         },
         {
           id: 6,
           propName: "test1",
           className: "", //  自定义class样式
           type: "avl-switch", //  标识属于哪种form组件
           size: "small", //  大小
           defaultValue: true, //  默认值
           config: {
             "active-text": "按月付费",
             "inactive-text": "按年付费",
             //  "active-value":true,  //打开的值
             //  "inactive-value":false, //关闭的值
             "active-color": "#13ce66",
             "inactive-color": "#ff4949"
           }
           // disabled: true, //禁用
           // width:40,  //宽度
         }
       ];

```

avl-form 使用注意事项 1.数据源需要后台请求时可以参照 avl-select 配置

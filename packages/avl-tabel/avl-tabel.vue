<template>
    <div class="antiy-table">
        <template>
            <el-table v-loading="tableMsg.loading" ref="antiyTable" :data="tableMsg.data"
                :tooltip-effect="tableConfig.tooltipTheme||'dark'" :border="tableConfig.border" style="width: 100%" :header-row-class-name="tableConfig.headerClassName||''"
                :row-class-name="rowClassName" @selection-change="handleSelectionChange"
                @row-click="rowClick" @sort-change="handleSortChange">
                <el-table-column v-if="tableConfig.hasSelect" type="selection" width="55"></el-table-column>
                <!-- 展开行 -->
                <el-table-column type="expand" v-if="tableConfig.hasExpand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item :label="item.label" v-for="item in tableConfig.expands" :key="item.id">
                                <span>{{ props.row[item.prop] }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <template v-for="item in tableConfig.columns">
                    <el-table-column v-if="item.show!==false" :label="item.label" :prop="item.prop"
                        :class-name="item.className ? item.className : ''" :key="item.id"
                        :width="item.width ? item.width : ''" :sortable="item.sortable"
                        :min-width="item.minWidth ? item.minWidth : ''">
                        <!-- 自定义表头 -->
                        <template v-if="item.showHeader" slot="header">
                            <slot :name="item.headerProp"></slot>
                        </template>
                        <template slot-scope="scope">
                            <!-- 自定义模板  使用slot -->
                            <template v-if="item.show === 'template'">
                                <slot :name="item.prop" :scope="scope">
                                    {{item.formatData?item.formatData(scope.row[item.prop]):scope.row[item.prop]}}
                                </slot>
                            </template>
                            <!-- 正常渲染数据列 -->
                            <template v-else-if="item.show !== 'template'">
                                {{item.formatData?item.formatData(scope.row[item.prop]):scope.row[item.prop]}}
                            </template>
                        </template>
                    </el-table-column>
                </template>
                <!-- 操作列 -->
                <el-table-column column-key="operation" :label="tableConfig.operation.label"
                    :width="tableConfig.operation.width ? tableConfig.operation.width : ''"
                    :min-width="tableConfig.operation.minWidth ? tableConfig.operation.minWidth : ''"
                    :class-name="tableConfig.operation.className" v-if="tableConfig.hasOperation">
                    <template slot-scope="scope">
                        <slot name="operation" :scope="scope">
                            <el-button v-for="item in tableConfig.operation.data"
                                :class="item.classname ? item.classname : ''" :key="item.id" :size="item.size"
                                :type="item.type||''" @click.stop="handleOperation(item, scope.row)">{{ item.label }}
                            </el-button>
                        </slot>
                    </template>
                </el-table-column>
            </el-table>
            <div class="clearfix">
                <el-pagination class="pagination-right--special" @size-change="handleSizeChange"
                    @current-change="handleCurrentChange" :current-page="requestParamsOrData.page"
                    :page-sizes="tableConfig.pageSizeArr" :page-size="requestParamsOrData.pageSize"
                    layout="prev, pager, next,sizes,total" :total="tableMsg.totalCount"></el-pagination>
            </div>
        </template>
    </div>
</template>

<script>
export default {
  name: "AvlTabel",
  data() {
    return {
      tableMsg: {
        data: [],
        totalCount: 0,
        loading: false
      }
    };
  },
  props: {
    //   表格配置
    tableConfig: {
      type: Object,
      required: true,
      default() {
        return {
          pageSizeArr: [10, 20, 50, 100],
          border: false, // 是否带有纵向边框，默认为false
          hasSelect: false, // 有无选中功能
          hasOperation: false, // 有无操作功能
          hasExpand: false, // 有无展开行功能
          rowClick: false, //是否开启行点击
          columns: [],
          operation: {},
          expands: [],
          searchProp: {},
          formatTableData: res => res
        };
      }
    },
    // 请求配置  返回一个·promise
    requestFun: {
      type: Function,
      required: true
    },
    // 动态配置项(查询参数)
    requestParamsOrData: {
      type: Object,
      default() {
        return {
          page: 1,
          pageSize: 10
        };
      }
    }
  },
  created() {
    this.getData();
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit("onHandleSelectionChange", val);
    },
    handleOperation(item, row) {
      this.$emit("onOperateBtn", {
        item,
        row
      });
    },
    handleSizeChange(val) {
      this.$emit("onHandleSizeChange", val);
    },
    handleCurrentChange(val) {
      this.$emit("onHandleCurrentChange", val);
    },
    // 排序
    handleSortChange(val) {
      this.$emit("onHandleSortChange", val);
    },
    // 点击某一行时触发的函数
    // *** 按下左键然后移动鼠标到其它列放开左键，会有报错 -- 优化：添加点击行参数，
    rowClick(Row, Event, Column) {
      if (
        !Column.rowClick ||
        !Column ||
        Column.type === "selection" ||
        Column.columnKey === "operation" ||
        Column.type === "expand"
      ) {
        return;
      }
      const data = {
        row: Row,
        event: Event,
        column: Column
      };
      this.$emit("onRowClick", data);
    },
    // 行类名的回调函数
    // 在表格数据中添加class字段即为表格行类名，配合css可对表格行中的自定义标签进行样式优化
    rowClassName(rowdata) {
      const data = this.tableMsg.data;
      let className = data[rowdata.rowIndex].class
        ? data[rowdata.rowIndex].class
        : "";
      if (className.length === 0) {
        return;
      }
      className = className.join(" ");
      return className;
    },
    // 格式化请求参数
    formatSearch() {
      let params = {};
      let data = {};
      console.log(this.requestParamsOrData);

      for (let k in this.requestParamsOrData) {
        if (
          this.tableConfig.searchProp[k] &&
          this.tableConfig.searchProp[k] === "data"
        ) {
          data = {
            ...data,
            [k]: this.requestParamsOrData[k]
          };
        } else {
          params = {
            ...params,
            [k]: this.requestParamsOrData[k]
          };
        }
      }
      return {
        params,
        data
      };
    },
    // 可配置请求数据
    getData() {
      this.tableMsg.loading = true;
      const config = this.formatSearch();
      const formatData = this.tableConfig.formatTableData;
      this.requestFun(config).then(
        res => {
          this.tableMsg.loading = false;
          this.tableMsg.data = formatData(res).data;
          this.tableMsg.totalCount = formatData(res).totalCount;
        },
        err => {
          this.tableMsg.data = [];
          this.tableMsg.totalCount = 0;
          this.tableMsg.loading = false;
          this.$message.error("获取数据失败!");
        }
      );
    }
  },
  watch: {
    // 查询参数变化就重新请求
    requestParamsOrData(val) {
      this.getData();
    }
  }
};
</script>

<style>
.pagination-right--special {
  margin-top: 15px;
  float: right;
}
</style>
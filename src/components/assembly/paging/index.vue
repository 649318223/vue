<!--
 * @Descripttion: 
 * @version: 
 * @Author: sch
 * @Date: 2021-01-22 10:07:58
 * @LastEditors: sch
 * @LastEditTime: 2021-03-04 12:15:08
-->
<template>
  <el-row>
      <el-col :span="4">
          <slot name="batchDelete" ></slot>
      </el-col>
      <el-col :span="20">
          <el-pagination
          class="pull-right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="configPage.sizes"
          :page-size="configPage.size"
          :layout="configPage.layout"
          :total="configPage.total">
          </el-pagination>
      </el-col>
  </el-row>
</template>
<script>
export default {
  name: "tableVue",
  data() {
    return {
        configPage : {
            total : 0,
            // sizes : [4, 20, 30, 40],
            // size : 0,
        },
    };
  },
  props: {
    config: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    config: {
      handler(newValue, oldValue) {
        this.configPage = newValue;
      },
      immediate: true, //组件初始化马上监听
    },
  },
  methods: {
    /* 每页展示数据量 */
    handleSizeChange(val) {
      this.$emit("sizeChange", val);
    },
    /* 上下页 */
    handleCurrentChange(val) {
      this.$emit("currentChange", val);
    },
    //获取分页配置
    getTableConfig() {
      var pageData = this.config;
      var keys = Object.keys(this.configPage);
      //console.log(keys)
      for (const key in pageData) {
          //console.log(key)
        if (keys.includes(key)) {
          this.configPage[key] = pageData[key];
        }
      }
    },
  },
  //初始化加载表格配置
  created() {
    this.getTableConfig();
  },
};
</script>

<style lang="scss" scoped>
</style>
<!--
 * @Descripttion: 对table表格进行封装
 引用路径   import selectVue from "@/components/assembly/select/index.vue";
 页面代码   <selectVue :config="options" :selectData.sync="value"/> 
 传入参数   configOptions : {
                options: [      //数据参数
                    {value: 'name',label: '姓名'}, 
                    {value: 'phone',label: '手机号'},
                    {value: 'emali', label: '邮箱'}
                ],
                value: '',  //回写参数
            },
 * @version: 1.0
 * @Author: 马昭
 * @Date: 2021-01-10 04:07:35
 * @LastEditors: sch
 * @LastEditTime: 2021-01-14 16:30:54
-->
<template>
  <el-table :data="configTable.tableData" border >
    <el-table-column v-if="configTable.selection" type="selection" width="45" align="center"></el-table-column>
    <template v-for="item in configTable.tableHead">
      <el-table-column v-if="item.type=='slot'" :key="item.headID" :prop="item.headID" :label="item.label" align="center">
        <template slot-scope="scope">
          <slot :name="item.slotName" :data="scope.row"></slot>
        </template>
      </el-table-column>
      <el-table-column v-else :key="item.headID" :prop="item.headID" :label="item.label" align="center"></el-table-column>
    </template>
    
  </el-table>
  
</template>
<script>
import {ruquestUrl} from "@/api/requestUrl.js";
export default {
  name: "tableVue",
  data() {
    return {
      configTable: {
        selection : true,
        requestUrl : '',
        tableHead: [],
        tableData : [
          // {username : 'aa',truename : 'aaaa',phone : 'aaa',address: 'sss',role : '超级管理员'}
        ],
      }
    };
  },
  props: {
    config: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
      config :{
        handler(newValue,oldValue){
          this.configTable = newValue;
        },
        immediate : true  //组件初始化马上监听
      },
  },
  methods: {
    //获取表格配置
    getTableConfig() {
        var tableData = this.config;
        var keys = Object.keys(this.configTable);
        console.log(keys)
        for (const key in tableData) {
          console.log(key)
          if(keys.includes(key)){
            this.configTable[key] = tableData[key];
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
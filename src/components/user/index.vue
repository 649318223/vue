<!--
 * @Descripttion: 
 * @version: 
 * @Author: sch
 * @Date: 2020-11-29 16:35:58
 * @LastEditors: sch
 * @LastEditTime: 2021-03-04 17:13:41
-->
<template>
  <div id="userInfo">
    <el-row>
      <el-col :span="20">
        <div class="label-warp">
          <label>关键字：</label>
          <el-row :gutter="16">
            <el-col :span="5">
              <selectVue
                :config="configOptions"
                :selectData.sync="configOptions.value"
              />
            </el-col>
            <el-col :span="8">
              <el-input v-model="input" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="11">
              <el-button type="danger" @click="search()">搜索</el-button>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="4">
        <el-button class="pull-right" type="danger" @click="addUser()">添加用户</el-button>
      </el-col>
    </el-row>
    <div class="table">
      <tableVue :config="configTable" :tableSelectData.sync="tableSelectData" ref="multipleTable">
        <template v-slot:status='slotData'>
          <el-switch v-model="slotData.data.status" active-value="2" inactive-value="1" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
        <template v-slot:operation='slotData'>
          <el-button  type="danger" size="mini" @click="deleteUser(slotData.data.id)">删除</el-button>
          <el-button  type="success" size="mini">编辑</el-button>
        </template>
      </tableVue>
    </div>
    <pageVue @sizeChange="sizeChange" @currentChange="currentChange" :config="configPage">
        <template v-slot:batchDelete>
          <el-button  type="danger" size="mini" @click="deleteUserBatch">批量删除</el-button>
        </template>
    </pageVue>
    <addUser :flag.sync="showDialog" @loadingUserList="loadingUserList"></addUser>  
  </div>
</template>

<script>
import selectVue from "@/components/assembly/select/index.vue";
import tableVue from "@/components/assembly/table/index.vue";
import pageVue from "@/components/assembly/paging/index.vue";
import {getUserList,deleteUser} from "@/api/user.js";
import addUser from "./dialog/addUser.vue";
export default {
  name: "UserIndex",
  components: {
    selectVue,
    tableVue,
    pageVue,
    addUser
  },
  data() {
    return {
      showDialog: false,
      //下拉框配置
      configOptions: {
        options: [
          { value: "name", label: "姓名" },
          { value: "phone", label: "手机号" },
          { value: "emali", label: "邮箱" },
        ],
        value: "",
      },
      //表格配置
      configTable: {
        //复选框
        selection: true,
        requestUrl : 'getInfoList',
        //表头数据
        tableHead: [
          { headID: "username", label: "邮箱/用户名",width : "" },  //emali
          { headID: "truename", label: "真实姓名",width : ""  },
          { headID: "phone", label: "手机号",width : ""  },
          { headID: "address", label: "地区",width : ""  },
          { headID: "role", label: "角色",width : ""  },
          { headID: "status", label: "禁启用状态", type: "slot", slotName : "status",width : "100"  },
          { label: "操作", type: "slot", slotName : "operation",width : "150"  },
        ],
        //表格数据
        tableData : [],
      },
      //表格选择选择数据
      tableSelectData : {},
      //分页配置
      configPage : {
          layout: "total, sizes, prev,pager, next",  //"total, sizes, prev, pager, next, jumper"
          total : 0,
          sizes : [4, 20, 30, 40],
          size : 0,
      },
      input: "",
    };
  },
  methods: {
    /* 加载列表数据 */
    loadTableList(){
        var listData = {
                    username : "",
                    truename : "",
                    phone : "",
                    pageNumber : 1,
                    pageSize : 4
            }
        getUserList(listData).then(res => {
          var data = res.data.data
          this.configTable.tableData = data;
          this.configPage.total = res.data.total;
        });
    },
    /* 添加后回掉函数 */
    loadingUserList(){
        this.loadTableList();
    },
    /* 按每页数据展示 */
    sizeChange(val){
        var listData = {
                pageNumber: 1,
                pageSize: val
            }
        getUserList(listData).then(res => {
          var data = res.data.data
          this.configTable.tableData = data;
        });
    },
    /* 上下页 */
    currentChange(val){
        var listData = {
                pageNumber: val,
                pageSize: 4
            }
        getUserList(listData).then(res => {
          var data = res.data.data
          this.configTable.tableData = data;
        });
    },
    search() {
      console.log(this.configOptions.value);
    },
    /* 添加用户 */
    addUser(){
      //调用子组件的方法测试
      this.$refs.multipleTable.aa();
      this.showDialog = true;
    },
    /* 删除用户函数 */
    deleteUserfn(params){
        var id = {id : params};
        deleteUser(id).then(res =>{
            this.tableSelectData = {};
            this.loadTableList();
        })
    },
    /* 批量删除用户 */
    deleteUserBatch(){
        var id = this.tableSelectData.id;
        if(!id || id.length == 0){
            this.mesg("请选择数据");
            return false;
        }
        var params = {
            msg : "此操作将永久全部删除, 是否继续?",
            fn : this.deleteUserfn,
            id : id
        }
        this.msgCenter(params);
    },
    /* 单独删除用户 */
    deleteUser(id){
        var arr = [];
        arr.push(id);
        var params = {
            msg : "此操作将永久全部删除, 是否继续?",
            fn : this.deleteUserfn,
            id : arr
        }
        this.msgCenter(params);
    }
  },
  created() {
    this.loadTableList();
  },
};
</script>

<style lang="scss" >
#userInfo {
  .label-warp {
    display: flex;
    label {
      line-height: 40px;
    }
  }
  .table {
    margin-top: 20px;
  }
}
</style>
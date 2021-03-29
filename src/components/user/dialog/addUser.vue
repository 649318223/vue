<!--
 * @Descripttion: 
 * @version: 
 * @Author: sch
 * @Date: 2021-02-24 00:13:59
 * @LastEditors: sch
 * @LastEditTime: 2021-03-04 16:56:27
-->
<template>
    <div class="addUser">
        <el-dialog title="新增" :visible.sync="dialog_flag" @close="close"  @open="openLoading" width="45%" height='200px'>
             <el-form :model="form" label-position="right" label-width="90px">
                <el-form-item label="用户名：">
                        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="姓名：">
                        <el-input v-model="form.truename" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="密码：">
                        <el-input v-model="form.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="手机号：">
                        <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="类型：">
                        <region :regConfig="['province','city','area','street']" :regData.sync="regData"></region>  
                </el-form-item>
                <el-form-item label="是否启用：">
                        <el-radio v-model="form.status" label="2">启用</el-radio>
                        <el-radio v-model="form.status" label="1">禁用</el-radio>
                </el-form-item>
                 <el-form-item label="角色：">
                        <el-checkbox-group v-model="form.role">
                            <el-checkbox v-for="item in roleList" :label="item.role" :key="item.role">{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="danger" @click="addUserList()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import server from "@/req/request";
import region from "@/components/assembly/region/index.vue";
import {getRole,addUser} from "@/api/user.js";
export default {
    name : "addUser",
    components: {
        region
    },
    data() {
        return {
            dialog_flag : false,
            form : {
                username : "1350512435@qq.com",
                truename : "历史",
                password : "123",
                phone : "123",
                region : "",
                status : "2",
                role : [],
            },
            regData : {},
            roleList : [],
        }
    },
    props : {
        flag :{
            type : Boolean,
            default : false
        },
    },
    watch: {
        flag :{
            handler(newValue,oldValue){
                this.dialog_flag = newValue;
            }
        },
    },
    methods: {
        /* 
        打开之后执行方法
        */
        openLoading(){
            getRole().then(res =>{
                this.roleList = res.data
            })
        },
        //关闭方法
        close(){
            this.dialog_flag = false;
            this.$emit("update:flag",false);        //修饰符方法    
            //this.$emit("close",false);            //函数执行方法，用来处理逻辑
        },
         /* 
            添加人员
        */
        addUserList(){
            var requestData = Object.assign({},this.form);  //浅拷贝
            requestData.role = requestData.role.join()  //数字转为字符串
            requestData.region = JSON.stringify(this.regData);  //对象转为字符串
            addUser(requestData).then(res =>{
                this.msgSuccess(res.message);
                this.$emit("loadingUserList",false);
            })
        }
        
    },
    created() {
        
    },
    
}
</script>

<style lang="scss" scope>
.addNews{
    .el-dialog__body {
        padding: 30px 40px;
        .el-textarea__inner{
            height: 120px;
        }
    }
    .dialog-footer{
        text-align: center;
        .el-button{
            width: 150px;
        }
        .el-button+.el-button{
            margin-left: 40px;
        }
    }

}
</style>
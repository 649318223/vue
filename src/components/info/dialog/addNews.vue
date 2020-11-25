<template>
    <div class="addNews">
        <el-form >
         <el-dialog title="新增" :visible.sync="dialog_flag" @close="close" @open="openLoading" width="45%">
             <el-form >
                    <el-form-item label="类型：">
                        <el-select v-model="lx" placeholder="请选择" >
                            <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.category_name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="标题：">
                        <el-input v-model="name" style="width:89%" placeholder="请输入标题"></el-input>
                    </el-form-item>
                    <el-form-item label="概况：">
                        <el-input type="textarea" v-model="text" style="width:89%" placeholder="请输入概况"></el-input>
                    </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="danger" @click="addNewsList()">确 定</el-button>
            </div>
        </el-dialog>
        </el-form>
    </div>
</template>

<script>
import server from "@/req/request";
export default {
    name : "addNews",
    data() {
        return {
            dialog_flag : false,
            lx : "",
            text : "",
            name : "",
            options: [{}],
            newID : '',
            newopentype : '',
        }
    },
    props : {
        flag :{
            type : Boolean,
            default : false
        },
        editID : {
            type : String,
            default : ''
        },
        opentype : {
            type : String,
            default : ''
        }
    },
    watch: {
        flag :{
            handler(newValue,oldValue){
                this.dialog_flag = newValue;
            }
        },
        editID :{
            handler(newValue,oldValue){
                this.newID = newValue;
            }
        },
        opentype :{
            handler(newValue,oldValue){
                this.newopentype = newValue;
            }
        },
    },
    methods: {
        //修改打开方法
        openLoading(){
            if(this.newopentype == 'edit'){
                var listData = {
                    categoryId: "",
                    startTiem: "",
                    endTime: "",
                    title: "",
                    id: this.newID,
                    pageNumber: 1,
                    pageSize: 4
                }
                server.request({
                  method: 'post',
                  url: '/news/getList/',
                  data: listData
                }).then(res => {
                    var data = res.data.data;
                    this.lx = data[0].categoryId;
                    this.name = data[0].title;
                    this.text = data[0].content;
                });
            }
        },
        //关闭方法
        close(){
            this.dialog_flag = false;
            this.$emit("update:flag",false);        //修饰符方法    
            //this.$emit("close",false);            //函数执行方法，用来处理逻辑
            this.lx = '';
            this.name = '';
            this.text = '';
        },
        //获取分类数据
        getname(){
            //调用全局函数获取分类
            this.getClassName().then(data => { 
                this.options = data;
                // console.log(data)
            })
        },
        //添加新闻信息
        addNewsList(){
            if(this.newopentype == 'add'){
                var mydate = this.myTime("yyyy-MM-dd HH:mm:ss");
                if(this.lx == ""){
                    this.$message.error('类型不能为空');
                    return false;
                }
                if(this.name == ""){
                    this.$message.error('标题不能为空');
                    return false;
                }
                if(this.text == ""){
                    this.$message.error('内容不能为空');
                    return false;
                }
                server.request({
                  method: 'post',
                  url: '/news/add/',
                  data: {
                    categoryId : this.lx,
                    title : this.name,
                    imgUrl : "http://********",
                    createDate : mydate,
                    content : this.text
                  }
                }).then(res => {
                    console.log(res);
                    this.msgSuccess(res.message);
                    this.$emit("loadingList",false);    //回掉，加载列表
                    this.lx = '';
                    this.name = '';
                    this.text = '';
                });
            }else{
                server.request({
                  method: 'post',
                  url: '/news/editInfo/',
                  data: {
                    id: this.newID,
                    categoryId : this.lx,
                    title : this.name,
                    content : this.text,
                    imgUrl : ""
                  }
                }).then(res => {
                    console.log(res);
                    this.msgSuccess(res.message);
                    this.$emit("loadingList",false);    //回掉，加载列表
                    this.lx = '';
                    this.name = '';
                    this.text = '';
                });
            }
        },
    },
    created() {
        this.getname();//获取分类
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
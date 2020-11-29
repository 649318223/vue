<template>
    <div class="infoClass">
        <el-button type="danger" style="margin-left:15px;" @click="frist()">添加一级分类</el-button>
        <hr class="infoClass-line">
        <el-row :gutter="0">
            <el-col :span="10">
                <div class="left-content">
                    <div class="list" v-for="item in category" :key="item.id">
                        <div class="tu">
                            <svg-iocn  iconClass="plus"></svg-iocn>
                            <h4>{{item.category_name}}
                                <div class="list-button">
                                    <el-button type="danger" size="mini" round @click="updatelist(item.id,item.category_name)">编辑</el-button>
                                    <el-button type="success" size="mini" @click="two(item.id)" round>添加子级</el-button>
                                    <el-button  size="mini" round @click="deletelist(item.id)">删除</el-button>
                                </div>
                            </h4>
                        </div>
                        <ul v-if="item.children">
                            <li v-for="itemNext in item.children" :key="itemNext.id">
                                {{itemNext.category_name}}
                                <div class="list-button">
                                    <el-button type="danger" size="mini" @click="updatelist(itemNext.id,itemNext.category_name)" round>编辑</el-button>
                                    <el-button size="mini" @click="deletelist(itemNext.id)" round>删除</el-button>
                                </div>
                            </li>
                            
                        </ul>
                    </div>
                    
                </div>
            </el-col>
            <el-col :span="13" :offset="1">
                    <div class="right-top">{{addtitle1}}</div>
                    <div class="right-content">
                        <el-form >
                            <el-form-item :label="addtitle2" v-if="showFristName" >
                                <el-input v-model="fristName" :disabled="disFristName"></el-input>
                            </el-form-item>
                            <el-form-item :label="addtitle3" v-if="showTwoName">
                                <el-input v-model="twoName" :disabled="disTwoName"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="danger" @click="submitType()" :disabled="disButton">确定</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import server from "@/req/request";
export default {
    name : "infoClass",
    data() {
        return {
            addtitle1 : "一级分类编辑",
            addtitle2 : "一级分类名称",
            addtitle3 : "二级分类名称",
            fristName : "",
            twoName : "",
            showFristName : true,
            showTwoName : true,
            disFristName : true,
            disTwoName : true,
            disButton : true,
            addType : "",
            updateId : 0,
            category : [{}]
        }
    },
    methods: {
        //确认提交按钮
        submitType(){
            console.log(this.addType)
            if(this.addType == "addFrist"){
                this.addFristClass();
            }else if(this.addType == "updateFrist"){
                this.updatelist_tj();
            }else if(this.addType == "addtwo"){
                this.addTwoClass();
            }
        },
        //添加一级分类
        addFristClass(){
            if(this.fristName == ""){
                this.$message.error('一级分类名称不能为空');
                return false;
            }
            server.request({
              method: 'post',
              url: '/news/addFirstCategory/',
              data: {
                categoryName : this.fristName
              }
            }).then(res => {
                console.log(res);
                this.getname();
                this.msgSuccess(res.message);
                this.fristName = '';
            });
        },
        //一级菜单显示添加
        frist(){
            this.fristName = "";
            this.showTwoName = false;
            this.disFristName = false;
            this.disButton = false;
            this.addType = "addFrist";
        },
        //添加二级分类
        addTwoClass(){
            if(this.fristName == ""){
                this.$message.error('二级分类名称不能为空');
                return false;
            }
            server.request({
              method: 'post',
              url: '/news/addChildrenCategory/',
              data: {
                categoryName : this.fristName,
                parentId : this.twoName
              }
            }).then(res => {
                console.log(res);
                this.getname();
                this.msgSuccess(res.message);
                this.fristName = '';
                this.disFristName = true;
                this.disTwoName = true;
                this.disButton = true;
            });
        },
        //二级菜单显示添加
        two(id){
            this.fristName = "";
            this.twoName = id;
            this.showFristName = true;
            this.showTwoName = true;
            this.disFristName = false;
            this.disTwoName = true;
            this.disButton = false;
            this.addtitle1 = "二级分类编辑";
            this.addtitle2 = "二级分类名称";
            this.addtitle3 = "一级分类主键"
            this.addType = "addtwo"; 
        },
    //  获取分类数据
        getname(){
            this.getClassName().then(data => { 
                this.category = data
            })
        },
        //删除分类
        deletelist(id){
            this.$confirm('确认删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                    server.request({
                      method: 'post',
                      url: '/news/deleteCategory/',
                      data: {
                            categoryId : id
                        }
                    }).then(res => {
                        this.getname();
                        this.msgSuccess(res.message);
                    });
                }).catch(() => {

                });
        },
        //修改按钮
        updatelist(id,name){
            this.showFristName = true;
            this.disFristName = false;
            this.showTwoName = false;
            this.disButton = false;
            this.fristName = name;
            this.updateId = id;
            this.addType = "updateFrist";
        },
        //创建
        //修改一级数据
        updatelist_tj(){
            if(this.fristName == ""){
                this.$message.error('未选择分类!!');
                return false;
            }
            server.request({
                method: 'post',
                url: '/news/editCategory/',
                data: {
                        id : this.updateId,
                        categoryName : this.fristName
                      }
                }).then(res => {
                    this.fristName = '';
                    this.getname();
                    this.msgSuccess(res.message);
                    this.disFristName = true;
                    this.disButton = true;
            });
        },
        
    },
    //加载前获取数据
    created() {
        this.getname();
    },
}
</script>

<style lang="scss" scoped>
.infoClass{
    .el-row{
        .el-col {
            .left-content{
                .list{
                    position: relative;
                    overflow: hidden;
                    line-height: 44px;
                    padding-left: 15px;
                    &:before{
                            content:"";
                            position: absolute;
                            height: 100%;
                            left: 35px;
                            border-left:black dashed 1px;
                            z-index: 2;
                        }
                    .list-button{
                        float: right;
                        margin-right: 10px;
                        margin-top: -2px;
                        display: none;
                    }
                    .tu{
                        position: relative;
                        svg{
                            color: black;
                            position: absolute;
                            left: 13px;
                            top: 14px;
                            z-index: 2;
                            background-color: white;
                        }
                        h4{
                            padding-left: 40px;
                            position: relative;
                            &:hover{
                                    background-color: #F3F3F3;
                                    transition:all .3s ease 0s;
                                    .list-button{
                                        display: inline-block;
                                    }
                                }
                        }
                    }
                    ul{
                        li{
                            font-size: 14px;
                            list-style: none;
                            position: relative;
                            padding-left: 70px;
                            &:before{
                                content:"";
                                position: absolute;
                                border-bottom:black dashed 1px;
                                width: 40px;
                                top: 22px;
                                left: 20px;
                            }
                            &:hover{
                                background-color: #F3F3F3;
                                transition:all .3s ease 0s;
                                .list-button{
                                        display: inline-block;
                                    }
                            }
                        }
                    }
                }
                .list:first-child{
                    &:before{
                            top: 20px;
                        }
                }
                .list:last-child{
                    &:before{
                            top: -20px;
                        }
                }
            }
            .right-top{
                height: 44px;
                line-height: 44px;
                background-color: #F3F3F3;
                padding-left: 20px;
            }
            .right-content{
                padding-left: 20px;
                margin-top: 30px;
                .el-input{
                    width: 40%;
                }
                .el-button{
                    margin-left: 175px;
                }
            }
        }
    }
}
.infoClass-line{
    border: none;
    border-bottom: solid 1px #F3F3F3;
    margin: 20px -20px;
}
</style>
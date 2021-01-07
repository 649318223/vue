<template>
    <div id="infoDetails">
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="新闻分类：">
                <el-select v-model="form.name" placeholder="请选择" >
                        <el-option
                        v-for="item in category"
                        :key="item.id"
                        :label="item.category_name"
                        :value="item.id">
                        </el-option>
                    </el-select>
            </el-form-item>
            <el-form-item label="新闻标题：">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="缩略图：" id="slt">
                <upLoadImg :img.sync="form.img"/>
            </el-form-item>
            <el-form-item label="发布时间：">
                <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="详细内容：">
                <quill-editor 
                    v-model="form.content" 
                    ref="myQuillEditor" 
                    :options="editorOption" >
                </quill-editor>
            </el-form-item>
            
            
            <el-form-item>
                <el-button type="danger" @click="editInfo()">修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import server from "@/req/request";
import upLoadImg from "@/components/assembly/uploadimg/index.vue";
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

export default {
    name : "InfoDetails",
    components: {
        quillEditor,upLoadImg
    },
    data() {
        return {
            category : [{}],
            form : {
                name : '',
                title : '',
                img : '',
                date : '',
                content : ''
            },
            editorOption: {}
        }
    },
    methods: {
        //修改信息
        editInfo(){
            var row = JSON.parse(sessionStorage.row)
            server.request({
                  method: 'post',
                  url: '/news/editInfo/',
                  data: {
                    id : row.id,
                    categoryId : this.form.name,
                    title : this.form.title,
                    content : this.form.content,
                    imgUrl : this.form.img
                  }
                }).then(res => {
                    console.log(res);
                    this.msgSuccess(res.message);
                });
            console.log(this.form);
        },
        //获取分类以及给控件赋值
        getname(){
            this.getClassName().then(data => { 
                var row;
                if(this.$route.params.row){
                    var row = this.$route.params.row;
                    sessionStorage.row = JSON.stringify(row);
                }
                if(sessionStorage.row){
                    row = JSON.parse(sessionStorage.row);
                    this.form.name = row.categoryId;
                    this.form.title = row.title;
                    this.form.date = this.getTime(row.createDate);
                    this.form.img = row.imgUrl;
                    this.form.content = row.content;
                }
                this.category = data
            })
        },
    },
    created() {
        this.getname();
    },
}
</script>

<style lang="scss" >

    #infoDetails{
        overflow-y: scroll;
        height: 100%;
         #slt{
             display: block;
             
         }
    }
</style>
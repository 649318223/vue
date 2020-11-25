<template>
    <div class="info-index">
        <div class="select" >
                <div class="select-width">
                    <span class="select-label">类型:</span>
                    <el-select v-model="value" placeholder="请选择" >
                        <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.category_name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="select-width">
                    <span class="select-label">日期:</span>
                    <el-date-picker
                    v-model="date1"
                    type="daterange"
                    format="yyyy-MM-dd HH:MM:SS"
                    value-format="yyyy-MM-dd HH:MM:SS"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                <div class="select-width">
                    <span class="select-label">关键字:</span>
                    <el-select v-model="keyword" placeholder="请选择" >
                        <el-option
                        v-for="item in options1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label">
                        </el-option>
                    </el-select>
                </div>
                <div class="select-width">
                    <el-input v-model="input" placeholder="请输入内容"></el-input>
                </div>
                <div class="select-width">
                    <el-button type="danger" @click="getNewsList(1)">搜索</el-button>
                </div>
                <div class="select-width">
                    <el-button type="danger" @click="addNews">新增</el-button>
                </div>
        </div>

        <div class="info-table" v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(225, 225, 225, 0.8)">
             <el-table :data="tableData" border  @selection-change="handleSelectionChange" style="width: 100%" >
                <el-table-column type="selection" width="45" align="center"></el-table-column>
                <el-table-column prop="title" label="标题" content align="center"></el-table-column>
                <el-table-column prop="categoryId" label="类别" width="150" :formatter='formatterList' align="center"></el-table-column>
                <el-table-column prop="content"  label="内容" align="center"></el-table-column>
                <el-table-column prop="createDate" width="150" label="日期" :formatter='toDate'  align="center" ></el-table-column>
                <el-table-column fixed="right" label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <el-button @click="deletelist(scope.row)" type="danger" size="mini">删除</el-button>
                        <el-button @click="editNews(scope.row)" type="success" size="mini">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="info-footer">
                <el-row>
                    <el-button size="mini" @click="deleteAllList">批量删除</el-button>
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange" 
                    :page-size="size"
                    background layout="total,prev, pager, next" :total="total"></el-pagination>
                </el-row>
                
        </div>

          <addNews :flag.sync="showDialog" :opentype="opentype" :editID="editID" @loadingList="loadingList"></addNews>  
          <!-- @close="closeDialog"  关闭回掉-->

    </div>
</template>

<script>
import addNews from "./dialog/addNews.vue";
import {msgCenter} from "@/req/req";
import server from "@/req/request";
export default {
    name : "infoIndex",
    components : {
        addNews
    },
    data() {
        return {
              options: [{}],
                options1: [{
                value: 1,
                label: 'ID'
                }, {
                value: 2,
                label: '标题'
                }],
                value: '',
                keyword : '',
                input: '',
                date1 : '',
                date2 : '',
                tableData: [{}],
                showDialog : false,
                editID : '',
                opentype :'',
                total : 0,
                size : 4,
                loading : false,
                deleteTableList : []
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        },
        //选中行数据
        handleSelectionChange(val) {
            var arrList = val.map(item => item.id);
            this.deleteTableList = arrList;
            //console.log(arrList)
        },
        //删除数据接口
        deleteData(categoryId){
            server.request({
              method: 'post',
              url: '/news/deleteInfo/',
              data: {
                id : categoryId
              }
            }).then(res => {
                this.deleteTableList = [];
                this.loadingList()
            });
        },
        //删除按钮
        deletelist(row) {
            var arr = [];
            arr.push(parseInt(row.id));
            var params = {
                msg : "此操作将永久删除, 是否继续?",
                fn : this.deleteData,
                id : arr
            }
            this.msgCenter(params);
        },
        //删除全部数据 多选
        deleteAllList() {
            if(this.deleteTableList.length < 1){
                this.mesg("请选择数据");
                return false;
            }
            var params = {
                msg : "此操作将永久全部删除, 是否继续?",
                fn : this.deleteData,
                id : this.deleteTableList
            }
            this.msgCenter(params);
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.getNewsList(val);
            console.log(`当前页: ${val}`);
        },
        //打开新增新闻
        addNews() {
            this.opentype = 'add'
            this.showDialog = true;
        },
        //修改新增新闻
        editNews(row) {
            this.editID = row.id;
            this.opentype = 'edit'
            this.showDialog = true;
        },
        //时间格式化   
        toDate(row){
            //console.log(row);
            return this.getTime(row.createDate);
        },
        //关闭回掉
        // closeDialog(){      
        //     this.showDialog = false;
        // },
        //回掉加载列表
        loadingList(){
            this.getNewsList(1);
        },
        //获取分类
        getname(){
    //         server.request({
    //           method: 'post',
    //           url: '/news/getCategoryAll/',
    //           async: false,
    //           data: {}
    //         }).then(res => {
    //             var data = res.data;
    //             this.options = data
    //         });
            this.getClassName().then(data => { 
                this.options = data;
            })   //全局调用
        },
        searchData(num){
            var listData = {
                categoryId: "",
                startTiem: "",
                endTime: "",
                title: "",
                id: "",
                pageNumber: num,
                pageSize: this.size
            }
            if(this.value != ''){
                listData.categoryId = this.value;
            }
            if(this.date1 != ''){
                listData.startTiem = this.date1[0];
                listData.endTime = this.date1[1];
            }
            if(this.keyword == 'ID'){
                listData.id = this.input;
            }
            if(this.keyword == '标题'){
                listData.title = this.input;
            }
            return listData
        },
        formatterList(row){
           if(row.categoryId != undefined && this.options.length>0){
                var listType =this.options;
                var getListName = listType.filter(item =>  item.id == row.categoryId)[0];
                return getListName.category_name;
           }
            
        },
        //获取新闻列表
        getNewsList(num){
            this.loading = true;
            var listData = this.searchData(num);
            //console.log(listData);
            server.request({
              method: 'post',
              url: '/news/getList/',
              data: listData
            }).then(res => {
                var data = res.data.data;
                this.tableData = data;
                this.total = res.data.total;
                this.loading = false;
            });
        },
    },
    mounted() {
        this.getname(); //获取分类
        this.getNewsList(1); //获取新闻列表
    },
}
</script>

<style lang="scss" scope>
.info-index{
    height: 100%;
    .select{
        .select-width{
            width: 15%;
            display: inline-block;
            margin-right: 10px;
            .select-label{
                text-align: right;
                vertical-align: middle;
                float: left;
                font-size: 14px;
                color: #606266;
                line-height: 40px;
                padding: 0 12px 0 0;
                box-sizing: border-box;
            }
            .el-select{
                width: 70%;
            }
        }
        .select-width:nth-of-type(2){
            width: 28%;
            .el-range-editor.el-input__inner{
                width: 84%;
            }
        }
        .select-width:nth-of-type(3){
            width: 17%;
           .el-select{
                width: 65%;
            }
        }
        .select-width:nth-of-type(4){
            width: 13%;
        }
        .select-width:nth-of-type(5){
            width: 13%;
        }
        .select-width:nth-of-type(6){
            width: 6%;
            float: right;
        }

    }
    .info-table{
        margin-top: 20px;
        height: calc(100% - 122px);
    }
    .info-footer{
        margin-top: 20px;
        .el-button{
            margin-top: 2px;
        }
        .el-pagination{
            display: inline-block;
            float:right;
            margin-right: -10px;
        }
    }
}
</style>
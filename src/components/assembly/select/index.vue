<!--
 * @Descripttion: 对select下拉框进行封装
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
    <el-select v-model="value" placeholder="请选择" @change="getSelectData($event)">
        <el-option
        v-for="item in config.options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
    </el-select>         
</template>
<script>
export default {
    name : "selectVue",
    data() {
        return {
            //options: [{}],
            value: ''
        }
    },
    props : {
        config : {
            type : Object,
            default : ()=>{}
        },
        selectData : {
            type : String,
            default : ''
        },
    },
    watch: {
        selectData :{
            handler(newValue,oldValue){
                this.value = newValue;
            },
            immediate : true    //组件初始化马上监听
        },
    },
    methods: {
        getSelectData(e){
            //console.log(e)
            this.$emit("update:selectData",e);
        }
    },
    mounted() {
        
    },
}
</script>

<style lang="scss" >

</style>
<!--
 * @Descripttion: 对省市区街道进行封装
 引用路径   import region from "@/components/assembly/region/index.vue";
 页面代码   <region :regConfig="['province','city','area']" :regData.sync="regData"></region>    
 传入参数   
 * @version: 1.0
 * @Author: 马昭
 * @Date: 2021-02-23 04:07:35
 * @LastEditTime: 2021-02-28 21:43:41
-->
<template>
    <el-row >
      <el-col :span="width" v-if="cityConfig.province">
        <el-select v-model="cityValue.province" placeholder="请选择" @change="getCityList($event)">
            <el-option v-for="item in cityList.province" :key="item.PROVINCE_ID" :label="item.PROVINCE_NAME" :value="item.PROVINCE_CODE"> </el-option>
        </el-select>
      </el-col>
      <el-col :span="width" v-if="cityConfig.city">
        <el-select v-model="cityValue.city" placeholder="请选择" @change="getAreaList($event)">
            <el-option v-for="item in cityList.city" :key="item.CITY_ID" :label="item.CITY_NAME" :value="item.CITY_CODE"> </el-option>
        </el-select>
      </el-col>
      <el-col :span="width" v-if="cityConfig.area">
        <el-select v-model="cityValue.area" placeholder="请选择" @change="getStreetList($event)">
            <el-option v-for="item in cityList.area" :key="item.AREA_ID" :label="item.AREA_NAME" :value="item.AREA_CODE"> </el-option>
        </el-select>
      </el-col>
      <el-col :span="width" v-if="cityConfig.street">
        <el-select v-model="cityValue.street" placeholder="请选择" @change="getLastData($event)">
            <el-option v-for="item in cityList.street" :key="item.STREET_ID" :label="item.STREET_NAME" :value="item.STREET_CODE"> </el-option>
        </el-select>
      </el-col>
    </el-row>
</template>
<script>
import {getCity} from "@/api/user.js";
export default {
    name : "region",
    data() {
        return {
            cityList : {
                province : [],
                city : [],
                area : [],
                street : []
            },
            cityValue : {
                province : '',
                city : '',
                area : '',
                street : ''
            },
            cityConfig :{
                province : false,
                city : false,
                area : false,
                street : false
            },
            width : 0
        }
    },
    props : {
        regData : {
            type : Object,
            default : ()=>{}
        },
        regConfig : {
            type : Array,
            default : ()=>[]
        },
    },
    watch: {
        
    },
    methods: {
      /* 
        获取要配置的省市区参数
      */
      getConfig(){
          var arr = this.regConfig;
          this.width = 24/arr.length; //调节输入框长度
          arr.forEach(item => {
            this.cityConfig[item] = true;
          });
      },
      /* 
        获取省市区数据函数
      */
      getAllData(cityData){
          getCity(cityData).then(res => {
            var data = res.data.data;
            this.cityList[cityData.type] = data;
          });
          this.$emit("update:regData",this.cityValue);
      },
      /* 
        街道返回最后数据
      */
      getLastData(e){
          this.$emit("update:regData",this.cityValue);
      },
      /* 
        获取省级名称
      */
        getProvinceList(){
          var cityData = {
            type : "province"
          }
          this.getAllData(cityData);
        },
        /* 
          获取市级名称
        */
        getCityList(e){
          var cityData = {
            type : "city",
            province_code : e
          }
          this.emptyData(cityData.type);
          this.getAllData(cityData);
        },
        /* 
          获取区级名称
        */
        getAreaList(e){
          var cityData = {
            type : "area",
            city_code : e
          }
          this.emptyData(cityData.type);
          this.getAllData(cityData);
        },
        /* 
          获取街道级名称
        */
        getStreetList(e){
          var cityData = {
            type : "street",
            area_code : e
          }
          this.emptyData(cityData.type);
          this.getAllData(cityData);
        },
        /* 
          数据置空
        */
       emptyData(params){
         var arr = {
           city : ["city","area","street"],
           area : ["area","street"],
           street : ["street"]
         }
         var arrObj = arr[params];
         arrObj.forEach(item => {
           this.cityValue[item] = '';
         });
       }
       
    },
    created() {
      this.getProvinceList();
      this.getConfig();
    }
}
</script>

<style lang="scss" >

</style>
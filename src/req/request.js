/*
 * @Descripttion: 
 * @version: 
 * @Author: sch
 * @Date: 2020-11-29 16:53:43
 * @LastEditors: sch
 * @LastEditTime: 2021-03-02 17:49:10
 */
import axios from 'axios';
import {Message} from 'element-ui';

const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devApi';
const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    baseURL: BASEURL,
    timeout: 5000
})

//请求数据之前
service.interceptors.request.use( config => {
    //console.log(config);
    config.headers.Tokey = sessionStorage.token;
    config.headers.UserName = sessionStorage.userName;
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})

//请求数据之后
service.interceptors.response.use(response => {
    let data = response.data;
    if(data.resCode === 0){
        return response.data;
    }else{
        Message.error(data.message)
        return Promise.reject(data);
    }
    
}, error => {
    console.log(error);
    return Promise.reject();
})

export default service;
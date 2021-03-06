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
    console.log(config);
    config.headers.token = "qqqqqqqqqq";
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
        //Message.error(data.message)
        return Promise.reject(data);
    }
    
}, error => {
    console.log(error);
    return Promise.reject();
})

export default service;
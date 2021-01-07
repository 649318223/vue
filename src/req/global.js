//引用
import {Message,MessageBox} from 'element-ui';
import server from "@/req/request";
export default{
    install(Vue,options){
         //居中弹出框
        Vue.prototype.msgCenter =function(params){
            MessageBox.confirm(params.msg, '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                    Message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    if(params.fn){  //有函数执行函数
                        params.fn(params.id)
                    }
            }).catch(() => {
                
            });
        }
        //信息提示
        Vue.prototype.msgSuccess =function(msg){
                Message({
                    type: 'success',
                    message: msg
                });
        }
        //信息弹出框
        Vue.prototype.mesg =function(msg){
            MessageBox.alert('这是一段内容', '温馨提示',{
                title: '温馨提示',
                message: msg
            });
    }
        //获取分类  废弃    采用同步
        Vue.prototype.getClassName =async function(){
            var data;
            await server.request({
              method: 'post',
              url: '/news/getCategoryAll/',
              async: false,
              data: {}
            }).then(res => {
                data = res.data;
            });
            return data;
        }
        //获取当前时间
        Vue.prototype.myTime = function (fmt) {
            var time = new Date();
            var o = {
                "M+": time.getMonth() + 1, //月份 
                "d+": time.getDate(), //日 
                "H+": time.getHours(), //小时 
                "m+": time.getMinutes(), //分 
                "s+": time.getSeconds(), //秒 
                "q+": Math.floor((time.getMonth() + 3) / 3), //季度 
                "S": time.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
        //时间戳转换方法    date:时间戳数字
        Vue.prototype.getTime = function (date) {
            var date = new Date(parseInt(date)*1000);
            var YY = date.getFullYear() + '-';
            var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
            var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            return YY + MM + DD +" "+hh + mm + ss;
        }
        //获取七牛云TOKEN
        Vue.prototype.getqnyToken = async function () {
            var data;
            await server.request({
                method: 'post',
                url: '/uploadImgToken/',
                async: false,
                data: {
                       'accesskey' : 'VkhIT9vyiSPZX3rV0dEkxSShdLpsbIN0Lw38TThU',
                       'secretkey' : 'NiPodDIUjVGrPFIdtbAuiCjLRbUKLua2vBlrlDYD',
                       'buckety' : 'mzuploadimg'
                }
                }).then(res => {
                     data = res;
                });
                return data;
        }
        Vue.prototype.globalNewsList = function(num){
            this.loading = true;
            server.request({
              method: 'post',
              url: '/news/getList/',
              data: {
                categoryId: "",
                startTiem: "",
                endTime: "",
                title: "",
                id: "",
                pageNumber: num,
                pageSize: this.size
              }
            }).then(res => {
                var data = res.data.data;
                var listType =this.options;
                //格式化日期 分类
                for(var i = 0; i<data.length; i++){
                    data[i].createDate = this.getTime(data[i].createDate);
                    var getListName = listType.filter(item =>  item.id == data[i].categoryId )[0];
                    data[i].categoryId = getListName.category_name;
                }
                
            });
        }
        
    }
}
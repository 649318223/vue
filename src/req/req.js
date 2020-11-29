//引用
import {Message,MessageBox} from 'element-ui';
    //过滤特殊字符
    export function verification(s) {
            var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&mdash;—|{}【】‘；：”“'。，、？]")
            var rs = "";
            for (var i = 0; i < s.length; i++) {
                    rs = rs + s.substr(i, 1).replace(pattern, '');
                }
            return rs;
        }
    //弹出框
    export function mesg(msg) {
        //console.log(msg)
        MessageBox.alert('这是一段内容', '温馨提示',{
            title: '温馨提示',
            message: msg
        });
    }
    //获取token
    export function getToken() {
        //console.log(sessionStorage.token)
        return sessionStorage.token;
    }
    
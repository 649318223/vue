<template>
  <div id="login">
      <div class="login">
        <ul class="top">
          <li v-for="(item,itemIndex) in logintext" :key="item.id" :class="{'active':itemIndex===isActive}" @click="dynamic(item.id)">{{item.name}}</li>
        </ul>
          <div class="land" v-show="showland">
            <div><span>账号：</span><input type="text" placeholder="请输入账号"  v-model="loginInfo.user" > </div>
            <div><span>密码：</span><input type="text" placeholder="请输入密码" v-model="loginInfo.password" ></div>
            <div><span>验证码：</span><input type="text" placeholder="请输入验证码" v-model="loginInfo.code" ><button class="code">获取验证码</button></div>
            <button class="dl" @click="login()">登陆</button>
          </div>
          <div class="reg" v-show="showreg">
            <div><span>账号：</span><input type="text" placeholder="请输入账号" v-model="regInfo.user" >
            <span v-show="regmsg[0].show" class="msg">{{regmsg[0].msg}}</span></div>
            <div><span>密码：</span><input type="text" placeholder="请输入密码" v-model="regInfo.password">
            <span v-show="regmsg[1].show" class="msg">{{regmsg[1].msg}}</span></div>
            <div><span>确认密码：</span><input type="text" placeholder="请输入确认密码" v-model="regInfo.twoPassword">
            <span v-show="regmsg[2].show" class="msg">{{regmsg[2].msg}}</span></div>
            <div><span>验证码：</span><input type="text" placeholder="请输入验证码" v-model="regInfo.code">
            <span v-show="regmsg[3].show" class="msg">{{regmsg[3].msg}}</span></div>
            <button class="dl" @click="register()">注册</button>
          </div>
      </div>
  </div>
</template>

<script>
import {reactive,ref} from "@vue/composition-api";
import {verification,mesg} from "@/req/req";
import {Message,MessageBox} from 'element-ui';
export default {
  name: "login",
  components: {
   
  },
  setup(props, context) {
    //变量声明
    const logintext = reactive([{
        id : 0,name : "登陆"
      },{
        id : 1,name : "注册"
      }])
    const isActive = ref(0)
    const showland = ref(true)
    const showreg = ref(false)
    const loginInfo = reactive({ //登陆信息
        user : "",
        password : "",
        code : ""
      })
    const regInfo = reactive({   //注册信息
        user : "",
        password : "",
        twoPassword : "",
        code : ""
      })
    const regmsg = reactive([{ show : false,msg : ""},    //注册提示
                { show : false,msg : ""},
                { show : false,msg : ""},
                { show : false,msg : ""}])  

    //函数区域
    const  dynamic = ((id) =>{  
        isActive.value = id;
        if(id == 0){
          showland.value = true;
          showreg.value = false;
        }else{
          showland.value = false;
          showreg.value = true;
        }
    })
    //登陆验证
    const isNotNull = (() =>{ 
      if(loginInfo.user == ""){
        //context.$alert("用户名不能为空", "温馨提示");
         mesg("用户名不能为空"); 
         return false;  // 
      }
      if(loginInfo.password == ""){
        //  $alert("密码不能为空", "温馨提示");
         mesg("密码不能为空"); 
         return false;
      }
      if(loginInfo.code == ""){
        //  $alert("验证码不能为空", "温馨提示");
         mesg("验证码不能为空"); 
         return false;
      }
      return true;
    })
      //循环处理信息
    const looparr =  ((num,msg) =>{
        for(var i = 0; i<regmsg.length; i++){
          if(i == num ){
            regmsg[num].show = true;
            regmsg[num].msg = msg
          }else{
            regmsg[i].show = false;
            regmsg[i].msg = ""
          }
        }
    })
    //注册验证
    const regIsNotNull = (() =>{
        if(regInfo.user == ""){
          looparr(0,"请输入用户名")
          return false;
        }else if(regInfo.password == ""){
          looparr(1,"请输入密码")
           return false;
        }else if(regInfo.twoPassword == ""){
          looparr(2,"请输入确认密码")
           return false;
        }else if(regInfo.twoPassword != regInfo.password){
          looparr(2,"两次密码不同")
           return false;
        }else if(regInfo.code == ""){
          looparr(3,"请输入验证码")
           return false;
        }else{
          looparr(4,"")
        }
       return true;
    })
    //登陆
    const login = (() =>{  
      //console.log(regmsg);
      isNotNull();
      if(isNotNull()){
        // $alert("验证成功", "温馨提示");
        mesg("验证成功"); 
      }
    })
    //注册
    const register = (() =>{
        regIsNotNull();
    })

    //返回数据
    return{
      logintext,
      isActive,
      showland,
      showreg,
      loginInfo,
      regInfo,
      regmsg,
      dynamic,
      login,
      register
    }
  }
  // data() {
  //   return {
  //     logintext : [{
  //       id : 0,name : "登陆"
  //     },{
  //       id : 1,name : "注册"
  //     }],
  //     isActive:0,//切换样式
  //     showland : true,  //登陆显隐
  //     showreg : false,   //注册显隐
  //     loginInfo : { //登陆信息
  //       user : "",
  //       password : "",
  //       code : ""
  //     },
  //     regInfo : {   //注册信息
  //       user : "",
  //       password : "",
  //       twoPassword : "",
  //       code : ""
  //     },
  //     regmsg : [{ show : false,msg : ""},
  //               { show : false,msg : ""},
  //               { show : false,msg : ""},
  //               { show : false,msg : ""}]
  //   }
  // },
  // methods: {
  //   //登陆注册切换
  //    dynamic(id) {  
  //       this.isActive = id;
  //       if(id == 0){
  //         this.showland = true;
  //         this.showreg = false;
  //       }else{
  //         this.showland = false;
  //         this.showreg = true;
  //       }
  //   },
  //   //登陆非空验证
  //   isNotNull(){  
  //     if(this.loginInfo.user == ""){
  //        this.$alert("用户名不能为空", "温馨提示");
  //        return false;  // mesg("ss")
  //     }
  //     if(this.loginInfo.password == ""){
  //        this.$alert("密码不能为空", "温馨提示");
  //        return false;
  //     }
  //     if(this.loginInfo.code == ""){
  //        this.$alert("验证码不能为空", "温馨提示");
  //        return false;
  //     }
  //     return true;
  //   },
  //   //循环处理信息
  //   looparr(num,msg){
  //       for(var i = 0; i<this.regmsg.length; i++){
  //         if(i == num ){
  //           this.regmsg[num].show = true;
  //           this.regmsg[num].msg = msg
  //         }else{
  //           this.regmsg[i].show = false;
  //           this.regmsg[i].msg = ""
  //         }
  //       }
  //   },
  //   //注册验证
  //   regIsNotNull(){
  //       if(this.regInfo.user == ""){
  //         this.looparr(0,"请输入用户名")
  //         return false;
  //       }else if(this.regInfo.password == ""){
  //         this.looparr(1,"请输入密码")
  //          return false;
  //       }else if(this.regInfo.twoPassword == ""){
  //         this.looparr(2,"请输入确认密码")
  //          return false;
  //       }else if(this.regInfo.twoPassword != this.regInfo.password){
  //         this.looparr(2,"两次密码不同")
  //          return false;
  //       }else if(this.regInfo.code == ""){
  //         this.looparr(3,"请输入验证码")
  //          return false;
  //       }else{
  //         this.regmsg = [{ show : false,msg : ""},
  //               { show : false,msg : ""},
  //               { show : false,msg : ""},
  //               { show : false,msg : ""}]
  //       }
  //      return true;
  //   },
  //   //登陆
  //   login(){  
  //     console.log(this.regmsg);
  //     this.isNotNull();
  //     if(this.isNotNull()){
  //       this.$alert("验证成功", "温馨提示");
  //     }
  //   },
  //   register(){
  //       this.regIsNotNull();
  //   }
  // }
};
</script>

<style lang="scss" scoped>
  #login{
    .login{
      width: 320px;
      height: 500px;
      margin: auto;
      .top{
        text-align: center;
        padding: 0;
        li{
              list-style: none;
              display: inline-block;
              width: 80px;
              height: 50px;
          }
        .active{
          color: red;
        }
      }
      span{
          width: 75px;
          height: 30px;
          text-align: right;
          display: inline-block;
          line-height: 30px;
          font-size: 15px;
        }
        div{
          margin-top: 10px;
        }
        div input{
          width: 195px;
          height: 30px;
          box-sizing: border-box;
          vertical-align:top;
          padding-left: 5px;
        }
      .dl{
          width: 160px;
          height: 30px;
          background-color: red;
          color: white;
          border: 0;
          border-radius: 5px;
          margin-top: 10px;
          margin-left: 75px;
        }
      .land{
        div:nth-child(3) input {
          width: 100px;
        }
        .code{
          margin-left: 10px;
          width: 85px;
          height: 30px;
          background-color: #67C23D;
          border: none;
          border-radius: 5px;
          color: white;
          box-sizing: border-box;
          vertical-align:top;
        }
      }
      .msg{
          width: 146px;
          display: inline-block;
          font-size: 12px;
          height: 16px;
          line-height: 16px;
          color: red;
          margin-left: 75px;
          text-align: left;
      }
    }
}
</style>

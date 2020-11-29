<template>
  <div id="login">
      <div class="login">
        <ul class="top">
          <li v-for="(item,itemIndex) in logintext" :key="item.id" :class="{'active':itemIndex===isActive}" @click="dynamic(item.id)">{{item.name}}</li>
        </ul>
          <div class="land" v-show="showland">
            <div><span>账号：</span><input type="text" placeholder="请输入账号"  v-model="loginInfo.user" > </div>
            <div><span>密码：</span><input type="text" placeholder="请输入密码" v-model="loginInfo.password" ></div>
            <div><span>验证码：</span><input type="text" placeholder="请输入验证码" v-model="loginInfo.code" >
            <button :disabled="getCode.status" class="code" @click="getRegCode('login')" >{{getCode.text}}</button></div>
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
            <button :disabled="getCode.status" class="code" @click="getRegCode('register')" >{{getCode.text}}</button>
            <span v-show="regmsg[3].show" class="msg">{{regmsg[3].msg}}</span></div>
            <button class="dl" @click="register()">注册</button>
          </div>
      </div>
  </div>
</template>

<script>
import server from "@/req/request";
import {verification,mesg} from "@/req/req";
export default {
  name: "login",
  components: {
   
  },
  data() {
    return {
      logintext : [{
        id : 0,name : "登陆"
      },{
        id : 1,name : "注册"
      }],
      isActive:0,//切换样式
      showland : true,  //登陆显隐
      showreg : false,   //注册显隐
      loginInfo : { //登陆信息
        user : "649318223@qq.com",
        password : "",
        code : ""
      },
      regmsg : [{ show : false,msg : ""},
                { show : false,msg : ""},
                { show : false,msg : ""},
                { show : false,msg : ""}],
      regInfo : {   //注册信息
        user : "649318223@qq.com",
        password : "",
        twoPassword : "",
        code : ""
      },
      getCode : {
        status : false,
        text : "获取验证码"
      }
    }
  },
  methods: {
    //登陆注册切换
     dynamic(id) {  
        this.isActive = id;
        if(id == 0){
          this.showland = true;
          this.showreg = false;
          this.regInfo = {   //注册信息
            user : "",
            password : "",
            twoPassword : "",
            code : ""
          };
        }else{
          this.showland = false;
          this.showreg = true;
          this.loginInfo = { //登陆信息
            user : "",
            password : "",
            code : ""
          };
        }
    },
    //登陆非空验证
    isNotNull(){  
      
      if(this.loginInfo.user == ""){
         this.$alert("用户名不能为空", "温馨提示");
         return false;  // mesg("ss")
      }
      if(this.loginInfo.password == ""){
         this.$alert("密码不能为空", "温馨提示");
         return false;
      }
      if(this.loginInfo.code == ""){
         this.$alert("验证码不能为空", "温馨提示");
         return false;
      }
      return true;
    },
    //循环处理信息
    looparr(num,msg){
        for(var i = 0; i<this.regmsg.length; i++){
          if(i == num ){
            this.regmsg[num].show = true;
            this.regmsg[num].msg = msg
          }else{
            this.regmsg[i].show = false;
            this.regmsg[i].msg = ""
          }
        }
    },
    //注册验证
    regIsNotNull(){
        if(this.regInfo.user == ""){
          this.looparr(0,"请输入用户名")
          return false;
        }else if(this.regInfo.password == ""){
          this.looparr(1,"请输入密码")
           return false;
        }else if(this.regInfo.twoPassword == ""){
          this.looparr(2,"请输入确认密码")
           return false;
        }else if(this.regInfo.twoPassword != this.regInfo.password){
          this.looparr(2,"两次密码不一致")
           return false;
        }else if(this.regInfo.code == ""){
          this.looparr(3,"请输入验证码")
           return false;
        }else{
          this.regmsg = [{ show : false,msg : ""},
                { show : false,msg : ""},
                { show : false,msg : ""},
                { show : false,msg : ""}]
        }
       return true;
    },
    //获取验证码
    getRegCode(loginType){
      var user = "";
      if(loginType == "login"){
        if(this.loginInfo.user == ""){
            mesg("请输入用户名")
            return false;
        }
        user = this.loginInfo.user;
      }else{
        if(this.regInfo.user == ""){
            this.looparr(0,"请输入用户名")
            return false;
        }
        user = this.regInfo.user;
      }
      
      this.getCode.status = true;
      this.getCode.text = "发送中";
      setTimeout(()=>{
        server.request({
          method: 'post',
          url: '/getSms/',
          data: {
            username : user,
            module : loginType   //register   //login
          }
        }).then(res => {
            console.log(res);
            var code = res.message.split("：")[1];
            console.log(code);
            this.countDown();
        });
      },2000)
        
    },
    countDown(){
      var num = 10;
      var cleartime = setInterval(() => {
        console.log(num)
        if(num == 0){
          this.getCode.status = false;
          this.getCode.text = "再次获取";
          clearInterval(cleartime);
        }else{
          this.getCode.text = `倒计时${num}秒`;
          num--;
        }
      }, 1000);
    },
    //登陆
    login(){  
      if(this.isNotNull()){
            server.request({
              method: 'post',
              url: '/login/',
              data: {
                username: this.loginInfo.user,
                password: this.loginInfo.password,
                code: this.loginInfo.code 
              }
            }).then(res => {
              if(res.resCode == 0){
                console.log(res);
                sessionStorage.token = res.data.token;
                sessionStorage.userName = res.data.username;
                this.$router.push({
                  name : "Index"
                })
              }
            },
            err => {
              mesg(err.message);
            });
        }
    },
    //注册
    register(){
        if(this.regIsNotNull()){
            server.request({
              method: 'post',
              url: '/register/',
              data: {
                username: this.regInfo.user,
                password: this.regInfo.password,
                code: this.regInfo.code 
              }
            }).then(res => {
              if(res.resCode == 0){
                mesg(res.message);
                this.dynamic(0);
              }
            },
            err => {
              mesg(err.message);
            });
        }
    }
  }
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
      .reg{
        div:nth-child(4) input {
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

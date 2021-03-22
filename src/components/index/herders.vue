<template>
  <div id="herders">
    <div class="head-left" @click="change_nav()">
      <svg-iocn  iconClass="menu" className="menu"></svg-iocn>
    </div>
    <div class="head-right">
      <img src="../../assets/user.png" alt="">
      <div class="username">{{getUserName}}</div>
      <div class="loginOut" @click="loginOut()">
          <svg-iocn  iconClass="LoginOut" className="LoginOut"></svg-iocn>
      </div>
      
    </div>
  </div>
</template>
<script>
export default {
    name : "herders",
    components: {
   
    },
    data() {
      return {
        navState : false,
        userName : ""
      }
    },
    methods: {
      change_nav(){
        this.$store.commit('set_nav')
      },
      loginOut(){
        sessionStorage.clear();
         this.$router.push({
              name : "Login"
          })
      }
    },
    computed: {
      getUserName(){
        return sessionStorage.userName;
      }
    },
}
</script>
<style lang="scss" scoped>
@import "../../styles/config.scss";
.colse{
  #herders{
    width: calc(100% - 64px);
    left : 64px;
    
  }
}
#herders{
    position: fixed;
    left: $navWidth;
    height: 75px;
    width: calc(100% - 250px);
    background-color: white;
    transition:all  ease 1s;
    .head-left{
      float: left;
      height: 100%;
      line-height: 75px;
      padding: 0 20px;
      svg{
        color: black;
        font-size: 20px;
        cursor:pointer;
      }
    }
    .head-right{
      float: right;
      height: 100%;
      div{
        display: inline-block;
        height: 100%;
        line-height: 75px;
      }
      .loginOut{
        padding: 0 30px;
        line-height: 85px;
        float: right;
        border-left: solid 1px #F5F5F5;
      }
      .username{
        margin: 0 15px;
      }
      img{
        width: 50px;
        height: 50px;
        float: left;
        margin-top: 12px;
        border-radius: 50%;
      }
      svg{
        color: #808080;
        font-size: 21px;
        cursor:pointer;
      }
    }
}
</style>

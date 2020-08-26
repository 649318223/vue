<template>
  <div id="Nav">
    <div class="navimg">
        <img src="../../assets/logo.png" alt="">
    </div>
    
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      :collapse="set_nav"
      @close="handleClose"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#ffd04b"
      router>

      <template v-for="(item,index) in listMeut">
        <el-submenu :key="item.id" :index="index+''">
          <!-- 一级菜单 -->
          <template slot="title">
            <!-- <i class="el-icon-location"></i> -->
            
            <svg-iocn  :iconClass="item.meta.iocn"  :className="item.meta.iocn"></svg-iocn>
            <span>{{item.meta.name}}</span>
          </template>
          <!-- 二级菜单 -->
            <el-menu-item v-for="(subItem,index) in item.children" :key="subItem.id" :index="subItem.path">{{subItem.meta.name}}</el-menu-item>
      
          <!-- <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu> -->

        </el-submenu>
      </template>

    </el-menu>
    
  </div>
</template>
<script>
export default {
    name : "Nav",
    components: {
      
    },
    data() {
      return {
        listMeut : [{}],
        isCollapse : false
      }
    },
    methods: {
      getNavList(){
        this.listMeut = this.$router.options.routes;
        console.log(this.listMeut);
        this.$store.commit('set_count',100)
      },
      handleOpen(key, keyPath) {
        //console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        //console.log(key, keyPath);
      },
      
    },
     created() {
        this.getNavList()
    },
    computed: {
      set_nav(){
        return this.$store.state.head.isCollapse;
      }
    }
}
</script>
<style lang="scss" scoped>
@import "../../styles/config.scss";
.colse{
  #Nav{
    width: 64px;
  }
}
#Nav{
    position: fixed;
    width: $navWidth;
    height: 100%;
    background-color: #434A50;
    transition:all  ease 1s;
    svg{
      margin-right: 10px;
      color: white;
    }
    .navimg{
      text-align: center;
      margin: 10px auto;
      img{
        width: 80%;
      }
    }
    
}
</style>

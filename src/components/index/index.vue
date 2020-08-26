<template>
  <div id="index" :class='on_off ? "colse" :"open"'>
        <Nav/>
        <Herders/>
        <Content/>  

  </div>
</template>
<script>
import Nav from "./nav.vue";
import Herders from "./herders";
import Content from "./content";
export default {
    name : "index",
    components: {
        Nav,Herders,Content
    },
    computed: {
      on_off(){
        return this.$store.state.head.isCollapse;
      }
    },
}
</script>
<style lang="scss" scoped>
#index{
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #F7F7F7;
}
</style>

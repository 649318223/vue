<template>
  <div id="Content">
    <router-view />
    
  </div>
</template>
<script>
export default {
    name : "Content",
    components: {
   
    }
}
</script>
<style lang="scss" >
.colse{
  #Content{
    width: calc(100% - 104px);
    margin-left: 84px;
  }
}
#Content{
    width: calc(100% - 290px);
    height: calc(100% - 115px);
    box-sizing: border-box;
    margin-top: 95px;
    background-color: white;
    margin-left: 270px;
    padding: 20px;
    transition:all  ease 1s;
}
</style>

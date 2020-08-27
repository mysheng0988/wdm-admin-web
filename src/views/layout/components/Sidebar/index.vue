<template>
  <div>
    <div class="logo-box" v-show="!isCollapse">
      <svg-icon icon-class="wdm-logo" class-name="total-icon"></svg-icon>
    </div>
   <scroll-bar>
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#00D232"
      text-color="#ffffff"
      active-text-color="#409EFF"
    >
        
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
     </scroll-bar>
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'
export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'sidebar',
      'routers'
    ]),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  data(){
    return{
     
    }
  }
}
</script>
<style  scoped>
  .logo-box{
    width: 180px;
    height: 90px;
    margin:0;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    letter-spacing:2px;
    background: #00D232;
    border-bottom: 1px solid #fff;
    color: #409EFF;
  }
  .logo-box .total-icon{
    width: 180px;
    height: 90px;
  }
  .img{
    width: 140px;
    height: 85px;
    padding: 0;
    margin: 0;
    vertical-align: center;
    overflow: hidden;
  }
</style>

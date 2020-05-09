<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <div class="screenfull"  @click="clickFullscreen">
       <svg-icon :icon-class="isFullscreen?'unscreenfull':'screenfull'"  class-name="screenfull-icon"></svg-icon>
    </div>
    
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <!-- <el-image class="user-avatar" :src="avatar"/> -->
         <svg-icon icon-class="administrator" class-name="user-avatar" v-if="info.roleId=='13'"></svg-icon>
         <svg-icon icon-class="doctor" class-name="user-avatar" v-else></svg-icon>
        <i class="el-icon-caret-bottom"></i>
        <p>{{name}}</p>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <!-- <el-dropdown-item  divided>
            <p>修改密码</p>
        </el-dropdown-item> -->
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { Loading } from 'element-ui';
import screenfull from 'screenfull'
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name',
      "info"
    ])
  },
  data(){
      return {
        isFullscreen: false
      }
    },
  created(){
  
  },
  methods: {
    clickFullscreen(){
        if (!screenfull.isEnabled) {
          this.$message({
            message: 'you browser can not work',
            type: 'warning'
          })
          return false
        }
        this.isFullscreen=!screenfull.isFullscreen;
        screenfull.toggle()
      },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      const loading =Loading.service({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.8)'
        });
      this.$store.dispatch('LogOut').then(res => {
        loading.close();
        if(res.code==200){
          sessionStorage.clear();
           location.reload()
        }
      }).catch(err=>{
         loading.close();
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 150px;
    top: 12px;
    color: #999;
    .screenfull-icon{
        width: 30px;
        height: 30px;
    }
    
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      position: relative;
      .user-avatar {
        width: 30px;
        height: 30px;
        margin: 0 5px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 18px;
        font-size: 12px;
      }
    }
  }
}
</style>


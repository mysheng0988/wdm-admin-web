<template>
  <el-tabs type="border-card" v-model="activePath" class="tabs"  closable @tab-remove="tabRemove" @tab-click="tabClick()">
    <el-tab-pane
      class="tab-pane-box"
     v-for="item in tabs" 
      :key="item.index"
      :name="item.path"
    >
    <span slot="label"><svg-icon icon-class="dividing-icon" ></svg-icon> {{item.name}}</span>
    </el-tab-pane>
  </el-tabs>
</template>

<script>

    export default {
      name: "tabs",
      computed: {
        tabs () {
          return this.$store.state.user.tabs
        },
        activePath: {
          get () {
            return this.$store.state.user.activePath
          },
          set (val) {
            this.$store.commit('SET_ACTIVE', val)
          }
        }
      },
      watch: {
        '$route' (to) {
          this.initPath(to)
        }
      },
      mounted () {
        this.initPath(this.$route)
      },
      methods: {
        initPath(obj){
           let tabObj={};
          let param="";
          let name="";
          if(obj.query.name){
            name="-"+obj.query.name;
          }
          tabObj.name=obj.meta.title+name;
          let query=obj.query;
          if(JSON.stringify(query)!="{}"){
              param="?"+this.objToParam(query);
          }

          tabObj.path=obj.path+param;
          if(this.notRepeat(tabObj)){
            this.$store.commit('SET_TABS',tabObj);
          }
          this.$store.commit('SET_ACTIVE',tabObj.path)
        },
        objToParam(data) {
          let _result = [];
          for (let key in data) {
            let value = data[key];
            if (value.constructor == Array) {
              value.forEach(function(_value) {
                _result.push(key + "=" + _value);
              });
            } else {
              _result.push(key + '=' + value);
            }
          }
          return _result.join('&');
        },
        notRepeat(tabObj){
          let tabs=this.tabs;
          for(let x=0;x<tabs.length;x++){
            if(tabObj.path===tabs[x].path){
              return false;
            }
          }
          return true;
        },
        tabClick(){
          this.$router.push(this.activePath)
        },
        tabRemove (targetName) {
          if (targetName === '/home') {
            return
          }
          this.$store.commit('delete_tabs', targetName)
          if (this.activePath === targetName) {
            // 设置当前激活的路由
            if (this.tabs && this.tabs.length>0) {
              this.$store.commit('SET_ACTIVE', this.tabs[this.tabs.length - 1].path)
              this.$router.push({path: this.activePath})
            } else {
              this.$router.push({path: '/'})
            }
          }
        }
      }
    }
</script>

<style scoped>
.tabs{
  height: 50px;
  margin: 0;
  font-weight: bold
}
/deep/ .el-tabs__item{
   padding: 0px 20px 0 5px;
}
.dividing-icon{
  width: 15px;
  height: 15px;
  font-weight: bold;
}
</style>

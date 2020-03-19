<template>
  <el-tabs type="card" v-model="activePath" class="tabs" closable @tab-remove="tabRemove" @tab-click="tabClick()">
    <el-tab-pane
     v-for="item in tabs" 
      :key="item.index"
      :label="item.name"
      :name="item.path"
    >
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
          let tabObj={};
          let param="";
          let id="";
          if(to.query.id){
            id=to.query.id;
          }
          tabObj.name=to.meta.title+id;
          let query=to.query;
          if(JSON.stringify(query)!="{}"){
              param="?"+this.objToParam(query);
          }

          tabObj.path=to.path+param;
          if(this.notRepeat(tabObj)){
            this.$store.commit('SET_TABS',tabObj);
          }
          this.$store.commit('SET_ACTIVE',tabObj.path)
        }
      },
      mounted () {
       let tabObj={};
       tabObj.name=this.$route.meta.title;
       tabObj.path=this.$route.path;
       let repeat=this.notRepeat(tabObj);
        if (repeat) {
          this.$store.commit('SET_TABS', {path: this.$route.path, name: this.$route.meta.title})
          this.$store.commit('SET_ACTIVE', this.$route.path)
        }
      },
      methods: {
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
          if (targetName === '/pat/list') {
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
}
</style>

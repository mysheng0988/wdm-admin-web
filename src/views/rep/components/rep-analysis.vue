<template> 
  <div class="form-pdf">
    <div class="pdf-bar"></div>
    <div class="label-title">报告分析总结/repprt Analysis</div>
    <div class="content-box flex" v-for="(item,index) in analysisData" :key="index" >
        <img class="img" :src="item.imgPath" v-if="item.label">
        <div class="img" v-else></div>
        <div class="content">
          <div class="label" v-if="item.label">{{item.label}}</div>  
          <p v-for="(item1,index1) in item.data" :key="index1">{{item1}}</p>
        </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'rep-analysis',
    props:{
      analysisData:{
        type:Array,
      }
    },
    data(){
      return {
      
      };
    },
    mounted(){
     // console.log(this.analysisData.focusProblem)
    },
   
  }
</script>
<style scoped>
.form-pdf{
     position: relative;
      width: 768px;
      height: 1091px;
      text-align: left;
   }
   .pdf-bar{
     width: 649px;
     height: 10px;
     position:absolute;
     right: 0;
     top:12px;
     background:url("../img/pdf-bar.png") no-repeat;
     background-size: 100% 100%;
   }
   .pdf-bar-left{
     width: 649px;
     height: 10px;
     margin-top: 12px;
     background:url("../img/pdf-bar2.png") no-repeat;
     background-size: 100% 100%;
   }
   .label-title{
    width: 705px;
    height: 72px;
    padding-left: 30px;
    margin:64px 0;
    text-align: left;
    line-height: 73px;
    font-size: 30px;
    background:url("../img/pdf-label.png") no-repeat;
     background-size: 100% 100%;
     color: #fff;
  }
  .content-box{
    padding: 0 50px;
    line-height: 40px;
    margin-bottom: 20px;
  }
  .content-box .img{
    width: 40px;
    height: 40px;
    margin: 0 10px;
    overflow: hidden;
    vertical-align: middle;
  }
  .content-box .content{
    flex:1;
  }
  .content-box .content .label{
    width: 170px;
    height: 43px;
    margin-bottom: 10px;
    line-height: 43px;
    text-align: center;
    color: #fff;
    font-size: 22px;
    background: #48A3DA;
    border-radius: 22px;
  }
  .result{
    font-size: 16px;
    line-height: 45px;
  }
</style>



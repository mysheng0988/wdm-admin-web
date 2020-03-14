<template> 
  <div class="form-pdf">
    <div class="pdf-bar"></div>
    <div class="content-box">
      <div class="label-title">
        <p>附录1. 患者教育</p>
        <p>P<span>ATIENT EDUCATION</span></p>
      </div>
      <div class="content-title">运动处方</div>
      <div class="content">1.运动形式：</div>
      <div class="content">（1）有氧运动：每周进行3~5次，每次30分钟以上中等强度；</div>
      <div class="content">（2）力量练习：每周进行2-3次，两次练习间隔48小时以上。每组重复10-15次；</div>
      <div class="content">（3）柔韧性练习：每周进行2-3次，每个部位的拉伸可重复2-4次，累计60秒；</div>
      <div class="content">（4）综合功能锻炼：太极、瑜伽、乒乓球、羽毛球等；  </div>
      <div class="content">（5）生活中体力劳动：家务活，每天大于10000步。</div>
      <div class="content">2.运动强度：</div>
      <div class="content">（1）中、低强度，感觉心跳加快、微微出汗、自我感觉有点累；</div>
      <div class="content">（2）强度适度，时间不宜过长，切忌不要做低头动作。</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'rep-analysis',
    data(){
      return {
      };
    },
    mounted(){
    
    }
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
   .content-box{
     margin-top:70px;
     padding: 0 70px;
   }
   .label-title{
    width: 705px;
    height: 72px;
    text-align: left;
    font-size: 30px;
     color: #48A3DA;
  }
  .label-title span{
    font-size: 14px;
  }
 .content-box .content-title{
    font-size: 26px;
    color: #222;
    line-height: 45px;
    margin: 10px 0;
  }
 .content-box .content{
    font-size: 20px;
    color: #666;
     margin: 5px 0;
     font-size: 15px;
     text-align: justify;
    line-height: 30px;
  }
</style>



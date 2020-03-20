<template> 
   <div class="index-pdf">
     <div class="title">IPS系统心身综合报告</div>
     <div class="dept">来源科室：心血管内科</div>
     <div class="user-msg">高云  女  41岁</div>
     <div class="case-num">病例号:0009617136</div>
   </div>
</template>
<script>
  
  export default {
    name: 'rep-index',
  }
</script>
<style  scoped>
  .index-pdf{
     position: relative;
     width: 768px;
     height: 1091px;
     text-align: left;
     border: 1px solid #eee;
     background:url("../img/rep-index.png") no-repeat;
     background-size: 100% 100%;
   }
   .title{
     color: #2E8DBA;
     font-size: 50px;
     position: absolute;
     left: 82px;
     top:155px;
   }
   .dept{
     width: 234px;
     height: 54px;
     line-height: 54px;
     border: 2px solid #2E8DBA;
     text-align: center;
     position:absolute;
     font-size: 20px;
     left: 81px;
     top: 373px;
   }
   .user-msg{
      width: 230px;
      height: 35px;
      line-height: 35px;
      font-size: 36px;
      text-align: left;
      color: #fff;
      position: absolute;
      left: 80px;
      top:480px;
   }
   .case-num{
     width: 297px;
     height: 30px;
     line-height: 35px;
     font-size: 30px;
      text-align: left;
      color: #fff;
      position: absolute;
      left: 80px;
      top:568px;
   }
</style>



<template> 
<div class="form-pdf contents">
    <div class="content-box">
        <div class="flex-wrap">
          <div class="round"></div>
          <div >基本信息</div>
          <div class="content">------------------------------------------------------------------------------------</div>
          <div>01</div>
        </div>
        <div class="flex-wrap">
          <div class="round"></div>
          <div >就诊经历</div>
          <div class="content">------------------------------------------------------------------------------------</div>
          <div>02</div>
        </div>
        <div class="flex-wrap">
          <div class="round"></div>
          <div >三维评估</div>
          <div class="content">------------------------------------------------------------------------------------</div>
          <div>03</div>
        </div>
        <div class="flex-wrap">
          <div class="round"></div>
          <div >报告分析总结</div>
          <div class="content">------------------------------------------------------------------------------------</div>
          <div>04</div>
        </div>
        <div class="flex-wrap">
          <div class="round"></div>
          <div >治疗方案参考</div>
          <div class="content">------------------------------------------------------------------------------------</div>
          <div>06</div>
        </div>
        <div class="flex-wrap">
          <div class="round"></div>
          <div >附录1. 患者教育</div>
          <div class="content">------------------------------------------------------------------------------------</div>
          <div>08</div>
        </div>
        <div class="flex-wrap">
          <div class="round"></div>
          <div >附录2. 自主神经检查</div>
          <div class="content">------------------------------------------------------------------------------------</div>
          <div>12</div>
        </div>
        <div class="flex-wrap">
          <div class="round"></div>
          <div >附录3. EEG检测</div>
          <div class="content">------------------------------------------------------------------------------------</div>
          <div>13</div>
        </div>
        <div class="flex-wrap">
          <div class="round"></div>
          <div >附录4. 量表评估</div>
          <div class="content">------------------------------------------------------------------------------------</div>
          <div>14</div>
        </div>
         <div class="flex-wrap">
          <div class="round"></div>
          <div >附录4. 量表评估</div>
          <div class="content">------------------------------------------------------------------------------------</div>
          <div>14</div>
        </div>
    </div>
</div>
</template>
<script>
  export default {
    name: 'contents',
  }
</script>
<style scoped>
   .form-pdf.contents{
      padding: 70px;
      background:url("../img/contents.png");
      background-size: 768px 1091px;
   }
   .box-label{
     margin: 55px 20px;
     width: 697px;
     height: 108px;
     line-height: 108px;
     text-align: left;
     background:#2B8FB8;
     color:#fff;
   }
  .box-label .lable-text{
    font-size: 10px; 
    text-align: left;
    margin-left: 110px;
    width: 10px;
    line-height: 10px;
    transform: scale(0.8);
    writing-mode: vertical-lr;/*从左向右 从右向左是 writing-mode: vertical-rl;*/  
    writing-mode: tb-lr;
  }
  .box-label .title{
    font-size: 60px;
  }
  .content-box{
    margin-top:130px;
    font-size: 26px;
    color: #2B8FB8;
  }
  .content-box .round{
    width: 10px;
    height: 10px;
    margin: 0 10px;
    background: #2B8FB8;
    border-radius: 10px;
  }
  .content-box .content{
      flex:1;
      margin: 25px 10px;
      white-space: nowrap;
      overflow: hidden;
  }
</style>



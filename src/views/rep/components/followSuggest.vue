<template> 
  <div class="form-pdf">
    <div class="pdf-bar"></div>
    <div class="content-box">
      <div class="label-title">
        <p>治疗方案建议</p>
        <p>T<span>REATMENT PROPOSAL</span></p>
      </div>
      <div class="content-title">随访建议</div>
      <div class="content">（1）第1周随访，观察疗效、药物反应，根据随访情况可能需要调整用药方案和心理治疗内容；</div>
      <div class="content">（2）第2周随访，观察疗效、药物反应，根据随访情况可能需要调整用药方案和心理治疗内容；</div>
      <div class="content">（3）第1个月随访，观察疗效、药物反应，根据随访情况可能需要调整用药方案和心理治疗内容；</div>
      <div class="content">（4）第2个月随访，观察疗效、药物反应，根据随访情况可能需要调整用药方案和心理治疗内容；</div>
      <div class="content">（5）第3个月随访，观察疗效、药物反应，根据随访情况可能需要调整用药方案和心理治疗内容。</div>
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
    line-height: 30px;
  }
</style>



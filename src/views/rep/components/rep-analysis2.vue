<template> 
  <div class="form-pdf">
    <div class="pdf-bar"></div>
    <div class="label-title">报告分析总结/repprt Analysis</div>
    <div class="content-box flex">
        <img class="img" src="@/views/rep/img/icon-analysis.png">
        <div class="content">
          <div class="label">综合分析</div>  
          <p>基于A型行为 ¹特质，躯体化的心身反应模式，同时存在一系列危害健康的生活方式，加上近期生理、心理压力过大，与同事发生争吵的过高应激，导致该患者出现焦虑情绪、植物神经功能紊乱等症，进一步加剧心身问题。</p>
          <p>患者主诉为静息下突发的胸闷、憋气、胸痛、头晕、头痛、心慌， 本次于我院心内科住院治疗，冠脉造影结果示血管未出现狭窄，硝酸甘油输注结果示冠状动脉痉挛综合征，症状发生前有明显心理社会性诱因（人际冲突、压力过大），伴有明显自主神经功能紊乱，同时心身反应模式以躯体化为主，初步诊断为焦虑状态。综上所述，该患者冠状动脉痉挛综合症，可能主要为情绪因素所致。</p>
        </div>
    </div>
    <div class="content-box flex">
        <img class="img" src="@/views/rep/img/icon-diagnose.png">
        <div class="content">
          <div class="label">诊断建议</div>  
          <p>初步诊断：焦虑状态，中度  </p>
          <p>DCPR诊断：述情障碍²</p>
          <p>临床诊断建议：冠状动脉痉挛综合症，请结合临床。</p>
        </div>
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



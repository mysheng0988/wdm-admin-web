<template> 
  <div class="form-pdf">
    <div class="pdf-bar"></div>
    <div class="label-title">报告分析总结/repprt Analysis</div>
    <div class="content-box flex">
        <img class="img" src="@/views/rep/img/icon-problem.png">
        <div class="content">
          <div class="label">焦点问题</div>  
          <p>（1）应激：社会性应激 - 症状发生前48小时与同事发生激烈争吵；</p>
          <p>（2）压力状态：生理压力 - 近3个月夜眠差，睡眠不足，情绪压力--焦虑情绪、易激惹；</p>
          <p>（3）心身反应模式：躯体化 - 当压力过大、情绪波动时，易以躯体症状表达，如胸憋、胸痛、憋气等；</p>
          <p>（4）健康生活方式：近半年作息不规律，缺乏运动，饮食营养结构欠佳，健康风险升高如吸烟、饮酒、服用刺激性食物；</p>
          <p>（5）人格特质：典型A型行为 - 工作节奏快，伴有时间紧迫感，争强好胜，对阻碍自己发展的人或事表现出强烈的反感或攻击意识。</p>
        </div>
    </div>
    <div class="content-box flex">
        <img class="img" src="@/views/rep/img/icon-nutrition.png">
        <div class="content">
          <div class="label">心身因素</div>  
          <p>焦虑状态中度，失眠障碍轻度，植物神经功能紊乱中度。</p>
        </div>
    </div>
     <div class="content-box flex">
        <img class="img" src="@/views/rep/img/icon-society.png">
        <div class="content">
          <div class="label">社会因素</div>  
          <p>焦虑状态中度，失眠障碍轻度，植物神经功能紊乱中度。</p>
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



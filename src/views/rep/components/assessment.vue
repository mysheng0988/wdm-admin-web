<template> 
  <div class="form-pdf">
    <div class="pdf-bar"></div>
    <div class="content-box">
      <div class="label-title">
        <p>附录4. 量表评估</p>
        <p>S<span>CALE ASSESSMENT</span></p>
      </div>
      <div class="content-title">压力自评量表（SSQ-53）</div>
      <div class="item-box flex-center">
          <div class="chart"> 
            <ve-radar :data="chartData" :settings="chartSettings" :extend="extend"  width="100%" height="100%"></ve-radar>
          </div>
          <div class="content">
              <div>总分：14分</div>
              <div>您的状态：中度焦虑</div>
              <div>您的焦虑倾向到了中度水平，建议您与专业的心理医生多聊一聊，会对 您的帮助很大。</div>
          </div>
      </div>
      <div class="content">评语:</div>
      <div class="content indent">总体压力：评测结果显示，您目前的压力等级为7级，压力反应水平偏高，处于该水平的个体近期在工作和生活中感受到的压力已经超出正常水平，出现了一些不适症状，说明其压力管理能力较差。缺乏有效的压力缓解措施。若不及时改善目前的状态，越来越沉重的压力会对个体的身心健康造成威胁。</div>
      <div class="content indent">个体感受到压力时，会在生理、情绪、认知和行为四个方面表现出症状，然而这四个方面对于压力的易感性不同，因此压力对这四个方面的影响程度不同，并且压力对身心整体的影响程度与对具体方面的影响程度也可能存在差异。下面详细描述您在生理、情绪、认知和行为四个方面的测评结果：</div>
      <div class="content">（1）生理：您的生理维度等级为7级，目前压力对您身体健康造成的影响较大，处于该等级的个体在压力状态下，出现较多躯体不适症状，如：肌肉酸痛、容易疲劳、消化不良等。个别的躯体不适症状可能比较频繁。长期处在压力状态下，会影响到身体各个系统（尤其是心血管系统、消化系统、神经系统）功能的正常发挥，降低免疫力，进而可能引发多种心身疾病，如冠心病、糖尿病、高血压、关节炎、胃溃疡等。 </div>
      <div class="content">（2）情绪：您的情绪维度等级为9级，目前压力对您情绪造成的影响较大，处于该等级的个体最近出现了较多消极情绪，如：焦虑、抑郁、敌意等情绪。且个别消极情绪体验可能比较频繁。不良情绪会妨碍个体正常的心理功能，如注意、记忆、思维、判断等。进而影响身体健康和工作效率，而且还可能导致人际关系及婚恋家庭等方面的问题。</div>
      <div class="content">（3）认知：您的认知维度等级为6级，处于正常范围内，请继续保持。</div>
      <div class="content">（4）行为：您的行为维度等级为6级，处于正常范围内，请继续保持。</div>
    </div>
        
  </div>
</template>
<script>
  export default {
    name: 'assess',
    data(){
      return {
       extend: {
          legend: {
            show:false,
          },
          radar:{
            radius: 60,
             indicator: [
            { name: '生理', max: 10},
            { name: '情绪', max: 10},
            { name: '认知', max: 10},
            { name: '行为', max: 10},
            ]
          },
          series: {
            label: {
              normal: {
                show: true
              }
            }
          }
        },
        chartSettings:{
            label:{
              positon:"top"
            }
        },
        chartData: {
          columns: ['日期', '生理', '情绪', '认知','行为'],
          rows: [
            { '日期': '1', '生理': 7, '情绪': 9,'认知': 9,"行为":6}
          ]
        }
      }
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
   .item-box{
    padding: 10px 0;
    width: 626px;
  }
   .item-box .content{
    flex:1;
    color: #666;
     margin: 5px 0;
     font-size: 15px;
     text-align: justify;
    line-height: 30px;                                                                                                                         
  }
  .item-box .chart{
     width: 240px;
     height: 180px;
     margin-right: 20px;
   }
 .content-box .content{
    font-size: 20px;
    color: #666;
     margin: 5px 0;
     font-size: 15px;
     text-align: justify;
    line-height: 30px;
  }
  .content.indent{
    text-indent: 2em
  }
   
</style>



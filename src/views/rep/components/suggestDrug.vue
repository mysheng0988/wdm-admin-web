<template> 
  <div class="form-pdf">
    <div class="pdf-bar"></div>
    <div class="content-box">
      <div class="label-title">
        <p>治疗方案参考</p>
        <p>T<span>REATMENT PLAN REFERENCE</span></p>
      </div>
      <div class="content-title">用药辅助建议</div>
      <div class="content">1.神经递质调节药物：</div>
      <div class="content">（1）氟哌噻吨美利曲辛片，每日2次，每次10 BID。</div>
      <div class="content">（2）选择性五羟色胺再摄取抑制剂（SSRI），优选盐酸度洛西汀肠溶胶囊，每日1次，每次30mg QD。</div>
      <div class="content">2.神经递质调节药物：</div>
      <div class="content">冠状动脉痉挛综合症：</div>
      <div class="content">（1）盐酸地尔硫卓缓释胶囊（II）90mg QN，睡前服用1片；</div>
      <div class="content">（2）阿司匹林肠溶片100mg QD，1日1次，1次1片；</div>
      <div class="content">（3）硝酸甘油片0.25-0.5mg PRN 舌下含服。</div>
      <div class="content-title">心身治疗建议</div>
      <div class="content">1.心理治疗方法</div>
      <div class="content">（1）正念治疗 2次，50min/次 </div>
      <div class="content">（2）CBTI治疗5次，50min/次</div>
      <div class="content">（3）心身治疗 3次，50min/次</div>
      <div class="content">2.心理治疗方法</div>
      <div class="content">（1）经颅磁刺激治疗 5次，30min/次 定频FI，弱档，可按摩，30min</div>
      <div class="content">（2）生物反馈训练 5次，30min/次 呼吸训练1次，心灵家园训练模块1次，荷花训练模块1次，星空放松训练1次，30min</div>
      <div class="content">3.治疗后评估检查1次</div>
      <div class="content">注意事项：向患者及家属解释心理治疗的性质和意义。 </div>
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



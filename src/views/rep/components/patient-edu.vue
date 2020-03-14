<template> 
  <div class="form-pdf">
    <div class="pdf-bar"></div>
    <div class="content-box">
      <div class="label-title">
        <p>附录1. 患者教育</p>
        <p>P<span>ATIENT EDUCATION</span></p>
      </div>
      <div class="content-title">药物治疗方案</div>
      <div class="content">1.神经递质调节药物治疗方案：</div>
      <div class="content">（1）氟哌噻吨美利曲辛片，每日2次，每次10mg，早晨及中午各一片，连续服用14日。该药服药期间禁止与单胺氧化酶抑制剂联用。</div>
      <div class="content">（2）选择性五羟色胺再摄取抑制剂（SSRI），优选盐酸度洛西汀肠溶胶囊，每日1次，每次30mg，晨起服用1粒，一周后加至2粒，连续服用1年。度洛西汀与阿司匹林联用会增加出血风险，需要严密监测。</div>
      <div class="content">2.神经递质调节药物治疗方案：</div>
      <div class="content">冠状动脉痉挛综合症：</div>
      <div class="content">（1）盐酸地尔硫卓缓释胶囊（II），睡前服用1片，患者为冠状动脉痉挛导致的心绞痛，尽量避免使用β-受体阻滞剂。 </div>
      <div class="content">（2）阿司匹林肠溶片，1日1次，1次1片，注意是否出现皮肤淤青、鼻血黑便等。 </div>
      <div class="content">（3）硝酸甘油片，发作时半片～1片，舌下含服，发作时每5分钟重复1片直至疼痛缓解。如果15分钟内总量达3片后疼痛持续存在，应立即就医。</div>
      <div class="content">3.用药教育：</div>
      <div class="content">（1）患者因焦虑情绪状态（中度）需要服用神经递质调节药物。焦虑情绪状态是由于脑内神经递质异常导致，氟哌噻吨美利曲辛片及盐酸度洛西汀肠溶胶囊帮助患者调节脑内神经递质水平恢复到正常状态，在心理治疗及其他物理治疗的同时陪伴患者走出焦虑情绪的阴霾。</div>
      <div class="content">（2）神经递质类药起效需要数周，医生会从小到大逐渐为您增加药物剂量。该类药物服药后可能导致头昏、嗜睡、失眠、不安、躁动、震颤等不适症状，在药物加量过程中若您感到焦虑情绪改善不明显，同时出现不良反应可能是正常的。建议继续坚持服药，以等待药物起效。 若您于服药期间发生下述状况时请立即回诊就医：嘴部及喉咙刺痛；胸闷；食欲下降导致体重减轻；呼吸困难；痉挛或抽蓄。视力模糊、便秘、口干、盗汗、嗜睡、恶心、呕吐、性功能障碍。</div>
      <div class="content">（3）服药后可能会有晕眩或嗜睡情形，请避免开车、使用机器等需要高警觉性的活动。</div>
      <div class="content">（4）服药期间请勿饮酒，酒精与神经递质调节药物间存在药物相互作用。</div>
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
    color: #666;
     margin: 5px 0;
     font-size: 15px;
     text-align: justify;
    line-height: 30px;
  }
</style>



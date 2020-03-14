<template> 
  <div class="form-pdf">
    <div class="pdf-bar"></div>
    <div class="content-box">
      <div class="label-title">
        <p>附录1. 患者教育</p>
        <p>P<span>ATIENT EDUCATION</span></p>
      </div>
      <div class="content-title">药物治疗方案</div>
      <div class="content">（5）若有怀孕、哺乳，或肝、肾疾患、心脏疾患及痉孪病史请务必事先告知医生或药师。</div>
      <div class="content">（6）请您务必按照医生医嘱的用法用量规范服用药物，否则可能出现严重的不良反应或疗效不佳，服用该类药物切勿突然停药，该类药物需要逐渐减少药物剂量停药，该过程往往需要数周。</div>
      <div class="content">（7）忘记用药时处置方法：若您发现忘记服药，则请尽快补服。倘若已接近下次的服药时间，则请待下次正确服药时间再服药。※请注意：切勿在同一时间内重复服用两次剂量。 </div>
      <div class="content">（8）药物服用方法：</div>
      <div class="content">氟哌噻吨美利曲辛片：建议于早晨及中午各一片，连续服用14日。若您出现眼压增高请及时告诉您的医生。 </div>
      <div class="content">盐酸度洛西汀肠溶胶囊：晨起服用1粒，一周后加至2粒，连续服用1年。本品应整粒吞服。不应咀嚼或碾碎服用；也不应打开胶囊壳，将内容物撒在食物上或与液体混合服用。如果您在服用阿司匹林、华法林请关注出血风险。若需要服用影响胃酸的药物请告知您的医生，服药期间避免饮用大量咖啡。</div>
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



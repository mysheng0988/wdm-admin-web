<template> 
  <div class="form-pdf">
    <div class="pdf-bar"></div>
    <div class="content-box">
      <div class="label-title">
        <p>附录1. 患者教育</p>
        <p>P<span>ATIENT EDUCATION</span></p>
      </div>
      <div class="content-title">营养处方</div>
      <div class="content">1.限制钠摄入</div>
      <div class="content indent">中国营养学会推荐健康成人每日食盐摄入量不宜超过6g，高血压患者不超过3g。 避免高盐摄入的措施包括：</div>
      <div class="content">（1）每人每餐放盐不超过2g，每人每天摄入盐不超过6g；</div>
      <div class="content">（2）尽量避免进食高盐食物和调味品；</div>
      <div class="content">（3）利用蔬菜本身的风味来调味；</div>
      <div class="content">（4）利用醋、柠檬汁、苹果汁、番茄汁等各种调味汁来增添食物味道；</div>
      <div class="content">（5）采用富钾低钠盐代替普通食盐，但对于伴有肾功能不全的患者应慎用，以防血钾升高。</div>
      <div class="content">2.限制总热量</div>
      <div class="content">（1）减少动物油和胆固醇的摄入；</div>
      <div class="content">（2）减少反式脂肪酸摄入；</div>
      <div class="content">（3）适量选用橄榄油，每星期3次或隔天1次;</div>
      <div class="content">（4）高血压患者进食烹调油的4点注意：</div>
      <div class="content indent">①选择脂肪酸数量及构成比合理的油脂，如橄榄油、茶油等；</div>
      <div class="content indent">②每日烹调油用量＜25g（半两，相当于2.5汤匙）；</div>
      <div class="content indent">③控制烹调温度，油温不宜太高。</div>
       <div class="content"> 3.营养均衡</div>
      <div class="content">（1）适量补充蛋白质；</div>
      <div class="content">（2）适量增加新鲜蔬菜和水果； </div>
      <div class="content">（3） 增加膳食钙摄入，保证奶类及其制品的摄入，250-500ml/天脱脂或低脂牛奶。</div>
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
  .content.indent{
    text-indent: 2em
  }
</style>



<template> 
  <div class="form-pdf">
    <div class="pdf-bar"></div>
    <div class="content-box">
      <div class="label-title">
        <p>附录2. 自主神经检查</p>
        <p>A<span>UTONOMIC NERVE EXAMNATION</span></p>
      </div>
      <div class="content-title">1.自主神经症状：</div>
      <div class="content indent"> 口干、出汗、心悸、呼吸困难、喉部堵塞感、气急、面色潮红或苍白、阵发性发冷发热、头疼、
头晕、失平衡感，疲劳或乏力，腹胀、恶心、呕吐、腹泻、便秘，多部位疼痛或不适。</div>
      <div class="content-title">2.HRV检测结果：</div>
      <img class="img" :src="hrv">
    </div>
  </div>
</template>
<script>
import hrv from '@/assets/images/hrv-icon.png'
  export default {
    name: 'nerveExamine',
    data(){
      return {
        hrv
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
  .content-box .img{
     width: 100%;
     height: 700px;
  }
</style>



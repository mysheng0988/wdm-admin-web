<template> 
  <div class="form-pdf">
    <div class="pdf-bar"></div>
    <div class="content-box">
      <div class="label-title">
        <p>附录4. 量表评估</p>
        <p>S<span>CALE ASSESSMENT</span></p>
      </div>
     <chart-gauge :data="data" ></chart-gauge>
     <!-- <chart-gauge :data="data2" ></chart-gauge>
     <chart-gauge :data="data3" ></chart-gauge> -->
     <!-- <chart-histogram ></chart-histogram>
     <chart-line></chart-line>
     <chart-radar></chart-radar> -->
    </div>
  </div>
</template>
<script>
 import{scaleResult} from "@/api/report"
 import chartGauge from './chart/chartGauge'
 import chartHistogram from './chart/chartHistogram'
 import chartLine from './chart/chart-line'
 import chartRadar from './chart/chart-radar'
  export default {
    name: 'scaleAssess',
    components:{
      chartGauge,
      chartHistogram,
      chartLine,
      chartRadar
    },
    data(){
      return {
       data:{
         questionnaireName:"广泛性焦虑障碍量表(GAD-7）",
         score:"-10",
         conclusion:"您的状态：中度焦虑",
         maxValue:"33",
         explanation:"您的焦虑倾向到了中度水平，建议您与专业的心理医生多聊一聊，会对 您的帮助很大。",
         chartInfoVO:{
            maxValue:40,
            minValue:-40,
         }
       },
       data2:{
         questionnaireName:"广泛性抑郁障碍量表(GAD-7）",
         score:"30",
         conclusion:"您的状态：重度焦虑",
         maxValue:"22",
         explanation:"您的焦虑倾向到了重度水平，建议您与专业的心理医生多聊一聊，会对您的帮助很大。",
         chartInfoVO:{
            maxValue:98,
            minValue:0,
         }
       },
        data3:{
         questionnaireName:"生活事件量表（LES）",
         score:"10",
         conclusion:"您的状态：重度焦虑",
         maxValue:"200",
         minValue:"0",
         explanation:"您的焦虑倾向到了重度水平，建议您与专业的心理医生多聊一聊，会对您的帮助很大。",
       }
      };
    },
    mounted(){
        scaleResult(36).then(res=>{
              console.log(res)
        })
    }
  }
</script>
<style scoped>
.form-pdf{
     position: relative;
      width: 768px;
      height: 1091px;
      border:1px solid #eee;
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
    text-align: left;
    font-size: 30px;
     color: #48A3DA;
  }
  .label-title span{
    font-size: 14px;
  }
   .content-box{
     margin-top:70px;
     padding: 0 70px;
   }
   .content-box .content{
    flex:1;
    font-size: 20px;
    color: #666;
     margin: 10px 0;
     font-size: 15px;
     text-align: justify;
    line-height: 30px;
  }
 
   
</style>



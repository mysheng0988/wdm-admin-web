<template> 
  <div class="form-pdf">
    <div class="pdf-bar"></div>
    <div class="content-box">
      <div class="label-title">
        <p>附录4. 量表评估</p>
        <p>S<span>CALE ASSESSMENT</span></p>
      </div>
      <!-- <div class="content-title">压力自评量表（SSQ-53）</div>
      <div class="item-box flex-center">
          <div class="chart"> 
            <ve-radar :data="chartData" :settings="chartSettings" :extend="extend"  width="100%" height="100%"></ve-radar>
          </div>
          <div class="content">
              <div v-for="(item,index) in data.conclusion" :key="index" class="flex-wrap">
                <span>{{item.split("|")[0]}}</span>
                <span>{{item.split("|")[1]}}</span>
              </div>
              
          </div>
      </div> -->
      <!-- <div class="content">评语:</div> -->
      <div class="content indent" v-for="(item,index) in data" :key="index">{{item}}</div>
      <!-- <div class="content indent">总体压力：评测结果显示，您目前的压力等级为7级，压力反应水平偏高，处于该水平的个体近期在工作和生活中感受到的压力已经超出正常水平，出现了一些不适症状，说明其压力管理能力较差。缺乏有效的压力缓解措施。若不及时改善目前的状态，越来越沉重的压力会对个体的身心健康造成威胁。</div>
      <div class="content indent">个体感受到压力时，会在生理、情绪、认知和行为四个方面表现出症状，然而这四个方面对于压力的易感性不同，因此压力对这四个方面的影响程度不同，并且压力对身心整体的影响程度与对具体方面的影响程度也可能存在差异。下面详细描述您在生理、情绪、认知和行为四个方面的测评结果：</div> -->
    </div>
    <div class="pageNum">-{{pageNum}}-</div>   
  </div>
</template>
<script>
  export default {
    name: 'assessment',
    props:{
       pageNum:{
         type:Number
       },
       data:{
        type:Array,
      }
    },
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
            { '日期': '1', '生理': 7, '情绪': 9,'认知': 9,"行为":6},
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
  .item-box .content span{
      margin: 0 10px;                                                                                                                     
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



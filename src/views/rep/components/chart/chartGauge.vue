<template> 
  <div class="item-box flex-center">
      <div class="chart"> <ve-gauge :data="chartData" width="100%" height="100%" :settings="chartSettings"></ve-gauge></div>
      <div class="content">
          <div class="content-title">广泛性焦虑障碍量表(GAD-7）</div>
          <div>总分：14分</div>
          <div>您的状态：中度焦虑</div>
          <div>您的焦虑倾向到了中度水平，建议您与专业的心理医生多聊一聊，会对 您的帮助很大。</div>
      </div>
  </div>
</template>
<script>
  export default {
    name: 'chart-gauge',
    props: {
      data: {
          type: Object,
          default:{}
        },
    },
    data(){
      return {
        chartSettings:{
          dataName: {
          '评分': '得分'
          },
           seriesMap: {
            '评分': {
              min:0,
              max:22,
              startAngle: 200 ,
              endAngle: -20 ,
              splitNumber:2,
              radius: '90%',
              axisLine:{
                  lineStyle:{
                    width:10
                  }
              },
              title:{
                fontSize:10,
              },
              splitLine:{
                length:15,
                offsetCenter:[10,0]
              },
              detail:{
                fontSize:12
              }
            }
          }
        },
        chartData: {
          columns: ['type','value'],
          rows: [
            { type: '评分', value: 6 }
          ]
        }
      }
    }
  }
</script>
<style  scoped>
  .item-box{
    padding: 10px 0;
    width: 626px;
  }
  .content{
    flex:1;
    color: #666;
     margin: 5px 0;
     font-size: 15px;
     text-align: justify;
    line-height: 30px;                                                                                                                         
  }
  .content .content-title{
     font-size: 20px;
     color: #48A3DA;
  }
   .chart{
     width: 240px;
     height: 180px;
     margin-right: 20px;
   }
</style>



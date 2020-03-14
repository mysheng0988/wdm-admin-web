<template> 
  <div class="item-box flex-center">
      <div class="chart"> 
         <ve-line :data="chartData" :extend="extend" :settings="chartSettings" width="100%" height="100%"></ve-line>
      </div>
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
          chartSettings :{
            xAxisType: 'value'
          },
          extend: {
            grid:{
            top:10,
            bottom:20
          },
          legend: {
            itemWidth: 16,
            itemHeight: 10,
            bottom:"0",
            textStyle:{
              fontSize:8
            }
          },
          yAxis:{
            show:true,
            splitNumber:2,
          },
          series: {
            label: {
              normal: {
                show: true
              }
            }
          }
        },
        chartData: {
          columns: ['日期', '访问用户', '下单用户'],
          rows: [
            { '日期': '1', '访问用户': 13, '下单用户': 10},
            { '日期': '2', '访问用户': 35, '下单用户': 32},
            { '日期': '3', '访问用户': 29, '下单用户': 26},
            { '日期': '4', '访问用户': 17, '下单用户': 14},
            { '日期': '5', '访问用户': 37, '下单用户': 34},
            { '日期': '6', '访问用户': 45, '下单用户': 42}
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



<template> 
  <div class="item-box flex-center">
      <div class="chart"> 
        <ve-histogram :data="chartData" width="100%" height="100%" 
        :settings="chartSettings"
        :extend="extend"></ve-histogram>
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
    name: 'chart-histogram',
    // props: {
    //   data: {
    //       type: Object,
    //       default:{}
    //     },
    // },
    data(){
      
      return {
        extend :{
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
          },
          barWidth:20,
         
          series: {
            label: { show: true, position: "top" }
          }
        },
        chartData: {
          columns: [ "项目",'TH时间紧迫感', 'CH好胜心', 'L测谎'],
          rows: [
            { "项目":"",'TH时间紧迫感': 20,},
            { "项目":"",  'CH好胜心': 22,},
            { "项目":"",  'L测谎':5 },
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



<template> 
  <div class="item-box flex-center">
      <div class="chart"> 
         <ve-radar :data="chartData" :settings="chartSettings" :extend="extend"  width="100%" height="100%"></ve-radar>
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
    name: 'chart-radar',
    props: {
      data: {
          type: Object,
          default:{}
        },
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
            { name: '家庭支持', max: 7},
            { name: '朋友支持', max: 7},
            { name: '其他支持', max: 7},
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
          columns: ['日期', '家庭支持', '朋友支持', '其他支持'],
          rows: [
            { '日期': '1', '家庭支持': 1.5, '朋友支持': 6.3,'其他支持': 5.2}
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
     height:180px;
     margin-right: 20px;
   }
</style>



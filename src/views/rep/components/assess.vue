<template> 
  <div class="form-pdf">
    <div class="pdf-bar"></div>
    <div class="label-title">三维评估</div>
    <div class="chart-box ">
      <div class="flex-center">
        <div class="chart">
          <ve-pie :data="chartData" width="300px" height="200px" :extend="extend" :settings="settings"></ve-pie>
        </div>
        <div class="chart-content">
          <div>生物学维度 23% | 1.5</div>
          <div>心理学维度 43% | 2.8</div>
          <div>社会学维度 34% | 2.2</div>
        </div>
      </div>
      <div class="result">
        <p>结论分析：</p>
        <p>生物学：轻度 躯体症状与生物学指数轻度相关; </p>
        <p>心理学：中度 躯体症状与心理情绪状态中度相关; </p>
        <p>心理学：中度 躯体症状与心理情绪状态中度相关; </p>
      </div>
    </div>
    
  </div>
</template>
<script>
  export default {
    name: 'assess',
    data(){
      return {
         extend:{
           top:30,
          bottom:30,
         },
        settings:{
          label:{
            show:false
          },
          radius:80,
          offsetY:120
        },
        chartData: {
          columns: ['维度', '数据'],
          rows: [
            { '维度': '生物学', '数据': 2.8 },
            { '维度': '心理学', '数据': 1.5 },
            { '维度': '社会学', '数据': 3.6 },
          ]
        }
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
   .label-title{
    width: 453px;
    height: 73px;
    margin-top:64px;
    text-align: center;
    line-height: 73px;
    font-size: 30px;
    background:url("../img/pdf-label.png") no-repeat;
     background-size: 100% 100%;
     color: #fff;
  }
  .chart-box{
    margin-top:30px;
    width: 600px;
    margin: auto;
  }
  .chart-box .chart{
      position: relative;
      width: 300px;
      height: 200px;
      margin: 30px 0;
  }
  .chart-box .chart-content{
      width: 300px;
       line-height: 45px;
      text-align: center;
      
  }
  .result{
    font-size: 16px;
    line-height: 45px;
  }
</style>



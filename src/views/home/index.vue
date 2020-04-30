<template>
  <div class="app-container home">
    <div class="total-layout">
    <el-row :gutter="20" >
      <el-col :xs="24" :sm="12" :md="6">
        <div class="frame flex warning">
          <svg-icon icon-class="patient" class-name="total-icon">
          </svg-icon>
          <div class="flex">
            <div class="item-box">
                <div class="total-title">新增患者</div>
                <div class="total-value">200</div>
            </div>
            <div  class="item-box">
                <div class="total-title">总患者数</div>
                <div class="total-value">2000</div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" >
        <div class="frame flex info">
          <svg-icon icon-class="checkup" class-name="total-icon">
          </svg-icon>
          <div class="flex">
            <div class="item-box">
                <div class="total-title">总测评任务</div>
                <div class="total-value">200</div>
            </div>
            <div  class="item-box">
                <div class="total-title">今日未完成</div>
                <div class="total-value">2000</div>
            </div>
          </div>
          
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" >
        <div class="frame flex danger">
          <svg-icon icon-class="report-icon" class-name="total-icon">
          </svg-icon>
           <div class="flex">
            <div class="item-box">
                <div class="total-title">总报告数</div>
                <div class="total-value">200</div>
            </div>
            <div  class="item-box">
                <div class="total-title">今日报告量</div>
                <div class="total-value">2000</div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" >
        <div class="frame flex success">
          <svg-icon icon-class="treatment"  class-name="total-icon">
          </svg-icon>
           <div class="flex">
            <div class="item-box">
                <div class="total-title">总治疗任务</div>
                <div class="total-value">200</div>
            </div>
            <div  class="item-box">
                <div class="total-title">未完成任务</div>
                <div class="total-value">2000</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
  <div class="chart-box">
    <ve-line class="chart"  height="300px" :data="chartData" :settings="chartSettings" :extend="extend"></ve-line>
  </div>
  <div class="chart-box">
    <ve-line class="chart"  height="300px" :data="chartData2" :settings="chartSettings" :extend="extend"></ve-line>
  </div>
  </div>
</template>

<script>
  import { Message, MessageBox } from 'element-ui'
 
  export default {
    name: 'home',
   
    data () {
      this.chartSettings = {
        xAxisType: 'time'
      }
      return {
         extend :{
          grid:{
            top:40,
            left:10,
            right:40,
            bottom:10,
            containLabel: true
          }
        },
        chartData: {
          columns: ['日期', '筛查测评A', '专科测评B', '综合测评C'],
          rows: [
           
          ]
        },
        chartData2: {
          columns: ['日期', '总患者数', '测评任务数', '治疗任务数'],
          rows: [
            { '日期': '2018-01-01', '总患者数': 133, '测评任务数': 103, '治疗任务数': 32 },
            { '日期': '2018-01-02', '总患者数': 350, '测评任务数': 320, '治疗任务数': 26 },
            { '日期': '2018-01-03', '总患者数': 293, '测评任务数': 263, '治疗任务数': 76 },
            { '日期': '2018-01-05', '总患者数': 173, '测评任务数': 123, '治疗任务数': 49 },
            { '日期': '2018-01-10', '总患者数': 372, '测评任务数': 342, '治疗任务数': 323 },
            { '日期': '2018-01-20', '总患者数': 493, '测评任务数': 493, '治疗任务数': 78 }
          ]
        }
      }
    },
    filters:{
     
    },
    mounted(){
       let data= this.chartData.rows;
       for(let i=0;i<7;i++){
         let num= i+i+1;
         let param={
           "日期":'2020-01-'+num,
           "筛查测评A":Math.random()*500,
           "专科测评B":Math.random()*500,
           "综合测评C":Math.random()*500,
         }
         data.push(param)
       }
       this.chartData.rows=data;
       console.log(this.chartData.rows)
    },

    methods:{
     

    }
  }
</script>

<style scoped>
  .total-layout {
    margin-top: 20px;
  }

  .total-frame {
    background: #f5f5f5;
    border: 1px solid #DCDFE6;
    border-radius: 5px;
    box-shadow: -1px 1px 5px #d8d8d8;
    padding: 20px;
    height: 100px;
    margin: 10px 0;
  }
  .frame {
    background: #f5f5f5;
    border: 1px solid #DCDFE6;
    border-radius: 5px;
    box-shadow: -1px 1px 5px #d8d8d8;
    line-height: 35px;
    padding: 20px;
    height: 100px;
    margin: 10px 0;
  }
  .success{
    background:#67C23A;
    color: #fff; 
  }
  .warning{
     background:#E6A23C;
     color: #fff; 
  }
  .danger{
     background:#F56C6C;
     color: #fff; 
  }
  .info{
    background: #409EFF;
    color: #fff;
  }
  .total-icon {
    color: #ffffff;
    width: 60px;
    height: 60px;
  }

  .total-title {
    width: 100px;
    font-size: 18px;
    font-weight: bold;
    text-align: center
  }

  .total-value {
    width: 100px;
    font-size: 18px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    text-align: center
  }
  .chart-box{
    margin: 18px 30px;
  }
  .chart{
    width: 80%;
    height: 200px;
  }
  .item-box{
    margin: 0 20px;
    flex: 1;
    cursor: pointer;
  }
  /* .flex:hover{
    background: #409EFF;
    color: #fff;
  } */
</style>

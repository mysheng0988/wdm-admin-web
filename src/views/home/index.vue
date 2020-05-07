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
                <div class="total-value">{{statisticsData.patientIncrement}}</div>
            </div>
            <div  class="item-box">
                <div class="total-title">总患者数</div>
                <div class="total-value">{{statisticsData.patientTotal}}</div>
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
                <div class="total-value">{{statisticsData.examinationTaskTotal}}</div>
            </div>
            <div  class="item-box">
                <div class="total-title">今日未完成</div>
                <div class="total-value">{{statisticsData.todayUndoneExaminationTaskTotal}}</div>
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
                <div class="total-value">{{statisticsData.reportTotal}}</div>
            </div>
            <div  class="item-box">
                <div class="total-title">今日报告量</div>
                <div class="total-value">{{statisticsData.todayReportTotal}}</div>
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
                <div class="total-value">{{statisticsData.treatmentTaskTotal}}</div>
            </div>
            <div  class="item-box">
                <div class="total-title">未完成任务</div>
                <div class="total-value">{{statisticsData.todayUndoneTreatmentTaskTotal}}</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
  <div class="chart-box">
    <ve-line class="chart" :data-empty="dataEmpty" height="300px" :data="chartData" :settings="chartSettings1"   :extend="extend"></ve-line>
  </div>
  <div class="chart-box">
    <ve-line class="chart" :data-empty="dataEmpty" height="300px" :data="chartData2" :settings="chartSettings2" :extend="extend"></ve-line>
  </div>
  </div>
</template>

<script>
  import 'v-charts/lib/style.css'
  import { Message, MessageBox } from 'element-ui'
  import{getHomeData} from "@/api/home"
  export default {
    name: 'home',

    data () {
      return {
        statisticsData:{},
        chartSettings1 : {
            labelMap: {
              'examinationA': '筛查测评A',
              'examinationB': '专科测评B',
              'examinationC': '综合测评C'
            },
             xAxisType: 'time'

          },
        chartSettings2 : {
          labelMap: {
            'patientIncrement': '新增患者数',
            'examinationTaskTotal': '测评任务数',
            'treatmentTaskTotal': '治疗任务数'
          },
          xAxisType: 'time'

        },
         extend :{
          grid:{
            top:40,
            left:10,
            right:40,
            bottom:10,
            containLabel: true
          },
           xAxis:{
             maxInterval:3600 * 24 * 1000   
           },
          yAxis:{
            minInterval: 1 ,
          }
        },
        dataEmpty:true,
        chartData: {
          columns: ['collectionDate', 'examinationA', 'examinationB', 'examinationC'],
          rows: [

          ]
        },
        chartData2: {
          columns: ['collectionDate', 'patientIncrement', 'examinationTaskTotal', 'treatmentTaskTotal'],
          rows: []
        }
      }
    },
    filters:{

    },
    mounted(){
      getHomeData().then(res=>{
        this.dataEmpty=false
        this.statisticsData=res.dataList[0];
        this.chartData.rows=this.statisticsData.examinationDataList;
        this.chartData2.rows=this.statisticsData.otherDataList;
      })
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
    text-align: center;
    
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
     position: relative;
  }
  .item-box{
    margin: 0 20px;
    flex: 1;
    cursor: pointer;
  }
  /deep/ .v-charts-data-empty{
    background-color: rgba(255, 255, 255, .4);
  }
  
</style>

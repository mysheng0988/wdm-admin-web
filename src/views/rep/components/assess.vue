<template> 
  <div class="form-pdf">
    <div class="pdf-bar"></div>
    <div class="label-title">三维评估</div>
    <div class="content" v-if="data.type=='table'">
          <div class="content-title">{{data.questionnaireName}}</div>
          <el-table
            :data="data.chartData"
            :show-header="false"
            style="width: 100%">
            <el-table-column>
              <template slot-scope="scope">{{scope.row.item0}}</template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">{{scope.row.item1}}</template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">{{scope.row.item2}}</template>
            </el-table-column>
          </el-table>
      </div>
    <div class="chart-box " v-else>
      <div class="flex-center">
        <div class="chart">
          <ve-pie :data="chartData" width="300px" height="200px" :extend="extend" :settings="settings"></ve-pie>
        </div>
        <div class="chart-content">
          <div>生物学维度 {{dataVal}}  | {{dataList["生物学"]|decimalTwo}}</div>
          <div>心理学维度 {{dataVal2}} | {{dataList["心理学"]|decimalTwo}}</div>
          <div>社会学维度 {{dataVal3}} | {{dataList["社会学"]|decimalTwo}}</div>
        </div>
      </div>
      <div class="result">
        <p>结论分析：</p>
        <p v-for="(item,index) in conclusion" :key="index">
          <span v-for="(item1,index1) in item" :key="index1">{{index1}}：{{item1}}</span>
        </p>
      </div>
    </div>
     <div class="pageNum">-{{pageNum}}-</div>
  </div>
</template>
<script>
  import {questionnaireResult} from "@/api/report"
  let that;
  export default {
    name: 'assess',
    props:{
      pageNum:{
          type:Number,
      },
      medicalRecordId:{
        type:String,
        value:""
      }
    },
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
        conclusion:[],
        dataList:[],
        data:"",
        chartData: {
          columns: ['维度', 'data'],
          rows: [
            { '维度': '生物学', 'data': 0 },
            { '维度': '心理学', 'data': 0 },
            { '维度': '社会学', 'data': 0 },
          ]
        }
      };
    },
    filters:{
       decimalTwo(val){
         if(val){
           return val.toFixed(2);
         }
         return "0.00"
       } 
    },
    computed: {
      dataVal: function () {
        if(this.dataList["生物学"]){
          let total=this.dataList["生物学"]+this.dataList["心理学"]+this.dataList["社会学"];
          let num= this.dataList["生物学"]
          return Math.round(num/total*100)+"%"
        }
       
      },
       dataVal2: function () {
          if(this.dataList["心理学"]){
          let total=this.dataList["生物学"]+this.dataList["心理学"]+this.dataList["社会学"];
          let num= this.dataList["心理学"]
          return Math.round(num/total*100)+"%"
        }
      },
       dataVal3: function () {
          if(this.dataList["社会学"]){
          let total=this.dataList["生物学"]+this.dataList["心理学"]+this.dataList["社会学"];
          let num= this.dataList["社会学"]
          return Math.round(num/total*100)+"%"
        }
        
      }
   },
    mounted(){
    
        questionnaireResult(this.medicalRecordId).then(res=>{
          if(res.code==200){
            this.data=res.dataList[0];
            if(this.data.type=="table"){
              this.data.chartData=JSON.parse(this.data.chartData);
            }else{
              this.conclusion=JSON.parse(res.dataList[0].conclusion);
              this.dataList=JSON.parse(res.dataList[0].chartData)
              this.chartData.rows[0].data=this.dataList["生物学"];
             this.chartData.rows[1].data=this.dataList["心理学"];
             this.chartData.rows[2].data=this.dataList["社会学"];
            }
           
            
          }
        })
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
  .content{
    padding:  70px;
  }
  .content .content-title{
     font-size: 20px;
     color: #48A3DA;
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



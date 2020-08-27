<template>
    <div class="form-pdf">
      <div class="container">
        <div class="header">综合评估</div>
        <div class="label">脊柱侧弯程度分析</div>
        <div class="label-table">
          <div class="flex bottom">
            <div class="td green">健康指数</div>
            <div class="td border">81-90</div>
            <div class="td border">71-80</div>
            <div class="td border">61-70</div>
            <div class="td border">51-60</div>
            <div class="td border">50以下</div>
          </div>
          <div class="flex">
            <div class="td green">评估等级</div>
            <div class="td border">上等</div>
            <div class="td border">中上</div>
            <div class="td border">中等</div>
            <div class="td border">中下</div>
            <div class="td border">下等</div>
          </div>
        </div>
        <div class="label"><span>★</span>儿童脊柱侧弯主要影响指标（因素）分析</div>
        <div class="vchart-box">
             <ve-radar :data="chartData" :extend="extend"></ve-radar>
        </div>
        <div class="chart-title">脊柱侧弯主要影响指标分析图</div>
        <el-image class="footerPath" :src="footerPath"></el-image>
      </div>
      <div class="pageNum">4</div>
    </div>
</template>
<script>
import footerPath from "@/assets/images/footer-bg.png";
export default {
  name: "pageFour",
   props:{
        data:{
            type:Object,
        }
    },
  data() {
    return {
      footerPath: footerPath,
        extend: {
          legend: {
            show:false,
          },
        radar: {
          indicator: [
           
          ]
        },
      },
      chartData: {
        columns: ["日期", ],
        rows: [
          { "日期": "1/1"},
        ]
      }
    };
  },
  watch:{
    data(newVal,oldVal){
        if(newVal!=oldVal){
          this.initChartData();
        }
        
    }
  },
  mounted(){
    this.initChartData();
  },
  methods: {
    initChartData(){
      this.chartData.columns=["日期"]
      this.chartData.rows[0]={ "日期": "1/1"}
       this.extend.radar.indicator=[];
       for(let i=1;i<6;i++){
      let param={
        name:this.data["dimension"+i+"Name"],
        max:this.data["dimension"+i+"Max"]
      }
      this.chartData.columns.push(this.data["dimension"+i+"Name"])
      this.chartData.rows[0][this.data["dimension"+i+"Name"]]=this.data["dimension"+i]
      this.extend.radar.indicator.push(param)
    }
    },
  }
};
</script>
<style lang="scss" scoped>
.container {
  padding: 90px 31px;
  font-size: 15px;
  line-height: 35px;
  .header {
    background: #49b13f;
    word-spacing: 2;
    font-size: 18px;
    line-height: 50px;
    text-align: center;
    color: #fff;
  }
  .label {
    margin: 30px 0 20px 0;
    font-size: 18px;
    color: #666666;
    span{
        font-size: 28px;
        color: red
    }
  }
  .label-table {
    border: 1px solid #ccc;
    .bottom {
      border-bottom: 1px solid #ccc;
    }
    .td {
      flex: 1;
      line-height: 50px;
      text-align: center;
      color: #666;
      font-size: 15px;
      &.green {
        color: #49b13f;
      }
      &.border {
        border-left: 1px solid #ccc;
      }
    }
  }
  .vchart-box{
      margin: 20px 0;
  }
  .chart-title{
      margin: 30px 0;
      text-align: center;
      font-size: 18px;
      color: #666666;
  }
  .footerPath {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: -1;
  }
}
</style>
<template>
  <div class="app-container" >
    <div class="pdf-container" id="pdfCentent" ref="content" >
        <index :data="createDate"></index>
        <page-one  ></page-one>
        <page-two></page-two>
        <page-three :data="resultData"></page-three>
        <page-four :data="chartData"></page-four>
         <page-five :suggestions="otherSuggestions" :health="healthIndex"></page-five>
    </div>
  </div>
</template>
        
 <script>
 import {getTaskResult,queryRadarChart} from "@/api/reviewTaskResult";
 import index from "./components/index";
 import pageOne from "./components/pageOne";
 import pageTwo from "./components/pageTwo";
 import pageThree from "./components/pageThree";
 import pageFour from "./components/pageFour";
 import pageFive from "./components/pageFive";
export default {
    name:"act-report",
    components:{index,pageOne,pageTwo,pageThree,pageFour,pageFive},
    data(){
        return{
            resultData:{},
            chartData:{},
            otherSuggestions:"",
            createDate:"",
            loading:false,
            healthIndex:"0",
        }
    },
    created(){
         let id= this.$route.query.id;
     this.getTaskResultData(id);
     this.queryRadarChartData(id);
    },
   mounted(){
    
  },
  methods: {
    getTaskResultData(id){
        this.loading=true;
      getTaskResult(id).then(res=>{
           this.loading=false;
          this.resultData=res.dataList[0];
          this.otherSuggestions=res.dataList[0].otherSuggestions;
      }).catch(err=>{
          this.loading=false;
      })
    },
    queryRadarChartData(id){
         this.loading=true;
        queryRadarChart(id).then(res=>{
             this.loading=false;
            if(res.code==200){
                this.chartData=res.dataList[0];
                console.log(this.chartData)
                this.createDate=res.dataList[0].createTime;
                this.healthIndex=res.dataList[0].healthIndex;
            }
        }).catch(err=>{
          this.loading=false;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    .pdf-container{
        width: 768px;
        margin: 0 auto;
    }
</style>
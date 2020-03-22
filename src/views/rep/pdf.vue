<template>
  <div class="app-container" >
    <div class="pdf-container" id="pdfCentent">
        <rep-index :patient-data="patientData" :patient-vo="patientVo"></rep-index>
        <contents></contents>
        <patient-msg :patient-data="patientData" :patient-vo="patientVo" :main-pursue="mainPursue"></patient-msg>
        <experience :experience-data="experienceData"></experience>
        <assess></assess>
        <div v-for="(item,index) in page" :key="index">
          <rep-analysis  :analysis-data="item"></rep-analysis>
        </div>
        
        <rep-analysis2></rep-analysis2>
        <suggest-drug></suggest-drug>
        <follow-suggest></follow-suggest>
        <patient-edu></patient-edu>
        <patient-edu2></patient-edu2>
        <patient-ni></patient-ni>
        <nerve-examine></nerve-examine>
        <eeg-examine></eeg-examine>
        <scale-assess></scale-assess>
        <assessment></assessment>
    </div>
   <el-button type="danger" @click="getPdf('pdfCentent','nowTime')">导出PDF</el-button>
  </div>
</template>
<script>
import {getRecordPatient} from "@/api/patient"
import {getPursue,queryExperience} from "@/api/ips"
import {analysisData} from "@/api/analysis"
import { formatRowspanAndColspan} from '@/utils/auth'
      import repIndex from './components/rep-index'
       import contents from './components/contents'
        import patientMsg from './components/patientMsg'
     import experience from './components/experience'
      import assess from './components/assess'
      import repAnalysis from './components/rep-analysis'
       import repAnalysis2 from './components/rep-analysis2'
       import suggestDrug from './components/suggestDrug'
       import followSuggest from './components/followSuggest'
      import patientEdu from './components/patient-edu'
      import patientEdu2 from './components/patient-edu2'
      import patientNi from './components/patientNi'
      import nerveExamine from './components/nerveExamine'
      import eegExamine from './components/eegExamine'
      import scaleAssess from './components/scaleAssess'
       import assessment from './components/assessment'
    export default {
      name: "pdf",
      components: { 
          repIndex,
          contents,
          patientMsg,
          experience,
          assess,
          repAnalysis,
          repAnalysis2, 
          suggestDrug,
          followSuggest,
          patientEdu,
          patientEdu2,
          patientNi,
          nerveExamine,
          eegExamine,
          scaleAssess,
          assessment,
      },
      data() {
        return{
          patientData:{},
          patientVo:{},
          mainPursue:{},
          analysisData:{},
          experienceData:[],
          page:[],
        }
      },
      created(){
        this.getPatientData();
        this.getPursueData();
        this.getExperienceList();
        this.getAnalysisData();
      },
      methods: {
        getPatientData(){
          getRecordPatient(20).then(res=>{
            console.log(res)
            if(res.code==200){
              this.patientData=res.dataList[0];
              this.patientVo=res.dataList[0].patientVO;
            }
           
          })
        },
        getPursueData(){
          getPursue(20).then(res=>{
           if(res.code==200){
            this.mainPursue=res.dataList[0];
           }
          })
        }, 
        getExperienceList(){
         queryExperience(17).then(res=>{
            if(res.code==200){
              this.experienceData=res.dataList;
              let exeList=[];
              for(let item in res.dataList){

                if(item%4==0){

                }
              }
             
            }
          }).catch(error => {
            this.listLoading=false;
          })
        },
        computeRowNum(text){
            //if(text=="")
            return Math.ceil(text.length/45)
        },
        getAnalysisData(){
          let param={};
          param.medicalRecordId=30
          param.source=2;
          param.patientId=23;
          analysisData(param).then(res=>{

            if(res.code==200){
              let data=res.dataList[0];
               // this.analysisData=data;
                let page=[];//数组长度为页面页数
                let rowNum=0;//页面行数
                let itemNum=0;//页面项目数
                let pageNum=0;//第多少页
                let maxRowNum=20;//一页最大行数
              let focusProblem=data.focusProblem;//焦点问题
                 rowNum+=2;
               let pageItem1={ //页面的最小单元
                    imgPath:require("@/views/rep/img/icon-problem.png"),
                    label:"焦点问题",
                    data:[]
                  }
               
              if(focusProblem.length==0){
                focusProblem.push("无")
              }
              page[pageNum]=[];
              page[pageNum].push(pageItem1);
             
              for(let item in focusProblem){
                rowNum+=this.computeRowNum(focusProblem[item])
                if(rowNum<=20){
                   itemNum=page[pageNum].length-1;
                  page[pageNum][itemNum].data.push((item-0+1)+"、"+focusProblem[item])
                }else{
                  rowNum=2
                  pageNum++;
                  page[pageNum].push(pageItem1);
                  page[pageNum][itemNum].data.push((item-0+1)+"、"+focusProblem[item])

                }
              }
               let pageItem2={ //页面的最小单元
                  imgPath:require("@/views/rep/img/icon-nutrition.png"),
                  label:"心身因素",
                  data:[]
                }
                rowNum+=2;
              page[pageNum].push(pageItem2);
              console.log(page)
              let psychosomaticFactors=data.psychosomaticFactors;//心身因素
              if(psychosomaticFactors.length==0){
                psychosomaticFactors.push("无")
              }
              for(let item in psychosomaticFactors){
                rowNum+=this.computeRowNum(psychosomaticFactors[item])
                if(rowNum<=20){
                   itemNum=page[pageNum].length-1;
                  page[pageNum][itemNum].data.push((item-0+1)+"、"+psychosomaticFactors[item])
                }else{
                  rowNum=2
                  pageNum++;
                  page[pageNum].push(pageItem2);
                  page[pageNum][0].data.push((item-0+1)+"、"+psychosomaticFactors[item])

                }
              }
              let socialFunction=data.psychosomaticFactors;//社会因素
               rowNum+=2;
                let pageItem3={ //页面的最小单元
                    imgPath:require("@/views/rep/img/icon-society.png"),
                    label:"社会因素",
                    data:[]
                  }
              page[pageNum].push(pageItem3);
              console.log(page)
                if(socialFunction.length==0){
                  socialFunction.push("无")
                }
               for(let item in socialFunction){
                rowNum+=this.computeRowNum(socialFunction[item])
                if(rowNum<=20){
                  itemNum=page[pageNum].length-1;
                  console.log("111,"+pageNum)
                  page[pageNum][itemNum].data.push((item-0+1)+"、"+socialFunction[item]+pageNum+rowNum)
                }else{
                  let pageItem={ //页面的最小单元
                    imgPath:require("@/views/rep/img/icon-society.png"),
                    label:"社会因素",
                    data:[]
                  }
                  rowNum=2
                  pageNum++;
                  page[pageNum]=[]
                  page[pageNum].push(pageItem);
                  page[pageNum][0].data.push((item-0+1)+"、"+socialFunction[item])

                }
              }
              this.page=page;
              // if(rowNum<=20){
              //     page[pageNum]=[]
              //     page[pageNum].push(pageItem1)
              // }else{
              //   pageItem1.data=pageItem1.data.slice(0,18);
              //   page[pageNum].push(pageItem1)
              //   pageItem1.data=pageItem1.data.slice(18);
              //   page[pageNum+1]=[];
              //   page[pageNum+1].push(pageItem1)
              // }  
              //  console.log(rowNum)
              //   let psychosomaticFactors=data.psychosomaticFactors;//心身因素
              //    rowNum+=2;
              //     console.log(rowNum)
                // let pageItem2={ //页面的最小单元
                //     imgPath:require("@/views/rep/img/icon-nutrition.png"),
                //     label:"心身因素",
                //     data:[]
                //   }
              // if(psychosomaticFactors.length==0){
              //   psychosomaticFactors.push("无")
              // }
              // for(let item in psychosomaticFactors){
              //   rowNum+=this.computeRowNum(psychosomaticFactors[item])
              //   pageItem2.data.push(item+"、"+psychosomaticFactors[item])
              //   //  rowNum+=this.computeRowNum(psychosomaticFactors[item])
              //   // pageItem2.data.push(item+"、"+psychosomaticFactors[item])
              // }
              // if(rowNum<=20){
              //     page[pageNum].push(pageItem2)
              // }else{
              //   let data1=pageItem2.data;
              //    let pageItem={
              //      imgPath:require("@/views/rep/img/icon-nutrition.png"),
              //      label:"心身因素",
              //      data:data1
              //   }
              //   page[pageNum].push(pageItem)
              //   let data2=pageItem2.data;
              //   data2=pageItem2.data.slice(13)
              //   let pageItem2={
              //      imgPath:require("@/views/rep/img/icon-nutrition.png"),
              //      label:"心身因素",
              //      data:data2
              //   }
              //   page[pageNum+1]=[];
              //   page[pageNum+1].push(pageItem)
              // }
             
            //  let socialFunction=data.socialFunction;//社会因素
            //    rowNum+=2;
            //     let pageItem3={ //页面的最小单元
            //         imgPath:require("@/views/rep/img/icon-society.png"),
            //         label:"社会因素",
            //         data:[]
            //       }
            //   if(socialFunction.length==0){
            //     socialFunction.push("无")
            //   }
            //   for(let item of socialFunction){
            //     rowNum+=this.computeRowNum(item)
            //     pageItem3.data.push(item)
            //   }
            //   if(rowNum<=20){
            //       //page[rowNum]=[]
            //       page[pageNum].push(pageItem3)
            //   }else{
            //     pageItem3.data=pageItem3.data.slice(0,18);
            //    // page[rowNum]=[]
            //     page[pageNum].push(pageItem3)
            //     pageItem3.data=pageItem3.data.slice(18);
            //     page[pageNum+1]=[];
            //     page[pageNum+1].push(pageItem3)
            //   }
             this.page=page;

              // 
              // let causes=data.causes;//综合分析
              // let initialDiagnosisVO=data.initialDiagnosisVO;//诊断建议    
                  
            }
          })
        }
      },
     
    }
</script>

<style scoped  >
    .app-container{
      text-align: center
    }
    .pdf-container{
      width: 768px;
      margin: 0 auto;
    }
   .form-pdf{
     position: relative;
      width: 768px;
      height: 1091px;
      border:1px solid #eeeeee;
   }
   
  
</style>

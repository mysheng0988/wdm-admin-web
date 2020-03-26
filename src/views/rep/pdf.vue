<template>
  <div class="app-container" >
    <div class="pdf-container" id="pdfCentent" ref="content">
        <rep-index :patient-data="patientData" :patient-vo="patientVo"></rep-index>
        <contents></contents>
        <patient-msg :patient-data="patientData" :patient-vo="patientVo" :main-pursue="mainPursue"></patient-msg>
        <div v-for="(item2,index2) in experienceData" :key="'exe-'+index2">
          <experience :experience-data="item2"></experience>
        </div>
        <assess></assess>
        <div v-for="(item,index) in page" :key="index">
          <rep-analysis  :analysis-data="item"></rep-analysis>
        </div>
        <!-- <div v-for="(item,index) in drugData" :key="'drug'+index"> -->
            <suggest-drug></suggest-drug>
        <!-- </div> -->
        
        <follow-suggest></follow-suggest>
        <patient-edu></patient-edu>
        <patient-edu2></patient-edu2>
        <div v-for="(item,index) in suggestData" :key="'ni'+index">
          <patient-ni :data="item"></patient-ni>
        </div>
        
        <nerve-examine></nerve-examine>
        <eeg-examine></eeg-examine>
        <div v-for="(item,index) in scaleData" :key="'scale'+index">
           <scale-assess :data="item"></scale-assess>
        </div>
       
        <assessment></assessment>
    </div>
   <!-- <el-button type="danger" @click="getPdf('pdfCentent','nowTime')">导出PDF</el-button> -->
   <el-button type="danger" @click="outPut">导出PDF</el-button>
  </div>
</template>
<script>
import {getRecordPatient} from "@/api/patient"
import {getPursue,queryExperience} from "@/api/ips"
import {analysisData} from "@/api/analysis"
 import{scaleResult,getReportMsg} from "@/api/report"
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
          medicalRecordId:"",
          patientData:{},
          patientVo:{},
          mainPursue:{},
          analysisData:{},
          experienceData:[],
          scaleData:[],
          drugData:[],
          suggestData:[],
          page:[],
        }
      },
      created(){
        this.medicalRecordId=this.$route.query.id;
        if(this.medicalRecordId==""||this.medicalRecordId==undefined){
          this.medicalRecordId=36;
        }
        this.getPatientData();
        this.getPursueData();
        this.getExperienceList();
        this.getAnalysisData();
        this.getScaleResult();
        this.getReportMsgData();
      },
      methods: {
        outPut(){
          //  this.$nextTick(() => {
          //   this.$refs.content.window.print()
            
          // })
        },
        getReportMsgData(){
            getReportMsg(36).then(res=>{
              if(res.code==200){
                  let pageNum=0;
                  let rowNum=0;
                  let maxRowNum=22;
                  let data=res.dataList[0];
                  let exercisePrescription=JSON.parse(data.exercisePrescription);//营养处方
                 let nutritionPrescription=JSON.parse(data.nutritionPrescription);//营养处方
                 let functionalMedicineAdvice=JSON.parse(data.functionalMedicineAdvice);//功能医学建议
                 let otherSuggestion=JSON.parse(data.otherSuggestion);
                 let neurotransmitterRegulators=JSON.parse(data.neurotransmitterRegulators)
                 let followUpRecommendations=JSON.parse(data.followUpRecommendations);
                    followUpRecommendations["title"]="随访建议";
                 let suggestData=[];
                 let totalData=[];
                totalData=this.pageThenData(totalData,exercisePrescription,0);
                totalData=this.pageThenData(totalData,nutritionPrescription,0);
                totalData=this.pageThenData(totalData,functionalMedicineAdvice,0);
                totalData=this.pageThenData(totalData,otherSuggestion,0);
                totalData=this.pageThenData(totalData,neurotransmitterRegulators,0);
                totalData=this.pageThenData(totalData,followUpRecommendations,0);
                suggestData[pageNum]=[];
                for(let item of totalData){
                   rowNum+=this.computeRowNum(item.content);
                    if(rowNum>maxRowNum){
                      rowNum=0;
                      pageNum++;
                      suggestData[pageNum]=[];
                    }
                    suggestData[pageNum].push(item)
                }
                this.suggestData=suggestData;
                
                
                //console.log(data22)
              }
              
               
            })
        },
        pageThenData(data,obj,index){
          let str="";
          if(index!=0){
            str=index+"、"
          }
          if(typeof obj==="object"){
             let param={
                content:str+obj.title,
                type:index
              }
              data.push(param)
              let index2=0;
             for(let item of obj.data){
               index2++;
              this.pageThenData(data,item,index2)
             }
          }else{
            let param={
              content:"("+index+")、"+obj,
              type:1
              } 
             data.push(param)
          }
          return data;
        },
        getScaleResult(){
          scaleResult(36).then(res=>{
            let data=res.dataList;
            let scaleData=[];
            let pageNum=0;
            let itemNum=0;
            let pageMax=3;
            scaleData[pageNum]=[]
            for(let item of data){
              if(item.questionnaireNumber!=12){
                if(itemNum>pageMax){
                  itemNum=0
                  pageNum++;
                  scaleData[pageNum]=[]
                }
                 if(item.chartData!=""){
                    item.chartData=JSON.parse(item.chartData)
                  }
                  scaleData[pageNum].push(item)
              }
            }
            this.scaleData=scaleData;
          })
        },
        getPatientData(){
          getRecordPatient(this.medicalRecordId).then(res=>{
            if(res.code==200){
              this.patientData=res.dataList[0];
              this.patientVo=res.dataList[0].patientVO;
            }
           
          })
        },
        getPursueData(){
          getPursue(this.medicalRecordId).then(res=>{
           if(res.code==200){
            this.mainPursue=res.dataList[0];
           }
          })
        }, 
        getExperienceList(){
         queryExperience(36).then(res=>{
            if(res.code==200){
              this.experienceData=res.dataList;
              let exeList=[];
              let pageNum=0;
              let itemNum=0
              let pageMaxItem=2;
              exeList[pageNum]={};
              for(let item of res.dataList){
                let year=item.visitDate.substring(0,4);
                  let symptom=[];
                  for(let item1 of item.symptomList){
                      symptom.push(item1.name)
                  }
                  let checkupList=[];
                  for(let item1 of item.checkupList){
                      checkupList.push(item1.name)
                  }
                  let diagnosisList=[]
                  for(let item1 of item.diagnosisList){
                      diagnosisList.push(item1.name)
                  }
                if(itemNum<=pageMaxItem){
          
                  itemNum++;
                  if(exeList[pageNum][year]){
                   let param={
                      month:item.visitDate.substring(5,10),
                      symptom:symptom.join(","),
                      diagnosis:checkupList.join(",")+"诊断为:"+diagnosisList.join(","),
                      cureItem:item.treatmentPrograms+","+item.treatmentEffect,
                    }
                    exeList[pageNum][year].push(param);
                  }else{
                    exeList[pageNum][year]=[];
                    let param={
                      month:item.visitDate.substring(5,10),
                      symptom:symptom.join(","),
                      diagnosis:checkupList.join(",")+"诊断为:"+diagnosisList.join(","),
                      cureItem:item.treatmentPrograms+","+item.treatmentEffect,
                    }
                    exeList[pageNum][year].push(param);
                  }
                 
                }else{
                  itemNum=0;
                  pageNum++;
                  exeList[pageNum]={};
                   exeList[pageNum][year]=[];
                    let param={
                      month:item.visitDate.substring(5,10),
                      symptom:symptom.join(","),
                      diagnosis:checkupList.join(",")+"诊断为:"+diagnosisList.join(","),
                      cureItem:item.treatmentPrograms+","+item.treatmentEffect,
                    }
                    exeList[pageNum][year].push(param);
                }
                

              }
              this.experienceData=exeList;
            }
          }).catch(error => {
          })
        },
        computeRowNum(text){
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
                let maxRowNum=22;//一页最大行数
              let focusProblem=data.focusProblem;//焦点问题
                 rowNum+=3;
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
                if(rowNum<=maxRowNum){
                   itemNum=page[pageNum].length-1;
                  page[pageNum][itemNum].data.push((item-0+1)+"、"+focusProblem[item])
                }else{
                  rowNum=3
                  pageNum++;
                   let pageItem={ //页面的最小单元
                    imgPath:require("@/views/rep/img/icon-problem.png"),
                    label:"焦点问题",
                    data:[]
                  }
                  page[pageNum].push(pageItem);
                  page[pageNum][itemNum].data.push((item-0+1)+"、"+focusProblem[item])

                }
              }
               let pageItem2={ //页面的最小单元
                  imgPath:require("@/views/rep/img/icon-nutrition.png"),
                  label:"心身因素",
                  data:[]
                }
                rowNum+=3;
              page[pageNum].push(pageItem2);
              let psychosomaticFactors=data.psychosomaticFactors;//心身因素
              if(psychosomaticFactors.length==0){
                psychosomaticFactors.push("无")
              }
              for(let item in psychosomaticFactors){
                rowNum+=this.computeRowNum(psychosomaticFactors[item])
                if(rowNum<=maxRowNum){
                   itemNum=page[pageNum].length-1;
                  page[pageNum][itemNum].data.push((item-0+1)+"、"+psychosomaticFactors[item])
                }else{
                  rowNum=3
                  pageNum++;
                   let pageItem={ //页面的最小单元
                      imgPath:require("@/views/rep/img/icon-nutrition.png"),
                      label:"心身因素",
                      data:[]
                    }
                  page[pageNum].push(pageItem);
                  page[pageNum][0].data.push((item-0+1)+"、"+psychosomaticFactors[item])

                }
              }
              let socialFunction=data.socialFunction;//社会因素
               rowNum+=3;
                let pageItem3={ //页面的最小单元
                    imgPath:require("@/views/rep/img/icon-society.png"),
                    label:"社会功能",
                    data:[]
                  }
              if(rowNum>18){
                 rowNum=3       
                pageNum++;
                 page[pageNum]=[]
                 page[pageNum].push(pageItem3);
              }else{
                  page[pageNum].push(pageItem3);
              }
                if(socialFunction.length==0){
                  socialFunction.push("无")
                }
               for(let item in socialFunction){
                rowNum+=this.computeRowNum(socialFunction[item])
                if(rowNum<=maxRowNum){
                  itemNum=page[pageNum].length-1;
                  page[pageNum][itemNum].data.push((item-0+1)+"、"+socialFunction[item])
                }else{
                  let pageItem={ //页面的最小单元
                    imgPath:require("@/views/rep/img/icon-society.png"),
                    label:"",
                    data:[]
                  }
                  rowNum=3
                  pageNum++;
                  page[pageNum]=[]
                  page[pageNum].push(pageItem);
                  page[pageNum][0].data.push((item-0+1)+"、"+socialFunction[item])

                }
              }
              let causes=data.causes;//疾病成因
                let pageItem4={ //页面的最小单元
                    imgPath:require("@/views/rep/img/icon-analysis.png"),
                    label:"心身疾病成因分析",
                    data:[]
                  }
              if(rowNum>18){
                 rowNum=3
                pageNum++;
                 page[pageNum]=[]
                 page[pageNum].push(pageItem4);
              }else{
                  page[pageNum].push(pageItem4);
              }
              
                if(causes.length==0){
                  causes.push("无")
                }
               for(let item in causes){
                rowNum+=this.computeRowNum(causes[item])
                if(rowNum<=maxRowNum){
                  itemNum=page[pageNum].length-1;
                  page[pageNum][itemNum].data.push((item-0+1)+"、"+causes[item])
                }else{
                  let pageItem={ //页面的最小单元
                    imgPath:require("@/views/rep/img/icon-analysis.png"),
                    label:"",
                    data:[]
                  }
                  rowNum=3
                  pageNum++;
                  page[pageNum]=[]
                  page[pageNum].push(pageItem);
                  page[pageNum][0].data.push((item-0+1)+"、"+causes[item])

                }
              }
              let initialDiagnosisVO=data.initialDiagnosisVO;//疾病成因
               rowNum+=3;
                let pageItem5={ //页面的最小单元
                    imgPath:require("@/views/rep/img/icon-diagnose.png"),
                    label:"辅助诊断建议",
                    data:[]
                  }
              page[pageNum].push(pageItem5);
                if(initialDiagnosisVO.length==0){
                  causes.push("无")
                }
               for(let item in initialDiagnosisVO){
                rowNum+=this.computeRowNum(initialDiagnosisVO[item])
                if(rowNum<=maxRowNum){
                  itemNum=page[pageNum].length-1;
                  page[pageNum][itemNum].data.push((item-0+1)+"、"+initialDiagnosisVO[item])
                }else{
                  let pageItem={ //页面的最小单元
                    imgPath:require("@/views/rep/img/icon-analysis.png"),
                    label:"辅助诊断建议",
                    data:[]
                  }
                  rowNum=3
                  pageNum++;
                  page[pageNum]=[]
                  page[pageNum].push(pageItem);
                  page[pageNum][0].data.push((item-0+1)+"、"+initialDiagnosisVO[item])

                }
              }
              this.page=page;
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

<template>
  <div  class="app-container">
    <div class="pdf-container" id="pdfCentent" ref="content">
        <rep-index :patient-data="patientData" :patient-vo="patientVo"></rep-index>
        <contents :data="contentsData"></contents>
        <patient-msg :page-num="contentsData[0].pageNum" :patient-data="patientData" :patient-vo="patientVo" :main-pursue="mainPursue"></patient-msg>
        <div v-for="(item2,index2) in experienceData" :key="'exe-'+index2">
          <experience :experience-data="item2" :page-num="contentsData[1].pageNum-0+index2" ></experience>
        </div>
        <assess  :page-num="contentsData[2].pageNum" :medical-record-id="medicalRecordId+''"></assess>
        <div v-for="(item,index) in page" :key="index">
          <rep-analysis  :page-num="contentsData[3].pageNum-0+index" :analysis-data="item"></rep-analysis>
        </div>
        <div v-for="(item,index) in drugData" :key="'drug'+index">
            <suggest-drug :data="item" :page-num="contentsData[4].pageNum-0+index" ></suggest-drug>
        </div>
        <div v-for="(item,index) in suggestData" :key="'ni'+index">
          <patient-ni :data="item" :page-num="contentsData[5].pageNum-0+index" ></patient-ni>
        </div>
        <nerve-examine  :medical-record-id="medicalRecordId+''" :page-num="contentsData[6].pageNum" ></nerve-examine>
        <eeg-examine  :medical-record-id="medicalRecordId+''" :page-num="contentsData[7].pageNum" ></eeg-examine>
        <div v-for="(item,index) in scaleData" :key="'scale'+index">
           <scale-assess :data="item" :page-num="contentsData[8].pageNum-0+index" ></scale-assess>
        </div>
        <assessment v-if="pressureData" :data="pressureData" :page-num="contentsData[9].pageNum" ></assessment>
        <assessment2 v-if="pressureData2" :data="pressureData2" :page-num="contentsData[9].pageNum-0+1"></assessment2>
        <rep-end></rep-end>
    </div>
        <el-button type="danger" @click="getPdf('pdfCentent',patientVo.realName)">导出PDF</el-button>
        <!-- <el-button type="danger" @click="outPut">浏览器导出PDF</el-button> -->
  </div>
</template>
<script>
import {getRecordPatient} from "@/api/patient"
import {getPursue,queryExperience} from "@/api/ips"
import {analysisData} from "@/api/analysis"

import content from '@/assets/images/content.png'
import aaa from '@/assets/images/aaa.png'
import ccc from '@/assets/images/ccc.png'
import exper from '@/assets/images/experience.png'
 import{scaleResult,getReportMsg,scaleResultNum} from "@/api/report"
      import repIndex from './components/rep-index'
      import contents from './components/contents'
      import patientMsg from './components/patientMsg'
      import experience from './components/experience'
      import assess from './components/assess'
      import repAnalysis from './components/rep-analysis'
      import suggestDrug from './components/suggestDrug'
      import followSuggest from './components/followSuggest'
      import patientEdu from './components/patient-edu'
      import patientNi from './components/patientNi'
      import nerveExamine from './components/nerveExamine'
      import eegExamine from './components/eegExamine'
      import scaleAssess from './components/scaleAssess'
      import assessment from './components/assessment'
      import assessment2 from './components/assessment2'
       import repEnd from './components/repEnd'
      
    export default {
      name: "pdf",
      components: { 
          repIndex,
          contents,
          patientMsg,
          experience,
          assess,
          repAnalysis,
          suggestDrug,
          followSuggest,
          patientEdu,
          patientNi,
          nerveExamine,
          eegExamine,
          scaleAssess,
          assessment,
          assessment2,
          repEnd
      },
      data() {
        return{
          dddd:[content,aaa,ccc,exper],
          medicalRecordId:"",
          pressureData:"",
          pressureData2:"",
          patientData:{},
          patientVo:{},
          mainPursue:{},
          analysisData:{},
          experienceData:[],
          scaleData:[],
          drugData:[],
          suggestData:[],
          contentsData:[
            {
              pageName:"基本信息",
              pageNum:0,
               hidden:false,
            },
             {
              pageName:"就诊经历",
              pageNum:0,
               hidden:false,
            },
             {
              pageName:"三维评估",
              pageNum:0,
               hidden:false,
            },
             {
              pageName:"报告分析总结",
              pageNum:0,
               hidden:false,
            },
             {
              pageName:"治疗方案参考",
              pageNum:0,
               hidden:false,
            },
             {
              pageName:"附录1:患者教育",
              pageNum:0,
               hidden:false,
            },
             {
              pageName:"附录2:自主神经检查",
              pageNum:0,
               hidden:false,
            },
             {
              pageName:"附录3:EEG检测",
              pageNum:0,
               hidden:false,
            },
             {
              pageName:"附录4:量表评估",
              pageNum:0,
               hidden:false,
            },
             {
              pageName:"附录5:压力量表评估",
              pageNum:0,
              hidden:true,
            }
          ],
          page:[],
        }
      },
      watch: {
        $route(to) {
            this.medicalRecordId=this.$route.query.id;
             this.getExperienceList();
           this.getPatientData();
           this.getPursueData();
           this.getScaleResult();
           this.getReportMsgData();
           this.getScaleNumResult();
        }
      },
      created(){
        this.medicalRecordId=this.$route.query.id;
        if(this.medicalRecordId==""||this.medicalRecordId==undefined){
          this.medicalRecordId=36;
        }
        
         this.contentsData[0].pageNum=1;//患者信息
      },
      mounted(){
           this.getExperienceList();
           this.getPatientData();
           this.getPursueData();
           this.getScaleResult();
           this.getReportMsgData();
           this.getScaleNumResult();
      },
      methods: {
        outPut(){
           this.$nextTick(() => {
            window.print()
            
          })
        },
        getScaleNumResult(){
            scaleResultNum(this.medicalRecordId,{questionnaireNumbers:12}).then(res=>{
              let rowNum=0;
              let maxRow=15;
              if(res.code==200){
                let pressureData=res.dataList[0];
                pressureData.conclusion=JSON.parse(pressureData.conclusion);
                pressureData.chartData=JSON.parse(pressureData.chartData);
                let explanation=JSON.parse(pressureData.explanation);
                let index=0;
                for(let item of explanation){
                   rowNum+=this.computeRowNum(item);
                  if(rowNum<=maxRow){
                      index++;
                  }  
                }
                if(rowNum>maxRow){
                    rowNum=0;
                    pressureData.explanation=explanation.slice(0,index);
                    let pressureData2=explanation.slice(index,6);
                    this.pressureData2=pressureData2;
                }else{
                     pressureData.explanation=explanation;
                }
                this.pressureData=pressureData;
              }
            })
        },
        getReportMsgData(){
            getReportMsg(this.medicalRecordId).then(res=>{
              if(res.code==200){
                  let pageNum=0;
                  let rowNum=0;
                  let maxRowNum=24;
                  let data=res.dataList[0];
                  this.getAnalysisData(data);//报告分析总结模块
                  this.doctorDrugPlan(data);//医生治疗建议
                  let patientMedicationPlan={};
                  patientMedicationPlan.title="用药辅助建议";
                  patientMedicationPlan.data=[];
                   let dataPlan=data.patientMedicationPlan;
                    if(dataPlan.length==0){
                        data.noneMedicationPlanPrompt=data.noneMedicationPlanPrompt?data.noneMedicationPlanPrompt:"无"
                      dataPlan.push(data.noneMedicationPlanPrompt)
                    }
                    let param={
                      title:"神经递质调节药物",
                      data:dataPlan
                    }
                    //躯体化药物方案
                    let somatizationSymptomsDrugRegimen=JSON.parse(data.somatizationSymptomsDrugRegimen);
                    patientMedicationPlan.data.push(param)
                    if(somatizationSymptomsDrugRegimen){
                       patientMedicationPlan.data.push(somatizationSymptomsDrugRegimen);
                    }
                  let exercisePrescription=JSON.parse(data.exercisePrescription);//运动处方
                 let nutritionPrescription=JSON.parse(data.nutritionPrescription);//营养处方
                 let functionalMedicineAdvice=JSON.parse(data.functionalMedicineAdvice);//功能医学建议
                 let otherSuggestion=JSON.parse(data.otherSuggestion);
                
                 
                 let suggestData=[];
                 let totalData=[];
                totalData=this.pageThenData(totalData,patientMedicationPlan,0);
                if(exercisePrescription){
                  totalData=this.pageThenData(totalData,exercisePrescription,0);
                }
                if(nutritionPrescription){
                    totalData=this.pageThenData(totalData,nutritionPrescription,0);
                }
                if(functionalMedicineAdvice){
                   totalData=this.pageThenData(totalData,functionalMedicineAdvice,0);
                }
                if(otherSuggestion){
                  totalData=this.pageThenData(totalData,otherSuggestion,0);
                }
                 if(data.neurotransmitterRegulators&&data.neurotransmitterRegulators!=""){
                     let neurotransmitterRegulators=JSON.parse(data.neurotransmitterRegulators)
                    totalData=this.pageThenData(totalData,neurotransmitterRegulators,0);
                 }
                //totalData=this.pageThenData(totalData,followUpRecommendations,0);
                suggestData[pageNum]=[];
                for(let item of totalData){
                  let num=this.computeRowNum(item.content);
                   rowNum+=num;
                    if(rowNum>maxRowNum){
                      rowNum=this.computeRowNum(item.content)+1;
                      pageNum++;
                      suggestData[pageNum]=[];
                    }
                    suggestData[pageNum].push(item)
                }
                this.suggestData=suggestData;
                this.contentsData[6].pageNum=this.contentsData[5].pageNum+this.suggestData.length;//附录2:自主神经检查
                this.contentsData[7].pageNum=this.contentsData[6].pageNum+1;//附录3:EEG检测
                this.contentsData[8].pageNum=this.contentsData[7].pageNum+1;//附录4:量表评估
                this.contentsData[9].pageNum=this.contentsData[8].pageNum+this.scaleData.length;//附录4:压力量表评估
        
              }
              
               
            })
        },
        //医生药物治疗方案
        doctorDrugPlan(data){
           let pageNum=0;
           let rowNum=1;
           let maxRowNum=24;
           let drugData=[];
           let totalData=[];
           let doctorMedicationPlan={};
           doctorMedicationPlan.title="用药辅助建议";
           doctorMedicationPlan.data=[];
           let dataPlan=data.doctorMedicationPlan;
           if(dataPlan.length==0){
             data.noneMedicationPlanPrompt=data.noneMedicationPlanPrompt?data.noneMedicationPlanPrompt:"无"
             dataPlan.push(data.noneMedicationPlanPrompt)
           }
            let param={
              title:"神经递质调节药物",
              data:dataPlan
            }
            //躯体化药物方案
            let somatizationSymptomsDrugRegimen=JSON.parse(data.somatizationSymptomsDrugRegimen);
            doctorMedicationPlan.data.push(param)
            if(somatizationSymptomsDrugRegimen){
              doctorMedicationPlan.data.push(somatizationSymptomsDrugRegimen);
            }
            totalData=this.pageThenData(totalData,doctorMedicationPlan,0);
            //心身治疗建议
            let psychosomaticTherapy=JSON.parse(data.psychosomaticTherapy);
            if(psychosomaticTherapy){
                totalData=this.pageThenData(totalData,psychosomaticTherapy,0);
            }
            //随访建议
            let followUpRecommendations=JSON.parse(data.followUpRecommendations);
            if(followUpRecommendations){
                followUpRecommendations["title"]="随访建议";
                totalData=this.pageThenData(totalData,followUpRecommendations,0);
            }
            
            drugData[pageNum]=[];
            for(let item of totalData){
                rowNum+=this.computeRowNum(item.content);
                if(rowNum>maxRowNum){
                  rowNum=this.computeRowNum(item.content)+1;
                  pageNum++;
                  drugData[pageNum]=[];
                }
                drugData[pageNum].push(item)
            }
           this.drugData=drugData;
            this.contentsData[5].pageNum=this.contentsData[4].pageNum+this.drugData.length;//附录1:患者教育
         
        },
        pageThenData(data,obj,index){
          if(!obj){
            return;
          }
          let str="";
          // if(index!=0){
          //   str=index+"、"
          // }
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
              content:index+"、"+obj,
              type:1
              } 
             data.push(param)
          }
          return data;
        },
        getScaleResult(){
          scaleResult(this.medicalRecordId).then(res=>{
            let data=res.dataList;
            let scaleData=[];
            let pageNum=0;
            let itemNum=0;
            let pageMax=3;
            scaleData[pageNum]=[]
            for(let item of data){
              if(item.questionnaireNumber!=12){
                itemNum++;
                if(itemNum>pageMax){
                  itemNum=1
                  pageNum++;
                  scaleData[pageNum]=[]
                }
                if(item.chartData!=""){
                    item.chartData=JSON.parse(item.chartData);
                    if(item.chartData.length>4){
                      itemNum++;
                    }
                  }
                  scaleData[pageNum].push(item)
              }
            }
            this.scaleData=scaleData;
          })
        },
        getPatientData(){
          getRecordPatient(this.medicalRecordId).then(res=>{
            console.log(res)
            if(res.code==200){
              this.patientData=res.dataList[0];
              this.patientVo=res.dataList[0].patientVO;
            }
           
          })
        },
        getPursueData(){
          getPursue(this.medicalRecordId).then(res=>{
            console.log(res)
           if(res.code==200){
            this.mainPursue=res.dataList[0];
           }
          })
        }, 
        getExperienceList(){
         queryExperience(this.medicalRecordId).then(res=>{
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
            let length=this.experienceData.length;
             this.contentsData[1].pageNum=2;//就诊经历
             this.contentsData[1].hidden=this.experienceData.length==0?true:false;
             this.contentsData[2].pageNum=2-0+this.experienceData.length;//三维评估
             this.contentsData[3].pageNum=this.contentsData[2].pageNum+1;//报告分析总结
          }).catch(error => {
          })
        },
        computeRowNum(text){
            return Math.ceil(text.length/45)
        },
        copyAnalysis(toatalData,imagePath,label,data){
          if(!data||data.length==0){
            data.push("无");
          }
          let param={
            imgPath:imagePath,
            content:label
          }
          toatalData.push(param);
          let index=0;
          for(let item of data){
            index++;
            let dataObj={
              imgPath:"",
              content:index+"、"+item
            }
            toatalData.push(dataObj)
          }
          return toatalData;
        },
        getAnalysisData(data){
             let page=[];//数组长度为页面页数
             let rowNum=0;//页面行数
             let pageNum=0;//第多少页
             let maxRowNum=15;//一页最大行数
             page[pageNum]=[];
             let toatalData=[]
             if(data.typeId=="4"){
              toatalData= this.copyAnalysis(toatalData,require("@/views/rep/img/icon-problem.png"),"焦点问题",data.focusProblem)
              toatalData= this.copyAnalysis(toatalData,require("@/views/rep/img/icon-nutrition.png"),"心身因素",data.psychosomaticFactors)
              toatalData= this.copyAnalysis(toatalData,require("@/views/rep/img/icon-society.png"),"社会功能",data.socialFunction)
              toatalData= this.copyAnalysis(toatalData,require("@/views/rep/img/icon-analysis.png"),"疾病成因分析",data.causes)
              toatalData= this.copyAnalysis(toatalData,require("@/views/rep/img/icon-diagnose.png"),"辅助诊断建议",data.initialDiagnosisVO)
             }else{
              toatalData= this.copyAnalysis(toatalData,require("@/views/rep/img/icon-nutrition.png"),"心身因素",data.psychosomaticFactors)
             }
             for(let item of toatalData){
               rowNum+=this.computeRowNum(item.content)
               if(rowNum>maxRowNum){
                 rowNum=this.computeRowNum(item.content);
                 pageNum++;
                  page[pageNum]=[];
               }
               page[pageNum].push(item)
             }
            this.page=page;
            this.contentsData[4].pageNum=this.contentsData[3].pageNum+this.page.length;//治疗方案参考
            console.log(this.contentsData[3].pageNum)
            console.log(this.page.length)
            console.log(this.contentsData[4].pageNum)
        },
        getAnalysisData2(data){
               // this.analysisData=data;
                let page=[];//数组长度为页面页数
                let rowNum=0;//页面行数
                let itemNum=0;//页面项目数
                let pageNum=0;//第多少页
                let maxRowNum=20;//一页最大行数
                page[pageNum]=[];
              if(data.type=="4"){
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
              
              page[pageNum].push(pageItem1);
             
              for(let item in focusProblem){
                rowNum+=this.computeRowNum(focusProblem[item])
                if(rowNum<=maxRowNum){
                   itemNum=page[pageNum].length-1;
                  page[pageNum][itemNum].data.push((item-0+1)+"、"+focusProblem[item])
                }else{
                  rowNum=2
                  pageNum++;
                   let pageItem={ //页面的最小单元
                    imgPath:require("@/views/rep/img/icon-problem.png"),
                    label:"",
                    data:[]
                  }
                   page[pageNum]=[];
                  page[pageNum].push(pageItem);
                  page[pageNum][itemNum].data.push((item-0+1)+"、"+focusProblem[item])

                }
              }
              }
              
               let pageItem2={ //页面的最小单元
                  imgPath:require("@/views/rep/img/icon-nutrition.png"),
                  label:"心身因素",
                  data:[]
                }
                rowNum+=2;
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
                  rowNum=2
                  pageNum++;
                   let pageItem={ //页面的最小单元
                      imgPath:require("@/views/rep/img/icon-nutrition.png"),
                      label:"",
                      data:[]
                    }
                  page[pageNum]=[];
                  page[pageNum].push(pageItem);
                  page[pageNum][0].data.push((item-0+1)+"、"+psychosomaticFactors[item])

                }
              }
              let socialFunction=data.socialFunction;//社会功能
               if(socialFunction.length!=0&&socialFunction[0]==""){
                  socialFunction[0]="无";
               }
               rowNum+=3;
                let pageItem3={ //页面的最小单元
                    imgPath:require("@/views/rep/img/icon-society.png"),
                    label:"社会功能",
                    data:[]
                  }
              if(rowNum>maxRowNum){
                 rowNum=2       
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
                  rowNum=2
                  pageNum++;
                  page[pageNum]=[]
                  page[pageNum].push(pageItem);
                  page[pageNum][0].data.push((item-0+1)+"、"+socialFunction[item])

                }
              }
              let causes=data.causes;//疾病成因
              if(causes){
                  let pageItem4={ //页面的最小单元
                    imgPath:require("@/views/rep/img/icon-analysis.png"),
                    label:"心身疾病成因分析",
                    data:[]
                  }
                  if(rowNum>maxRowNum){
                    rowNum=2
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
                      rowNum=2
                      pageNum++;
                      page[pageNum]=[]
                      page[pageNum].push(pageItem);
                      page[pageNum][0].data.push((item-0+1)+"、"+causes[item])

                    }
                  }
              }
                
              let initialDiagnosisVO=data.initialDiagnosisVO;//疾病成因
               rowNum+=2;
                let pageItem5={ //页面的最小单元
                    imgPath:require("@/views/rep/img/icon-diagnose.png"),
                    label:"辅助诊断建议",
                    data:[]
                  }
              page[pageNum].push(pageItem5);
                if(initialDiagnosisVO.length==0){
                  initialDiagnosisVO.push("无")
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
                  rowNum=2
                  pageNum++;
                  page[pageNum]=[]
                  page[pageNum].push(pageItem);
                  page[pageNum][0].data.push((item-0+1)+"、"+initialDiagnosisVO[item])

                }
              }
              this.page=page;
              this.contentsData[4].pageNum=this.contentsData[3].pageNum+this.page.length;//治疗方案参考
         
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
      height: 1092px;
      border:1px solid #eeeeee;
      overflow: hidden;
   }
   
   
  
</style>

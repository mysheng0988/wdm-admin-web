<template>
  <div class="app-container" >
    <div class="pdf-container" id="pdfCentent">
        <rep-index></rep-index>
        <contents></contents>
        <patient-msg></patient-msg>
        <experience></experience>
        <assess></assess>
        <rep-analysis></rep-analysis>
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

        }
      },
      methods: {
      }
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

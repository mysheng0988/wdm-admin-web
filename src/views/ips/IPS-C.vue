<template>
  <div class="app-container" id="pdfCentent">
    <el-card class="operate-container" shadow="never">
      <el-row :gutter="10">
        <el-col :span="24">
          <div>编号：<span>{{patient.pid}}</span></div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="6">
          <div>姓名：<span>{{patient.realName}}</span></div>
        </el-col>
        <el-col :span="6">
          <div>年龄：<span>{{age}}</span></div>
        </el-col>
        <el-col :span="6">
          <div>性别：<span>{{patient.gender?"女":"男"}}</span></div>
        </el-col>
        <el-col :span="6">
          <div>身高：<span>{{patient.height}}cm</span></div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="6">
          <div>体重：<span>{{patient.weight}}</span></div>
        </el-col>
        <el-col :span="6">
          <div>来源医生：<span>{{patient.fromRealName}}</span></div>
        </el-col>
        <el-col :span="6">
          <div>来源科室：<span>{{patient.fromDeptName}}</span></div>
        </el-col>
        <el-col :span="6">
          <div>测评项目：<span>{{patient.examinationName}}</span></div>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="主诉" @click.native="changeTab(0)"></el-step>
        <el-step title="HRV"  @click.native="changeTab(1)"></el-step>
        <el-step title="EEG"  @click.native="changeTab(2)"></el-step>
        <el-step title="问卷"></el-step>
        <el-step title="量表"></el-step>
        <el-step title="综合分析"></el-step>
        <el-step title="治疗方案"></el-step>
      </el-steps>
      <main-pursue
        v-if="showStatus[0]"
        :is-edit="isEdit"
        :patient-id="patientId+''"
        :medical-record-id="medicalRecordId+''"
        next-title="HRV"
        @nextStep="nextStep">
      </main-pursue>
      <hrv
        v-if="showStatus[1]"
        :is-edit="isEdit"
        :patient-id="patientId+''"
        :medical-record-id="medicalRecordId+''"
        @nextStep="nextStep"
        prev-title="主诉"
        next-title="EEG"
        @prevStep="prevStep">
      </hrv>
      <eeg
        v-if="showStatus[2]"
        :is-edit="isEdit"
        :patient-id="patientId+''"
        @nextStep="nextStep"
        prev-title="HRV"
        next-title="问卷"
        @prevStep="prevStep">
      </eeg>
      <easy-question
      v-if="showStatus[3]"
      :is-edit="isEdit"
      :patient-id="patientId+''"
      prev-title="EEG"
      next-title="量表"
      @nextStep="nextStep"
      @prevStep="prevStep">
    </easy-question>
      <scale
        v-if="showStatus[4]"
        :is-edit="isEdit"
        :patient-id="patientId+''"
        prev-title="问卷"
        next-title="综合分析"
        @nextStep="nextStep"
        @prevStep="prevStep">
      </scale>
      <analysis
        v-if="showStatus[5]"
        :is-edit="isEdit"
        :patient-id="patientId+''"
        prev-title="量表"
        next-title="治疗方案"
        @nextStep="nextStep"
        @prevStep="prevStep">
      </analysis>
      <cure-plan
        v-if="showStatus[6]"
        :is-edit="isEdit"
        :patient-id="patientId+''"
        prev-title="综合分析"
        @prevStep="prevStep"
        @finishCommit="finishCommit">
      </cure-plan>
    </el-card>
     <el-button type="danger" @click="getPdf('pdfCentent','nowTime')">导出PDF</el-button>
  </div>
</template>

<script>
  import {getPatient} from "@/api/patient";
  import mainPursue from './components/mainPursue';
  import hrv from './components/hrv';
  import eeg from './components/eeg';
  import easyQuestion from './components/easyQuestion';
  import scale from './components/scale';
  import analysis from './components/analysis';
  import curePlan from './components/curePlan';
  import { Message, MessageBox } from 'element-ui'
  export default {
    name: "IPS-A",
    components: {mainPursue, hrv, eeg,easyQuestion,scale,analysis,curePlan},
    data() {
      return {
        active:0,
        showStatus: [true, false, false,false,false,false,false],
        listLoading: false,
        patientId:"",
        medicalRecordId:"",
        total:0,
        patient:"",
        isEdit:false,
        listQuery: {
          shopId:null,
          currentPage: 1,
          pageSize: 10
        },
      }
    },
    created() {
      this.patientId=this.$route.query.id;
      this.medicalRecordId=this.$route.query.medicalRecordId;
      this.getPatientMsg();
    },
    computed:{
      age:function () {
        if(this.patient.birthday!=""&&this.patient.birthday){
          let age=this.patient.birthday.substring(0,4);
          let year=new Date().getFullYear()
          return year-age-1;
        }
        return "";
      }
    },
    methods: {
      changeTab(index){
        console.log(index)
        this.active=index;
        this.hideAll();
        this.showStatus[index] = true;
      },
      getPatientMsg(){

        getPatient(this.$route.query.id).then(res=>{
          this.patient=res.dataList[0];
        })
      },
      hideAll() {
        for (let i = 0; i < this.showStatus.length; i++) {
          this.showStatus[i] = false;
        }
      },
      prevStep() {
        if (this.active > 0 && this.active < this.showStatus.length) {
          this.active--;
          this.hideAll();
          this.showStatus[this.active] = true;
        }
      },
      nextStep() {
        console.log(this.active)
        if (this.active < this.showStatus.length - 1) {
          this.active++;
          this.hideAll();
          this.showStatus[this.active] = true;
        }
      },
      finishCommit(param) {
        this.productParam.goodsImg=param;
        this.$confirm('是否要提交该产品', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // saveGoods(this.productParam).then((res)=>{
          //   this.$message({
          //     type: 'success',
          //     message: '提交成功',
          //     duration:1000
          //   });
          //   this.$router.back();
          // })

        })
      }
    }
  }
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }
  .operate-container{
    margin-bottom: 15px;
  }
  .active{
    border:1px solid #1197D6;
    color: #1197D6;
  }
</style>

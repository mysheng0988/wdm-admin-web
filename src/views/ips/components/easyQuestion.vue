<template>
  <div style="margin-top: 50px">
    <el-form  ref="easyQuestion" label-width="120px" >
      <el-form-item  style="text-align: center">
        <div class="ips-input">首访问卷</div>
        <el-button type="primary">测试记录</el-button>
        <el-button type="primary" @click="startQuestion">开始问卷</el-button>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步，{{prevTitle}}</el-button>
        <el-button type="primary" size="medium" @click="handleNext">下一步，{{nextTitle}}</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="答题卡"
      :visible.sync="dialogVisible"
      width="700px">
      <question :data="answerData"  :medical-record-id="medicalRecordId"
        :patient-id="patientId" @closeDialog="closeDialog"></question>

    </el-dialog>
  </div>
</template>

<script>

import {getScaleJson} from '@/api/getJson'
import {getMedicalRecord} from '@/api/question'
  import question from './question';
  export default {
    name: "easyQuestion",
    components: {question},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      },
      patientId:{
        type:String,
        value:""
      },
      medicalRecordId:{
        type:String,
        value:""
      },
      prevTitle:{
        type:String,
        value:"",
      },
      nextTitle:{
        type:String,
        value:"",
      },
    },
    data() {
      return {
        dialogVisible:false,
        answerData:{},
      };
    },
    created() {
       let num=Math.floor(Math.random()*31)
        getScaleJson(31).then(res=>{
          this.answerData=res.data;
        })
        getMedicalRecord(this.medicalRecordId).then(res=>{
            console.log(res)
        });
    },
    methods: {
      startQuestion(){
        this.dialogVisible=true;
      },
      closeDialog(){
        this.dialogVisible=false;
      },
      handlePrev() {
        this.$emit('prevStep')
      },
      handleNext() {
        this.$emit('nextStep');
      }
    }
  }
</script>

<style scoped>

  .ips-input{
    margin: 0 10px;
    width: 400px;
    display: inline-block;
    border: 1px solid #eeee;
    border-radius: 10px;
    color: #999;
  }
</style>

<template>
  <div style="margin-top: 50px">
    <el-form  ref="easyQuestion" label-width="120px" >
      <el-form-item  style="text-align: center">
        <div class="ips-input">{{questionNo==1?"初筛首访问卷":"首访问卷"}}</div>
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
      <question :scale-id="scaleId"  :medical-record-id="medicalRecordId"
        :patient-id="patientId" @closeDialog="closeDialog"></question>

    </el-dialog>
  </div>
</template>

<script>
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
        completeQuestionnaire:false,
        scaleId:"",
        questionNo:""
      };
    },
    created() {
       let num=Math.floor(Math.random()*31)
       
        getMedicalRecord(this.medicalRecordId).then(res=>{
          if(res.code==200){
              this.questionNo=res.dataList[0].questionnaireNo;
              this.completeQuestionnaire=res.dataList[0].questionnaireNo;
          }
            
        });
    },
    methods: {
      startQuestion(){
        this.scaleId=this.questionNo;
        this.dialogVisible=true;
      },
      closeDialog(){
        this.dialogVisible=false;
      },
      handlePrev() {
        this.$emit('prevStep')
      },
      handleNext() {
        if(this.completeQuestionnaire){
          this.$emit('nextStep');
        }else{
          this.$message.warning("您还没有做问卷！")
        }
        
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

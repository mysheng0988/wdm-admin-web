<template>
  <div style="margin-top: 50px">
    <el-form  ref="productInfoForm" label-width="120px" >
       <!-- <el-form-item style="text-align: center"  >
            <el-input style="width:400px" v-model="scaleId" placeholder="请输入1到27数字"  ></el-input>
           <el-button type="primary">记录结果</el-button>
            <el-button type="primary" @click="customQuestion()">开始检测</el-button>
       </el-form-item> -->
      <el-form-item style="text-align: center" v-for="(item,index) of scaleNoList" :key="index">
        <div class="ips-input" >{{arrTitle[item-1]}}{{item}}</div>
        <el-button type="primary">记录结果</el-button>
        <el-button type="primary" @click="startQuestion(item)">开始检测</el-button>
      </el-form-item>
     
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步，{{prevTitle}}</el-button>
        <el-button type="primary" size="medium" @click="handleNext">下一步，{{nextTitle}}</el-button> </el-form-item>
    </el-form>
    <el-dialog
      title="答题卡"
      :visible.sync="dialogVisible"
     destroy-on-close
      width="700px">
      <question-scale :scale-id="scaleId"  :medical-record-id="medicalRecordId"
        :patient-id="patientId" @closeDialog="closeDialog" ref="scale"></question-scale>

    </el-dialog>
  </div>
</template>

<script>
 
  import questionScale from './questionScale';
   import {getMedicalRecord} from '@/api/question'
  const defaultProductParam = {
    
  };
  export default {
    name: "scale",
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
     components: {questionScale},
    data() {
      return {
        arrTitle:["GAD-7筛查量表","汉密尔顿焦虑量表（HAMA）","惊恐障碍严重度量表（PDSS）","PHQ-9筛查量表","汉密尔顿抑郁量表(HAMD)","斯坦福急性应激反应问卷（SASRQ）","简易自评量表SCL - 90","阿森斯失眠量表（AIS）","营养不良通用筛查表（MUST）","社会适应能力量表"
         ,"生活满意度量表（SWLS）","压力自评量表（SSQ-53）","YALE-BROWN强迫量表","防御方式问卷DSQ","A型行为问卷","应付方式问卷","青少年生活事件量表（ASLEC）","抑郁性质问卷","焦虑性质问卷","家庭亲密度与适应性量表","领悟社会支持量表(PSSS)",
         "父母教养方式评价量表（EMBU）","特质应对方式问卷（TCSQ）","营养初次问诊表","创伤后应激障碍自评量表（PCL-C）","躯体化症状自评量表","生活事件量表（ＬＥＳ）"],
        dialogVisible:false,
        scaleId:"",
        scaleState:false,
        answerData:{},
        scaleNoList:[],
      };
    },
    created() {
        getMedicalRecord(this.medicalRecordId).then(res=>{
          if(res.code==200){
              this.scaleNoList=res.dataList[0].scaleNoList;
              this.scaleState=res.dataList[0].scaleNoList.length==res.dataList[0].completeScaleNoList.length;
          }
            
        });
    },
    methods: {
      customQuestion(){
        if(this.scaleId>0&&this.scaleId<28){
          this.dialogVisible=true;
        }else{
          this.$message.warning("请输入量表id")
        }
        
      },
       startQuestion(num){
         this.scaleId=num;
         this.dialogVisible=true;
         //this.$refs.scale.handleChangeJSON(num)
      },
      closeDialog(){
        this.dialogVisible=false;
      },
      handlePrev() {
        this.$emit('prevStep')
      },
      handleNext() {
        // if(this.scaleState){
          this.$emit('nextStep');
        // }else{
        //   this.$message.warning("您的量表还没有做完")
        // }
       
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

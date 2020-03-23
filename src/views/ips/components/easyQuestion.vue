<template>
  <div style="margin-top: 50px">
    <el-form  ref="easyQuestion" label-width="120px" >
      <el-form-item  style="text-align: center">
        <div class="ips-input">{{questionNo==1?"初筛首访问卷":"首访问卷"}}</div>
        <el-button type="primary" @click="startQuestion">{{completeQuestionnaire?'重测问卷':'开始问卷'}}</el-button>
         <el-button type="primary" :class="completeQuestionnaire?'':'disable'" @click="handleRecord(true,questionNo)">测试记录</el-button>
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
    <el-dialog
      title="量表选择"
      :visible.sync="dialogVisible2"
      width="60%">
        <div class="screen-title">您已完成首访问卷的所有内容，系统自动为您推荐以下量表内容，请根据患者实际情况选择测试内容，点击【继续测试量表】进入测试量表步骤。</div>
        <div class="screen-box flex">
          <div class="item-box">
            <div class="title">待选择</div>
            <el-input
              placeholder="输入关键字进行过滤"
              v-model="filterText" size="small">
            </el-input>
            <el-tree
                :data="data"
                show-checkbox
                node-key="id"
                class="tree-box"
                :filter-node-method="filterNode"
                :props="defaultProps"
                highlight-current
                @node-click="handleNodeClick"
                @check="handleNodeChecked"
                ref="tree">
             </el-tree>
          </div>
          <div class="item-box">
            <div  class="title">已选择</div>
            <p v-for="(item,index) in selectedData" class="label" :key="index"  >
                {{item.label}}
              <i class="close el-icon-error" @click="handleRemove(index)"></i>
            </p>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">重新测试问卷</el-button>
        <el-button type="primary" @click="handleNextItem()">继续测试量表</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {getMedicalRecord} from '@/api/question'
import {updateMedicalRecord} from '@/api/medicalRecord'
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
        filterText:"",
        selectedData:"",
        data: [{
          id: 101,
          parentId:0,
          label: '营养状况',
          children: [{
            id: 9,
            parentId:101,
            label: '营养不良通用筛查表',
          },{
            id: 24,
            parentId:101,
            label: '营养初次问诊表',
          }]
        },{
          id:102,
          parentId:0,
          label: '应激',
          children: [{
            id: 27,
            parentId:102,
            label: '生活事件量表LES',
          },{
            id: 17,
            parentId:102,
            label: '青少年生活事件量表ASLEC',
          },{
            id: 6,
            parentId:102,
            label: '斯坦福急性应激反应问卷SASRQ',
          },{
            id: 25,
            parentId:102,
            label: '创伤后应激障碍量表',
          }]
        },{
          id: 103,
          parentId:0,
          label: '压力状态',
          children: [{
            id: 12,
            parentId:103,
            label: '压力自评量表SSQ',
          }]
        },{
          id: 104,
          parentId:0,
          label: '心身反应模式',
          children: [{
            id: 16,
            parentId:104,
            label: '应对方式问卷',
          },{
            id: 14,
            parentId:104,
            label: '防御方式问卷DSQ',
          },{
            id: 23,
            parentId:104,
            label: '特质应对方式问卷TCSQ',
          }]
        },{
          id: 105,
          parentId:0,
          label: '重要客体的影响',
          children: [{
            id: 22,
            parentId:105,
            label: '家庭教养方式量表EMBU',
          },{
            id: 20,
            parentId:105,
            label: '家庭亲密度和适应性量表',
          }]
        },{
          id:106,
          parentId:0,
          label: '人格特征人格特征',
          children: [{
            id: 15,
            parentId:106,
            label: 'A 型行为量表',
          }]
        },{
          id: 107,
          parentId:0,
          label: '社会功能',
          children: [{
            id: 22,
            parentId:107,
            label: '社会适应能力量表 ',
          },{
            id: 11,
            parentId:107,
            label: '生活满意度量表 ',
          }]
        },{
          id: 108,
          parentId:0,
          label: '社会支持',
          children: [{
            id: 21,
            parentId:108,
            label: '领悟社会支持评定量表 ',
          }]
        },{
          id: 109,
          parentId:0,
          label: '周围环境',
          children: [{
            id: 1,
            parentId:109,
            label: 'GAD-7筛查量表',
          },{
            id: 2,
            parentId:109,
            label: '汉密尔顿焦虑量表(HAMD)',
          },{
            id: 3,
            parentId:109,
            label: '惊恐发作量表',
          },{
            id: 19,
            parentId:109,
            label: '焦虑性质量表',
          },{
            id: 13,
            parentId:109,
            label: 'YALE—BROWN强迫量表',
          },{
            id: 4,
            parentId:109,
            label: 'PHQ-9筛查量表',
          },{
            id: 5,
            parentId:1,
            label: '汉密尔顿抑郁量表(HAMD)',
          },{
            id: 18,
            parentId:109,
            label: '抑郁性质量表',
          },{
            id: 26,
            parentId:109,
            label: '躯体化症状自评量表',
          },{
            id: 7,
            parentId:109,
            label: '简易自评量表SCL-90',
          }]
        },{
          id: 110,
          parentId:0,
          label: '睡眠状况 ',
          children: [{
            id: 8,
            parentId:110,
            label: '阿森斯失眠量表 ',
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        dialogVisible:false,
        dialogVisible2:false,
        completeQuestionnaire:false,
        scaleId:"",
        questionNo:""
      };
    },
     watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    created() {
       this.initData();
    },
    methods: {
      initData(){
        getMedicalRecord(this.medicalRecordId).then(res=>{
          if(res.code==200){
              this.questionNo=res.dataList[0].questionnaireNo;
              this.completeQuestionnaire=res.dataList[0].completeQuestionnaire;
          }
        });
      },
      startQuestion(){
        this.scaleId=this.questionNo;
        this.dialogVisible=true;
      },
      closeDialog(){
        this.initData();
        this.dialogVisible=false;
      },
      handleRecord(questionnaire,questionnaireId){
        if(this.completeQuestionnaire){
           this.$router.push({path:'/ips/questionResult',
          query: {
            medicalRecordId: this.medicalRecordId,
            questionnaire:questionnaire,
            questionnaireId,questionnaireId
          }
          });
        }else{
          this.$message.warning("您得问卷还没做！")
        }
         
      },
       handleNodeClick(val){
        this.$refs.tree.setChecked(val.id,true,false)
        this.selectedData=this.$refs.tree.getCheckedNodes(true);
        console.log(this.selectedData)
      },
      handleNodeChecked(){
        this.selectedData=this.$refs.tree.getCheckedNodes(true);
      },
       handleRemove(index){
          this.selectedData.splice(index,1);
          let keys=[];
          for(let item  of this.selectedData){
                keys.push(item.id);
          }
          this.$refs.tree.setCheckedKeys(keys);
        },
       filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      handlePrev() {
        this.$emit('prevStep')
      },
      handleNextItem(){
        let param={
          id:this.medicalRecordId,
          patientId:this.patientId,
          scaleNoList:this.$refs.tree.getCheckedKeys(true)
        }
        if(param.scaleNoList.length<1){
          this.$message.warning("请选择量表!")
          return
        }
        updateMedicalRecord(param).then(res=>{
          if(res.code==200){
            this.$emit('nextStep');
            this.dialogVisible2=false;
          }
        })
       
      },
      handleNext() {
        if(this.completeQuestionnaire){
          getMedicalRecord(this.medicalRecordId).then(res=>{
          if(res.code==200){
              let scaleNoList=res.dataList[0].scaleNoList;
              let completeScaleNoList=res.dataList[0].completeScaleNoList;
              if(completeScaleNoList.length==0){
                  this.dialogVisible2=true;
                  this.$nextTick(function() {
                      this.$refs.tree.setCheckedKeys(scaleNoList);
                      this.selectedData=this.$refs.tree.getCheckedNodes(true);
                  }) 
              }else{
                 this.$emit('nextStep');
              }
              
          }
        }).catch(err=>{

        });
         
          //this.$emit('nextStep');
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
  .disable{
    background: #ccc;
    border: 1px solid #ccc;
  }
  .screen-title{
    line-height: 35px;
    font-size: 16px;
    color: #222;
    text-indent: 2em;
  }
  .screen-box{
    border: 1px solid #eee;
    border-radius: 10px;
  }
  .tree-box{
    height: 300px;
    overflow: auto;
  }
  .item-box{
     padding: 10px;
     flex:1;
     align-items: flex-start;
     border: 1px solid #eee;
  }
  .item-box .el-input{
    margin: 10px 0;
  }
  .item-box .title{
    line-height: 30px;
    font-size: 16px;
    font-weight: bold;
  }
  .item-box .label{
    padding: 0 10px;
    line-height: 35px;
    border: 1px solid #e1e1e1;
    border-radius: 8px;
    margin: 10px;
    position: relative;
  }
  .item-box .label .close{
    color: #F56C6C;
    position: absolute;
    right: -5px;
    top: -5px;
  }
</style>

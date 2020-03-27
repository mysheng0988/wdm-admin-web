<template>
  <div style="margin-top: 50px" v-loading.fullscreen.lock="listLoading"  id="pdfCentent">
    <el-form  :model="pursueObj" :rules="rules" ref="pursueInfoForm" label-width="180px"  >
      <el-form-item label="主诉:">
        <el-input
          placeholder="请输入内容"
          v-model="pursueObj.mainComplaint"
          type="textarea"
          :autosize="{minRows: 2, maxRows: 4}"
          maxlength="500"
          show-word-limit
          clearable></el-input>
      </el-form-item>
      <el-form-item label="主诉症状:" prop="mainSymptomsIdList">
        <el-select  placeholder="请选择主诉症状"  filterable multiple v-model="pursueObj.mainSymptomsIdList" clearable class="input-width">
          <el-option
            v-for="item in optionSymptomsList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="主诉症状补充:">
        <el-input
          placeholder="请输入内容,多个用','分割"
          type="text"
          v-model="mainSymptoms"
          clearable></el-input>
      </el-form-item>
      <el-row :gutter="2">
        <el-col :span="6">
          <el-form-item label="发作频率:" prop="onsetInterval">
            <el-input
              v-model="pursueObj.onsetInterval"
              placeholder="请输入内容,如:一周一次"
              type="text"
              clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="首次发作时间:" prop="firstOnsetTime">
            <el-date-picker
              v-model="pursueObj.firstOnsetTime"
              class="input-width"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              :pickerOptions="pickerOptions0"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="末次发作时间:" prop="recentOnsetTime">
            <el-date-picker
              v-model="pursueObj.recentOnsetTime"
              class="input-width"
              :pickerOptions="pickerOptions1"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="严重程度:" prop="illnessDegree">
            <el-select  placeholder="请选择" v-model="pursueObj.illnessDegree" clearable class="input-width">
              <el-option label="无" value="无" ></el-option>
              <el-option label="轻度" value="轻度"></el-option>
              <el-option label="中度" value="中度"></el-option>
              <el-option label="重度" value="重度"></el-option>
              <el-option label="极重度" value="极重度"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="伴随症状:">
        <el-select  placeholder="请选择伴随症状"  filterable multiple v-model="pursueObj.accompanyingSymptomsIdList" clearable class="input-width">
          <el-option
            v-for="item in optionAccompanyingSymptoms"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="伴随症状补充:">
        <el-input
          v-model="accompanyingSymptoms"
          placeholder="请输入内容,多个用','分割"
          type="text"
          clearable></el-input>
      </el-form-item>
      <el-form-item label="临床专科诊断:" prop="clinicalSpecialistDiagnosisIdList">
        <el-select
          style="width: 100%"
          v-model="pursueObj.clinicalSpecialistDiagnosisIdList"
          multiple
          filterable
          remote
          placeholder="请输入关键词检索"
          :remote-method="remoteDiagnosis"
          :loading="loadingOption">
          <el-option
            v-for="item in pursueObj.clinicalSpecialistDiagnosisList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>

      </el-form-item>
      <el-form-item label="自定义临床专科诊断:">
        <el-input
          v-model="clinicalSpecialist"
          placeholder="请输入内容,多个用','分割"
          type="text"
          clearable></el-input>
      </el-form-item>
      <el-form-item label="器质损害或疾病严重程度:" prop="organicDiseaseSeverity" >
        <el-select  placeholder="请选择" v-model="pursueObj.organicDiseaseSeverity" clearable class="input-width">
          <el-option label="无" value="无" ></el-option>
          <el-option label="轻度" value="轻度"></el-option>
          <el-option label="中度" value="中度"></el-option>
          <el-option label="重度" value="重度"></el-option>
          <el-option label="极重度" value="极重度"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="运动症状:">
        <!-- <div class="flex">
          <p class="add-btn"><i class="el-icon-plus"></i>点击添加</p>
          <el-checkbox :checked="false">暂无运动症状</el-checkbox>
        </div> -->
        <el-select  placeholder="请选择伴随症状"  filterable multiple v-model="pursueObj.motorSymptomsIdList" clearable class="input-width">
          <el-option
            v-for="item in optionMotorSymptoms"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="就诊经历:">
        <div class="flex">
          <p class="add-btn" @click="addExperience"><i class="el-icon-plus"></i>点击添加</p>
          <el-checkbox v-model="list.length==0">暂无就诊经历</el-checkbox>
        </div>
        <div class="table-container">
          <el-table ref="productCateTable"
                    style="width: 100%;margin-top: 10px;"
                    :data="list"
                    border>
            <el-table-column label="ID" width="100" align="center">
              <template slot-scope="scope">{{scope.row.id}}</template>
            </el-table-column>
            <el-table-column label="就诊日期" width="100" align="center">
              <template slot-scope="scope">{{scope.row.visitDate}}</template>
            </el-table-column>
            <el-table-column label="症状" align="center">
              <template slot-scope="scope">
                <p v-for="(item,index) in scope.row.symptomList" :key="index">{{item.name}}</p>
                <!--{{scope.row.symptomList}}-->
              </template>
            </el-table-column>
            <el-table-column label="医院" align="center">
              <template slot-scope="scope">{{scope.row.hospitalName }}</template>
            </el-table-column>
            <el-table-column label="检查" align="center">
              <template slot-scope="scope">
                <p v-for="(item,index) in scope.row.checkupList" :key="index">{{item.name}}</p>
              </template>
            </el-table-column>
            <el-table-column label="诊断" align="center">
              <template slot-scope="scope">
                <p v-for="(item,index) in scope.row.diagnosisList" :key="index">{{item.name}}</p>
              </template>
            </el-table-column>
            <el-table-column label="治疗方案" align="center">
              <template slot-scope="scope">{{scope.row.treatmentPrograms }}</template>
            </el-table-column>
            <el-table-column label="效果" align="center">
              <template slot-scope="scope">{{scope.row.treatmentEffect }}</template>
            </el-table-column>
            <el-table-column   label="操作" align="center">
              <template slot-scope="scope" >
                <el-button
                  size="mini"
                  round
                  type="warning"
                  @click="handleDeleteExperience(scope.row.id)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form-item>
      <el-form-item label="过敏史:">
        <el-input
          v-model="pursueObj.allergenSupplement"
          placeholder="请输入内容"
          type="text"
          clearable></el-input>
      </el-form-item>
      <el-form-item label="家族史:">
        <div class="flex">
          <p class="add-btn" @click="addFamily"><i class="el-icon-plus"></i>
            {{familyObj.familyMemberDiseaseHistoryList.length!=0?"修改家族史":"添加家族史"}}
          </p>
          <el-checkbox :checked="familyObj.familyMemberDiseaseHistoryList.length==0">暂无家族史</el-checkbox>
        </div>
      </el-form-item>
      <el-form-item label="应激源:">
        <div class="flex">
          <p class="add-btn" @click="addStress"><i class="el-icon-plus"></i>点击添加</p>
          <el-checkbox :checked="eventList.length==0">暂无应激源</el-checkbox>
        </div>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="handleNext('pursueInfoForm')">下一步，{{nextTitle}}</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="应激源"
      :visible.sync="dialogVisible"
      width="70%">
      <stress :data="treeData"
              :eventList="eventList"
              :medical-record-id="medicalRecordId"
              :patient-id="patientId"
              @closeDialog="closeDialog"
      ></stress>
    </el-dialog>
    <el-dialog
      title="添加就诊经历"
      :visible.sync="dialogVisible2"
      width="600px">
      <experience
              :medical-record-id="medicalRecordId"
              :patient-id="patientId"
              @closeDialog="closeDialog"
      ></experience>
    </el-dialog>
    <el-dialog
      title="增加家族史"
      :visible.sync="dialogVisible3"
      width="70%">
      <family-history
        :family-obj="familyObj"
        :medical-record-id="medicalRecordId"
        :patient-id="patientId"
        @closeDialog="closeDialog"></family-history>
    </el-dialog>
  </div>
</template>

<script>
  import {querySymptoms,
    queryExperience,
    familyHistory,
    saveFamily,
    updateFamliy,
    getStress,
    saveExperience,
    queryCheckUp,
    savaPursue,
    getPursue,
    updatePursue,
    getStressPatient,
    deleteExperience} from '@/api/ips';
  import {queryHospital} from "@/api/manage"
  import {getICD11} from '@/api/icd'
  import {mapGetters} from 'vuex'
  import stress from "./stress"
  import experience from "./experience"
  import FamilyHistory from "./familyHistory"
  const defaultPursue = {
    id: null,
    accompanyingSymptomsIdList:[],//伴随症状
    accompanyingSymptomsSupplementList:[],//伴随症状补充
    allergenSupplement:"",//过敏史
    clinicalSpecialistDiagnosisIdList:[],//临床专科诊断
    clinicalSpecialistDiagnosisList:[],//临床专科诊断已选项
    clinicalSpecialistDiagnosisSupplementList:[],//临床专科诊断补充
    eventList:"",//应激事件
    familyMedicalHistoryList:"",//家族疾病史记录
    firstOnsetTime:"",//首次发病时间
    illnessDegree:"",//严重程度
    mainComplaint:"",//患者主诉
    mainSymptomsIdList:[],//主要症状
    mainSymptomsSupplementList:[],//主要症状补充
    medicalRecordId:"",//病历ID
    motorSymptoms:"",//运动症状
    onsetInterval:"",//发病频率
    organicDiseaseSeverity:"",//器质性疾病严重程度
    patientId:"",//患者ID
    recentOnsetTime:"",//末次发病时间
    trait:"",//家族
    visitingExperienceList:"",
  };
  const defaultFamily={
    id:"",
    familyMemberDiseaseHistoryList:[],
    patientId:"",
    trait:"",
  }
  export default {
    name: "mainPursue",
    components: {stress,experience,FamilyHistory},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      },
      prevTitle:{
        type:String,
        value:"",
      },
      nextTitle:{
        type:String,
        value:"",
      },
      patientId: {
        type: String,
        default: ""
      },
      medicalRecordId: {
        type: String,
        default: ""
      },
    },
    data() {
      return {
        familyObj:Object.assign({},defaultFamily),
        treeData:[],
        eventList:[],
        checked:true,
        listLoading: false,
        dialogVisible:false,
        dialogVisible2:false,
        dialogVisible3:false,
        accompanyingSymptoms:"",
        mainSymptoms:"",
        clinicalSpecialist:"",
        optionSymptomsList:[],
        optionAccompanyingSymptoms:[],
        optionMotorSymptoms:[],
        list:[],
        pursueObj:Object.assign({},defaultPursue),
        loadingOption:false,
        pickerOptions0: {
          disabledDate: (time) => {
            let nowData=new Date()
            if (this.pursueObj.recentOnsetTime!="") {
              let expireDate=new Date(this.pursueObj.recentOnsetTime);
              return time.getTime() >expireDate.getTime();
            } else {
              return time.getTime() > nowData.getTime();
            }

          }
        },
        pickerOptions1: {
          disabledDate: (time) => {
            let nowData=new Date()
            if(this.pursueObj.firstOnsetTime!=""){
              let startDate=new Date(this.pursueObj.firstOnsetTime);
              return time.getTime() <startDate.getTime()||time.getTime()>nowData.getTime();
            }else{
              return time.getTime() >nowData.getTime();
            }
          }
        },
        rules: {
          mainSymptomsIdList: [
            {required: true, message: '请选择主诉症状', trigger: 'blur'},
          ],
          clinicalSpecialistDiagnosisIdList: [
            {required: true, message: '请选择临床专科诊断', trigger: 'blur'},
          ],
          firstOnsetTime: [
            {required: true, message: '请选择首次发病时间', trigger: 'blur'},
          ],
          recentOnsetTime: [
            {required: true, message: '请选择末次发病时间', trigger: 'blur'},
          ],
          illnessDegree: [
            {required: true, message: '选择严重程度', trigger: 'blur'},
          ],
          onsetInterval: [
            {required: true, message: '请输入发病频率', trigger: 'blur'},
          ],
          organicDiseaseSeverity: [
            {required: true, message: '请选择器质性疾病严重程度', trigger: 'blur'},
          ],
        },
      };
    },
    computed:{
      ...mapGetters([             //步骤二，对象扩展运算符方式
        "info"
      ])
    },
    mounted(){
      this.getExperienceList();
      this.queryFamily();
      this.getSymptoms("1");
      this.getSymptoms("2");
      this.getSymptoms("3");
      this.getPursueData();
      this.getStressList();
    },
    methods: {
      getPursueData(){
        getPursue(this.medicalRecordId).then(res=>{
           if(res.code==200){
            this.pursueObj=res.dataList[0];
             this.mainSymptoms=this.pursueObj.mainSymptomsSupplementList.join(",")
             this.accompanyingSymptoms=this.pursueObj.accompanyingSymptomsSupplementList.join(",")
             this.clinicalSpecialist=this.pursueObj.clinicalSpecialistDiagnosisSupplementList.join(",")
           }
        })
      },
      queryFamily(){
        familyHistory(this.patientId).then(res=>{
          if(res.code == 200){
            this.familyObj=res.dataList[0];
          }
        }).catch(error => {
          this.listLoading=false;
        })
      },
      getSymptoms(val){
        querySymptoms({departmentCategoryId:this.info.deptCategoryId,queryParam:"",type:val}).then(res=>{
          this.listLoading=false;
          if(val==2){
            this.optionAccompanyingSymptoms=res.dataList;
          }else if(val==3){
            this.optionMotorSymptoms=res.dataList;
          }else{
            this.optionSymptomsList=res.dataList;
          }

        })
      },
      remoteDiagnosis(queryString){
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.loadingOption=true;
          if(queryString!=""){
            getICD11(queryString).then(res=>{
              this.loadingOption=false;
              this.pursueObj.clinicalSpecialistDiagnosisList=res.dataList.slice(0,50)
            })
          }else{
            this.pursueObj.clinicalSpecialistDiagnosisList=[];
          }
        }, 500);
      },
      handleDeleteExperience(expId){
        this.$confirm('确认删除此项就诊经历?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteExperience(expId).then(res=>{
            if(res.code==200){
              this.list=[];
              this.getExperienceList();
            }
          })
        })
      },
      addFamily(){
        this.dialogVisible3=true;
      },
      getStressList(){
        getStressPatient(this.medicalRecordId).then(res=>{
          if(res.code==200){
            this.eventList=res.dataList;
          }
        })
      },
      addStress(){
        getStress().then(res=>{
          this.listLoading=false;
          if(res.code==200){
            this.treeData=res.dataList;
            this.dialogVisible=true;
          }
        }).catch(error => {
          this.listLoading=false;
        })
      },
      addExperience(){
        this.dialogVisible2=true
      },
      getExperienceList(){
        queryExperience(this.patientId).then(res=>{
          if(res.code==200){
            this.list=res.dataList;
            console.log(this.list)
          }
        }).catch(error => {
          this.listLoading=false;
        })
      },
      closeDialog(){
        this.dialogVisible=false;
        this.dialogVisible2=false;
        this.dialogVisible3=false;
        this.getExperienceList();
        this.queryFamily();
        this.getStressList();
      },
      handleNext(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.listLoading = true;
            this.pursueObj.mainSymptomsSupplementList=this.mainSymptoms.split(",")
            this.pursueObj.accompanyingSymptomsSupplementList=this.accompanyingSymptoms.split(",")
            this.pursueObj.clinicalSpecialistDiagnosisSupplementList=this.clinicalSpecialist.split(",")
            this.pursueObj.patientId = this.patientId;
            this.pursueObj.medicalRecordId = this.medicalRecordId;
            if(this.pursueObj.id!=""&&this.pursueObj.id){
                 updatePursue(this.pursueObj).then(res=>{
                   this.listLoading = false;
                   if(res.code==200){
                     this.$message.success("更新成功")
                     
                     this.$emit('nextStep');
                     this.getPursueData();
                   }

                 }).catch(error => {
                   this.listLoading = false;
                 })
            }else{
              savaPursue(this.pursueObj).then(res => {
                this.listLoading = false;
                if (res.code == 200) {
                  this.$message.success("保存成功")
                  this.getPursueData();
                  this.$emit('nextStep');
                }
              }).catch(error => {
                this.listLoading = false;
              })
            }

          }else{
            this.$message({
              message: '验证失败',
              type: 'error',
              duration: 1000
            });
            return false;
          }});
      },
    }
  }
</script>
<style scoped >

  .add-btn{
    width: 100px;
    height: 34px;
    margin-right: 10px;
    text-align: center;
    line-height: 34px;
    border-radius: 8px;
    border: 1px solid #1197D6;
    color: #1197D6;
    cursor: pointer;
  }
  .flex{
    display: flex;
    display: -webkit-flex;
    align-items: center;
    flex-wrap:wrap;
  }

  .input-width{
    width: 100%;
  }
  .close{
    color: #F56C6C;
    position: absolute;
    right: -5px;
    top: -5px;
  }
  .familyTitle{
    margin: 10px 0;
  }


</style>

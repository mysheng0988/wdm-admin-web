<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="patObj"
             :rules="rules"
             ref="patObjFrom"
             label-width="120px">
      <div :class="showBase?'title':'title active'" @click="showBaseText">
        <i class="el-icon-tickets"></i>
        <span>基本信息</span>
        <i class="el-icon-arrow-down"></i>
      </div>
      <div v-show="showBase">
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="姓名："  prop="realName" >
              <el-input v-model="patObj.realName" placeholder="请输入姓名" clearable maxlength="20" show-word-limit></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别："   >
              <el-radio-group v-model="patObj.gender" @change="genderChange">
                <el-radio :label="false">男</el-radio>
                <el-radio :label="true">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="民族："   prop="nation" >
              <el-input v-model="patObj.nation" placeholder="请输入民族,如:汉族"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身份证号："  prop="cardNo" >
              <el-input v-model="patObj.cardNo" placeholder="请输入身份证号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出生日期："  prop="birthday" >
              <el-date-picker
                v-model="patObj.birthday"
                class="input-width"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="年 龄："   >
              <el-input v-model="age" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="宗教/信仰："  prop="faith"  >
              <el-input v-model="patObj.faith" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="文化程度："  prop="education" >
              <el-select  placeholder="请选择" v-model="patObj.education" clearable class="input-width">
                <el-option label="小学及以下" value="小学及以下" ></el-option>
                <el-option label="初中" value="初中"></el-option>
                <el-option label="高中" value="高中"></el-option>
                <el-option label="中专" value="中专"></el-option>
                <el-option label="大专" value="大专"></el-option>
                <el-option label="学士" value="学士"></el-option>
                <el-option label="硕士" value="硕士"></el-option>
                <el-option label="博士及以上" value="博士及以上"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="职  业："  prop="profession" >
              <el-input v-model="patObj.profession" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系方式："  prop="contactDetails" >
              <el-input v-model="patObj.contactDetails" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身  高："  prop="height" >
              <el-input v-model.number="patObj.height" placeholder="请输入内容">
                <template slot="append" >cm</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="体  重："  prop="weight" >
              <el-input v-model.number="patObj.weight" placeholder="请输入内容">
                <template slot="append">kg</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="左右利手："  prop="dominantHand" >
              <el-select  placeholder="请选择" v-model="patObj.dominantHand" clearable class="input-width">
                <el-option  label="左手" :value="true"></el-option>
                <el-option  label="右手" :value="false"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="title">
          <i class="el-icon-tickets"></i>
          <span>家庭状况</span>
        </div>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="婚姻状况："  prop="maritaStatus" >
              <el-select  placeholder="请选择" v-model="patObj.maritaStatus"  clearable class="input-width">
                <el-option label="未婚" value="未婚"></el-option>
                <el-option label="已婚" value="已婚"></el-option>
                <el-option label="离婚" value="离婚"></el-option>
                <el-option label="再婚" value="再婚"></el-option>
                <el-option label="丧偶" value="丧偶"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="排行/兄妹人数：" prop="siblingsNumber">
              <el-input v-model="patObj.familyRanking" class="input2"></el-input>/
              <el-input v-model="patObj.siblingsNumber" class="input2"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="人群分类：" prop="crowdRole" >
              <el-select  placeholder="请选择" v-model="patObj.crowdRole"  clearable class="input-width" >
                <el-option v-for="(item,index) in optionRow" :key="index" 
                     :label="item"
                     :value="item"
                   ></el-option>
                
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="子女人数："  prop="childrenNumber" >
              <el-input  v-model.number="patObj.childrenNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="主要抚养人："   >
              <!-- <el-input v-model="patObj.caregiver" placeholder="请输入内容" clearable maxlength="10" show-word-limit></el-input> -->
               <el-select
                  v-model="patObj.caregiver"
                  filterable
                  allow-create
                  default-first-option
                  placeholder="请选择主要抚养人"
                  clearable class="input-width" >
                  <el-option
                    v-for="(item,index) in options"
                    :key="index"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="子女情况："   >
              <el-input v-model="patObj.childrenSituation"
                  type="textarea"
                  placeholder="请输入内容"
                  :autosize="{minRows: 2, maxRows: 4}"
                  maxlength="50"
                  show-word-limit ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="父母情况："  >
              <el-input v-model="patObj.parentSituation" 
                  type="textarea"
                  placeholder="请输入内容"
                  :autosize="{minRows: 2, maxRows: 4}"
                  maxlength="50"
                  show-word-limit ></el-input>
              
            </el-form-item>
          </el-col>
        </el-row>
        <div class="title">
          <i class="el-icon-location-information"></i>
          <span>地址信息</span>
        </div>
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="选择地址："   >
              <v-distpicker class="address" @selected="onSelected" :province="select.province" :city="select.city" :area="select.area"></v-distpicker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="详细地址：">
              <el-input
                class="textarea"
                placeholder="请输入内容"
                type="textarea"
                v-model="address"
                :autosize="true"
                maxlength="100"
                show-word-limit
                clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
     <el-form :model="medObj"
             :rules="medrules"
             ref="medObjFrom"
             label-width="120px">
      <div class="title">
        <i class="el-icon-tickets"></i>
        <span>来源（病例）信息</span>
      </div>
      <el-row :gutter="10">
        <el-col :span="8" v-if="patObj.pid">
          <el-form-item label="编号：" >
            <el-input v-model="patObj.pid" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="patObj.pid">
          <el-form-item label="姓名：" >
            <el-input v-model="patObj.realName" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="患者来源："    prop="outpatient">
            <el-select  placeholder="请选择" v-model="medObj.outpatient" clearable class="input-width">
              <el-option label="门诊" :value="true" ></el-option>
              <el-option label="住院" :value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="科 室："   prop="fromDeptId">
            <el-select  placeholder="请选择" v-model="medObj.fromDeptId" clearable class="input-width">
              <el-option
                v-for="item in deptList"
                :key="item.deptId"
                :label="item.deptName"
                :value="item.deptId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="medObj.outpatient?'门诊号:':'住院号:'"  prop="beHospitalizedNumber" >
            <el-input  v-model.number="medObj.beHospitalizedNumber" clearable maxlength="15" show-word-limit  placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="8">
          <el-form-item label="检测项目："   prop="examinationId">
            <el-select  placeholder="请选择" v-model="medObj.examinationId" clearable class="input-width">
              <el-option
                v-for="item in examinationList"
                :key="item.name"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="医 生：" prop="fromUid">
            <el-select  placeholder="请选择" v-model="medObj.fromUid" clearable class="input-width">
              <el-option
                v-for="item in doctorList"
                :key="item.uid"
                :label="item.realName"
                :value="item.uid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="床号："  prop="bedNo" >
            <el-input v-model.number="medObj.bedNo"  placeholder="请输入床号"  clearable maxlength="10" show-word-limit ></el-input>
          </el-form-item>
        </el-col>
         <!-- <el-col :span="8">
          <el-form-item label="卡号："   prop="cardId">
            <el-input v-model.number="medObj.cardId"   placeholder="请刷卡" 
            clearable maxlength="8" show-word-limit></el-input>
          </el-form-item>
        </el-col> -->
        <!--<el-col :span="8">-->
          <!--<el-form-item label="治疗项目："  >-->
            <!--<el-select  placeholder="请选择" clearable class="input-width">-->
              <!--<el-option-->
                <!--v-for="item in cureList"-->
                <!--:key="item.id"-->
                <!--:label="item.name"-->
                <!--:value="item.id">-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="payByCard('patObjFrom')">刷卡</el-button>
        <!-- <el-button v-if="!patObj.pid" @click="resetForm('patObjFrom')">重置</el-button> -->
      </el-form-item>
      </el-form>
      <el-dialog
        title="请您刷卡"
        :visible.sync="dialogVisible"
        width="30%">
          <el-form  :model="cardFrom"
             :rules="cardRules"
             ref="cardFrom">
              <el-form-item label="卡号："   prop="cardNo">
                  <el-input id="cardNo" v-model.number="cardFrom.cardNo"   placeholder="请刷卡" 
                  clearable maxlength="10" show-word-limit></el-input>
              </el-form-item>
          </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit('cardFrom')">提交数据</el-button>
        </span>
      </el-dialog>
  </el-card>
</template>

<script>
   import {validateNum} from '@/utils/validate';
  import {savePatient,
    getDeptList,
    getInfoCard,
    saveMedicalRecord,
    updateMedicalRecord,
    queryExamination,
    getDoctorList,
    updatePatient,
    getMedicalRecordPatient} from '@/api/patient';
  import { Message, MessageBox } from 'element-ui'
  const defaultPatient = {
    pid:null,
    birthday: "",
    contactDetails: "",
    cardNo: "",
    caregiver: "父母",
    childrenNumber: 0,
    childrenSituation: "",
    crowdRole: "无",
    address: "",
    dominantHand: false,
    education: "",
    faith: "",
    familyRanking: 1,
    gender: true,
    height: "",
    maritaStatus: "",
    nation: '汉族',
    parentSituation: "",
    password: "",
    profession: "",
    realName: "",
    siblingsNumber: 1,
    username: "",
    weight: ""
  };
  let defaultMedical={
    patientId: "",
    outpatient: true,
    bedNo: "",
    fromDeptId: "",
    beHospitalizedNumber: "",
    examinationId: "",
    fromUid:"",
    remark: "",
    cardNo:"",
    sid: 0
  }
  export default {
    name: "patAdd",
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      const validateNumberSort= (rule, value, callback) => {
        if (value!=""&&!validateNum(value)) {
            callback(new Error('必须为数字'))
        } else {
          if(value>10){
             callback(new Error('必须小于10的数字'))
          }else if(this.patObj.familyRanking-value>0){
             callback(new Error('排行数不能大于兄妹总数'))
          }else{
               callback()
          }
        }
      };
       const validateNumberTen = (rule, value, callback) => {
        if (value!=""&&!validateNum(value)) {
            callback(new Error('必须小于10的数字'))
        } else {
         if(value>10){
            callback(new Error('必须小于10的数字'))
          }else{
              callback()
          }
        }
      };
       const validateNumber = (rule, value, callback) => {
        if (value!=""&&!validateNum(value)) {
          callback(new Error('必须是数字'))
        } else {
          callback()
        }
      };
      return {
        patObj: Object.assign({}, defaultPatient),
        medObj: Object.assign({}, defaultMedical),
        cardFrom:{
          cardNo:""
        },
        options:["父母","父亲","母亲","祖父母","外祖父母"],
        dialogVisible:false,
        select: { province: '北京市', city: '北京城区', area: '海淀区' },
        address:"",
        doctorList:[],
        examinationList:[],
        optionRow:["无","哺乳","妊娠期妇女","育龄期妇女","产妇","孕妇","妊娠期妇女（前三个月）","驾驶员","机器操纵者","高空作业者","从事危险工作者","精细工作者"],
        deptList:[],
        cureList:[],
        showBase:true,
        rules: {
          realName: [
            {required: true, message: '请输入分类名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 20 个字符', trigger: 'blur'}
          ],
           nation: [
            {required: true, message: '必填字段', trigger: 'blur'}
          ],
           faith: [
            {required: true, message: '必填字段', trigger: 'blur'}
          ],
          birthday: [
            {required: true, message: '必填字段', trigger: 'blur'}
          ],
          profession: [
            {required: true, message: '必填字段', trigger: 'blur'}
          ],
          contactDetails: [
            {required: true, message: '必填字段', trigger: 'blur'},
            { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确',trigger: 'blur' }
          ],
          education: [
            {required: true, message: '必填字段', trigger: 'blur'}
          ],
          maritaStatus: [
            {required: true, message: '必填字段', trigger: 'blur'}
          ],
          height: [
            {required: true, message: '必填字段', trigger: 'blur'},
             { type:'number', message: '必须为数字',trigger: 'blur'}
          ],
          weight: [
            {required: true, message: '必填字段', trigger: 'blur'},
             { type:'number', message: '必须为数字',trigger: 'blur'}
          ],
          maritaStatus: [
            {required: true, message: '必填字段', trigger: 'blur'}
          ],
          caregiver: [
            {required: true, message: '必填字段', trigger: 'blur'}
          ],
          crowdRole: [
             {required: true, message: '必填字段', trigger: 'blur'}
          ],
          siblingsNumber:[
             {required: false, trigger: 'blur', validator: validateNumberSort}
          ],
          childrenNumber:[ 
            {required: false, trigger: 'blur', validator: validateNumberTen}
          ],
          cardNo: [
            {required: true, message: '请输入身份证号码', trigger: 'blur'},
            { pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '身份证格式不正确',trigger: 'blur' }
          ]
        },
        cardRules:{
           cardNo: [
            {required: true, message: '必填字段', trigger: 'blur'},
             { type: 'number', message: '卡号必须数字',trigger: 'blur'}
          ],
        },
        medrules:{
          fromDeptId: [
            {required: true, message: '必填字段', trigger: 'blur'}
          ],
          beHospitalizedNumber: [
            {required: true, message: '必填字段', trigger: 'blur'},
            { type: 'number', message: '必须为数字',trigger: 'blur'}
          ],
          bedNo:[
            {required: false, trigger: 'blur', validator: validateNumber}
          ],
          fromUid: [
            {required: true, message: '必填字段', trigger: 'blur'}
          ],
          examinationId: [
            {required: true, message: '必填字段', trigger: 'blur'}
          ],
        }
      }
    },
    computed:{
        info () {
          return this.$store.state.user.info
        },
      age:function () {
        if(this.patObj.cardNo!=""){
          let age=this.patObj.cardNo.substring(6,10);
          let year=new Date().getFullYear()
          return year-age-1;
        }
        return "";
      }
    },

    created() {
       let cardNo=this.$route.query.id;
       this.patObj.cardNo=cardNo;
      this.patObj.birthday=cardNo.substring(6,10)+"-"+cardNo.substring(10,12)+"-"+cardNo.substring(12,14);
      this.getDept();
      this.getInfoCardNum();
      this.getExaminationBtn();
      this.getDoctor();
    },


    methods: {
     
      genderChange(){
        let optionRow=["无","驾驶员","机器操纵者","高空作业者","从事危险工作者","精细工作者"]
        if(!this.patObj.gender){
          this.optionRow=optionRow;
        }
      },
      onSelected(val){
        this.select.province=val.province.value;
        this.select.city=val.city.value;
        this.select.area=val.area.value;
      },
      showBaseText(){
        this.showBase=!this.showBase;
      },
      getDoctor(){
        let param={
          deptId:this.info.deptId,
          sid:""
        }
        getDoctorList(param).then(res=>{
          if(res.code==200){
            this.doctorList=res.dataList;
          }
        })
      },
      getExaminationBtn(){
        queryExamination(this.info.hospitalId).then(res=>{
          if(res.code==200){
            console.log(res)
            this.examinationList=res.dataList;
          }
        })
      },
      getInfoCardNum(){
        getInfoCard(this.$route.query.id).then(res=>{
          if(res.code==200){
            this.showBase=false;
            this.patObj=res.dataList[0];
            this.medObj.patientId=this.patObj.pid;
            let arrStr=this.patObj.address.split(",");
            if(arrStr.length>2){
              this.select.province=arrStr[0]
              this.select.city=arrStr[1]
              this.select.area=arrStr[2]
              this.address=arrStr[3]
            }else{
              this.address=arrStr[0]
              this.showBase=true;
            }

          }else{
              let cardMsg=JSON.parse(sessionStorage.getItem("cardMsg"));
              if(cardMsg){
                this.patObj.cardNo=cardMsg.cardNo;
                this.patObj.realName=cardMsg.realName;
                this.patObj.gender=cardMsg.gender;
                this.patObj.nation=cardMsg.nation;
              }
              
          }
          return this.patObj.pid;
        })
      },
      getDept(){
        getDeptList(this.info.hospitalId).then(res=>{
          if(res.code==200){
            this.deptList=res.dataList;
          }
        })
      },
       payByCard(formName){
          this.$refs[formName].validate((valid) => {
          this.$refs["medObjFrom"].validate((valid2)=>{
            if (valid&&valid2) {
                this.dialogVisible=true;
              } else {
                this.$message({
                  message: '验证失败',
                  type: 'error',
                  duration: 1000
                });
                return false;
              }
          })
        });
        

      },
      onSubmit(formName) {
        this.patObj.address=this.select.province+","+this.select.city+","+this.select.area+","+this.address;
        this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$confirm('是否提交数据', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                  if(this.patObj.pid!=null){
                    //updatePatient(this.patObj).then(res=>{
                      this.medObj.patientId=this.patObj.pid;
                      this.saveMedical()
                      //Message.success("保存成功")
                    //})
                  }else{
                    savePatient(this.patObj).then(res=>{
                      if(res.code==200){
                        this.medObj.patientId=res.dataList[0].pid;
                        this.patObj=res.dataList[0];
                        let arrStr=this.patObj.address.split(",");
                        this.address=arrStr[3]
                        this.select.province=arrStr[0]
                        this.select.city=arrStr[1]
                        this.select.area=arrStr[2]
                        this.saveMedical();
                      }
                    })
                  }
              })
              } else {
                this.$message({
                  message: '验证失败',
                  type: 'error',
                  duration: 1000
                });
                return false;
              }
          })
        
      },
      saveMedical(){
          this.medObj.cardNo=this.cardFrom.cardNo;
          saveMedicalRecord(this.medObj).then(res=>{
              if(res.code==200){
                this.$store.commit('delete_tabs', this.$route.path)
                this.$router.push("/ips/index")
                //this.resetRouter(this.medObj.patientId,this.medObj.examinationId)
                Message.success("保存成功")
              }
          })
      },
      // resetRouter(patientId,examinationId){
      //     let path="IPS-C";
      //   if(examinationId==1){
      //     path="IPS-A"
      //   }else if(examinationId==2){
      //     path="IPS-B"
      //   }
      //   this.$router.push({
      //     path: '/ips/'+path,
      //     query: {
      //       id: patientId,
      //       medicalRecordId:data.id
      //     }
      //   })
      // },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.patObj = Object.assign({}, defaultPatient);
        this.medObj = Object.assign({}, defaultMedical);
      }
    }
  }
</script>

<style scoped>
  .input2{
    width: 45%;
  }
  .input-width{
    width: 100%;
  }
  .form-container{
    margin: 0 auto;
  }
  .title{
    font-size: 16px;
    color: #666;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .active{
    color: #409EFF;
    cursor: pointer;
  }
  #cardNo{
    position:absolute;
    top:-100px;
  }
</style>

<template>
  <div  class="tree-box">
    <p class="familyTitle">1、家族疾病史 </p>
    <el-form ref="familyObj"
             :model="familyObj">
      <el-form-item label="选择家族成员:" >
        <div class="flex">
          <el-checkbox-group v-model="familyMembersList">
            <el-checkbox v-for="(item,index) in familyMembers" :key="index" :label="item" :disabled="disMembersList.indexOf(item)!=-1" ></el-checkbox>
          </el-checkbox-group>
          <el-button  round type="primary"  class="addBtn"  @click="addFamilyList" >确定</el-button>
        </div>
        <el-table ref="productCateTable"
                  style="width: 100%;margin-top: 10px;"
                  :data="familyObj.familyMemberDiseaseHistoryList"
                  border>
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">{{scope.$index}}</template>
          </el-table-column>
          <el-table-column label="家庭成员" width="100"  align="center">
            <template slot-scope="scope">{{scope.row.relativeTitle}}</template>
          </el-table-column>
          <el-table-column label="疾病"  align="center">
            <template slot-scope="scope">
              <el-select
                style="width: 100%"
                v-model="scope.row.icd11CodeIdList"
                multiple
                filterable
                remote
                reserve-keyword
                placeholder="请输入关键词"
                :remote-method="(query)=>{remoteMethod(query,scope.$index)}"
                :loading="loadingOption">
                <el-option
                  v-for="item in scope.row.icd11CodeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="疾病补充"  align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.diseaseName"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                round
                type="warning"
                @click="handleRemove(scope.$index)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <p class="familyTitle">2、家族的特质（体型特点、性格特点、生活方式、饮食习惯及运动模式等）</p>
        <el-input
          v-model="familyObj.trait"
          type="textarea"
          :rows="2"
          placeholder="请输入内容">
        </el-input>
      </el-form-item>
    </el-form>
    <div class="btn-box">
      <el-button @click="handleCloseDialog">取消</el-button>
      <el-button type="primary" @click="saveFamilyData('familyObj')">保存</el-button>
    </div>
  </div>
</template>

<script>
  import {
    familyHistory,
    saveFamily,
    updateFamliy,
    deleteFamliy,
    saveExperience,
    } from '@/api/ips';
  import {getICD11} from '@/api/icd'
   const defaultFamily={
     id:"",
     familyMemberDiseaseHistoryList:[],
     patientId:"",
     trait:"",
   }
    export default {
      name: "stress",
      props: {
        familyObj: {
          type: Object,
          default:Object.assign({},defaultFamily)
        },
        medicalRecordId: {
          type: String,
          value:""
        },
        patientId: {
          type: String,
          value:""
        }
      },
      data() {
        return {
          familyMembers:["父亲","母亲", "兄弟","子女", "爷爷", "奶奶", "姥姥", "姥爷"],
          familyMembersList:[],
          disMembersList:"",
          loadingOption:false,

        }
      },
      mounted(){
        this.assembleData(this.familyObj.familyMemberDiseaseHistoryList)
      },
      watch: {
        familyObj(newName, oldName) {
          this.assembleData(newName.familyMemberDiseaseHistoryList)
        }
      },
      methods:{
        assembleData(arr){
          if(arr.length!=0){
            let disMembersList="";
            for(let item of arr){
              disMembersList+=item.relativeTitle;
              item.diseaseName=item.diseaseSupplementList.join(",")
            }
            this.disMembersList=disMembersList;
          }
        },
        addFamilyList(){
          for(let item of this.familyMembersList){
            let obj={
              icd11CodeIdList: [],
              diseaseName:"",
              icd11CodeList:[],
              diseaseSupplementList: [],
              relativeTitle: item,
            }
            this.familyObj.familyMemberDiseaseHistoryList.push(obj);
          }
        },
        saveFamilyData(formName){
          this.familyObj.patientId=this.patientId;
          for(let item of this.familyObj.familyMemberDiseaseHistoryList){
            item.diseaseSupplementList =item.diseaseName.split(",");
          }
          if(this.familyObj.id&&this.familyObj.id!=""){
            updateFamliy(this.familyObj).then(res=>{
              if(res.code==200){
                this.$emit('closeDialog');
                this.$refs[formName].resetFields();
                this.familyObj=Object.assign({},defaultFamily);
                this.familyObj.familyMedicalHistoryList=[];
                this.$message.success("更新成功");
              }
            })
          }else{
            saveFamily(this.familyObj).then(res=>{
              if(res.code==200){
                this.$emit('closeDialog');
                this.$refs[formName].resetFields();
                this.familyObj=Object.assign({},defaultFamily);
                this.familyObj.familyMedicalHistoryList=[];
                this.$message.success("保存成功");
                this.queryFamily();
              }
            })
          }

        },
        remoteMethod(queryString,index){
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            this.loadingOption=true;
            if(queryString!=""){
              getICD11(queryString).then(res=>{
                this.loadingOption=false;
                this.familyObj.familyMemberDiseaseHistoryList[index].icd11CodeList=res.dataList.slice(0,50)
              })
            }else{
              this.familyObj.familyMemberDiseaseHistoryList[index]=[];
            }
          }, 500);
        },
        handleCloseDialog(){
          this.$emit('closeDialog');
        },
        handleRemove(index){
          let id=this.familyObj.familyMemberDiseaseHistoryList[index].id;
          if(id){
            this.$confirm('确认删除此项家族史?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              deleteFamliy(id).then(res => {
                if (res.code == 200) {
                  this.familyObj.familyMemberDiseaseHistoryList.splice(index, 1);
                  this.assembleData(this.familyObj.familyMemberDiseaseHistoryList)
                  this.$message.success("删除成功")
                }

              })
            })
          }else {
            this.familyObj.familyMemberDiseaseHistoryList.splice(index,1);
          }

        },
      }
    }
</script>

<style scoped>

  .addBtn{
    width: 80px;
    height: 35px;
    line-height: 35px;
    margin-left: 20px;
    padding: 0;
  }
  .btn-box{
    margin:10px 20px;
    text-align: right;
  }

</style>

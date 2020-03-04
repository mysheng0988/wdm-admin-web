<template>
  <div  class="tree-box">
    <div class="tree">
      <el-tree ref="tree" :props="defaultProps" :data="data"   show-checkbox node-key="id"
               accordion
               @node-click="handleNodeClick"
               @check="handleNodeClick">
      </el-tree>
    </div>
    <div class="tree-from">
      <p class="tree-title">1、{{treeTitle}}</p>
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="可描述相关应激事件"
        v-model="eventText">
      </el-input>
      <div class="btn-box">
        <el-button type="primary" size="small" round @click="addEventData">确认添加</el-button>
      </div>
      <p class="tree-title">2、已添加的应激源</p>
      <p v-for="(item,index) in eventList" class="label">
        {{index+1}}、{{item.event}}
        <i class="close el-icon-error" @click="handleRemove(index)"></i>
      </p>
      <p v-for="(item,index) in addEventList" class="label">
        {{eventList.length+index+1}}、{{item.event}}
        <i class="close el-icon-error" @click="handleAddRemove(index)"></i>
      </p>
      <div class="btn-box-bottom">
        <el-button @click="handleCloseDialog">取消</el-button>
        <el-button type="primary" @click="saveStressEvent">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
   import {saveStress,
     deleteStressPatient,
     getStressPatient} from "@/api/ips"
   const defaultStress={
     event: "",
     medicalRecordId: "",
     patientId: "",
     stressorId: ""
   }
    export default {
      name: "stress",
      props: {
        eventList:{
          type: Array,
          default:[]
        },
        data: {
          type: Array,
          default:[]
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
          defaultProps: {
            children: 'subList',
            label: 'name'
          },
          stressorId:"",
          treeTitle:"请选应激源？",
          eventText:"",
          addEventList:[],
        }
      },
      methods:{
        saveStressEvent(){
          if(this.addEventList.length!=0){
            saveStress(this.addEventList).then(res=>{
              if(res.code=200){
                this.$emit('closeDialog');
                this.addEventList=[];
              }
            })
          }else{
            this.$message.warning("请添加应激源")
          }

        },
        getStressList(){
          getStressPatient(this.medicalRecordId).then(res=>{
            if(res.code==200){
              this.eventList=res.dataList;
            }
          })
        },
        handleCloseDialog(){
          this.$emit('closeDialog');
        },
        addEventData(){
          if(this.$refs.tree.getCheckedNodes().length!=0){
            let stressObj={}
            stressObj.medicalRecordId=this.medicalRecordId;
            stressObj.patientId=this.patientId;
            stressObj.stressorId=this.stressorId;
            stressObj.event=this.treeTitle+":"+this.eventText;
            this.addEventList.push(stressObj);
            this.eventText="";
          }else{
            this.$message.warning("请选择节点？")
          }

        },
        handleRemove(index){
          let id=this.eventList[index].id;
          this.$confirm('确认删除此项应激源?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (id != "" && id) {
              deleteStressPatient(id).then(res => {
                if (res.code == 200) {
                  this.eventList.splice(index, 1);
                } else {
                  this.$message.warning("删除失败");
                }
              })
            }
          })
        },
        handleAddRemove(index){
          this.addEventList.splice(index,1);
        },
        handleNodeClick(value){
          if(value.parentId!=0){
            this.$refs.tree.setCheckedKeys([value.id]);
            this.stressorId=this.$refs.tree.getCheckedNodes()[0].id;
            this.treeTitle=this.$refs.tree.getHalfCheckedNodes()[0].name+"-"+this.$refs.tree.getCheckedNodes()[0].name;
          }else{
            this.$refs.tree.setCheckedKeys([]);
          }

        },
      }
    }
</script>

<style scoped>

  .tree-box{
    display: flex;
    display: -webkit-flex;
    padding-bottom: 80px;
  }
  .tree-title{
    line-height: 40px;
    font-weight: bold;
    color: #666666;
  }
  .tree{
    width: 200px;
  }
  .tree-from{
    flex: 1;
  }
  .label{
    padding: 0 10px;
    line-height: 35px;
    border: 1px solid #e1e1e1;
    border-radius: 8px;
    margin: 10px;
    position: relative;
  }
  .close{
    color: #F56C6C;
    position: absolute;
    right: -5px;
    top: -5px;
  }
  .btn-box{
    margin:10px 20px;
    text-align: right;
  }
  .btn-box-bottom{
    margin:10px 20px;
    text-align: right;
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
</style>

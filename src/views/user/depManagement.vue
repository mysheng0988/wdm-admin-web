<template>
  <div class="app-container">
    <div class="dep-nav">
      <el-tree ref="tree" :data="data"   show-checkbox node-key="id"
               highlight-current
               default-expand-all
               @node-click="handleNodeClick"
               @check="handleNodeClick">
            <span class="custom-tree-node" slot-scope="{ node, data }">
            <i :class="data.className"></i>
              <el-tooltip class="item" effect="dark" :content="node.label" placement="top-start" v-if="node.label&&node.label.length>14">
                  <span style="font-size:14px">{{node.label}}</span>
            </el-tooltip>
             <span style="font-size:14px" v-else>{{node.label}}</span>
            </span>
      </el-tree>
    </div>
    <div class="dep-content">
    <el-form :inline="true" :model="listQuery" size="small" >
        <el-form-item >
          <el-input  placeholder="科室名称" v-model="listQuery.deptName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" icon="el-icon-search"  class="search-btn" @click="queryList" >查询</el-button>
          <el-button type="success" icon="el-icon-plus"  class="search-btn" @click="addDept">新增科室</el-button>
        </el-form-item>
    </el-form>
    <div class="table-container">
      <el-table ref="productCateTable"
                style="width: 100%"
                :data="list"
                v-loading="listLoading" border>
        <el-table-column label="序号" width="60" align="center">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="科室编号" align="center">
          <template slot-scope="scope">{{scope.row.deptNo}}</template>
        </el-table-column>
        <el-table-column label="科室名称" align="center">
          <template slot-scope="scope">{{scope.row.deptName}}</template>
        </el-table-column>
        <el-table-column label="负责人" align="center">
          <template slot-scope="scope">{{scope.row.supervisorName }}</template>
        </el-table-column>
        <el-table-column label="分机号"  align="center">
          <template slot-scope="scope">{{scope.row.supervisorPhoneNumber }}</template>
        </el-table-column>
        <el-table-column label="创建时间"  align="center">
          <template slot-scope="scope">
            {{scope.row.navState}}
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center">
          <template slot-scope="scope">{{scope.row.remark }}</template>
        </el-table-column>
        <el-table-column label="操作" width="150"   align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
               icon="el-icon-edit-outline"
              class="active"
              @click="editDept(scope.row)">编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.currentPage"
        :total="total">
      </el-pagination>
    </div>
      <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        width="40%">
        <el-form ref="formDept"
                 :model="formDept"
                 :rules="rules"
                 label-width="100px">
          <el-form-item label="科室名称:"  prop="deptName" >
            <el-input v-model="formDept.deptName" placeholder="请输入科室名称" maxlength="10" show-word-limit clearable></el-input>
          </el-form-item>
          <el-form-item label="科室类别:"  prop="deptCategoryId" >
            <!--<el-input v-model="formDept.deptCategoryId" placeholder="请选择科室类别" clearable></el-input>-->
            <el-select  placeholder="请选择" v-model="formDept.deptCategoryId" clearable class="input-width">
              <el-option
                v-for="item in deptTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="科室编号:"  prop="deptNo" >
            <el-input v-model="formDept.deptNo" placeholder="请输入科室编号" maxlength="10" show-word-limit clearable></el-input>
          </el-form-item>
          <el-form-item label="负责人:"  prop="supervisorName" >
            <el-input v-model="formDept.supervisorName" placeholder="请输入负责人" maxlength="10" show-word-limit clearable></el-input>
          </el-form-item>
          <el-form-item label="手机号码:"  prop="supervisorPhoneNumber" >
            <el-input v-model="formDept.supervisorPhoneNumber" placeholder="请输入手机号" maxlength="11" show-word-limit clearable></el-input>
          </el-form-item>
          <el-form-item label="备注:">
            <el-input
              class="textarea"
              placeholder="备注信息"
              type="textarea"
              v-model="formDept.remark"
              :autosize="{minRows: 2, maxRows: 2}"
              maxlength="100"
              show-word-limit
              clearable></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveDeptData('formDept')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {queryHospital,
    getDeptList,
    createDept,
    getDeptCategory,
  updateDept}from '@/api/manage'
  import { Message, MessageBox } from 'element-ui'
  const defaultDept={
    deptId:"",
    deptName: "",
    deptNo: "",
    deptCategoryId: "",
    supervisorName: "",
    hospitalId:"",
    supervisorPhoneNumber: "",
    remark: "",
  }
  export default {
    name: "deptManage",
    data() {
      return {
        contentState:null,
        radio:null,
        list: null,
        menuIdList:[],
        formDept:Object.assign({},defaultDept),
        dialogVisible:false,
        listLoading: false,
        total:0,
        deptTypeList:[],
        rules:{
          deptNo: [
            {required: true, message: '填写科室编号', trigger: 'blur'},
          ],
          deptName: [
            {required: true, message: '填写科室名称', trigger: 'blur'},
          ],
          deptCategoryId: [
            {required: true, message: '选择科室类别', trigger: 'blur'},
          ],
          supervisorName: [
            {required: true, message: '填写负责人', trigger: 'blur'},
          ],
          supervisorPhoneNumber: [
            {required: true, message: '填写负责任手机号', trigger: 'blur'},
            {pattern: /^1[3456789]\d{9}$/, message: '身份证格式不正确',trigger: 'blur'}
          ],
        },
        dialogTitle:"新增科室",
        data: [{
          id:0,
          label: '豌豆苗',
          disabled: true,
          className:"el-icon-folder-opened",
          children: [],
        }],
        listQuery: {
          deptName:"",
          hospitalId:"",
          pageNum: 1,
          pageSize: 10
        },
      }
    },
    created() {
      this.getHospital();
      this.getDeptCategoryData();
    },
    mounted(){

    },
    methods: {
      editDept(obj){
        this.formDept=obj;
        console.log(this.formDept)
        this.dialogVisible=true;
      },
      addDept(){
        this.dialogVisible=true;
      },
      getDeptCategoryData(){
        getDeptCategory().then(res=>{
          if(res.code==200){
            this.deptTypeList=res.dataList;
          }
        })
      },
      saveDeptData(formName){
        this.formDept.hospitalId=this.listQuery.hospitalId;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.formDept.deptId){
              updateDept(this.formDept).then(res=>{
                if(res.code==200){
                  this.dialogVisible=false;
                  this.$refs[formName].resetFields();
                  this.formDept=Object.assign({},defaultDept);
                  Message.success("修改成功");
                  this.getList()
                }
              })
            }else {
              createDept(this.formDept).then(res=>{
                if(res.code==200){
                  this.dialogVisible=false;
                  this.$refs[formName].resetFields();
                  this.formDept=Object.assign({},defaultDept);
                  Message.success("保存成功");
                  this.getList()
                }
              })
            }

          }
        })
      },
      getHospital(){
          queryHospital({pageNum: 1,pageSize: 500,name:""}).then(res=>{
            if(res.code==200){
              let hostList=res.dataList;
              for(let i=0;i<hostList.length;i++){
                let children={};
                children.id=hostList[i].id;
                children.label=hostList[i].name;
                children.className="el-icon-tickets";
                this.data[0].children.push(children)
              }
               let key=this.data[0].children[0].id;
              this.listQuery.hospitalId=key;
              this.formDept.hospitalId=key;
              this.$nextTick(function() {
                this.$refs.tree.setCheckedKeys([key])
             })

            }
          }).then(()=>{
            if(this.listQuery.hospitalId!=""){
              this.getList()
            }
          })
      },
      queryList(){
        this.listQuery.pageNum = 1;
        this.getList();
      },
      getList(){
        this.listLoading=true;
        this.list=[];
        getDeptList(this.listQuery).then(res=>{
          this.listLoading=false;
          if(res.code==200){
            this.list=res.dataList;
            this.total=res.pageInfo.total;
          }
        }).catch(error => {
          this.listLoading=false;
        })
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      handleNodeClick(value){
       this.listQuery.hospitalId=value.id;
        this.$refs.tree.setCheckedKeys([value.id]);
        this.getList();
      },
      // renderContent(h, { node, data, store }) {
      //   return ( <span class="custom-tree-node">
      //     <i class={data.className}></i>
      //      <el-tooltip class="item" effect="dark" content="{{node.label}}" placement="top-start">
      //         <span style="font-size:14px">{node.label}</span>
      //     </el-tooltip>
      //     </span>
      // );
     // }
    },

  }
</script>

<style scoped>
  .app-container{
    display: flex;
    display: -webkit-flex;
    align-items: flex-start;
  }
  .dep-nav{
    width: 300px;
  }
  .dep-content{
    flex: 1;
  }
  .search-btn{
    width: 100px;
  }
  .active{
    border:1px solid #67C23A;
    color: #67C23A;
  }
  .dep-nav .el-tree-node:focus > .el-tree-node__content {
    background-color: #1197D6 !important;
  }
  .span-ellipsis {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
  }
  .input-width{
    width: 100%;
  }
</style>

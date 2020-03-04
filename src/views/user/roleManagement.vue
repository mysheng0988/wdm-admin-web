<template>
  <div class="app-container">
    <el-form :inline="true" :model="listQuery" size="small">
        <el-form-item >
          <el-input  placeholder="角色名称" v-model="listQuery.roleName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" round class="search-btn" @click="queryList">查询</el-button>
          <el-button type="success" round class="search-btn" @click="addRole">新增角色</el-button>
        </el-form-item>
    </el-form>
    <!--<el-card class="operate-container" shadow="never">-->
      <!--<i class="el-icon-tickets" style="margin-top: 5px"></i>-->
      <!--<span style="margin-top: 5px">数据列表</span>-->
      <!--<el-button-->
        <!--class="btn-add"-->
        <!--@click="handleAddProductCate()"-->
        <!--size="mini">-->
        <!--添加-->
      <!--</el-button>-->
    <!--</el-card>-->
    <div class="table-container">
      <el-table ref="productCateTable"
                style="width: 100%"
                :data="list"
                v-loading="listLoading" border>
        <el-table-column label="ID" width="100" align="center">
          <template slot-scope="scope">{{scope.row.roleId}}</template>
        </el-table-column>
        <el-table-column label="角色名称" align="center">
          <template slot-scope="scope">{{scope.row.roleName}}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.createTime }}</template>
        </el-table-column>
        <el-table-column label="备注" align="center">
          <template slot-scope="scope">{{scope.row.remark }}</template>
        </el-table-column>
        <el-table-column label="操作" width="200"   align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              round
              class="active"
              @click="editRole(scope.row)">编辑
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
      <el-form ref="formRole"
               :model="formRole"
               :rules="rules"
               label-width="100px">
        <el-form-item label="角色名称:"  prop="name" >
          <el-input v-model="formRole.roleName" placeholder="请输入角色名称" maxlength="10" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="权限授权">
          <el-tree ref="tree" :data="data"
                   show-checkbox node-key="id"
                   :render-content="renderContent"
                   :default-checked-keys="formRole.menuIdList"
          ></el-tree>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input
            class="textarea"
            placeholder="备注信息"
            type="textarea"
            v-model="formRole.remark"
            :autosize="{minRows: 2, maxRows: 2}"
            maxlength="100"
            show-word-limit
            clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRole('formRole')">确 定</el-button>
      </span>
    </el-dialog>
    </div>
</template>

<script>
  import {getRoleList,getRoleMenu,createRole,updateRole,getRoleInfo} from '@/api/manage'
  const defaultRole={
    level: 0,
    menuIdList: null,
    remark: "",
    roleId: null,
    roleName: "",
  }
  import { Message, MessageBox } from 'element-ui'
  export default {
    name: "roleManage",
    data() {
      return {
        contentState:null,
        radio:null,
        list: null,
        listLoading: false,
        dialogVisible:false,
        total:0,
        dialogTitle:"新增角色",
        formRole:Object.assign({},defaultRole),
        data: [{
          id:0,
          label: '东方心世界',
          className:"el-icon-folder-opened",
          children: [{
            id:1,
            label: '二级 1-1',
            className:"el-icon-tickets",
          },{
            id:2,
            label: '二级 1-2',
            className:"el-icon-tickets",
          },{
            id:3,
            label: '二级 1-3',
            className:"el-icon-tickets",
          }]
        }
        ,{
          id:4,
          label: '楚祥医疗',
          className:"el-icon-folder-opened",
          children: [{
            id:5,
            label: '二级 2-1',
            className:"el-icon-tickets",
          },{
            id:6,
            label: '二级 2-2',
            className:"el-icon-tickets",
          },{
            id:7,
            label: '二级 2-3',
            className:"el-icon-tickets",
          }]
          }],
        listQuery: {
          roleName:"",
          pageNum: 1,
          pageSize: 10
        },
        rules:{
          hospitalId: [
            {required: true, message: '请选择医院', trigger: 'blur'},
          ],
        }
      }
    },
    created() {
        this.getList();
        //this.getRoleMenuList();
    },

    methods: {
      addRole(){
        this.formRole=Object.assign({},defaultRole);
        this.dialogVisible=true;
        this.$nextTick(function() {
           this.$refs.tree.setCheckedKeys([]);
        })

      },
      editRole(obj){
        this.dialogVisible=true;
        getRoleInfo(obj.roleId).then(res=>{
          if(res.code=200){
            this.dialogVisible=true;
            this.formRole=res.dataList[0]
          }
        })
      },
      saveRole(formName){
        this.$refs[formName].validate((valid) => {
           this.formRole.menuIdList=this.$refs.tree.getCheckedKeys();

          if (valid) {
            if(this.formRole.roleId){
              updateRole(this.formRole).then(res=>{
                if(res.code==200){
                  this.dialogVisible=false;
                  this.formRole=Object.assign({},defaultRole);
                  Message.success("修改成功");
                  this.getList()
                }
              })
            }else {
              createRole(this.formRole).then(res=>{
                if(res.code==200){
                  this.dialogVisible=false;
                  this.formRole=Object.assign({},defaultRole);
                  Message.success("保存成功");
                  this.getList()
                }
              })
            }

          }
        })
      },
      queryList(){
        this.listQuery.pageNum=1;
        this.getList()
      },
      getRoleMenuList(){
        getRoleMenu().then(res=>{
          console.log(res)
        })
      },
      getList(){
        this.listLoading=true;
        getRoleList(this.listQuery).then(res=>{
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
      renderContent(h, { node, data, store }) {
        return ( <span class="custom-tree-node">
          <i class={data.className}></i>
          <span style="margin-left:5px;">{node.label}</span>
          </span>
      );
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该品牌', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteCustomClass(row.id).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            });
            this.getList();
          });
        });
      }
    },

  }
</script>

<style scoped>

  .search-btn{
    width: 100px;
  }
  .active{
    border:1px solid #1197D6;
    color: #1197D6;
  }
</style>

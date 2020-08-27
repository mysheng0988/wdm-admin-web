<template>
  <div class="app-container">
    <el-form :inline="true" :model="listQuery" size="small" ref="searchForm">
        <el-form-item >
          <el-input  placeholder="账户名称"  v-model="listQuery.username" clearable></el-input>
        </el-form-item>
        <el-form-item >
          <el-input placeholder="手机号码" v-model="listQuery.phoneNumber" clearable></el-input>
        </el-form-item>
        <el-form-item >
          <el-input placeholder="所属医院" v-model="listQuery.hospitalName" clearable></el-input>
        </el-form-item>
        <el-form-item >
          <el-date-picker
            v-model="listQuery.createTimeStart"
            class="input-width"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="创建日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button   class="search-btn" @click="clearData"><svg-icon icon-class="reset-icon" class-name="search-icon"></svg-icon>重置</el-button>
          <el-button icon="el-icon-search" type="success"  class="search-btn" @click="queryData">查询</el-button>
          <el-button icon="el-icon-plus" type="success"  class="search-btn" @click="addUser">新增</el-button>
          <el-button icon="el-icon-upload2" type="success"  class="search-btn" @click="exportExcel">导出</el-button>
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
        <el-table-column label="账户名" align="center">
          <template slot-scope="scope">{{scope.row.username}}</template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">{{scope.row.realName }}</template>
        </el-table-column>
        <el-table-column label="用户角色"  align="center">
          <template slot-scope="scope">{{scope.row.roleList[0].remark}}</template>
        </el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">{{scope.row.gender|formatGender}}</template>
        </el-table-column>
        <el-table-column label="所属医院" align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">{{scope.row.organizationName }}</template>
        </el-table-column>
        <el-table-column label="所属科室" align="center">
          <template slot-scope="scope">{{scope.row.departmentName }}</template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">{{scope.row.enable|formatEnable }}</template>
        </el-table-column>
        <el-table-column label="手机号码" align="center">
          <template slot-scope="scope">{{scope.row.mobileNumber }}</template>
        </el-table-column>
        <el-table-column label="创建用户" align="center">
          <template slot-scope="scope">{{scope.row.createUserName }}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" width="180">
          <template slot-scope="scope">{{scope.row.createTime }}</template>
        </el-table-column>
        <el-table-column label="备注" align="center">
          <template slot-scope="scope">{{scope.row.remark }}</template>
        </el-table-column>
        <el-table-column label="操作" width="250"   align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-edit-outline"
              class="active"
              @click="editUser(scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              :icon="scope.row.enable?'el-icon-remove-outline':'el-icon-time'"
              :class="scope.row.enable?'disable':'enable'"
              @click="handleChangeState(scope.row)">{{scope.row.enable?"禁用":"启用"}}
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
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form ref="userForm"
               :model="userForm"
               :rules="rules"
               label-width="100px">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="账户名称:"  prop="username"  >
              <el-input v-model="userForm.username" placeholder="请输入账户名称" maxlength="20" show-word-limit :disabled="userForm.uid!=null"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账户密码:"  prop="password"   v-if="!userForm.uid" >
              <el-input v-model="userForm.password" placeholder="请输入账户密码" maxlength="20" show-word-limit></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="真实姓名:"  prop="realName" >
              <el-input v-model="userForm.realName" placeholder="请输入真实姓名" maxlength="10" show-word-limit></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别："   >
              <el-radio-group v-model="userForm.gender">
                <el-radio :label="false">男</el-radio>
                <el-radio :label="true">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
          <el-form-item label="所属医院:" prop="hospitalId" >
            <el-select  placeholder="请选择" v-model="userForm.hospitalId" @change="hospitalChange" clearable class="input-width">
              <el-option
                v-for="item in hosList"
                :key="item.name"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          </el-col>
           <el-col :span="12">
          <el-form-item label="职称:" prop="jobTitle" >
            <el-select  placeholder="请选择" v-model="userForm.jobTitle"  clearable class="input-width">
              <el-option value="NO" label="无"></el-option>
              <el-option value="PRIMARY_NURSE" label="护士"></el-option>
              <el-option value="NURSE_PRACTITIONER" label="护师"></el-option>
              <el-option value="NURSE_IN_CHARGE" label="主管护师"></el-option>
              <el-option value="ASSOCIATE_PROFESSOR_OF_NURSING" label="副主任护师"></el-option>
              <el-option value="PROFESSOR_OF_NURSING" label="主任护师"></el-option>
              <el-option value="ASSISTANT_DOCTOR" label="医士"></el-option>
              <el-option value="PHYSICIAN" label="医师"></el-option>
              <el-option value="DOCTOR_IN_CHARGE" label="主治医师"></el-option>
              <el-option value="HOUSE_PHYSICIAN" label="住院医师"></el-option>
              <el-option value="ASSISTANT_DIRECTOR_PHYSICIAN" label="副主任医师"></el-option>
              <el-option value="DIRECTOR_PHYSICIAN" label="主任医师"></el-option>
            </el-select>
          </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户角色:" prop="roleId">
              <el-select  placeholder="请选择" v-model="userForm.roleId" clearable class="input-width">
                <el-option
                  v-for="item in roleList"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属科室:"  prop="deptId" >
              <el-select  placeholder="请选择" v-model="userForm.deptId" clearable class="input-width">
                <el-option
                  v-for="item in deptList"
                  :key="item.deptId"
                  :label="item.deptName"
                  :value="item.deptId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工号:"  prop="staffNo" >
              <el-input v-model="userForm.staffNo" placeholder="请输入工号" maxlength="15" show-word-limit></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码:"  prop="phoneNumber" >
              <el-input v-model="userForm.phoneNumber" placeholder="请输入手机号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注:">
              <el-input
                class="textarea"
                placeholder="请输入详细内容"
                type="textarea"
                v-model="userForm.remark"
                :autosize="{minRows: 2, maxRows: 2}"
                maxlength="100"
                show-word-limit
                clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveUser('userForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {queryHospital,
    getUserList,
    changeState,
    getRoleList,
    saveUser,
    getUserinfo,
    updateUser,} from '@/api/manage'
  import {getDeptList} from '@/api/patient'
  import {getCardData} from '@/api/card-manage'
  import { Message, MessageBox } from 'element-ui'
  const defaultUser={
    uid:null,
    deptId: "",
    gender: true,
    hospitalId: "",
    password: "",
    phoneNumber: "",
    realName: "",
    remark: "",
    roleId: "",
    staffNo: "",
    username: "",
    jobTitle:"NO"
  }
  export default {
    name: "userList",
    data() {
      return {
        radio:null,
        list: [],
        roleList:[],
        userForm:Object.assign({},defaultUser),
        listLoading: false,
        dialogVisible:false,
        hosList:[],
        deptList:[],
        dialogTitle:"新增用户",
        total:0,
        rules:{
          hospitalId: [
            {required: true, message: '请选择医院', trigger: 'blur'},
          ],
          roleId: [
            {required: true, message: '请选择角色', trigger: 'blur'},
          ],
          username: [
            {required: true, message: '用户名不能为空', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'},
          ],
          realName: [
            {required: true, message: '请填写真实姓名', trigger: 'blur'},
          ],
          staffNo: [
            {required: true, message: '请填写工号', trigger: 'blur'},
          ],
          deptId: [
            {required: true, message: '请选择科室', trigger: 'blur'},
          ],
          phoneNumber: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            { pattern: /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: '手机号格式不正确',trigger: 'blur' }
          ],
        },
        listQuery: {
          createTimeStart: "",
          hospitalName: "",
          phoneNumber: "",
          username: "",
          pageNum: 1,
          pageSize: 10
        },
      }
    },
    filters:{
      formatGender(gender){
        return gender?"女":"男"
      },
      formatEnable(enable){
        return enable?"启用":"禁用"
      }
    },
    created() {
      this.getList();
      this.getHospital();
      this.getRole();
    },

    methods: {
      clearData(){
        this.listQuery.createTimeStart= "";
        this.listQuery.hospitalName= "";
        this.listQuery.phoneNumber= "";
        this.listQuery.username= "";
        this.listQuery.pageNum=1;
        this.listQuery.pageSize=10;
        // this.$refs[formName].resetFields();
      },
      addUser(){
         this.dialogTitle="新增账户信息"
        this.dialogVisible=true;
        this.userForm=Object.assign({},defaultUser);
      },
      editUser(obj){
        this.dialogTitle="编辑账户信息"
        getUserinfo(obj.uid).then(res=>{
          if(res.code==200){
            this.userForm=res.dataList[0];
            this.dialogVisible=true;
          }
          return this.userForm.hospitalId;
        }).then(res=>{
          this.hospitalChange(res)
        })
      },
      updateUserStateData(data){
          let uid=data.uid;
          let enable=data.uid;
          updateUserstate(uid,enable).then(res=>{
            if(res.code==200){
              this.$message.success("更新成功")
            }

          })
      },
      saveUser(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.userForm.uid){
              updateUser(this.userForm).then(res=>{
                if(res.code==200){
                  this.dialogVisible=false;
                  this.userForm=Object.assign({},defaultUser);
                  Message.success("修改成功");
                  this.getList()
                }
              })
            }else{
              saveUser(this.userForm).then(res=>{
                if(res.code==200){
                  this.dialogVisible=false;
                  this.userForm=Object.assign({},defaultUser);
                  Message.success("保存成功");
                  this.getList()
                }
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
      hospitalChange(value){
        this.deptList=[];
        getDeptList(value).then(res=>{
          if(res.code==200){
            this.deptList=res.dataList;
          }
        })
      },
      getRole(){
        getRoleList({pageNum: 1,pageSize: 200,roleName:""}).then(res=>{
          if(res.code==200){
            this.roleList=res.dataList;
          }
        })
      },
      getHospital(){
        queryHospital({pageNum: 1,pageSize: 200,name:""}).then(res=>{
          if(res.code==200){
            this.hosList=res.dataList;
          }
        }).catch(error => {
          this.listLoading=false;
        })
      },
      handleChangeState(obj){
        console.log(obj)
        if(obj.enable){
          this.$confirm('是否禁用该用户, 禁用之后该用户无法登陆?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            changeState(obj.uid,!obj.enable).then(res=>{
              if(res.code==200){
                this.getList()
                Message.error("该用户已禁用")
              }
            })
          })
        }else {
          changeState(obj.uid,!obj.enable).then(res=>{
            if(res.code==200){
              this.getList()
              Message.success("该用户已启用")
            }
          })
        }
      },
      getList(){
        this.listLoading=true;
        getUserList(this.listQuery).then(res=>{
          this.listLoading=false;
          if(res.code==200){
            this.list=res.dataList;
            this.total=res.pageInfo.total;
          }
        }).catch(error => {
          this.listLoading=false;
        })
      },
      queryData(){
        this.listQuery.pageNum= 1;
        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.pageNum= 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该品牌', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // deleteCustomClass(row.id).then(response => {
          //   this.$message({
          //     message: '删除成功',
          //     type: 'success',
          //     duration: 1000
          //   });
          //   this.getList();
          // });
        });
      },
      //导出操作
      exportExcel(){
        import('@/vendor/Export2Excel').then(excel => {
          // const tHeader = ['账户名','姓名', '用户角色', '性别', '所属医院','所属科室', '状态','手机号','创建用户','创建时间','备注'];//表头
          // var filterVal = ['username','realName', 'roleName', 'gender', 'hospitalName','deptName','enable','phoneNumber','createUserName','createTime','remark'];//表头对应字段名
          // var list = this.list;//数据来源
          // var data = this.formatJson(filterVal,list);//数据格式化
          // var index1='账户信息';//导出时文件名
          const tHeader = ['卡面卡号','写入卡号数据'];//表头
          var filterVal = ['displayNumber','cardNumber'];//表头对应字段
          getCardData({cardQuantity:1000,typeEnum:"EXAMINATION"}).then(res=>{
            if(res.code==200){
              var list=res.dataList;
              var data = this.formatJson(filterVal,list);//数据格式化
              var index1='卡信息';//导出时文件名
             excel.export_json_to_excel(tHeader,data,index1)//导出文件
            }
           
          })
         
        })
      },
      //对导出数据格式化处理
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'enable') {
            if(v[j]){
              return v[j]='启用'
            }else{
              return v[j]='禁用'
            }
          }else if(j === 'gender'){
            if(v[j]){
              return v[j]='女'
            }else{
              return v[j]='男'
            }
          }else{
            return v[j]
          }
        }))
      }
    },

  }
</script>

<style scoped>
  .search-btn{
    width: 100px;
  }
  .active{
    border:1px solid #67C23A;
    color: #67C23A;
  }
  .input-width{
    width: 100%;
  }
  .disable{
    border:1px solid #F56C6C;
    color: #F56C6C;
  }
  .enable{
    border:1px solid #1197D6;
    color: #1197D6;
  }
</style>

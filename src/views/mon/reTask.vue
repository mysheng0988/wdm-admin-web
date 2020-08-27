<template>
  <div class="app-container">
    <el-form :inline="true" :model="listQuery" size="small">
      <div>
        <el-form-item>
          <el-input placeholder="姓名" v-model.number="listQuery.stuName" clearable></el-input>
        </el-form-item>
         <el-form-item>
          <el-input placeholder="监测中心" v-model.number="listQuery.monitorName" clearable></el-input>
        </el-form-item>
         <el-form-item>
          <el-input placeholder="机构名称" v-model.number="listQuery.orgName" clearable></el-input>
        </el-form-item>
         <el-form-item>
          <el-input placeholder="一级机构" v-model.number="listQuery.firstOrg" clearable></el-input>
        </el-form-item>
         <el-form-item>
          <el-input placeholder="二级机构" v-model.number="listQuery.secondOrg" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="search-btn" @click="clearData">
            <svg-icon icon-class="reset-icon" class-name="search-icon"></svg-icon>重置
          </el-button>
          <el-button icon="el-icon-search" type="success" class="search-btn" @click="queryData()">查询</el-button>
          <el-button type="success" class="search-btn" @click="add365ReTask">
            <svg-icon icon-class="patient" class-name="search-icon"></svg-icon>365预约复查
          </el-button>
        </el-form-item>
      </div>
    </el-form>
    <div class="table-container">
      <el-table
        ref="productCateTable"
        style="width: 100%"
        :data="list"
        v-loading="listLoading"
        stripe
        border
      >
        <el-table-column label="序号" width="60" align="center">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">{{scope.row.stuName }}</template>
        </el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">{{scope.row.sex|formatGender}}</template>
        </el-table-column>
        <el-table-column label="出生日期" align="center">
          <template slot-scope="scope">{{scope.row.birthDate }}</template>
        </el-table-column>
         <el-table-column label="联系电话" align="center">
          <template slot-scope="scope">{{scope.row.reviewTel}}</template>
        </el-table-column>
         <el-table-column label="身份证/护照号" align="center">
          <template slot-scope="scope">{{scope.row.idCard}}</template>
        </el-table-column>
        <el-table-column label="所在学校/社区" align="center">
          <template slot-scope="scope">{{scope.row.orgName }}</template>
        </el-table-column>
         <el-table-column label="一级机构" align="center">
          <template slot-scope="scope">{{scope.row.firstOrg }}</template>
        </el-table-column>
         <el-table-column label="二级机构" align="center">
          <template slot-scope="scope">{{scope.row.secondOrg }}</template>
        </el-table-column>
          <el-table-column label="复查类型" align="center">
          <template slot-scope="scope">{{scope.row.reviewType |formatReviewType}}</template>
        </el-table-column>
         <el-table-column label="当前复查次数" align="center">
          <template slot-scope="scope">{{scope.row.reviewNo}}/{{scope.row.reviewTotal}}</template>
        </el-table-column>
         <el-table-column label="任务状态" align="center">
          <template slot-scope="scope">{{scope.row.reviewStatus |formatState}}</template>
        </el-table-column>
        <el-table-column label="监测中心" align="center">
          <template slot-scope="scope">{{scope.row.monitorName}}</template>
        </el-table-column>
        <el-table-column label="复查时间" align="center">
          <template slot-scope="scope">
            <p> {{scope.row.appointDate}}</p>
            <p>{{scope.row.appointTime}}</p>
          </template>
        </el-table-column>
        <el-table-column width="120" label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
               class="handle-box"
              v-if="scope.row.reviewStatus==0||scope.row.reviewStatus==2"
              icon="el-icon-edit-outline"
              @click="handleEdit(scope.row)"
            >开始登记</el-button>
             <el-button
              size="mini"
               class="handle-box"
              type="danger"
              v-if="scope.row.reviewStatus==1"
              icon="el-icon-edit-outline"
              @click="handleCancel(scope.row)"
            >取消登记</el-button>
             <el-button
             class="handle-box"
              size="mini"
              type="primary"
              v-if="scope.row.reviewStatus==1"
              icon="el-icon-edit-outline"
              @click="handleStart(scope.row)"
            >开始复查</el-button>
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
        :total="total"
      ></el-pagination>
    </div>
     <el-dialog title="新增365预约" :visible.sync="dialogVisible" width="60%">
      <div class="content-box">
        <div style="margin-bottom:50px">
        <el-form :inline="true"  size="small"  >
          <el-form-item label="证件号码:">
            <el-input placeholder="请输入证件号码" v-model="idCard" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getStudentsData"> 搜索</el-button>
          </el-form-item>
        </el-form>
        <el-table
          ref="multipleTable"
          :data="studentList"
          tooltip-effect="dark"
          highlight-current-row
          style="width: 100%"
           border
          @current-change="handleSelectionChange"
        >
          <el-table-column label="操作" width="55">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.checked"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="序号" >
            <template slot-scope="scope">{{ scope.$index+1 }}</template>
          </el-table-column>
         <el-table-column label="姓名" align="center">
          <template slot-scope="scope">{{scope.row.stuName}}</template>
        </el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">{{scope.row.sex|formatGender}}</template>
        </el-table-column>
         <el-table-column label="身份证号" align="center">
          <template slot-scope="scope">{{scope.row.idCard}}</template>
        </el-table-column>
        <el-table-column label="出生日期" align="center">
          <template slot-scope="scope">{{scope.row.birthDate}}</template>
        </el-table-column>
        
        <el-table-column label="机构类型" align="center">
          <template slot-scope="scope">{{scope.row.organType |organTypeFormat }}</template>
        </el-table-column>
        
         <el-table-column label="所在机构" align="center">
          <template slot-scope="scope">{{scope.row.organName }}</template>
        </el-table-column>
        <el-table-column label="一级机构" align="center">
          <template slot-scope="scope">{{scope.row.firstOrg }}</template>
        </el-table-column>
        <el-table-column label="二级机构" align="center">
          <template slot-scope="scope">{{scope.row.secondOrg }}</template>
        </el-table-column>
         <el-table-column label="监护人" align="center">
          <template slot-scope="scope">{{scope.row.linkman }}</template>
        </el-table-column>
         <el-table-column label="联系电话" align="center">
          <template slot-scope="scope">{{scope.row.stuTel }}</template>
        </el-table-column>
        </el-table>
        </div>
        <el-form ref="reTaskForm" label-width="130px" :rules="rules" :model="reTaskObj" >
          <el-row :gutter="10">
           
            <el-col :span="12">
              <el-form-item label="预约监测中心:" prop="monitorCenterId">
                <el-select
                  placeholder="请选择"
                  v-model="reTaskObj.monitorCenterId"
                  clearable
                  @change="handleMonitorChange"
                  class="input-width"
                >
                  <el-option
                    v-for="(item,index) in monitorOption"
                    :key="index"
                    :label="item.monitorName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
             <el-col :span="12">
              <el-form-item label="联系电话:" prop="reviewTel">
                <el-input
                  v-model="reTaskObj.reviewTel"
                  placeholder="请输入输联系电话"
                  maxlength="20"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="预约日期:" prop="appointDate">
                <el-date-picker
                  v-model="reTaskObj.appointDate"
                  type="date"
                  @change="changeDate"
                  class="input-width"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="预约时间:" prop="appointTime">
                <el-radio-group v-model="reTaskObj.appointTime">
                  <el-radio-button style="margin-top:10px" v-for="(item,index) in timesOption " :key="index" :label="item.appointTime" :disabled="item.total>=item.peopleNo"></el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="success" @click="savereTask('reTaskForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
let defaultReg={
  id: 0,
  idCard: "",
  idType: 0,
  studentId: 0
}
let reTaskDefault = {
  id:"",
  appointDate: "",
  appointTime: "",
  studentId: "",
  reviewTotal:"",
  memberInfoId:"",
  monitorCenterId:"",
  reviewNo:"",
  reviewType:2,
  reviewTel:""
};
import { fetchList ,changeTaskState,startReview,getByStudentCardId,save365ReTask} from "@/api/reviewTask";
import { getWorkTimes} from "@/api/invite";
import { monitorCenterList } from "@/api/monitor";
import { mapGetters } from "vuex";
import { Message, MessageBox } from "element-ui";
export default {
  name: "list",
  data() {
    return {
      createDate: [],
      regObj:Object.assign({},defaultReg),
      reTaskObj: Object.assign({}, reTaskDefault),
      list: [],
      idCard:"",
      taskList: [],
      studentList:[],
      dialogVisible2: false,
      listLoading: false,
      dialogVisible: false,
      total: 0,
      inviteType:"insert",
      monitorOption: [],
      timesOption: [],
      listQuery: {
         firstOrg: "",
        idCard: "",
        monitorName: "",
        orgName: "",
        secondOrg: "",
        stuName: "",
        pageNum: 1,
        pageSize: 10
      },
      rules: {
        appointDate: [
          { required: true, message: "请选择预约日期", trigger: "change" },
        ],
        appointTime: [
          { required: true, message: "请选择预约时间段", trigger: "change" },
        ],
        monitorCenterId: [
          { required: true, message: "请选择监测中心", trigger: "change" },
        ],
        reviewTel: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
        ],
      }
    };
  },
  computed: {
    ...mapGetters([
      //步骤二，对象扩展运算符方式
      "info"
    ])
  },
  created() {
    this.getList();
     this.monitorCenterListData();
  },
  filters: {
    formatGender(gender) {
      return gender==1 ? "男" : "女";
    },
    formatReviewType(val) {
        switch (val) {
          case 1:
            return "复查";
          case 2:
            return "365计划";
        }
      return "";
    },
     organTypeFormat(val){
      switch (val) {
        case 1:
          return "社区";
        case 2:
          return "学校";
        case 3:
          return "豌豆苗学院";
      }
      return "";
    },
    formatState(val) {
      switch (val) {
          case 0:
            return "待登记";
          case 1:
            return "待复查";
          case 2:
            return "已取消";
          case 3:
            return "复查中";
          case 4:
            return "已复查";
        }
      return "";
    }
  },
  methods: {
     add365ReTask(){
       this.reTaskObj=Object.assign({},reTaskDefault);
       this.dialogVisible=true;
       this.timesOption=[];
        this.$nextTick(function() {
        this.$refs.reTaskForm.clearValidate();
      });
     },
     handleSelectionChange(row){
        this.studentList.forEach(item => {
          if (item.id !== row.id) {
            item.checked = false
          }
        })
　　　　this.reTaskObj.studentId = row.id;
       this.reTaskObj.reviewTel=row.stuTel;
       this.reTaskObj.reviewTotal=row.reviewNo;
        this.reTaskObj.reviewNo=row.reviewTimes;
        this.reTaskObj.memberInfoId=row.memberInfoId;
    },
    getStudentsData(){
      if(!this.idCard){
        this.$message.warning("请输入证件号码");
        return;
      }
      getByStudentCardId(this.idCard ).then(res=>{
          if(res.code==200){
            this.studentList=res.dataList;
          }else{
            this.studentList=[];
            this.$message.warning(res.message)
          }
      })
    },
    savereTask(){
      if(!this.reTaskObj.studentId){
        this.$message.warning("请选择学生！")
        return;
      }
      save365ReTask(this.reTaskObj).then(res=>{
        if(res.code==200){
            this.dialogVisible=false;
            this.reTaskObj=Object.assign({},reTaskDefault)
            this.getList();
        } 
      })
    },
    clearData() {
      let listQuery = {
        firstOrg: "",
        idCard: "",
        monitorName: "",
        orgName: "",
        secondOrg: "",
        stuName: "",
        pageNum: 1,
        pageSize: 10
      };
      this.createDate = [];
      this.listQuery = listQuery;
    },
     handleMonitorChange(val) {
      if(this.reTaskObj.appointDate!=""&&this.reTaskObj.monitorCenterId!="")
      this.getWorkTimesData();
    },
    changeDate(val){
      if(this.reTaskObj.appointDate!=""&&this.reTaskObj.monitorCenterId!="")
      this.getWorkTimesData();
    },
    getWorkTimesData(){
    
      let data={
        appointDate:this.reTaskObj.appointDate,
        monitorCenterId:this.reTaskObj.monitorCenterId
      }
       getWorkTimes(data).then(res=>{
           if(res.code==200){
              this.timesOption=res.dataList;
           }
       })
     
    },
    monitorCenterListData(){
       monitorCenterList().then(res=>{
          if(res.code==200){
              this.monitorOption=res.dataList;
          }
       })
     },
    handleStart(val){
      let year=val.birthDate.substring(0,4)
      let date=new Date();
      let param={
        address:val.address,
        firstOrg: val.firstOrg,
        id: val.id,
        linkTel: val.reviewTel,
        linkman: val.linkman,
        monitorId: val.monitorId,
        reviewStatus: 3,
        reviewType: val.reviewType,
        secondOrg: val.secondOrg,
        studentAge: date.getFullYear()-year,
        studentId: val.stuId
      }
       startReview(param).then(res=>{
        if(res.code==200){
          this.$message.success("已开始复查")
          this.getList();
        }
      })
    },
    handleCancel(val){
       changeTaskState({id:val.id,reviewStatus:2}).then(res=>{
        if(res.code==200){
          this.$message.success("已取消登记")
           this.getList();
        }
      })
    },
    handleEdit(val) {
      changeTaskState({id:val.id,reviewStatus:1}).then(res=>{
        if(res.code==200){
          this.$message.success("登记成功")
           this.getList();
        }
      })
    },
    handleTimeChange(val) {
      this.listQuery.createTimeStart = this.createDate[0];
      this.listQuery.createTimeEnd = this.createDate[1];
    },

    saveRegData(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          
          reviewTaskReg(this.regObj).then(res=>{
            if(res.code==200){
                this.dialogVisible = false;
                this.$refs[formName].resetFields();
                this.regObj = Object.assign({}, defaultReg);
                this.getList();
            }
          })
        }else{
          this.$message.warning("验证失败")
        }
      });
    },
    queryData() {
      this.listQuery.pageNum = 1;
      this.getList();
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
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery)
        .then(res => {
          this.listLoading = false;
          if (res.code == 200) {
            this.list = res.dataList;
            this.total = res.pageInfo.total;
          } else {
            this.$message.warning("没有查到数据");
            this.list = [];
            this.total = 0;
          }
        })
        .catch(error => {
          this.listLoading = false;
        });
    }
  }
};
</script>

<style scoped >
.card-box {
  text-align: center;
  margin-bottom: 30px;
}
.cardContent {
  width: 100%;
  text-align: center;
}
.cardContent .img {
  width: 160px;
  height: 120px;
  margin: 10px auto;
}
.cardContent p {
  line-height: 35px;
}
.flag {
  font-size: 16px;
  font-weight: bold;
  color: #222;
}
.flag-type {
  font-size: 14px;
  font-weight: bold;
  color: #222;
}
.flag-type .text {
  padding: 0 10px;
  color: #a6ce39;
}
.flag-type .num {
  padding: 0 10px;
  color: #1197d6;
}
.cardContent .card-input {
  text-align: center;
}
.search-btn {
  width: 120px;
}
.active {
  border: 1px solid #1197d6;
  color: #1197d6;
}
.active-btn {
  background: #1197d6 !important;
  color: #fff !important;
}
.input-width {
  width: 100%;
}
.handle-box{
  display: block;
  margin:10px 0 0 0;
}
</style>

<template>
  <div class="app-container">
    <el-form :inline="true" :model="listQuery" size="small">
      <div>
        <el-form-item>
          <el-input placeholder="姓名" v-model="listQuery.stuName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="监测中心" v-model="listQuery.monitorName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="createDate"
            type="daterange"
            range-separator="至"
            start-placeholder="起始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            @change="handleTimeChange"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select v-model="listQuery.appointStatus" placeholder="预约状态">
            <el-option value label="全部"></el-option>
            <el-option value="0" label="未处理"></el-option>
            <el-option value="1" label="已预约"></el-option>
            <el-option value="2" label="已取消"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="search-btn" @click="clearData">
            <svg-icon icon-class="reset-icon" class-name="search-icon"></svg-icon>重置
          </el-button>
          <el-button icon="el-icon-search" type="success" class="search-btn" @click="queryData()">查询</el-button>
          <el-button type="success" class="search-btn" @click="addInvite">
            <svg-icon icon-class="patient" class-name="search-icon"></svg-icon>新增预约
          </el-button>
          <!-- <el-button type="info" round class="search-btn" @click="M1WriteBlockData">写卡</el-button> -->
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
        <el-table-column label="预约编号" width="120" align="center">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="预约日期" align="center">
          <template slot-scope="scope">
            {{scope.row.appointDate }}
            <p>{{scope.row.appointTime}}</p>
          </template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">{{scope.row.studentName}}</template>
        </el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">{{scope.row.studentSex|formatSex}}</template>
        </el-table-column>
        <el-table-column label="出生日期" align="center">
          <template slot-scope="scope">{{scope.row.studentBirthDate}}</template>
        </el-table-column>
        <el-table-column label="联系电话" align="center">
          <template slot-scope="scope">{{scope.row.studentTel }}</template>
        </el-table-column>
        <el-table-column label="筛查结果" align="center">
          <template slot-scope="scope">{{scope.row.result|formatResult }}</template>
        </el-table-column>
        <el-table-column label="监测中心" align="center">
          <template slot-scope="scope">{{scope.row.monitorCenterName }}</template>
        </el-table-column>
        <el-table-column label="所在地点" align="center">
          <template slot-scope="scope">{{scope.row.monitorCenterArea }}</template>
        </el-table-column>
        <el-table-column label="预约状态" align="center">
          <template slot-scope="scope">{{scope.row.appointStatus |formatState}}</template>
        </el-table-column>
        <el-table-column width="140" label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              class="handle-btn"
              icon="el-icon-edit-outline"
               v-if="scope.row.appointStatus==1"
              @click="handleUpdate(scope.row)"
            >修改</el-button>
            <el-button
              size="mini"
              class="handle-btn"
              icon="el-icon-time"
              type="primary"
              plain
              v-if="scope.row.appointStatus==1"
              @click="handleCancel(scope.row)"
            >取消预约</el-button>
            <el-button
              size="mini"
              icon="el-icon-time"
              type="primary"
              class="handle-btn"
              plain
              v-if="scope.row.appointStatus==2"
              @click="handleUpdate(scope.row)"
            >重新预约</el-button>
            <el-button
              size="mini"
              icon="el-icon-time"
              type="primary"
              class="handle-btn"
              plain
              v-if="scope.row.appointStatus==0"
              @click="handleInsert(scope.row)"
            >复查邀约</el-button>
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
    <el-dialog title="新增预约" :visible.sync="dialogVisible" width="60%">
      <div class="content-box">
        <div v-if="inviteType=='insert'" style="margin-bottom:50px">
        <el-form :inline="true"  size="small">
          <el-form-item label="学生姓名">
            <el-input placeholder="请输入姓名" v-model="stuName" clearable></el-input>
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
          <template slot-scope="scope">{{scope.row.studentName}}</template>
        </el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">{{scope.row.studentSex|formatSex}}</template>
        </el-table-column>
         <el-table-column label="身份证号" align="center">
          <template slot-scope="scope">{{scope.row.studentBirthDate}}</template>
        </el-table-column>
        <el-table-column label="出生日期" align="center">
          <template slot-scope="scope">{{scope.row.studentBirthDate}}</template>
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
          <template slot-scope="scope">{{scope.row.studentTel }}</template>
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
let reTaskDefault = {
  id:"",
  appointDate: "",
  appointTime: "",
  studentId: "",
  monitorCenterId:"",
  reviewTel:""
};
import { fetchList,getWorkTimes,getStudents,insertInvite,updateInvite,cancelInvite ,getTaskDetail} from "@/api/invite";
import { monitorCenterList } from "@/api/monitor";
import { mapGetters } from "vuex";
import { Message, MessageBox } from "element-ui";
export default {
  name: "list",
  data() {
    return {
      createDate: [],
      inviteType:"insert",
      loadingOption: false,
      stuName:"",
      reTaskObj: Object.assign({}, reTaskDefault),
      list: [],
      studentList:[],
      organType: 2,
      organList: [],
      monitorOption: [],
      timesOption: [],
      screenPersonalList: [],
      dialogVisible2: false,
      listLoading: false,
      dialogVisible: false,
      total: 0,
      listQuery: {
        stuName: "",
        monitorName: "",
        appointStatus:"",
        startDate:"",
        endDate:"",
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
    formatSex(gender) {
      return gender == 0 ? "男" : "女";
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
          return "未处理";
        case 1:
          return "已预约";
        case 2:
          return "已取消";
      }
      return "";
    },
    formatScoliosis(val) {
      switch (val) {
        case 0:
          return "正常";
        case 1:
          return "C弯";
        case 2:
          return "S弯";
        case 3:
          return "胸弯";
        case 4:
          return "腰弯";
      }
      return "";
    },

    formatResult(val) {
      switch (val) {
        case 0:
          return "未筛查";
        case 1:
          return "正常";
        case 2:
          return "低风险";
        case 3:
          return "高风险";
      }
      return "";
    }
  },
  methods: {
    getStudentsData(){
      if(this.stuName==""){
        this.$message.warning("请输入查询的学生姓名")
        return;
      }
      let data={
        stuName:this.stuName,
        result:1,
      }
      getStudents(data).then(res=>{
        if(res.code==200){
          this.studentList=res.dataList;
        }else{
           this.studentList=[]
          this.$message.warning(res.message);
        }
      })
    },
     savereTask(formName){
        if(!this.reTaskObj.studentId){
            this.$message.warning("请选择预约学生")
            return;
        }
        this.$refs[formName].validate(valid => {
          if(valid){
            if(this.inviteType=="insert"||this.inviteType=="add"){
                              this.insertInviteData()
                        }else{
                            this.updateInviteData()
                        }
          }else{
            this.$message.warning("验证失败")
          }
           
        })
    },
    insertInviteData(){
     
      insertInvite(this.reTaskObj).then(res=>{
        if(res.code==200){
          this.dialogVisible=false;
          this.reTaskObj=Object.assign({},reTaskDefault);
          this.stuName="";
          this.getList();
        }
      })
    },
    updateInviteData(){
      updateInvite(this.reTaskObj).then(res=>{
        if(res.code==200){
          this.dialogVisible=false;
          this.reTaskObj=Object.assign({},reTaskDefault);
          this.stuName="";
          this.getList();
        }
      })
    },
    handleSelectionChange(row){
        this.studentList.forEach(item => {
          if (item.id !== row.id) {
            item.checked = false
          }
        })
　　　　this.reTaskObj.studentId = row.studentId;
        this.reTaskObj.reviewTel=row.studentTel;
       this.reTaskObj.id=row.id
    },
    addInvite() {
      this.stuName="";
      this.inviteType="insert"
      this.timesOption=[]
      this.reTaskObj = Object.assign({},reTaskDefault );
      this.dialogVisible=true;
      this.$nextTick(function(){
          this.$refs.reTaskForm.clearValidate();
      })
       
    },
    handleInsert(row){
      this.inviteType="add"
      this.timesOption=[]
      this.reTaskObj = Object.assign({},reTaskDefault );
      this.reTaskObj.id=row.id;
      this.reTaskObj.studentId=row.studentId;
       this.reTaskObj.reviewTel=row.studentTel;
      this.dialogVisible=true;
       this.$nextTick(function(){
          this.$refs.reTaskForm.clearValidate();
      })
    },
    handleCancel(row) {
      let data={
        id:row.id,
        appointStatus:2
      }
      cancelInvite(data).then(res=>{
        if(res.code==200){
         this.getList();
        }
      })
    },
     handleUpdate(row) {
      this.inviteType="update"
      this.reTaskObj = Object.assign({},reTaskDefault );
        this.timesOption=[]
        this.reTaskObj.id=row.id;
        this.reTaskObj.studentId=row.studentId,
      getTaskDetail(row.id).then(res=>{
        if(res.code==200){
          this.reTaskObj.monitorCenterId=res.dataList[0].monitorCenterId;
          this.reTaskObj.reviewTel=res.dataList[0].reviewTel;
          this.reTaskObj.appointDate=res.dataList[0].appointDate;
          this.reTaskObj.appointTime=res.dataList[0].appointTime;
          this.dialogVisible=true;
          this.getWorkTimesData();
        }
        
       
      })
     
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
    getOrganListData(val) {
      this.organList = [];
      let param = {
        orgType: val
      };
      getOrganList(param).then(res => {
        if (res.code == 200) {
          this.organList = res.dataList;
        }
      });
    },
    clearData() {
      let listQuery = {
        stuName: "",
        monitorName: "",
        appointStatus:"",
        startDate:"",
        endDate:"",
        pageNum: 1,
        pageSize: 10
      };
      this.createDate = [];
      this.listQuery = listQuery;
    },
    remoteScreenPersonalList(queryString) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.loadingOption = true;
        if (queryString != "") {
          getPersonalList(26, queryString).then(res => {
            this.loadingOption = false;
            this.screenPersonalList = res.dataList.slice(0, 50);
          });
        } else {
          this.screenPersonalList = [];
        }
      }, 500);
    },
    saveTask(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.reTaskObj.id) {
            this.updateTaskData(formName);
          } else {
            this.insertTaskData(formName);
          }
        } else {
          this.$message.warning("验证失败");
        }
      });
    },
    insertTaskData(formName) {
      insertTask(this.reTaskObj).then(res => {
        if (res.code == 200) {
          this.$message.success("创建成功");
          this.dialogVisible = false;
          this.$refs[formName].resetFields();
          this.reTaskObj = Object.assign({}, taskDefault);
          this.getList();
        }
      });
    },
    updateTaskData(formName) {
      updateTask(this.reTaskObj).then(res => {
        if (res.code == 200) {
          this.$message.success("修改成功");
          this.dialogVisible = false;
          this.$refs[formName].resetFields();
          this.reTaskObj = Object.assign({}, taskDefault);
          this.getList();
        }
      });
    },

    handleTimeChange(val) {
      this.listQuery.startDate = this.createDate[0];
      this.listQuery.endDate = this.createDate[1];
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
.handle-btn{
  width:100px;
  margin: 5px 0;
}
</style>

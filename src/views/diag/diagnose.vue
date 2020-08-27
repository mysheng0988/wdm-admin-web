<template>
  <div class="app-container">
    <el-form :inline="true" :model="listQuery" size="small">
      <div>
        <el-form-item>
          <el-input placeholder="姓名" v-model.number="listQuery.stuName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="所在学校/社区" v-model="listQuery.orgName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="监测中心" v-model="listQuery.monitorName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="预约医院" v-model="listQuery.hospital" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="listQuery.status" placeholder="预约状态">
            <el-option value label="全部"></el-option>
            <el-option :value="0" label="已登记"></el-option>
            <el-option :value="1" label="已预约"></el-option>
            <el-option :value="2" label="已取消"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="search-btn" @click="clearData">
            <svg-icon icon-class="reset-icon" class-name="search-icon"></svg-icon>重置
          </el-button>
          <el-button icon="el-icon-search" type="success" class="search-btn" @click="queryData()">查询</el-button>
          <el-button type="success" class="search-btn" @click="createDiagnose">
            <svg-icon icon-class="patient" class-name="search-icon"></svg-icon>确诊登记
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
        <el-table-column label="序号" width="120" align="center">
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
        <el-table-column label="所在学校/社区" align="center">
          <template slot-scope="scope">{{scope.row.orgName }}</template>
        </el-table-column>
        <el-table-column label="监测中心" align="center">
          <template slot-scope="scope">{{scope.row.monitorName }}</template>
        </el-table-column>
        <el-table-column label="预约医院" align="center">
          <template slot-scope="scope">{{scope.row.hospital }}</template>
        </el-table-column>
        <el-table-column label="预约医生" align="center">
          <template slot-scope="scope">{{scope.row.doctor }}</template>
        </el-table-column>
        <el-table-column label="预约日期" align="center">
          <template slot-scope="scope">{{scope.row.appointDate }}</template>
        </el-table-column>
        <el-table-column label="登记人" align="center">
          <template slot-scope="scope">{{scope.row.registrant }}</template>
        </el-table-column>
        <el-table-column label="登记日期" align="center">
          <template slot-scope="scope">{{scope.row.createDate}}</template>
        </el-table-column>
        <el-table-column label="预约状态" align="center">
          <template slot-scope="scope">{{scope.row.status |formatState}}</template>
        </el-table-column>
        <el-table-column width="150" label="操作" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.status==1">
              <el-button
                class="handle-box"
                size="mini"
                type="success"
                icon="el-icon-edit-outline"
                @click="handleEdit(scope.row)"
              >修改确诊</el-button>
            </p>
            <p v-if="scope.row.status==1">
              <el-button
                class="handle-box"
                size="mini"
                type="danger"
                icon="el-icon-edit-outline"
                @click="handleCancel(scope.row)"
              >取消</el-button>
            </p>
            <p v-if="scope.row.status==0">
              <el-button
                class="handle-box"
                size="mini"
                type="primary"
                icon="el-icon-edit-outline"
                @click="handleEdit(scope.row)"
              >预约确诊</el-button>
            </p>
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
    <el-dialog title="确诊登记" :visible.sync="dialogVisible" width="50%">
      <div class="content-box">
        <el-form :inline="true" size="small" label-width="130px" v-if="!appointObj.id">
          <el-form-item label="身份证号码">
            <el-input placeholder="请输入身份证号码" v-model="studentIdCrad" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getStudentsData">搜索</el-button>
          </el-form-item>
        </el-form>
        <p >预约人信息</p>
        <el-form ref="taskForm" label-width="130px" :rules="rules" :model="studentObj" >
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="机构类型">
                <el-select
                  v-model="studentObj.orgType"
                  placeholder="类型"
                  disabled
                  class="input-width"
                >
                  <el-option :value="1" label="学校"></el-option>
                  <el-option :value="2" label="社区"></el-option>
                  <el-option :value="3" label="豌豆苗学院"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所在机构:" prop="orgName">
                <el-input
                  v-model="studentObj.orgName"
                  placeholder="请输入所在机构名称"
                  maxlength="20"
                  disabled
                  show-word-limit
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="姓名:" prop="stuName">
                <el-input
                  v-model="studentObj.stuName"
                  placeholder="请输入姓名"
                  maxlength="20"
                  show-word-limit
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="证件号码:" prop="psName">
                <el-input
                  v-model="studentObj.idCard"
                  placeholder="请输入证件号码"
                  maxlength="20"
                  show-word-limit
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="家长姓名:" prop="linkman">
                <el-input
                  v-model="studentObj.linkman"
                  placeholder="请输入家长姓名"
                  maxlength="20"
                  show-word-limit
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话:" prop="reviewTel">
                <el-input
                  v-model="studentObj.reviewTel"
                  placeholder="请输入联系电话"
                  maxlength="20"
                  show-word-limit
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-form
          label-width="130px"
          ref="appointForm"
          :rules="rules"
          :model="appointObj"
          v-if="appointObj.id"
        >
          <el-col :span="24">
            <p>预约人需求</p>
            <el-form-item label="需求内容:" prop="requireContent">
              <el-input
                class="textarea"
                placeholder="请输入需求内容"
                type="textarea"
                v-model="appointObj.requireContent"
                :autosize="true"
                maxlength="100"
                show-word-limit
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <p>确认预约信息</p>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预约医院" prop="hospitalId">
              <el-select
                class="input-width"
                v-model="appointHospital"
                filterable
                remote
                placeholder="请输入关键词检索"
                value-key="id"
                @change="changeHospitalData"
                :remote-method="queryHospitalData"
                :loading="loadingOption"
              >
                <el-option v-for="item in hostList" :key="item.id" :label="item.name" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预约科室:" prop="departmentId">
              <el-select
                v-model="appointDept"
                placeholder="预约科室"
                class="input-width"
                value-key="deptId"
                @change="changeDept"
              >
                <el-option
                  v-for="item in deptList"
                  :key="item.deptId"
                  :label="item.deptName"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预约医生:" prop="doctorId">
              <el-select
                placeholder="预约医生"
                v-model="appointDoctor"
                @change="changeDoctor"
                clearable
                value-key="id"
                class="input-width"
              >
                <el-option
                  v-for="(item,index) in doctorList"
                  :key="index"
                  :label="item.realName"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预约时间:" prop="appointDate">
              <el-date-picker
                v-model="appointObj.appointDate"
                type="datetime"
                class="input-width"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">关闭</el-button>
        <el-button type="success" @click="saveDiagnosisData('appointForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchList,
  reviewChildData,
  insertDiagnosis,
  updateDiagnosis,
  cancelDiagnosis
} from "@/api/diagnose";
import {
  queryHospital,
  queryHospitalDept,
  queryDeptDorter
} from "@/api/hospital";
import { mapGetters } from "vuex";
import { Message, MessageBox } from "element-ui";

let studentDefault={
  orgType:"",
  orgName:"",
  stuName:"",
  stuId:"",
  idCard:"",
  linkman:"",
  reviewTel:"",
}
let appointDefault = {
  id:"",
  department: "",
  departmentId: "",
  requireContent: "",
  doctor: "",
  hospital: "",
  hospitalId: "",
  monitorCenterId: "",
  appointDate: "",
  studentId: ""
};

export default {
  name: "list",
  data() {
    return {
      studentIdCrad: "",
      createDate: [],
      diagnoseObj: "",
      studentObj: {},
      appointObj: Object.assign({}, appointDefault),
      appointHospital: "",
      appointDept: "",
      appointDoctor: "",
      list: [],
      hostList: [],
      deptList: [],
      doctorList: [],
      dialogVisible2: false,
      listLoading: false,
      loadingOption: false,
      dialogVisible: false,
      total: 0,
      listQuery: {
        hospital: "",
        monitorName: "",
        orgName: "",
        status: "",
        stuName: "",
        pageNum: 1,
        pageSize: 10
      },
      rules: {
        requireContent:[
           { required: true, message: "请输入需求内容", trigger: "blur" }
        ],
        hospitalId: [
          { required: true, message: "请选择医院", trigger: "change" }
        ],
        departmentId: [
          { required: true, message: "请选择科室", trigger: "change" }
        ],
        appointDate: [
          { required: true, message: "请选择预约日期", trigger: "change" }
        ],
        doctorId: [{ required: true, message: "请选择医生", trigger: "change" }]
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
  },
  filters: {
    formatGender(gender) {
      return gender == 1 ? "男" : "女";
    },
    formatState(val) {
      switch (val) {
        case 0:
          return "已登记";
        case 1:
          return "已预约";
        case 2:
          return "已取消";
      }
      return "";
    }
  },
  methods: {
    clearData() {
      let listQuery = {
        id: "",
        hospital: "",
        monitorName: "",
        orgName: "",
        status: "",
        stuName: "",
        pageNum: 1,
        pageSize: 10
      };
      this.createDate = [];
      this.listQuery = listQuery;
    },
    createDiagnose() {
      this.dialogVisible = true;
      this.appointObj = Object.assign({}, appointDefault);
      this.studentObj={};
    },
    handleTask(val) {
      this.patientMsg = val;
      this.listLoading = true;
      let param = {
        queryParamMedicalRecord: {
          patientId: this.patientId
        },
        pageNum: 1,
        pageSize: 20
      };
    },
    getStudentsData() {
      if (!this.studentIdCrad) {
        this.$message.warning("请输入学生证件号码");
        return;
      }

      reviewChildData({ idCard: this.studentIdCrad }).then(res => {
        if (res.code == 200) {
          this.studentObj = res.dataList[0];
          this.appointObj.studentId = this.studentObj.stuId;
          this.appointObj.monitorCenterId = this.studentObj.monitorId;
          this.appointObj.organId = this.studentObj.organId;
        } else {
          this.$message.warning(res.message);
        }
      });
    },
    changeHospitalData(obj) {
      this.appointObj.hospitalId = obj.id;
      this.appointObj.hospital = obj.name;
      queryHospitalDept(obj.id).then(res => {
        if (res.code == 200) {
          this.deptList = res.dataList;
        } else {
          this.deptList = [];
        }
      });
    },
    changeDept(dept) {
      this.appointObj.departmentId = dept.deptId;
      this.appointObj.department = dept.deptName;
      queryDeptDorter(dept.deptId).then(res => {
        if (res.code == 200) {
          this.doctorList = res.dataList;
        } else {
          this.doctorList = [];
        }
      });
    },
    changeDoctor(doctor) {
      this.appointObj.doctorId = doctor.id;
      this.appointObj.doctor = doctor.realName;
    },
    queryHospitalData(queryString) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.loadingOption = true;
        queryHospital(queryString).then(res => {
          this.loadingOption = false;
          if (res.code == 200) {
            this.hostList = res.dataList.slice(0, 50);
          } else {
            this.hostList = [];
          }
        });
      }, 300);
    },
    handleEdit(val) {
      console.log(val)
      this.studentObj={};
      this.appointObj=val;
      let studentObj={
        orgType:val.orgType,
        orgName:val.orgName,
        stuName:val.stuName,
        stuId:val.studentId,
        idCard:val.idCard,
        linkman:val.linkman,
        reviewTel:val.stuTel,
      }
      this.studentObj=studentObj;
      this.dialogVisible=true;

      this.appointHospital={
        id:val.hospitalId,
        name:val.hospital,
      }
       this.hostList=[this.appointHospital]
       if(this.appointHospital.id){
          this.changeHospitalData(this.appointHospital);
       }
      this.appointDept={
        deptId:val.departmentId,
        deptName:val.department,
      }
      if(this.appointDept.deptId){
          this.changeDept( this.appointDept)
      }
     
      this.appointDoctor={
        id:val.doctorId,
        realName:val.doctor
      }
    
      
    },
    handleCancel(val){
      cancelDiagnosis({id:val.id}).then(res=>{
        if(res.code==200){
          this.getList();
          this.$message.warning("取消预约成功")
        }
      })
    },
    handleTimeChange(val) {
      this.listQuery.createTimeStart = this.createDate[0];
      this.listQuery.createTimeEnd = this.createDate[1];
    },

    saveDiagnosisData(formName) {
      let appointObj = this.appointObj;
      if (!appointObj.studentId) {
        this.$message.warning("请先获取学生信息");
        return;
      }
      if (appointObj.id) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            updateDiagnosis(appointObj).then(res => {
              if (res.code == 200) {
                this.$message.success("修改成功");
                this.appointObj = Object.assign({}, appointDefault);
                this.dialogVisible = false;
                this.getList()
              }
            });
          } else {
            this.$message.warning("验证失败");
          }
        });
      } else {
        insertDiagnosis(this.appointObj).then(res => {
          if (res.code == 200) {
            this.$message.success("登记成功");
            this.appointObj = Object.assign({}, appointDefault);
            this.dialogVisible = false;
             this.getList()
          }
        });
      }
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
.content-box {
  width: 100%;
}
.content-box .img {
  width: 160px;
  height: 120px;
  margin: 10px auto;
}
.content-box p {
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
.content-box .card-input {
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
.handle-box {
  width: 100px;
  margin: 5px 0;
}
</style>

<template>
  <div class="app-container">
    <el-form :inline="true" :model="listQuery" size="small">
      <div>
        <el-form-item>
          <el-input placeholder="姓名" v-model.number="listQuery.batchNumber" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="所在学校/社区" v-model="listQuery.cardNumber" clearable></el-input>
        </el-form-item>
         <el-form-item>
          <el-input placeholder="所在班级" v-model="listQuery.cardNumber" clearable></el-input>
        </el-form-item>
         <el-form-item>
          <el-input placeholder="所在年级" v-model="listQuery.cardNumber" clearable></el-input>
        </el-form-item>
         <el-form-item>
            <el-select v-model="listQuery.cardStyleType" placeholder="侧弯类型">
                <el-option value="" label="全部"></el-option>
                <el-option value="EXAMINATION" label="C弯"></el-option>
                <el-option value="TREATMENT" label="S弯"></el-option>
                <el-option value="TREATMENT" label="胸弯"></el-option>
                <el-option value="TREATMENT" label="腰弯"></el-option>
                <el-option value="TREATMENT" label="正常"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="search-btn" @click="clearData">
            <svg-icon icon-class="reset-icon" class-name="search-icon"></svg-icon>重置
          </el-button>
          <el-button icon="el-icon-search" type="success" class="search-btn" @click="queryData()">查询</el-button>
          <!-- <el-button type="success" class="search-btn" @click="dialogVisible = true">
            <svg-icon icon-class="patient" class-name="search-icon"></svg-icon>创建任务
          </el-button> -->
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
        border>
        <el-table-column label="序号" width="120" align="center">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">{{scope.row.displayNumber }}</template>
        </el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">{{scope.row.cardStyleType|formatStyleType}}</template>
        </el-table-column>
        <el-table-column label="出生日期" align="center">
          <template slot-scope="scope">{{scope.row.status |formatState}}</template>
        </el-table-column>
         <el-table-column label="所在社区/学校" align="center">
          <template slot-scope="scope">{{scope.row.status |formatState}}</template>
        </el-table-column>
         <el-table-column label="测完类型" align="center">
          <template slot-scope="scope">{{scope.row.status |formatState}}</template>
        </el-table-column>
          <el-table-column label="筛查结果" align="center">
          <template slot-scope="scope">{{scope.row.status |formatState}}</template>
        </el-table-column>
        <el-table-column label="测试日期" align="center">
          <template slot-scope="scope">{{scope.row.status |formatState}}</template>
        </el-table-column>
        <el-table-column label="报告日期" align="center">
          <template slot-scope="scope">{{scope.row.status |formatState}}</template>
        </el-table-column>
        
        <el-table-column width="150" label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              icon="el-icon-edit-outline"
              @click="handleEdit(scope.row)"
            >查看</el-button>
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
    <el-dialog title="刷卡验证" :visible.sync="dialogVisible" width="30%">
      <div class="cardContent">
        <el-form ref="form" label-width="100px">
          <el-form-item label="选择医院">
            <el-select placeholder="请选择活动区域" class="input-width">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择卡类型">
            <el-select placeholder="请选择活动区域" class="input-width">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分配卡数量">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="库存量">
            <el-input></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="readCardData">刷 卡</el-button>
        <el-button type="success" @click="addPatient('cardForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { queryPatient, queryExamination } from "@/api/patient";
import { medicalRecordListData } from "@/api/medicalRecord";
import { getCardData } from "@/api/card-manage";
import { mapGetters } from "vuex";
import { Message, MessageBox } from "element-ui";
export default {
  name: "list",
  data() {
    return {
      createDate: [],
      examinationList: [],
      cardForm: {
        cardID: ""
      },

      patientMsg: "",
      list: [],
      taskList: [],
      dialogVisible2: false,
      listLoading: false,
      dialogVisible: false,
      total: 0,
      listQuery: {
        batchNumber: "",
        cardNumber: "",
        cardStyleType: "",
        examinationCode: "",
        status: "",
        pageNum: 1,
        pageSize: 10
      },
      rules: {
        cardID: [
          { required: true, message: "请输入身份证号码", trigger: "blur" },
          {
            pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            message: "身份证格式不正确",
            trigger: "blur"
          }
        ]
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
      return gender ? "男" : "女";
    },
    formatStyleType(val) {
      if (val && val != "") {
        switch (val) {
          case "EXAMINATION":
            return "检测卡";
          case "TREATMENT":
            return "治疗卡";
        }
      }
      return "";
    },

    formatState(val) {
      if (val && val != "") {
        switch (val) {
          case "TO_BE_ALLOCATED":
            return "待分配";
          case "PENDING_ACTIVATION":
            return "待激活";
          case "ENABLE":
            return "启用";
          case "DISABLE":
            return "禁用";
          case "INVALID":
            return "失效";
        }
      }

      return "";
    }
  },
  methods: {
    M1WriteBlockData() {
      M1WriteBlock().then(res => {
        console.log(res);
      });
    },
    clearData() {
      let listQuery = {
        cardNo: "",
        createTimeStart: "",
        createTimeEnd: "",
        examinationId: null,
        examinationStatus: null,
        pid: "",
        realName: "",
        pageNum: 1,
        pageSize: 10
      };
      this.createDate = [];
      this.listQuery = listQuery;
    },
    historyRecord(data) {
      this.$router.push({
        path: "/pat/assessRecord",
        query: {
          id: data.pid,
          name: data.realName
        }
      });
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
      medicalRecordListData(param)
        .then(res => {
          this.listLoading = false;
          if (res.code == 200) {
            this.taskList = res.dataList;
            this.dialogVisible2 = true;
          }
        })
        .catch(error => {
          this.listLoading = false;
        });
    },
    handleEdit(val) {
      this.$router.push({
        path: "/pat/patUpdate",
        query: {
          id: val.cardNo,
          name: val.realName
        }
      });
    },
    handleTimeChange(val) {
      this.listQuery.createTimeStart = this.createDate[0];
      this.listQuery.createTimeEnd = this.createDate[1];
    },
    readCardData() {
      readCard().then(res => {
        //  if(res.cardno){
        //   let cardMsg={}
        //   cardMsg.realName=res.name;
        //   cardMsg.gender=res.sex=="男"?false:true;
        //   cardMsg.nation=res.nation;
        //   cardMsg.cardNo=res.cardno;
        //   sessionStorage.setItem("cardMsg",JSON.stringify(cardMsg))
        //   this.cardForm.cardID=res.cardno
        // }
        if (res.code == 200) {
          this.cardForm.cardID = res.data.cardno;
          let cardMsg = {};
          cardMsg.realName = res.data.name;
          cardMsg.gender = res.data.sex == "男" ? true : false;
          cardMsg.nation = res.data.nation;
          cardMsg.cardNo = res.data.cardno;
          sessionStorage.setItem("cardMsg", JSON.stringify(cardMsg));
        } else {
          this.$message.warning("刷卡失败");
        }
      });
    },
    addPatient(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogVisible = false;
          let cardMsg = JSON.parse(sessionStorage.getItem("cardMsg"));
          let name = "";
          if (cardMsg && cardMsg != "") {
            name = cardMsg.realName;
          }
          this.$router.push({
            path: "/pat/patAdd",
            query: {
              id: this.cardForm.cardID,
              name: name
            }
          });
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
      getCardData(this.listQuery)
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
</style>

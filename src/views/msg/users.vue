<template>
  <div class="app-container">
    <el-form :inline="true" :model="listQuery" size="small">
      <div>
        <el-form-item>
          <el-input placeholder="用户名" v-model.number="listQuery.realName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="注册手机" v-model="listQuery.phoneNumber" clearable></el-input>
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
          <el-button class="search-btn" @click="clearData">
            <svg-icon icon-class="reset-icon" class-name="search-icon"></svg-icon>重置
          </el-button>
          <el-button icon="el-icon-search" type="success" class="search-btn" @click="queryData()">查询</el-button>
         
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
        <el-table-column label="序号" width="60" align="center">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="用户名" align="center">
          <template slot-scope="scope">{{scope.row.username }}</template>
        </el-table-column>
        <el-table-column label="注册手机号" align="center">
          <template slot-scope="scope">{{scope.row.mobileNumber}}</template>
        </el-table-column>
        <el-table-column label="包含子女" align="center">
          <template slot-scope="scope">{{scope.row.childNum }}</template>
        </el-table-column>
         <el-table-column label="会员个数" align="center">
          <template slot-scope="scope">{{scope.row.memberNum}}</template>
        </el-table-column>
         <el-table-column label="注册日期" align="center">
          <template slot-scope="scope">{{scope.row.createTime}}</template>
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
   
  </div>
</template>

<script>
import { fetchList, insertUser, updateUser} from "@/api/user";
import { mapGetters } from "vuex";
import { Message, MessageBox } from "element-ui";
export default {
  name: "list",
  data() {
    return {
      createDate: [],
      list: [],
      taskList: [],
      dialogVisible2: false,
      listLoading: false,
      dialogVisible: false,
      total: 0,
      listQuery: {
        realName: "",
        createTimeStart: "",
        createTimeEnd: "",
        phoneNumber:"",
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
    clearData() {
      let listQuery = {
        realName: "",
        phoneNumber:"",
        createTimeStart: "",
        createTimeEnd: "",
        memberNum: 0,
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
</style>

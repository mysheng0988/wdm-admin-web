<template>
  <div class="app-container">
    <el-form :inline="true" :model="listQuery" size="small">
      <div>
        <el-form-item>
          <el-input placeholder="订单号" v-model.number="listQuery.orderId" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="姓名" v-model="listQuery.studentName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="createDate"
            type="datetimerange"
            range-separator="至"
            start-placeholder="起始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="handleTimeChange"
          ></el-date-picker>
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
        <el-table-column label="订单号" align="center">
          <template slot-scope="scope">{{scope.row.orderId}}</template>
        </el-table-column>
        <el-table-column label="订单类型" align="center">
          <template slot-scope="scope">{{scope.row.orderType |formatStyleType}}</template>
        </el-table-column>
        <el-table-column label="用户名" align="center">
          <template slot-scope="scope">{{scope.row.orderUser}}</template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">{{scope.row.stuName }}</template>
        </el-table-column>
         <el-table-column label="性别" align="center">
          <template slot-scope="scope">{{scope.row.stuSex|formatGender }}</template>
        </el-table-column>
         <el-table-column label="证件号" align="center">
          <template slot-scope="scope">{{scope.row.idCard}}</template>
        </el-table-column>
          <el-table-column label="负责人" align="center">
          <template slot-scope="scope">{{scope.row.orderManager}}</template>
        </el-table-column>
         <el-table-column label="备注" align="center">
          <template slot-scope="scope">{{scope.row.remark }}</template>
        </el-table-column>
        <el-table-column label="下单时间" align="center">
          <template slot-scope="scope">{{scope.row.orderDate }}</template>
        </el-table-column>
        <el-table-column width="150" label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              icon="el-icon-edit-outline"
              @click="handleEdit(scope.row)"
            >查看</el-button>
            <!-- <el-button
              size="mini"
              icon="el-icon-time"
              type="primary"
              plain
              @click="historyRecord(scope.row)"
            >历史记录</el-button> -->
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
        <el-button @click="dialogVisible=false">关闭</el-button>
        <el-button type="success" @click="addPatient('cardForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList } from "@/api/order";
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
        startDate: "",
        orderId: "",
        endDate: "",
        studentName:"",
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
      return gender==1 ? "男" : "女";
    },
    formatStyleType(val) {
     
        switch (val) {
          case 1:
            return "会员产品";
        }
      return "";
    },

    formatState(val) {
        switch (val) {
          case 1:
            return "有效";
          case 2:
            return "已过期";
        }

      return "";
    }
  },
  methods: {
    clearData() {
      let listQuery = {
        startDate: "",
        orderId: "",
        endDate: "",
        studentName:"",
        pageNum: 1,
        pageSize: 10
      };
      this.createDate = [];
      this.listQuery = listQuery;
    },
     handleEdit(val) {
      this.$router.push({
        path: "/plan/ordetail",
        query: {
          id: val.id,
          name: val.stuName
        }
      });
    },
    handleTimeChange(val) {
      this.listQuery.startDate = this.createDate[0];
      this.listQuery.endDate = this.createDate[1];
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

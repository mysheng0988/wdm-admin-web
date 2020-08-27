<template>
  <div class="app-container">
    <el-form :inline="true" :model="listQuery" size="small">
      <div>
        <el-form-item>
          <el-input placeholder="任务名称" v-model.number="listQuery.psName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="初筛人员" v-model="listQuery.scrper" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="所在机构" v-model="listQuery.orgName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="listQuery.auditStatus" placeholder="审核状态">
            <el-option value label="全部"></el-option>
            <el-option :value="0" label="待审核"></el-option>
            <el-option :value="2" label="审核通过"></el-option>
            <el-option :value="2" label="审核不通过"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="search-btn" @click="clearData">
            <svg-icon icon-class="reset-icon" class-name="search-icon"></svg-icon>重置
          </el-button>
          <el-button icon="el-icon-search" type="success" class="search-btn" @click="queryData()">查询</el-button>
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
        <el-table-column label="任务名称" align="center">
          <template slot-scope="scope">{{scope.row.psName }}</template>
        </el-table-column>
        <el-table-column label="机构类型" align="center">
          <template slot-scope="scope">{{scope.row.organType|formatOrgType}}</template>
        </el-table-column>
        <el-table-column label="所在机构" align="center">
          <template slot-scope="scope">{{scope.row.organName }}</template>
        </el-table-column>
         <el-table-column label="初筛人员" align="center">
          <template slot-scope="scope">{{scope.row.screenPersonal}}</template>
        </el-table-column>
        <el-table-column label="审核人" align="center">
          <template slot-scope="scope">{{scope.row.auditUser}}</template>
        </el-table-column>
        <el-table-column label="审核状态" align="center">
          <template slot-scope="scope">{{scope.row.auditStatus |formatAuditStatus}}</template>
        </el-table-column>
        <el-table-column label="审核完成时间" align="center">
          <template slot-scope="scope">{{scope.row.auditTime }}</template>
        </el-table-column>
        <el-table-column width="150" label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              icon="el-icon-edit-outline"
              @click="handleEdit(scope.row)"
              v-if="scope.row.auditStatus=='0'"
            >审核</el-button>
            <el-button
              size="mini"
              icon="el-icon-time"
              type="primary"
              plain
              v-else
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
    <el-dialog title="数据审核" :visible.sync="dialogVisible" width="60%">
      <div class="content-box">
       <task-detail :task-id="taskId" :key="taskId"></task-detail>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" v-if="taskState==1" @click="dialogVisible=false">关闭</el-button>
        <el-button type="warning" v-if="taskState!=1" @click="updateExamineData('2')">审核不通过</el-button>
        <el-button type="success" v-if="taskState!=1"  @click="updateExamineData('1')">审核通过</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, updateExamine } from "@/api/examine";
import { mapGetters } from "vuex";
import { Message, MessageBox } from "element-ui";
 import taskDetail from './components/taskDetail'
export default {
  name: "list",
   components: { taskDetail },
  data() {
    return {
      createDate: [],
      examinationList: [],
      cardForm: {
        cardID: ""
      },
      taskId: "",
      list: [],
      taskState:"",
      taskList: [],
      dialogVisible2: false,
      listLoading: false,
      dialogVisible: false,
      total: 0,
      listQuery: {
        auditStatus: "",
        orgName: "",
        psName: "",
        scrper: "",
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
    formatOrgType(val) {
      if (val && val != "") {
        switch (val) {
          case 1:
            return "社区";
          case 2:
            return "学校";
          case 3:
            return "豌豆苗学院";
        }
      }
      return "";
    },

    formatAuditStatus(val) {
      if (val !== "") {
        switch (val) {
          case 0:
            return "待审核";
          case 1:
            return "审核通过";
          case 2:
            return "审核不通过";
        }
      }

      return "";
    }
  },
  methods: {
    clearData() {
      let listQuery = {
        auditStatus: "",
        orgName: "",
        psName: "",
        scrper: "",
        pageNum: 1,
        pageSize: 10
      };
      this.createDate = [];
      this.listQuery = listQuery;
    },
    handleEdit(data) {
      
     this.$router.push({
          path: '/screen/examineData',
          query: {
            id: data.id,
            name:data.psName,
            taskState:data.auditStatus,
          }
      })
    },
    updateExamineData(state) {
      updateExamine({ id: this.taskId, auditStatus: state }).then(res => {
        if (res.code == 200) {
          this.dialogVisible = false;
          let message = state == 1 ? "审核通过" : "审核不通过";
          this.$message.success(message);
          this.getList();
        }
      });
    },
    handleTimeChange(val) {
      this.listQuery.createTimeStart = this.createDate[0];
      this.listQuery.createTimeEnd = this.createDate[1];
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
  text-align: center;
  margin-bottom: 100px;
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
</style>

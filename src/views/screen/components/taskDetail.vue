<template>
  <div>
    <div class="table-container">
      <el-table
        ref="productCateTable"
        style="width: 100%"
        :data="list"
        stripe
        border
      >
        <el-table-column label="序号" width="60" align="center">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">{{scope.row.studentName }}</template>
        </el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">{{scope.row.studentSex|formatSex}}</template>
        </el-table-column>
        <el-table-column label="出生日期" align="center">
          <template slot-scope="scope">{{scope.row.studentBirthDate}}</template>
        </el-table-column>
        <el-table-column label="胸椎方向" align="center">
          <template slot-scope="scope">{{scope.row.tangleEnd |tangleFormat}}</template>
        </el-table-column>
        <el-table-column label="胸椎角度值" align="center">
          <template slot-scope="scope">{{scope.row.tangleEnd }}</template>
        </el-table-column>
        <el-table-column label="腰椎方向" align="center">
          <template slot-scope="scope">{{scope.row.ldirectionEnd }}</template>
        </el-table-column>
        <el-table-column label="腰椎角度值" align="center">
          <template slot-scope="scope">{{scope.row.langleEnd |tangleFormat}}</template>
        </el-table-column>
        <el-table-column label="筛查结果" align="center">
          <template slot-scope="scope">{{scope.row.result|formatResult }}</template>
        </el-table-column>
        <!-- <el-table-column width="150" label="操作" align="center">
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
        </el-table-column> -->
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
import { fetchList } from "@/api/taskDetail";
export default {
  name: "taskDetail",
  props: {
    taskId: {
      type: Number
    }
  },
  data() {
    return {
      list:[],
       total:0,
       listQuery: {
        preScreenTaskId:this.taskId,
        pageNum: 1,
        pageSize: 10
      },
    };
  },
  filters: {
    formatSex(gender) {
      return gender==1 ? "男" : "女";
    },
    tangleFormat(val){
      return val==1?"L":"R"
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
  watch:{
    taskId(newValue,oldValue){
      this.getList();
    }
  },  
  created() {
    this.getList();
  },
  methods: {
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
      fetchList(this.listQuery)
        .then(res => {
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

<style scoped>
.input-width {
  width: 100%;
}
.btn-box {
  text-align: right;
}
</style>

<template>
  <div class="app-container">
    <el-form :inline="true" :model="listQuery" size="small">
      <div>
        <el-form-item>
          <el-input placeholder="任务名称" v-model.number="listQuery.psName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="所在机构" v-model="listQuery.orgName" clearable></el-input>
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
          <el-button type="success" class="search-btn" @click="addTask">
            <svg-icon icon-class="patient" class-name="search-icon"></svg-icon>创建任务
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
        <el-table-column label="序号" width="60" align="center">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="任务名称" align="center">
          <template slot-scope="scope">{{scope.row.psName }}</template>
        </el-table-column>
        <el-table-column label="筛查人员" align="center">
          <template slot-scope="scope">{{scope.row.screenPersonal}}</template>
        </el-table-column>
         <el-table-column label="所选机构" align="center">
          <template slot-scope="scope">{{scope.row.organName}}</template>
        </el-table-column>
        <el-table-column label="所选年级" align="center">
          <template slot-scope="scope">{{scope.row.gradeName}}</template>
        </el-table-column>
        <el-table-column label="所选班级" align="center">
          <template slot-scope="scope">{{scope.row.className.join(",")}}</template>
        </el-table-column>
        <el-table-column label="所选性别" align="center">
          <template slot-scope="scope">{{scope.row.psSex |formatSex}}</template>
        </el-table-column>
        <el-table-column label="任务开始时间" align="center">
          <template slot-scope="scope">{{scope.row.startTime }}</template>
        </el-table-column>
        <el-table-column label="任务结束时间" align="center">
          <template slot-scope="scope">{{scope.row.endTime }}</template>
        </el-table-column>
        <el-table-column label="任务状态" align="center">
          <template slot-scope="scope">{{scope.row.state |formatState}}</template>
        </el-table-column>
        <el-table-column width="150" label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              icon="el-icon-edit-outline"
              @click="handleEdit(scope.row)"
            >编辑</el-button>
            <!-- <el-button
              size="mini"
              icon="el-icon-time"
              type="primary"
              plain
              @click="historyRecord(scope.row)"
            >历史记录</el-button>-->
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
    <el-dialog title="新增初筛任务" :visible.sync="dialogVisible" width="60%">
      <div class="content-box">
        <el-form ref="taskForm" label-width="130px" :rules="rules" :model="taskObj">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="任务名称:" prop="psName">
                <el-input
                  v-model="taskObj.psName"
                  placeholder="请输入任务名称"
                  maxlength="20"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="筛查人员:" prop="screenPersonal">
                <el-select
                  style="width: 100%"
                  v-model="taskObj.screenPersonal"
                >
                  <el-option
                    v-for="item in screenPersonalList"
                    :key="item.uid"
                    :label="item.realName"
                    :value="item.realName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="任务开始时间:" prop="startTime">
                <el-date-picker
                  v-model="taskObj.startTime"
                  type="datetime"
                  class="input-width"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="任务结束时间" prop="endTime">
                <el-date-picker
                  v-model="taskObj.endTime"
                  type="datetime"
                  class="input-width"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="机构类型">
                <el-select
                  v-model="organType"
                  placeholder="类型"
                  class="input-width"
                  @change="handleTypeChange"
                >
                  <el-option :value="1" label="学校"></el-option>
                  <el-option :value="2" label="社区"></el-option>
                  <el-option :value="3" label="豌豆苗学院"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所在机构:" prop="organId">
                <el-select
                  v-model="taskObj.organId"
                  placeholder="所在机构"
                  class="input-width"
                  @change="changeOrgan"
                >
                  <el-option
                    v-for="item in organList"
                    :key="item.id"
                    :label="item.orgName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="organType==1">
              <el-form-item label="选择年级:" prop="grades">
                <el-select
                  placeholder="请选择"
                  v-model="taskObj.grades"
                  clearable
                  @change="changegrades"
                  class="input-width"
                >
                  <el-option
                    v-for="(item,index) in gradesOption"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="organType==1">
              <el-form-item label="选择班级:" prop="classes">
                <el-select
                  placeholder="请选择"
                  multiple
                  v-model="taskObj.classes"
                  clearable
                  class="input-width"
                >
                  <el-option
                    v-for="(item,index) in classesOption"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="选择性别:" prop="psSex">
                <el-select v-model="taskObj.psSex" placeholder="性别" class="input-width">
                  <el-option :value="1" label="男"></el-option>
                  <el-option :value="2" label="女"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="success" @click="saveTask('taskForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
let taskDefault = {
  classes: [],
  endTime: "",
  grades: [],
  organId: "",
  psName: "",
  psSex: "",
  screenPersonal: [],
  startTime: "",
  state: 1
};
import {
  fetchList,
  getPersonalList,
  insertTask,
  updateTask
} from "@/api/firstTask";
import { getOrganList, getOrganLeveList } from "@/api/organ";
import { mapGetters } from "vuex";
import { Message, MessageBox } from "element-ui";
export default {
  name: "list",
  data() {
    return {
      createDate: [],
      loadingOption: false,
      taskObj: Object.assign({}, taskDefault),
      list: [],
      organType: 1,
      organList: [],
      gradesOption: [],
      classesOption: [],
      screenPersonalList: [],
      dialogVisible2: false,
      listLoading: false,
      dialogVisible: false,
      total: 0,
      listQuery: {
        startTime: "",
        endTime: "",
        orgName: "",
        psName: "",
        pageNum: 1,
        pageSize: 10
      },
      rules: {
        psName: [
          { required: true, message: "请输入任务名称", trigger: "blur" },
        ],
        screenPersonal: [
          { required: true, message: "请选择筛查人员", trigger: "change" },
        ],
        startTime: [
          { required: true, message: "请选择任务开始时间", trigger: "change" },
        ],
        endTime: [
          { required: true, message: "请选择任务结束时间", trigger: "change" },
        ],
        organId: [
          { required: true, message: "请选择所在机构", trigger: "change" },
        ],
        grades: [
          { required: true, message: "请选择所在年级", trigger: "change" },
        ],
         classes: [
          { required: true, message: "请选择所班级", trigger: "change" },
        ],
         psSex: [
          { required: true, message: "请选择性别", trigger: "change" },
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
    this.getOrganListData(this.organType);
     this.remoteScreenPersonalList()
  },
  filters: {
    formatSex(gender) {
      return gender == 1 ? "男" : "女";
    },
    formatState(val) {
      if (val && val != "") {
        switch (val) {
          case 1:
            return "新建";
          case 2:
            return "进行中";
          case 3:
            return "待审核";
          case 4:
            return "已驳回";
        }
      }

      return "";
    }
  },
  methods: {
    addTask() {
      this.taskObj = Object.assign({}, taskDefault);
      this.organList = [];
      this.classesOption = [];
      this.gradesOption = [];
      this.dialogVisible = true;
       this.getOrganListData(1);
       this.$nextTick(function() {
        this.$refs.taskForm.clearValidate();
      });
    },
    handleEdit(val) {
      this.taskObj = val;
      this.taskObj.organId = val.organId;
      this.organType = val.organType;
      this.getOrganListData(this.organType);
      this.getOrganLeveListData(this.taskObj.organId, 0);
      this.getOrganLeveListData(this.taskObj.organId, this.taskObj.grades);
      this.dialogVisible = true;
      // console.log( this.taskObj)
    },
    handleTypeChange(val) {
      this.taskObj.organId = "",
      this.taskObj.grades = "",
      this.taskObj.classes = "";
      this.organList = [];
      this.classesOption = [];
      this.gradesOption = [];
      this.getOrganListData(val);
    },
    changeOrgan(value) {
      (this.taskObj.grades = ""), (this.taskObj.classes = []);
      this.gradesOption = [];
      this.classesOption = [];
      this.getOrganLeveListData(value, 0);
    },
    getOrganLeveListData(orgId, pid) {
      getOrganLeveList({ orgId: orgId, pid: pid }).then(res => {
        if (res.code == 200) {
          if (pid == 0) {
            this.gradesOption = res.dataList;
          } else {
            this.classesOption = res.dataList;
          }
        }
      });
    },
    changegrades(value) {
      this.taskObj.classes = [];
      this.classesOption = [];
      this.getOrganLeveListData(this.taskObj.organId, value);
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
        startTime: "",
        endTime: "",
        orgName: "",
        psName: "",
        pageNum: 1,
        pageSize: 10
      };
      this.createDate = [];
      this.listQuery = listQuery;
    },
    remoteScreenPersonalList() {
      // clearTimeout(this.timeout);
      // this.timeout = setTimeout(() => {
      //   this.loadingOption = true;
        //if (queryString != "") {
          getPersonalList("pss_st").then(res => {
            // this.loadingOption = false;
            this.screenPersonalList = res.dataList;
          });
        // } else {
        //   this.screenPersonalList = [];
        // }
     // }, 500);
    },
    saveTask(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.taskObj.id) {
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
      insertTask(this.taskObj).then(res => {
        if (res.code == 200) {
          this.$message.success("创建成功");
          this.dialogVisible = false;
          this.$refs[formName].resetFields();
          this.taskObj = Object.assign({}, taskDefault);
          this.getList();
        }
      });
    },
    updateTaskData(formName) {
      updateTask(this.taskObj).then(res => {
        if (res.code == 200) {
          this.$message.success("修改成功");
          this.dialogVisible = false;
          this.$refs[formName].resetFields();
          this.taskObj = Object.assign({}, taskDefault);
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

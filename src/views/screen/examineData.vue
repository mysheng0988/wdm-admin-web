<template>
  <div class="app-container">
    <div class="table-container">
      <el-table ref="productCateTable" style="width: 100%" :data="list" stripe border>
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
          <template slot-scope="scope">{{scope.row.ldirectionEnd |tangleFormat}}</template>
        </el-table-column>
        <el-table-column label="腰椎角度值" align="center">
          <template slot-scope="scope">{{scope.row.langleEnd }}</template>
        </el-table-column>
        <el-table-column label="侧弯类型" align="center">
          <template slot-scope="scope">{{scope.row.scoliosis|formatScoliosis }}</template>
        </el-table-column>
        <el-table-column label="筛查结果" align="center">
          <template slot-scope="scope">{{scope.row.result|formatResult }}</template>
        </el-table-column>
        <el-table-column width="150" label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              icon="el-icon-edit-outline"
              @click="handleEdit(scope.row)"
            >{{taskState=='0'?"编辑":"查看"}}</el-button>
          </template>
        </el-table-column>
      </el-table>
        <div class="btn-box">
             <el-button type="warning" v-if="taskState==0" @click="updateExamineData('2')">审核不通过</el-button>
             <el-button type="success" v-if="taskState==0"  @click="updateExamineData('1')">审核通过</el-button>
        </div>
      
    </div>
    <!-- <div class="pagination-container">
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
    </div> -->
    <el-dialog title="数据审核" :visible.sync="dialogVisible" width="50%">
      <div class="content-box">
        <el-form
          :model="examineObj"
          status-icon
          ref="ruleForm2"
          label-width="100px"
          :inline="true">
          <el-form-item label="学生姓名:">
            <p>{{examineObj.studentName}}</p>
          </el-form-item>
          <el-form-item label="侧弯类型" >
             <el-select v-model="examineObj.scoliosis" placeholder="侧弯类型">
                <el-option :value="0" label="正常"></el-option>
                <el-option :value="1" label="C弯"></el-option>
                <el-option :value="2" label="S弯"></el-option>
                <el-option :value="3" label="胸弯"></el-option>
                <el-option :value="4" label="腰弯"></el-option>
             </el-select>
          </el-form-item>
          <el-form-item label="筛查结果" >
            <el-select v-model="examineObj.result" placeholder="筛查结果">
                <el-option :value="1" label="正常"></el-option>
                <el-option :value="2" label="低风险"></el-option>
                <el-option :value="3" label="高风险"></el-option>
             </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-box">
      <el-table ref="appletTable" style="width: 100%" :data="tableList" stripe border>
        <el-table-column label="序号" width="60" align="center">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="类型" align="center">
          <template slot-scope="scope">{{scope.row.type |formatType}}</template>
        </el-table-column>
        <el-table-column label="角度" align="center">
          <template slot-scope="scope">{{scope.row.angle}}度</template>
        </el-table-column>
        <el-table-column label="胸椎方向" align="center">
          <template slot-scope="scope">{{scope.row.tangleEnd |tangleFormat}}</template>
        </el-table-column>
        
      </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" v-if="taskState=='0'" @click="saveData()">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { fetchList ,updateModifyStudent,batchAddAppletData} from "@/api/taskDetail";
import {  updateExamine } from "@/api/examine";
export default {
  name: "examineData",
  data() {
    return {
      list: [],
      tableList:[],
      total: 0,
      taskState: "",
      dialogVisible:false,
      examineObj:{
          id:"",
          studentName:"",
          result:"",
          scoliosis:""
      },
      listQuery: {
        preScreenTaskId: 0,
        pageNum: 1,
        pageSize: 1000
      }
    };
  },
  filters: {
    formatSex(gender) {
      return gender == 1 ? "男" : "女";
    },
    formatType(type) {
      return type == 1 ? "胸椎" : "腰椎";
    },
    tangleFormat(val) {
      return val == 1 ? "L" : "R";
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
  },
  mounted() {
    this.listQuery.preScreenTaskId = this.$route.query.id;
    this.taskState = this.$route.query.taskState;
    this.getList();
  },
  methods: {
    updateExamineData(state) {
      updateExamine({ id: this.listQuery.preScreenTaskId, auditStatus: state }).then(res => {
        if (res.code == 200) {
          this.dialogVisible = false;
          let message = state == 1 ? "审核通过" : "审核不通过";
          this.$message.success(message);
          this.$store.commit("delete_tabs", this.$route.path);
          this.$router.push("/screen/examine");
        }
      });
    },
    saveData(){
        updateModifyStudent(this.examineObj).then(res=>{
            if(res.code==200){
                this.dialogVisible=false;
                this.examineObj= {
                        id:"",
                        studentName:"",
                        result:"",
                        scoliosis:""
                }
                this.getList()
            }
        })
    },
    handleEdit(data){
       
        this.examineObj.id=data.id;
        this.examineObj.studentName=data.studentName;
        this.examineObj.result=data.result
        this.examineObj.scoliosis=data.scoliosis
        let param={
            studentId:data.studentId,
            taskId:data.preScreenTaskId
        }
         this.tableList=[];
        batchAddAppletData(param).then(res=>{
            if(res.code==200){
                for(let i=0;i<100;i++){
                    this.tableList.push(res.dataList[0])
                }
                //this.tableList=res.dataList;
                this.dialogVisible=true;
            }else{
                this.$message.warning(res.message)
            }
        })
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
<style lang="scss" scoped>
    .table-box{
        height: 500px;
        overflow: auto;
        border:1px solid #eee;
    }
    .btn-box{
        margin:30px 0;
        text-align: center;
    }
</style>
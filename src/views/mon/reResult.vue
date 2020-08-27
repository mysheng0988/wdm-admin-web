<template>
  <div class="app-container">
    <el-form :inline="true" :model="listQuery" size="small">
      <div>
        <el-form-item>
          <el-input placeholder="姓名" v-model="listQuery.studentName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="所在学校/社区" v-model="listQuery.organName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="所在年级/一级机构" v-model="listQuery.firstOrg" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="所在班级/二级机构" v-model="listQuery.secondOrg" clearable></el-input>
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
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">{{scope.row.studentName }}</template>
        </el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">{{scope.row.sex|formatGender}}</template>
        </el-table-column>
        <el-table-column label="出生日期" align="center">
          <template slot-scope="scope">{{scope.row.birthDate }}</template>
        </el-table-column>
        <el-table-column label="所在学校/社区" align="center">
          <template slot-scope="scope">{{scope.row.organName }}</template>
        </el-table-column>
        <el-table-column label="所在班级/一级机构" align="center">
          <template slot-scope="scope">{{scope.row.firstOrg}}</template>
        </el-table-column>
        <el-table-column label="所在班级/二级机构" align="center">
          <template slot-scope="scope">{{scope.row.secondOrg}}</template>
        </el-table-column>
        <el-table-column label="监测中心" align="center">
          <template slot-scope="scope">{{scope.row.monitorName }}</template>
        </el-table-column>
        <el-table-column label="报告日期" align="center">
          <template slot-scope="scope">{{scope.row.auditTime }}</template>
        </el-table-column>
        <el-table-column width="250" label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              icon="el-icon-edit-outline"
              @click="handleEdit(scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              icon="el-icon-time"
              type="primary"
              plain
              @click="readReport(scope.row)"
            >查看报告</el-button>
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
    <el-dialog title="报告数据录入" :visible.sync="dialogVisible" width="60%">
      <div class="cardContent">
         <el-form ref="resultForm" label-width="120px" :rules="rules" :model="resultObj">
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="身高:" prop="equipName">
                <el-input v-model="resultObj.height" placeholder="请输入内容">
                <template slot="append">cm</template>
              </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="坐高:" prop="equipName">
                <el-input v-model="resultObj.sitHigh" placeholder="请输入内容">
                <template slot="append">cm</template>
              </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="体重:" prop="weight">
                <el-input v-model="resultObj.weight" placeholder="请输入内容">
                <template slot="append">kg</template>
              </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="腰臀比:" prop="whRatio">
                <el-input v-model="resultObj.whRatio" placeholder="请输入内容">
              </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="体温:" prop="temperature">
                <el-input v-model="resultObj.temperature" placeholder="请输入内容">
                   <template slot="append"> ℃</template>
              </el-input>
              </el-form-item>
            </el-col>
             <!-- <el-col :span="8">
              <el-form-item label="肺功能:" prop="lungFunction">
                <el-input v-model="resultObj.lungFunction" placeholder="请输入内容">
              </el-input>
              </el-form-item>
            </el-col> -->
            <el-col :span="8">
              <el-form-item label="视力左:" prop="visionLeft">
                <el-input v-model="resultObj.visionLeft" placeholder="请输入内容">
              </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="视力右:" prop="visionRight">
                <el-input v-model="resultObj.visionRight" placeholder="请输入内容">
              </el-input>
              </el-form-item>
            </el-col>
             <el-col :span="8">
              <el-form-item label="剃刀背:" prop="razorback">
                 <el-input v-model="resultObj.razorback" placeholder="请输入内容">
              </el-input>
            </el-form-item>
            </el-col>
             <el-col :span="8">
              <el-form-item label="脉率:" prop="pulseState">
                <el-input v-model="resultObj.pulseState" placeholder="请输入内容">
                   <template slot="append"> 次/分钟</template>
              </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="驼背:" prop="humpback">
                 <el-select placeholder="请选择" v-model="resultObj.humpback" clearable class="input-width">
                  <el-option :value="0" label="是"></el-option>
                  <el-option :value="1" label="否"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="血氧饱和度:" prop="equipType">
                <el-input v-model="resultObj.boSaturation" placeholder="请输入内容">
                   <template slot="append"> %</template>
              </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="高低肩:" prop="hlShoulders">
                <el-select placeholder="请选择" v-model="resultObj.hlShoulders" clearable class="input-width">
                  <el-option :value="1" label="正常"></el-option>
                  <el-option :value="2" label="左肩高"></el-option>
                  <el-option :value="3" label="又肩高"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
             <el-col :span="8">
              <el-form-item label="肌肉量:" prop="muscleMass">
                <el-input v-model="resultObj.muscleMass" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="8">
              <el-form-item label="腰线是否对称:" prop="waistlineSymmetric">
                <el-select placeholder="请选择" v-model="resultObj.waistlineSymmetric" clearable class="input-width">
                  <el-option value="0" label="是"></el-option>
                  <el-option value="1" label="否"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="肌肉率:" prop="muscleL">
                <el-input v-model="resultObj.muscleL" placeholder="请输入内容">
                   <template slot="append"> %</template>
              </el-input>
              </el-form-item>
            </el-col>
             <el-col :span="8">
              <el-form-item label="腰关节是否等高:" prop="equipType">
                <el-select placeholder="请选择" v-model="resultObj.hipContour" clearable class="input-width">
                  <el-option value="0" label="是"></el-option>
                  <el-option value="1" label="否"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="体质指数BMI:" prop="bmi">
                <el-input
                  v-model="resultObj.bmi"
                  placeholder="请输入体质指数BMI"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="双下肢是否等长:" prop="legDiscrepancy">
                <el-select placeholder="请选择" v-model="resultObj.legDiscrepancy" clearable class="input-width">
                  <el-option value="0" label="是"></el-option>
                  <el-option value="1" label="否"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="基础代谢率:" prop="metabolicRate">
                <el-input v-model="resultObj.metabolicRate" placeholder="请输入内容">
                   <template slot="append"> Kcal/日</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="膝关节检查结果:" prop="kneeResult">
                <el-select placeholder="请选择" v-model="resultObj.kneeResult" clearable class="input-width">
                  <el-option value="1" label="正常"></el-option>
                  <el-option value="2" label="X型腿"></el-option>
                  <el-option value="3" label="O型腿"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
             <el-col :span="8">
              <el-form-item label="体型:" prop="shape">
                <el-select placeholder="请选择" v-model="resultObj.shape" clearable class="input-width">
                  <el-option :value="1" label="正常"></el-option>
                  <el-option :value="2" label="偏廋"></el-option>
                  <el-option :value="3" label="超重"></el-option>
                  <el-option :value="4" label="肥胖"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="足底压力分析:" prop="plantarPressure">
                <el-select placeholder="请选择" v-model="resultObj.plantarPressure" clearable class="input-width">
                  <el-option value="1" label="低弓足"></el-option>
                  <el-option value="2" label="中弓足"></el-option>
                  <el-option value="3" label="高弓足"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="success" @click="resultSave('resultForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList,saveTaskResult,getTaskResult} from "@/api/reviewTaskResult";
import { mapGetters } from "vuex";
import { Message, MessageBox } from "element-ui";
let resultDefault={
  id: "",
  bmi: "",
  boSaturation: "",
  height: "",
  hipContour: "",
  hlShoulders: "",
  humpback: "",
  kneeResult: "",
  legDiscrepancy: "",
  metabolicRate: "",
  muscleL: "",
  muscleMass: "",
  plantarPressure: "",
  pulseState: "",
  razorback: "",
  shape: 0,
  sitHigh: "",
  state: 0,
  temperature: "",
  visionLeft: "",
  visionRight: "",
  waistlineSymmetric: "",
  weight: "",
  whRatio: ""
}
export default {
  name: "list",
  data() {
    return {
      createDate: [],
      resultObj:Object.assign({},resultDefault),
      list: [],
      taskList: [],
      dialogVisible2: false,
      listLoading: false,
      dialogVisible: false,
      total: 0,
      listQuery: {
        studentName: "",
        secondOrg: "",
        organName: "",
        firstOrg: "",
        reviewType: "1",
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
      return gender == 1 ? "男" : "女";
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
        studentName: "",
        secondOrg: "",
        organName: "",
        firstOrg: "",
        reviewType: "1",
        pageNum: 1,
        pageSize: 10
      };
      this.createDate = [];
      this.listQuery = listQuery;
    },
     readReport(data){
        this.$router.push({
            path: '/mon/pdf',
            query: {
              id: data.id,
              name:data.studentName,
            }
        })
     },
    resultSave(formName){
        this.$refs[formName].validate(valid => {
          if (valid) {
            
            saveTaskResult(this.resultObj).then(res=>{
              if(res.code==200){
                this.dialogVisible=false;
                this.resultObj=Object.assign({},resultDefault)
              }
            })
          }else{
            this.$message.warning("验证失败")
          }
        })
    },
    handleEdit(val) {
      // this.dialogVisible=true;
      // this.resultObj.id=val.id;
      this.getTaskResultData(val.id)
    },
    getTaskResultData(id){
      getTaskResult(id).then(res=>{
        if(res.code==200){
          this.resultObj=res.dataList[0];
          this.dialogVisible=true;
        }else{
          this.$message.warning("数据获取失败")
        }
      })
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

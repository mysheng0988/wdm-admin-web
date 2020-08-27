<template>
  <div class="app-container">
    <el-form :inline="true" :model="listQuery" size="small">
      <div>
        <el-form-item>
          <el-select v-model="listQuery.organType" placeholder="机构类型">
            <el-option value label="全部"></el-option>
            <el-option value="1" label="学校"></el-option>
            <el-option value="2" label="社区"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="机构名称" v-model="listQuery.organName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="姓名" v-model="listQuery.stuName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="手机号" v-model="listQuery.stuTel" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="身份证号" v-model="listQuery.idCard" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="search-btn" @click="clearData">
            <svg-icon icon-class="reset-icon" class-name="search-icon"></svg-icon>重置
          </el-button>
          <el-button icon="el-icon-search" type="success" class="search-btn" @click="queryData()">查询</el-button>
          <el-button type="success" class="search-btn" @click="importFile">
            <svg-icon icon-class="patient" class-name="search-icon"></svg-icon>导入
          </el-button>
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
          <template slot-scope="scope">{{scope.row.stuName }}</template>
        </el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">{{scope.row.sex|formatSex}}</template>
        </el-table-column>
        <el-table-column label="身份证" align="center">
          <template slot-scope="scope">{{scope.row.idCard }}</template>
        </el-table-column>
        <el-table-column label="出生日期" align="center">
          <template slot-scope="scope">{{scope.row.birthDate}}</template>
        </el-table-column>
        <el-table-column label="所在机构" align="center">
          <template slot-scope="scope">{{scope.row.organName}}</template>
        </el-table-column>
        <el-table-column label="所在年级" align="center">
          <template slot-scope="scope">{{scope.row.firstOrg }}</template>
        </el-table-column>
        <el-table-column label="所在班级" align="center">
          <template slot-scope="scope">{{scope.row.secondOrg}}</template>
        </el-table-column>
        <el-table-column label="联系人" align="center">
          <template slot-scope="scope">{{scope.row.linkman}}</template>
        </el-table-column>
        <el-table-column label="联系电话" align="center">
          <template slot-scope="scope">{{scope.row.stuTel }}</template>
        </el-table-column>
        <el-table-column label="联系地址" align="center">
          <template slot-scope="scope">{{scope.row.address}}</template>
        </el-table-column>
        <el-table-column label="备注" align="center">
          <template slot-scope="scope">{{scope.row.remark}}</template>
        </el-table-column>
        <el-table-column label="创建日期" align="center">
          <template slot-scope="scope">{{scope.row.createTime}}</template>
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
    <el-dialog title="导入学生数据" :visible.sync="dialogVisible" width="30%">
      <div class="content-box">
        <el-upload
          class="upload-demo"
          action="pss/student/import"
          :on-success="successFile"
          name="excel"
          :file-list="fileList"
          accept=".xlsx"
          :headers="headers"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传xlsx文件</div>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="dialogVisible=false">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改数据" :visible.sync="dialogVisible2" width="60%">
      <div class="content-box">
        <el-form ref="stuForm" label-width="100px" :model="studentObj" :rules="rules">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="学生姓名:" prop="stuName">
                <el-input placeholder="学生姓名" v-model="studentObj.stuName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="学生性别:" prop="sex">
                <el-select placeholder="请选择性别" v-model="studentObj.sex" class="input-width">
                  <el-option label="男" :value="1"></el-option>
                  <el-option label="女" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="证件类型" prop="idType">
                <el-select placeholder="请选择证件类型" v-model="studentObj.idType" class="input-width">
                  <el-option label="身份证号" :value="0"></el-option>
                  <el-option label="护照" :value="1"></el-option>
                  <el-option label="港澳台同行证" :value="2"></el-option>
                  <el-option label="其他" :value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
             <el-col :span="12">
              <el-form-item label="证件号码:">
                <el-input placeholder="输入证件号码" v-model="studentObj.idCard"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="12">
              <el-form-item label="出生日期:" prop="birthDate">
                <el-date-picker
                  v-model="studentObj.birthDate"
                  type="date"
                  class="input-width"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
              <el-col :span="12">
              <el-form-item label="机构类型">
                <el-select
                  v-model="studentObj.organType"
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
                  v-model="studentObj.organId"
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
            <el-col :span="12">
              <el-form-item label="选择年级:" prop="firstId">
                <el-select
                  placeholder="请选择"
                  v-model="studentObj.firstId"
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
            <el-col :span="12">
              <el-form-item label="选择班级:" prop="secondId">
                <el-select
                  placeholder="请选择"
                  v-model="studentObj.secondId"
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
              <el-form-item label="监护人:">
                <el-input placeholder="输入联系人" v-model="studentObj.linkman"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="监护电话:">
                <el-input placeholder="输入联系电话" v-model="studentObj.stuTel"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="24">
              <el-form-item label="选择地址:">
                <v-distpicker
                  class="address"
                  @selected="onSelected"
                  :province="select.province"
                  :city="select.city"
                  :area="select.area"
                ></v-distpicker>
              </el-form-item>
            </el-col> -->
            <el-col :span="24">
              <el-form-item label="详细地址:">
                <el-input
                  class="textarea"
                  placeholder="请输入内容"
                  type="textarea"
                  v-model="studentObj.address"
                  :autosize="true"
                  maxlength="100"
                  show-word-limit
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注:">
                <el-input
                  class="textarea"
                  placeholder="请输入内容"
                  type="textarea"
                  v-model="studentObj.remark"
                  :autosize="true"
                  maxlength="100"
                  show-word-limit
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2=false">关闭</el-button>
        <el-button type="success" @click="saveStudents('stuForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
let defaultStu = {
  address: "",
  birthDate: "",
  firstId: "",
  id: "",
  idCard: "",
  idType: "",
  organType:"",
  linkman: "",
  organId: "",
  organName: "",
  remark: "",
  secondId: "",
  sex: 1,
  stuName: "",
  stuTel: ""
};
import { getOrganList, getOrganLeveList } from "@/api/organ";
import { fetchList, insertStudent, updateStudent } from "@/api/student";
import { mapGetters } from "vuex";
import { Message, MessageBox } from "element-ui";
export default {
  name: "list",
  data() {
    return {
      createDate: [],
      studentObj: Object.assign({}, defaultStu),
      address:"",
      headers: {
        "access-token": sessionStorage.getItem("loginToken"),
        "service-id": 5000
      },
      select: { province: "北京市", city: "北京城区", area: "海淀区" },
      list: [],
      listLoading: false,
      dialogVisible: false,
      dialogVisible2: false,
      organList: [],
      gradesOption: [],
      classesOption: [],
      fileList:[],
      total: 0,
      listQuery: {
        stuName: "",
        stuTel: "",
        idCard: "",
        organType:"",
        organName:"",
        orgFullName:"",
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
    formatSex(sex) {
      return sex == 1? "男" : "女";
    },
  },
  methods: {
    importFile(){
      this.dialogVisible=true;
      this.fileList=[];
    },
    clearData() {
      let listQuery = {
        stuName: "",
        stuTel: "",
        idCard: "",
        organType:"",
        organName:"",
        orgFullName:"",
        pageNum: 1,
        pageSize: 10
      };
      this.listQuery = listQuery;
    },
     handleTypeChange(val) {
      this.studentObj.organId = "",
      this.studentObj.firstId = "",
      this.studentObj.secondId = "";
      this.organList = [];
      this.classesOption = [];
      this.gradesOption = [];
      this.getOrganListData(val);
    },
    changeOrgan(value) {
      this.studentObj.firstId = "";
      this.studentObj.secondId = [];
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
      this.studentObj.secondId = [];
      this.classesOption = [];
      this.getOrganLeveListData(this.studentObj.organId, value);
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
    onSelected(val) {
      this.select.province = val.province.value;
      this.select.city = val.city.value;
      this.select.area = val.area.value;
    },
    successFile(res, file, fileList) {
      if (res.code == 200) {
        this.$message.success("上传成功");
        this.getList();
      } else {
        this.$message.warning(res.message);
      }
    },
    handleEdit(val) {
      this.dialogVisible2 = true;
      this.studentObj=val;
      this.getOrganListData(this.studentObj.organType);
      this.getOrganLeveListData(this.studentObj.organId, 0);
      this.getOrganLeveListData(this.studentObj.organId, this.studentObj.firstId);
    },
    handleTimeChange(val) {
      this.listQuery.createTimeStart = this.createDate[0];
      this.listQuery.createTimeEnd = this.createDate[1];
    },
    saveStudents(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          updateStudent(this.studentObj).then(res=>{
              if(res.code==200){
                this.$message.success("保存成功")
                this.studentObj=Object.assign({},defaultStu)
                this.dialogVisible2=false;
              }
          })
        }else{
          this.$message.warning("验证失败")
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
</style>

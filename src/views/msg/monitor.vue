<template>
  <div class="app-container">
    <el-form :inline="true" :model="listQuery" size="small">
      <div>
        <el-form-item>
          <el-input placeholder="监测中心名称" v-model.number="listQuery.monitorName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="简码" v-model="listQuery.simpleId" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="listQuery.serType" placeholder="类型">
            <el-option value label="全部"></el-option>
            <el-option value="1" label="康复"></el-option>
            <el-option value="2" label="支具"></el-option>
            <el-option value="3" label="动态监测"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="search-btn" @click="clearData">
            <svg-icon icon-class="reset-icon" class-name="search-icon"></svg-icon>重置
          </el-button>
          <el-button icon="el-icon-search" type="success" class="search-btn" @click="queryData()">查询</el-button>
          <el-button type="success" class="search-btn" @click="addMonitor">
            <svg-icon icon-class="patient" class-name="search-icon"></svg-icon>新增
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
        <el-table-column label="简码" width="100" align="center">
          <template slot-scope="scope">{{scope.row.simpleId}}</template>
        </el-table-column>
        <el-table-column label="监测中心名称" align="center">
          <template slot-scope="scope">{{scope.row.monitorName }}</template>
        </el-table-column>
        <el-table-column label="所在医院" align="center">
          <template slot-scope="scope">{{scope.row.hospitalName}}</template>
        </el-table-column>
        <el-table-column label="服务类型" align="center">
          <template slot-scope="scope">
            <!-- <p>{{scope.row.serTypes}}</p> -->
            <p v-for="(item,index) in scope.row.serTypes" :key="index"> {{item|formatType}}</p>
          </template>
        </el-table-column>
        <el-table-column label="联系人" align="center">
          <template slot-scope="scope">{{scope.row.linkman }}</template>
        </el-table-column>
        <el-table-column label="手机" align="center">
          <template slot-scope="scope">{{scope.row.monitorTel }}</template>
        </el-table-column>
        <el-table-column label="所在地址" align="center">
          <template slot-scope="scope">{{scope.row.area }}{{scope.row.address }}</template>
        </el-table-column>
        <el-table-column label="备注" align="center">
          <template slot-scope="scope">{{scope.row.remark }}</template>
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
    <el-dialog title="新增监测中心" :visible.sync="dialogVisible" width="60%">
      <div class="content-box">
        <el-form ref="monitorForm" label-width="130px" :rules="rules" :model="monitorObj">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="监测中心名称:" prop="monitorName">
                <el-input
                  v-model="monitorObj.monitorName"
                  placeholder="请输入监测中心名称"
                  maxlength="20"
                  show-word-limit
                  :disabled="monitorObj.uid!=null"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="监测中心编码:" prop="simpleId">
                <el-input
                  v-model="monitorObj.simpleId"
                  placeholder="请输入监测中心编码"
                  maxlength="20"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所在医院:">
                <el-select
                  class="input-width"
                  v-model="monitorObj.hospitalName"
                  filterable
                  remote
                  placeholder="请输入关键词检索"
                  :remote-method="queryHospitalData"
                  :loading="loadingOption"
                >
                  <el-option
                    v-for="item in hostList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="服务类型" prop="serTypes">
                <el-select
                  v-model="monitorObj.serTypes"
                  multiple
                  placeholder="类型"
                  class="input-width"
                >
                  <el-option :value="1" label="康复"></el-option>
                  <el-option :value="2" label="支具"></el-option>
                  <el-option :value="3" label="动态监测"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人:" prop="linkman">
                <el-input
                  v-model="monitorObj.linkman"
                  placeholder="请输入联系人"
                  maxlength="15"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话:" prop="monitorTel">
                <el-input
                  v-model="monitorObj.monitorTel"
                  placeholder="请输入联系电话"
                  maxlength="11"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="每小时限制人数:" prop="peopleNo">
                <el-select
                  placeholder="请选择"
                  v-model="monitorObj.peopleNo"
                  clearable
                  class="input-width"
                >
                  <el-option :value="1" label="1"></el-option>
                  <el-option :value="2" label="2"></el-option>
                  <el-option :value="3" label="3"></el-option>
                  <el-option :value="4" label="4"></el-option>
                  <el-option :value="5" label="5"></el-option>
                  <el-option :value="6" label="6"></el-option>
                  <el-option :value="7" label="7"></el-option>
                  <el-option :value="8" label="8"></el-option>
                  <el-option :value="9" label="9"></el-option>
                  <el-option :value="10" label="10"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="工作时间段:" prop="workTimes">
                <el-checkbox-group v-model="monitorObj.workTimes">
                  <el-checkbox-button
                    v-for="item in workTimesOptions"
                    :label="item"
                    :key="item"
                  >{{item}}</el-checkbox-button>
                </el-checkbox-group>
                <!-- <el-checkbox-group v-model="workTimes2">
                  <el-checkbox-button
                    v-for="item in workTimesOptions2"
                    :label="item"
                    :key="item"
                  >{{item}}</el-checkbox-button>
                </el-checkbox-group>-->
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="选择地址:">
                <v-distpicker
                  class="address"
                  @selected="onSelected"
                  :province="select.province"
                  :city="select.city"
                  :area="select.area"
                ></v-distpicker>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="详细地址:">
                <el-input
                  class="textarea"
                  placeholder="请输入内容"
                  type="textarea"
                  v-model="monitorObj.address"
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
                  placeholder="请输入详细内容"
                  type="textarea"
                  v-model="monitorObj.remark"
                  :autosize="{minRows: 2, maxRows: 2}"
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
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="success" @click="saveMonitor('monitorForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const monitorDefault = {
  id: "",
  address: "",
  area: "",
  hospitalName: "",
  linkman: "",
  monitorName: "",
  monitorTel: "",
  peopleNo: 1,
  remark: "",
  serTypes: "",
  simpleId: "",
  workTimes: [
    "08:00~09:00",
    "09:00~10:00",
    "10:00~11:00",
    "11:00~12:00",
    "12:00~13:00",
    "13:00~14:00",
    "14:00~15:00",
    "15:00~16:00",
    "16:00~17:00"
  ]
};
import {
  fetchList,
  queryHospital,
  insertMonitor,
  updateMonitor
} from "@/api/monitor";
import { mapGetters } from "vuex";
import { Message, MessageBox } from "element-ui";
export default {
  name: "list",
  data() {
    return {
      select: { province: "省", city: "市", area: "区" },
      list: [],
      monitorObj: Object.assign({}, monitorDefault),
      dialogVisible2: false,
      listLoading: false,
      hostList: [],
      loadingOption: false,
      dialogVisible: false,
      workTimesOptions: [
        "08:00~09:00",
        "09:00~10:00",
        "10:00~11:00",
        "11:00~12:00",
        "12:00~13:00",
        "13:00~14:00",
        "14:00~15:00",
        "15:00~16:00",
        "16:00~17:00"
      ],
      total: 0,
      listQuery: {
        monitorName: "",
        simpleId: "",
        serType: "",
        pageNum: 1,
        pageSize: 10
      },
      rules: {
        monitorName: [
          { required: true, message: "请输入监测中心名称", trigger: "blur" }
        ],
        hospitalName: [
          { required: true, message: "请选择医院名称", trigger: "change" }
        ],
        serTypes: [
          { required: true, message: "请选择服务类型", trigger: "change" }
        ],
        peopleNo: [
          { required: true, message: "请选择每小时限制人数", trigger: "change" }
        ],
        simpleId: [
          { required: true, message: "请输入监测中心简码", trigger: "blur" }
        ],
        workTimes: [
          { required: true, message: "请选择工作时间", trigger: "change" }
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
    formatType(val) {
      let str = "";
        if (!val){return ""} 
          switch (val) {
            case 1:
              str="康复";
              break;
            case 2:
              str="支具";
              break;
            case 3:
              str="动态监测";
              break;
          }
         return str;
    }
  },
  methods: {
    addMonitor() {
      this.dialogVisible = true;
      this.monitorObj = Object.assign({}, monitorDefault);
      this.$nextTick(function() {
        this.$refs.monitorForm.clearValidate();
      });
    },
    clearData() {
      let listQuery = {
        monitorName: "",
        simpleId: "",
        serType: "",
        pageNum: 1,
        pageSize: 10
      };
      this.listQuery = listQuery;
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
    onSelected(val) {
      console.log(val)
      this.select.province = val.province.value;
      this.select.city = val.city.value;
      this.select.area = val.area.value;
    },
    handleEdit(val) {
      if (val.area) {
        let area = val.area.split(",");
        this.select.province = area[0];
        this.select.city = area[1];
        this.select.area = area[2];
      }

      this.monitorObj = val;
      this.dialogVisible = true;
    },
    handleTimeChange(val) {
      this.listQuery.createTimeStart = this.createDate[0];
      this.listQuery.createTimeEnd = this.createDate[1];
    },
    saveMonitor(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.monitorObj.area =
            this.select.province +
            "," +
            this.select.city +
            "," +
            this.select.area;
          if (this.monitorObj.id) {
            this.updateMonitorData(formName);
          } else {
            this.insertMonitorData(formName);
          }
        } else {
          this.$message.warning("验证失败");
        }
      });
    },
    insertMonitorData(formName) {
      insertMonitor(this.monitorObj).then(res => {
        if (res.code == 200) {
          this.$message.success("创建成功");
          this.dialogVisible = false;
          this.$refs[formName].resetFields();
          this.monitorObj = Object.assign({}, monitorDefault);
          this.getList();
        }
      });
    },
    updateMonitorData(formName) {
      updateMonitor(this.monitorObj).then(res => {
        if (res.code == 200) {
          this.$message.success("修改成功");
          this.dialogVisible = false;
          this.$refs[formName].resetFields();
          this.monitorObj = Object.assign({}, monitorDefault);
          this.getList();
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
.el-checkbox-button__inner {
  width: 150px;
  padding: 0 20px;
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

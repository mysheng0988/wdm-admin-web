<template>
  <div class="app-container">
    <el-form :inline="true" :model="listQuery" size="small">
      <div>
        <el-form-item>
          <el-input placeholder="设备名称" v-model.number="listQuery.equipName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="设备编号" v-model="listQuery.equipNo" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="厂商名称" v-model="listQuery.manufacturerName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="listQuery.state" placeholder="设备状态">
            <el-option value label="全部"></el-option>
            <el-option value="1" label="正常使用"></el-option>
            <el-option value="2" label="设备故障"></el-option>
            <el-option value="3" label="送检维修"></el-option>
            <el-option value="4" label="设备损坏"></el-option>
            <el-option value="5" label="未启用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="search-btn" @click="clearData">
            <svg-icon icon-class="reset-icon" class-name="search-icon"></svg-icon>重置
          </el-button>
          <el-button icon="el-icon-search" type="success" class="search-btn" @click="queryData()">查询</el-button>
          <el-button type="success" class="search-btn" @click="addDevice">
            <svg-icon icon-class="patient" class-name="search-icon"></svg-icon>新增设备
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
        <el-table-column label="设备名称" align="center">
          <template slot-scope="scope">{{scope.row.equipName }}</template>
        </el-table-column>
        <el-table-column label="设备编号" align="center">
          <template slot-scope="scope">{{scope.row.equipNo}}</template>
        </el-table-column>
        <el-table-column label="设备类型" align="center">
          <template slot-scope="scope">{{scope.row.equipType |formatType}}</template>
        </el-table-column>
        <el-table-column label="所属厂商" align="center">
          <template slot-scope="scope">{{scope.row.manufacturerVo.mfrName}}</template>
        </el-table-column>
        <el-table-column label="联系人" align="center">
          <template slot-scope="scope">{{scope.row.linkman }}</template>
        </el-table-column>
        <el-table-column label="联系电话" align="center">
          <template slot-scope="scope">{{scope.row.equipTel}}</template>
        </el-table-column>
        <el-table-column label="所在监测中心" align="center">
          <template slot-scope="scope">{{scope.row.monitorCenterVo.monitorName }}</template>
        </el-table-column>
        <el-table-column label="设备状态" align="center">
          <template slot-scope="scope">{{scope.row.state |formatState}}</template>
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
    <el-dialog title="新增设备" :visible.sync="dialogVisible" width="45%">
      <div class="content-box">
        <el-form ref="deviceForm" label-width="120px" :rules="rules" :model="deviceObj">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="设备名称:" prop="equipName">
                <el-input
                  v-model="deviceObj.equipName"
                  placeholder="请输入设备名称"
                  maxlength="20"
                  show-word-limit
                  :disabled="deviceObj.uid!=null"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设备编号:" prop="equipNo">
                <el-input
                  v-model="deviceObj.equipNo"
                  placeholder="请输入设备编号"
                  maxlength="20"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设备类型:" prop="equipType">
                <el-select
                  placeholder="请选择"
                  v-model="deviceObj.equipType"
                  clearable
                  class="input-width"
                >
                  <el-option :value="1" label="云纹图"></el-option>
                  <el-option :value="2" label="K5"></el-option>
                  <el-option :value="3" label="足底"></el-option>
                  <el-option :value="4" label="坐高"></el-option>
                  <el-option :value="5" label="体态图"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属厂商：" prop="manufacturerId">
                <el-select
                  placeholder="请选择"
                  v-model="deviceObj.manufacturerId"
                  clearable
                  class="input-width"
                >
                  <el-option
                    v-for="item in optionsManufacturer"
                    :key="item.id"
                    :label="item.mfrName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属监测中心:" prop="monitorCenterId">
                <el-select
                  placeholder="请选择"
                  v-model="deviceObj.monitorCenterId"
                  clearable
                  class="input-width"
                >
                  <el-option
                    v-for="item in optionsMonitor"
                    :key="item.id"
                    :label="item.monitorName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设备状态:" prop="state">
                <el-select
                  placeholder="请选择"
                  v-model="deviceObj.state"
                  clearable
                  class="input-width"
                >
                  <el-option :value="1" label="正常使用"></el-option>
                  <el-option :value="2" label="设备故障"></el-option>
                  <el-option :value="3" label="送检维修"></el-option>
                  <el-option :value="4" label="设备损害"></el-option>
                  <el-option :value="5" label="未启用"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人:" prop="linkman">
                <el-input
                  v-model="deviceObj.linkman"
                  placeholder="请输入联系人"
                  maxlength="15"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话:" prop="equipTel">
                <el-input
                  v-model="deviceObj.equipTel"
                  placeholder="请输入联系电话"
                  maxlength="11"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注:">
                <el-input
                  class="textarea"
                  placeholder="请输入详细内容"
                  type="textarea"
                  v-model="deviceObj.remark"
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
        <el-button type="success" @click="saveEquipment('deviceForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const deviceDefault = {
  id: null,
  equipName: "",
  equipNo: "",
  equipTel: "",
  equipType: 1,
  linkman: "",
  manufacturerId: "",
  remark: "",
  state: 1,
  monitorCenterId: ""
};
import { fetchList, insertEquipment, updateEquipment } from "@/api/device";
import { monitorCenterList } from "@/api/monitor";
import { getFirmList } from "@/api/firm";
import { mapGetters } from "vuex";
import { Message, MessageBox } from "element-ui";
export default {
  name: "list",
  data() {
    return {
      createDate: [],
      examinationList: [],
      deviceObj: Object.assign({}, deviceDefault),
      optionsMonitor: [],
      optionsManufacturer: [],
      list: [],
      taskList: [],
      dialogVisible2: false,
      listLoading: false,
      dialogVisible: false,
      total: 0,
      listQuery: {
        equipName: "",
        equipNo: "",
        manufacturerName: "",
        state: "",
        pageNum: 1,
        pageSize: 10
      },
      rules: {
        linkman:[
          { required: true, message: "请输入联系人", trigger: "blur" }
        ],
        equipType: [
          { required: true, message: "请选择设备类型", trigger: "change" }
        ],
        equipName: [
          { required: true, message: "设备名称不能为空", trigger: "blur" }
        ],
        equipNo: [
          { required: true, message: "设备编号不能为空", trigger: "blur" }
        ],
        equipTel: [
          { required: true, message: "联系电话不能为空", trigger: "blur" }
        ],
        monitorCenterId: [
          { required: true, message: "请选择监测中心", trigger: "change" }
        ],
        state: [
          { required: true, message: "请选择设备状态", trigger: "change" }
        ],
        manufacturerId: [
          { required: true, message: "请选择所属厂商", trigger: "change" }
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
      if (val && val != "") {
        switch (val) {
          case 1:
            return "云纹图";
          case 2:
            return "K5";
          case 3:
            return "足底";
          case 4:
            return "坐高";
          case 5:
            return "体态图";
        }
      }
      return "";
    },
    formatState(val) {
      if (val && val != "") {
        switch (val) {
          case 1:
            return "正常使用";
          case 2:
            return "设备故障";
          case 3:
            return "送检维修";
          case 4:
            return "设备损害";
          case 5:
            return "未启用";
        }
      }
      return "";
    }
  },
  mounted() {
    monitorCenterList().then(res => {
      if (res.code == 200) this.optionsMonitor = res.dataList;
    });
    getFirmList().then(res => {
      if (res.code == 200) this.optionsManufacturer = res.dataList;
    });
  },
  methods: {
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
    addDevice(){
      this.deviceObj=Object.assign({},deviceDefault)
      this.dialogVisible = true;
    },
    handleEdit(val) {
      this.deviceObj = val;
      this.deviceObj.manufacturerId = val.manufacturerVo.id;
      this.deviceObj.monitorCenterId = val.monitorCenterVo.id;
      this.dialogVisible = true;
    },
    handleTimeChange(val) {
      this.listQuery.createTimeStart = this.createDate[0];
      this.listQuery.createTimeEnd = this.createDate[1];
    },
    saveEquipment(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.deviceObj.id) {
            this.updateEquipmentData(formName);
          } else {
            this.insertEquipmentData(formName);
          }
        } else {
          this.$message.warning("验证失败");
        }
      });
    },
    insertEquipmentData(formName) {
      insertEquipment(this.deviceObj).then(res => {
        if (res.code == 200) {
          this.$message.success("创建成功");
          this.dialogVisible = false;
          this.$refs[formName].resetFields();
          this.deviceObj = Object.assign({}, deviceDefault);
          this.getList();
        }
      });
    },
    updateEquipmentData(formName) {
      updateEquipment(this.deviceObj).then(res => {
        if (res.code == 200) {
          this.$message.success("修改成功");
          this.dialogVisible = false;
          this.$refs[formName].resetFields();
          this.deviceObj = Object.assign({}, deviceDefault);
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
  text-align: center;
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

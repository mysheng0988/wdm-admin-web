<template>
  <div class="app-container">
    <el-form :inline="true" :model="listQuery" size="small">
      <div>
        <el-form-item>
          <el-input placeholder="厂商名称" v-model.number="listQuery.mfrName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="search-btn" @click="clearData">
            <svg-icon icon-class="reset-icon" class-name="search-icon"></svg-icon>重置
          </el-button>
          <el-button icon="el-icon-search" type="success" class="search-btn" @click="queryData()">查询</el-button>
          <el-button type="success" class="search-btn" @click="addFirm">
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
        <el-table-column label="序号" width="60" align="center">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="厂商名称" align="center">
          <template slot-scope="scope">{{scope.row.mfrName }}</template>
        </el-table-column>
        <el-table-column label="设备种类" align="center">
          <template slot-scope="scope">{{scope.row.equipType|formatStyleType}}</template>
        </el-table-column>
        <el-table-column label="设备数量" align="center">
          <template slot-scope="scope">{{scope.row.equipNum }}</template>
        </el-table-column>
        <el-table-column label="联系人" align="center">
          <template slot-scope="scope">{{scope.row.linkman }}</template>
        </el-table-column>
        <el-table-column label="联系电话" align="center">
          <template slot-scope="scope">{{scope.row.mfrTel}}</template>
        </el-table-column>
        <el-table-column label="所在地址" align="center">
          <template slot-scope="scope">{{scope.row.area+scope.row.address}}</template>
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
    <el-dialog title="新增厂商" :visible.sync="dialogVisible" width="40%">
      <div class="cardContent">
        <el-form ref="firmForm" label-width="100px" :model="firmObj" :rules="rules">
          <el-form-item label="厂商名称:" prop="mfrName">
            <el-input placeholder="厂商名称" v-model="firmObj.mfrName"></el-input>
          </el-form-item>
          <el-form-item label="联系人:">
            <el-input placeholder="输入联系人" v-model="firmObj.linkman"></el-input>
          </el-form-item>
          <el-form-item label="联系电话:" >
            <el-input placeholder="输入联系电话" v-model="firmObj.mfrTel"></el-input>
          </el-form-item>
          <el-form-item label="选择地址:">
            <v-distpicker
              class="address"
              @selected="onSelected"
              :province="select.province"
              :city="select.city"
              :area="select.area"
            ></v-distpicker>
          </el-form-item>
          <el-form-item label="详细地址:">
            <el-input
              class="textarea"
              placeholder="请输入内容"
              type="textarea"
              v-model="firmObj.address"
              :autosize="true"
              maxlength="100"
              show-word-limit
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="备注:">
            <el-input
              class="textarea"
              placeholder="请输入内容"
              type="textarea"
              v-model="firmObj.remark"
              :autosize="true"
              maxlength="100"
              show-word-limit
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="success" @click="saveFirm('firmForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, insertFirm, updateFirm } from "@/api/firm";
import { mapGetters } from "vuex";
import { Message, MessageBox } from "element-ui";
let defaultFirm = {
  id: "",
  address: "",
  area: "",
  linkman: "",
  mfrName: "",
  mfrTel: "",
  remark: ""
};
export default {
  name: "list",
  data() {
    return {
      title: "新增厂商",
      dialogVisible: false,
      firmObj: Object.assign({}, defaultFirm),
      list: [],
      total: 0,
      select: { province: "省", city: "市", area: "区" },
      listQuery: {
        mfrName: "",
        pageNum: 1,
        pageSize: 10
      },
      rules: {
        mfrName: [{ required: true, message: "必填字段", trigger: "blur" }],
        mfrTel: [
          { required: true, message: "必填字段", trigger: "blur" },
          {
            pattern: /^(\d{10}|\d{11})$/,
            message: "输入有效联系方式",
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
    }
  },
  methods: {
    clearData() {
      this.listQuery.mfrName = "";
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = 10;
    },
    onSelected(val) {
      this.select.province = val.province.value;
      this.select.city = val.city.value;
      this.select.area = val.area.value;
    },
    addFirm() {
      this.title = "新增厂商";
      this.firmObj=Object.assign({},defaultFirm)
      this.dialogVisible = true;
    },
    handleEdit(data) {
      this.firmObj = data;
      this.title = "修改厂商";
      this.dialogVisible = true;
      let area = this.firmObj.area.split(",");
      this.select.province = area[0];
      this.select.city = area[1];
      this.select.area = area[2];
    },
    saveFirm(formName) {
      this.firmObj.area =
        this.select.province + "," + this.select.city + "," + this.select.area;
      // this.firmObj.area=this.select.join(",")
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.firmObj.id) {
            updateFirm(this.firmObj).then(res => {
              if (res.code == 200) {
                this.$message.success("保存成功");
                this.getList();
                this.dialogVisible=false;
              }
            });
          } else {
            insertFirm(this.firmObj).then(res => {
              if (res.code == 200) {
                this.$message.success("保存成功");
                this.getList();
                this.dialogVisible=false;
              }
            });
          }
        } else {
          this.$message.error("数据验证有误");
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

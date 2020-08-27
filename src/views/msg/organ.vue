<template>
  <div class="app-container">
    <el-form :inline="true" :model="listQuery" size="small">
      <div>
        <el-form-item>
          <el-input placeholder="机构名称" v-model.number="listQuery.orgName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="简码" v-model="listQuery.orgSimple" clearable></el-input>
        </el-form-item>
         <el-form-item>
          <el-select v-model="listQuery.orgType" placeholder="机构类型">
             <el-option value="" label="全部"></el-option>
            <el-option value="1" label="学校"></el-option>
            <el-option value="2" label="社区"></el-option>
            <el-option value="3" label="豌豆苗学院"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="search-btn" @click="clearData">
            <svg-icon icon-class="reset-icon" class-name="search-icon"></svg-icon>重置
          </el-button>
          <el-button icon="el-icon-search" type="success" class="search-btn" @click="queryData()">查询</el-button>
          <el-button type="success" class="search-btn" @click="addOrgan">
            <svg-icon icon-class="patient" class-name="search-icon"></svg-icon>新增机构
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
        <el-table-column label="简码" align="center">
          <template slot-scope="scope">{{scope.row.orgSimple }}</template>
        </el-table-column>
        <el-table-column label="机构名称" align="center">
          <template slot-scope="scope">{{scope.row.orgName}}</template>
        </el-table-column>
        <el-table-column label="机构全称" align="center">
          <template slot-scope="scope">{{scope.row.orgFullName }}</template>
        </el-table-column>
         <el-table-column label="机构类型" align="center">
          <template slot-scope="scope">{{scope.row.orgType |formatType}}</template>
        </el-table-column>
         <el-table-column label="联系人" align="center">
          <template slot-scope="scope">{{scope.row.linkman}}</template>
        </el-table-column>
          <el-table-column label="联系电话" align="center">
          <template slot-scope="scope">{{scope.row.orgTel }}</template>
        </el-table-column>
        <el-table-column label="负责客服" align="center">
          <template slot-scope="scope">{{scope.row.sale }}</template>
        </el-table-column>
        <el-table-column label="机构地址" align="center">
          <template slot-scope="scope">{{scope.row.area +scope.row.address }}</template>
        </el-table-column>
        <el-table-column label="创建日期" align="center">
          <template slot-scope="scope">{{scope.row.createTime}}</template>
        </el-table-column>
       
        <el-table-column width="120" label="操作" align="center">
          <template slot-scope="scope">
             <el-button
              size="mini"
              icon="el-icon-time"
              type="primary"
              plain
              @click="handleEdit(scope.row)"
            >编辑</el-button>
            <!-- <el-button
              size="mini"
              type="success"
              icon="el-icon-edit-outline"
              @click="handleEdit(scope.row)"
            >查看</el-button> -->
           
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
    <el-dialog title="新增机构" :visible.sync="dialogVisible" width="60%">
      <div class="content-box">
        <el-form ref="organForm" label-width="130px" :rules="rules" :model="organObj">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="机构名称:" prop="orgName">
                <el-input
                  v-model="organObj.orgName"
                  placeholder="请输入机构名称"
                  maxlength="20"
                  show-word-limit ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="机构简码:" prop="orgSimple">
                <el-input
                  v-model="organObj.orgSimple"
                  placeholder="请输入机构简码"
                  maxlength="20"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="机构全称:" prop="orgFullName">
                <el-input
                  v-model="organObj.orgFullName"
                  placeholder="请输入机构全称"
                  maxlength="20"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="机构类型" prop="serType">
                <el-select v-model="organObj.orgType" placeholder="类型" class="input-width">
                   <el-option :value="1" label="学校"></el-option>
                   <el-option :value="2" label="社区"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="负责客服">
                 <el-input
                  v-model="organObj.sale"
                  placeholder="请输入负责客服"
                  maxlength="20"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人:" prop="linkman">
                <el-input
                  v-model="organObj.linkman"
                  placeholder="请输入联系人"
                  maxlength="15"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话:" prop="orgTel">
                <el-input
                  v-model="organObj.orgTel"
                  placeholder="请输入联系电话"
                  maxlength="11"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="选择地址:" prop="area">
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
              <el-form-item label="详细地址:" prop="address">
                <el-input
                  class="textarea"
                  placeholder="请输入内容"
                  type="textarea"
                  v-model="organObj.address"
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
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="success" @click="saveorgan('organForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
let organDefault={
  address: "",
  area: "",
  id: null,
  linkman: "",
  orgFullName: "",
  orgName: "",
  orgSimple: "",
  orgTel: "",
  orgType: 1,
  sale: ""
}
import { fetchList, insertOrgan, updateOrgan } from "@/api/organ";
import { mapGetters } from "vuex";
import { Message, MessageBox } from "element-ui";
export default {
  name: "list",
  data() {
    return {
      createDate: [],
      organObj:Object.assign({},organDefault),
      select: { province: "省", city: "市", area: "区" },
      list: [],
      taskList: [],
      dialogVisible2: false,
      listLoading: false,
      dialogVisible: false,
      total: 0,
      listQuery: {
        orgName: "",
        orgType: "",
        orgSimple: "",
        pageNum: 1,
        pageSize: 10
      },
      rules: {
        address:[
          { required: true, message: "请输入详细地址", trigger: "blur" },
        ],
        area:[
          { required: true, message: "请选择地址", trigger: "blur" },
        ],
        orgName: [
          { required: true, message: "请输入机构名称", trigger: "blur" },
        ],
         orgSimple: [
          { required: true, message: "请输入机构简码", trigger: "blur" },
        ],
         orgType  : [
          { required: true, message: "请选择机构类型", trigger: "change" },
        ],
         linkman: [
          { required: true, message: "请输入联系人", trigger: "blur" },
        ],
         orgTel: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
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
      return  val==1? "学校" : "社区";
    },
  },
  methods: {
    addOrgan(){
      this.organObj=Object.assign({},organDefault)
      this.dialogVisible=true;
    },
    onSelected(val) {
      this.select.province = val.province.value;
      this.select.city = val.city.value;
      this.select.area = val.area.value;
    },
    clearData() {
      let listQuery = {
        orgName: "",
        orgType: "",
        orgSimple: "",
        pageNum: 1,
        pageSize: 10
      };
      this.createDate = [];
      this.listQuery = listQuery;
    },
      saveorgan(formName) {
         this.organObj.area= this.select.province+","+this.select.city +","+this.select.area ;
      this.$refs[formName].validate(valid => {
        if (valid) {
          

          if(!this.organObj.id){
            this.insertOrganData(formName);

          }else{
             this.updateOrganData(formName);
          }
        }else{
          this.$message.warning("验证失败")
        }
      });
    },
    insertOrganData(formName){
      insertOrgan(this.organObj).then(res=>{
        if(res.code==200){
          this.$message.success("创建成功");
          this.dialogVisible=false;
           this.$refs[formName].resetFields();
           this.organObj=Object.assign({},organDefault)
           this.getList()
        }
      })
    },
    updateOrganData(formName){
      updateOrgan(this.organObj).then(res=>{
        if(res.code==200){
          this.$message.success("修改成功");
          this.dialogVisible=false;
           this.$refs[formName].resetFields();
           this.organObj=Object.assign({},organDefault)
            this.getList()
        }
      })
    },
    handleEdit(val) {
      this.organObj=Object({},organDefault);
      let arrArea= val.area.split(",");
      console.log(arrArea)
       this.select.province=arrArea[0];
       this.select.city=arrArea[1] ;
       this.select.area=arrArea[2] ;
      this.organObj=val;
       this.dialogVisible=true;
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

<template>
  <div class="app-container">
    <el-form :inline="true" :model="listQuery" size="small">
      <el-form-item >
        <el-input  placeholder="医院名称" v-model="listQuery.name" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="success"  class="search-btn" @click="queryHospital">查询</el-button>
        <el-button icon="el-icon-plus" type="success"  class="search-btn" @click="dialogVisible = true">新增医院</el-button>
      </el-form-item>
    </el-form>
    <div class="table-container">
      <el-table ref="productCateTable"
                style="width: 100%"
                :data="list"
                v-loading="listLoading" border>
        <el-table-column label="ID" width="60" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="医院名称" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="医院地址" align="center">
          <template slot-scope="scope">{{scope.row.address }}</template>
        </el-table-column>
        <el-table-column label="级别" align="center">
          <template slot-scope="scope">{{ scope.row.level	}}</template>
        </el-table-column>
        <el-table-column label="医院性质" align="center">
          <template slot-scope="scope">{{ scope.row.nature	}}</template>
        </el-table-column>
        <el-table-column label="类型" align="center">
          <template slot-scope="scope">{{ scope.row.type	}}</template>
        </el-table-column>
        <el-table-column label="备注" align="center">
          <template slot-scope="scope">{{scope.row.remark }}</template>
        </el-table-column>
        <el-table-column label="操作" width="150"   align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-edit-outline"
              class="active"
              @click="editHos(scope.row)">编辑
            </el-button>
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
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="40%">
        <el-form ref="cardForm"
                 :model="hosForm"
                 :rules="rules"
                 label-width="100px">
              <el-form-item label="医院名称:"  prop="name" >
                <el-input v-model="hosForm.name" placeholder="请输入医院名称"></el-input>
              </el-form-item>
              <el-form-item label="选择地址:"   prop="cardID" >
                  <v-distpicker class="address"  @selected="onSelected" :province="select.province" :city="select.city" :area="select.area"></v-distpicker>
              </el-form-item>
              <el-form-item label="详细地址:">
                <el-input
                  class="textarea"
                  placeholder="请输入详细内容"
                  type="textarea"
                  v-model="address"
                  :autosize="{minRows: 2, maxRows: 2}"
                  maxlength="100"
                  show-word-limit
                  clearable></el-input>
              </el-form-item>
              <el-form-item  label="级别:"  prop="level" >
                <el-select  placeholder="请选择" v-model="hosForm.level" clearable class="input-width">
                  <el-option label="三级甲等" value="三级甲等" ></el-option>
                  <el-option label="二级甲等" value="二级甲等" ></el-option>
                  <el-option label="一级甲等" value="一级甲等" ></el-option>
                  <el-option label="三级乙等" value="三级乙等" ></el-option>
                  <el-option label="二级乙等" value="二级乙等" ></el-option>
                  <el-option label="一级乙等" value="一级乙等" ></el-option>
                  <el-option label="三级医院" value="三级医院" ></el-option>
                  <el-option label="二级医院" value="二级医院" ></el-option>
                  <el-option label="一级医院" value="一级医院" ></el-option>
                  <el-option label="民营医院" value="民营医院"></el-option>
                  <el-option label="特级医院" value="特级医院"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item  label="医院性质:"  prop="nature" >
                <el-select  placeholder="请选择" v-model="hosForm.nature" clearable class="input-width">
                  <el-option label="公立" value="公立" ></el-option>
                  <el-option label="民营" value="民营" ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item  label="类型:"  prop="nature" >
                <el-select  placeholder="请选择" v-model="hosForm.type" clearable class="input-width">
                  <el-option label="综合" value="综合" ></el-option>
                  <el-option label="专科" value="专科" ></el-option>
                  <el-option label="妇幼保健" value="妇幼保健" ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="备注:">
                <el-input
                  class="textarea"
                  placeholder="备注信息"
                  type="textarea"
                  v-model="hosForm.remark"
                  :autosize="{minRows: 2, maxRows: 2}"
                  maxlength="100"
                  show-word-limit
                  clearable></el-input>
              </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addHos('cardForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  const defaultHos={
    id:null,
    address: "",
    alias: "",
    aliasPinyin: "",
    aliasPinyinShort: "",
    level: "",
    name: "",
    namePinyin: "",
    namePinyinShort: "",
    nature: "",
    remark: "",
    type: ""
  }
  import {queryHospital,saveHospital,updateHospital} from '@/api/manage'
  import { Message, MessageBox } from 'element-ui'
  export default {
    name: "hosManage",
    data() {
      return {
        contentState:null,
        radio:null,
        list: null,
        shopList:[],
        address:"",
        listLoading: false,
        dialogVisible:false,
        total:0,
        select: { province: '北京市', city: '北京城区', area: '海淀区' },
        hosForm:Object.assign({},defaultHos),
        dialogTitle:"新增医院",
        rules:{
          name: [
            {required: true, message: '请输入医院名称', trigger: 'blur'},
          ]
        },
        listQuery: {
          name: "",
          sid: "",
          pageNum: 1,
          pageSize: 10
        },
      }
    },
    created() {
      this.getList();
    },
    methods: {
      onSelected(val){
        this.select.province=val.province.value;
        this.select.city=val.city.value;
        this.select.area=val.area.value;
      },
      editHos(obj){
        this.dialogTitle="修改医院信息"
        this.dialogVisible=true;
        let selectAddress=obj.address.split(",")
        if(selectAddress.length>2){
          this.select.province=selectAddress[0];
          this.select.city=selectAddress[1];
          this.select.area=selectAddress[2];
          this.hosForm=obj
          this.address=selectAddress[3]
        }else{
          this.hosForm=obj
        }
      },
      addHos(){
        this.hosForm.address=this.select.province+","+this.select.city+","+this.select.area+","+this.address;
        if(this.hosForm.id){
          updateHospital(this.hosForm).then(res=>{
            if(res.code==200){
              this.dialogVisible=false;
              Message.success(res.message)
              this.hosForm=Object.assign({},defaultHos)
              this.getList()
            }
          })
        }else {
          saveHospital(this.hosForm).then(res=>{
            if(res.code==200){
              this.dialogVisible=false;
              Message.success(res.message)
              this.hosForm=Object.assign({},defaultHos)
              this.getList()
            }
          })
        }
      },

      getList(){
        this.listLoading=true;
        queryHospital(this.listQuery).then(res=>{
          this.listLoading=false;
          if(res.code==200){
            this.list=res.dataList;
            this.total=res.pageInfo.total;
          }
        }).catch(error => {
          this.listLoading=false;
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
      queryHospital(){
        this.listQuery.pageNum = 1;
        this.getList();
      },
    },

  }
</script>

<style scoped>
  .search-btn{
    width: 100px;
  }
  .input-width{
    width: 100%;
  }
  .active{
    border:1px solid #67C23A;
    color: #67C23A;
  }
</style>

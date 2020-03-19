<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <el-row :gutter="10">
        <el-col :span="24">
          <div>编号：<span>333333</span></div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="6">
          <div>姓名：<span>王五</span></div>
        </el-col>
        <el-col :span="6">
          <div>年龄：<span>21</span></div>
        </el-col>
        <el-col :span="6">
          <div>性别：<span>男</span></div>
        </el-col>
        <el-col :span="6">
          <div>身高：<span>165cm</span></div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="6">
          <div>体重：<span>75kg</span></div>
        </el-col>
        <el-col :span="6">
          <div>来源医生：<span>孙江月</span></div>
        </el-col>
        <el-col :span="6">
          <div>来源科室：<span>心内科</span></div>
        </el-col>
        <el-col :span="6">
          <div>测评项目：<span>身心筛选</span></div>
        </el-col>
      </el-row>
    </el-card>
    <div class="table-container">
      <el-table ref="productCateTable"
                style="width: 100%"
                :data="list"
                v-loading="listLoading" border>
        <el-table-column label="序号" width="100" align="center">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="测评时间" align="center">
          <template slot-scope="scope">{{scope.row.className}}</template>
        </el-table-column>
        <el-table-column label="测评科室" align="center">
          <template slot-scope="scope">{{scope.row.goodsAmount }}</template>
        </el-table-column>
        <el-table-column label="测试医生"  align="center">
          <template slot-scope="scope">{{scope.row.goodsUnit }}</template>
        </el-table-column>
        <el-table-column label="操作"   align="center">
          <!-- <template slot-scope="scope"></template> -->
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
        :current-page.sync="listQuery.currentPage"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {historyHrv} from '@/api/HRV'
  export default {
    name: "resultHRV",
    data() {
      return {
        contentState:null,
        radio:null,
        list: null,
        shopList:[],
        listLoading: false,
        total:0,
        listQuery: {
          pageNum: 1,
          pageSize: 10
        },
      }
    },
    created() {
       this.getList();
    },

    methods: {
      getList(){
        historyHrv(17).then(res=>{
          if(res.code==200){
            this.list=res.data.items;
            this.total=res.data.totalNum;
          }
         
        })
      },
      handleAddProductCate() {
        this.$router.push('/pms/addCustomClass');
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
    },

  }
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }
  .operate-container{
    margin-bottom: 15px;
  }
  .active{
    border:1px solid #1197D6;
    color: #1197D6;
  }
</style>

<template>
  <div class="app-container">
    <el-form :inline="true" :model="listQuery" size="small">
      <div>
        <el-form-item label="测评内容">
          <el-select  placeholder="全部" clearable class="input-width">
              <option>筛查测评</option>
              <option>专科测评</option>
              <option>整体测评</option>
          </el-select>
        </el-form-item>
        <el-form-item label="测评状态">
          <el-select  placeholder="全部" clearable class="input-width">
            <option>待完成</option>
            <option>进行中</option>
            <option>已完成</option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="success" round>查  询</el-button>
        </el-form-item>
      </div>

    </el-form>
    <div class="table-container">
      <el-table ref="productCateTable"
                style="width: 100%"
                :data="list"
                v-loading="listLoading" border>
        <el-table-column label="序号" width="100" align="center">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.createTime}}</template>
        </el-table-column>
        <el-table-column label="测评内容" align="center">
          <template slot-scope="scope">{{scope.row.examinationName }}</template>
        </el-table-column>
        <el-table-column label="测评状态"  align="center">
          <template slot-scope="scope">{{scope.row.examinationStatus|formatStatus }}</template>
        </el-table-column>
        <el-table-column label="测评师"  align="center">
          <template slot-scope="scope">
            {{scope.row.currentRealname}}
          </template>
        </el-table-column>

        <el-table-column label="测评科室" align="center">
          <template slot-scope="scope">{{scope.row.currentDeptName }}</template>
        </el-table-column>
        <el-table-column label="操作" width="200"  align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              round
              class="active"
              @click="readRecord(scope.row)">查看报告
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
        :current-page.sync="listQuery.currentPage"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {getMedicalRecord} from '@/api/patient'
  import { Message, MessageBox } from 'element-ui'
  export default {
    name: "customClass",
    data() {
      return {
        contentState:null,
        radio:null,
        list: null,
        shopList:[],
        listLoading: false,
        total:0,
        listQuery: {
          examinationId: "",
          examinationStatus: "",
          patientId: 0,
          sid: "",
          pageNum: 1,
          pageSize: 10
        },
      }
    },
    created() {

      this.getList()
    },
    filters:{
      formatStatus(val){
        let str="待完成"
        if(val==2){
          str="进行中"
        }else if(val==3){
          str="已完成"
        }
        return str
      },
    },
    methods: {
      readRecord(data){
        console.log(data)
        this.$router.push({
          path: '/pat/readRecord',
          query: {
            id: data.id
          }
        })
      },
      getList(){
        this.listLoading=true;
        this.listQuery.patientId=this.$route.query.id;
        getMedicalRecord(this.listQuery).then(res=>{
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


    },

  }
</script>

<style scoped>
  .active{
    border:1px solid #1197D6;
    color: #1197D6;
  }
</style>

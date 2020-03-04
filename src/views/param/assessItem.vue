<template>
  <div class="app-container">
    <el-form :inline="true" :model="listQuery" size="small">
      <el-form-item >
        <el-input  placeholder="项目编号"></el-input>
      </el-form-item>
      <el-form-item >
        <el-input  placeholder="项目名称"></el-input>
      </el-form-item>
      <el-form-item >
        <el-input  placeholder="所属医院"></el-input>
      </el-form-item>
      <el-form-item >
        <el-input  placeholder="创建时间"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" round class="search-btn">查询</el-button>
        <el-button type="success" round class="search-btn">新增</el-button>
      </el-form-item>
    </el-form>
    <div class="table-container">
      <el-table ref="productCateTable"
                style="width: 100%"
                :data="list"
                v-loading="listLoading" border>
        <el-table-column label="序号" width="60" align="center">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="项目编号" align="center">
          <template slot-scope="scope">{{scope.row.className}}</template>
        </el-table-column>
        <el-table-column label="项目名称" align="center">
          <template slot-scope="scope">{{scope.row.classSort }}</template>
        </el-table-column>
        <el-table-column label="所属科室" align="center">
          <template slot-scope="scope">{{scope.row.classSort }}</template>
        </el-table-column>
        <el-table-column label="价格" align="center">
          <template slot-scope="scope">{{scope.row.classSort }}</template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">{{scope.row.classSort }}</template>
        </el-table-column>
        <el-table-column label="创建用户" align="center">
          <template slot-scope="scope">{{scope.row.classSort }}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.classSort }}</template>
        </el-table-column>
        <el-table-column label="描述" align="center">
          <template slot-scope="scope">{{scope.row.classSort }}</template>
        </el-table-column>
        <el-table-column label="操作" width="200"   align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              round
              class="active"
              @click="handleUpdate(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              round
              class="active"
              @click="handleUpdate(scope.$index, scope.row)">禁用
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
  import {queryCustomClass,
    deleteCustomClass,
    saveCustomClass} from '@/api/classify'
  import {findShop} from '@/api/shop';
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
          shopId:null,
          currentPage: 1,
          pageSize: 10
        },
      }
    },
    created() {

    },

    methods: {

    },

  }
</script>

<style scoped>
  .search-btn{
    width: 100px;
  }
  .active{
    border:1px solid #1197D6;
    color: #1197D6;
  }
</style>

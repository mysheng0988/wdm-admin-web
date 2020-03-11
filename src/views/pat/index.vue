<template>
  <div class="app-container">
    <el-form :inline="true" :model="listQuery" size="small">
      <div>
        <el-form-item >
          <el-input  placeholder="患者编号" v-model="listQuery.pid"></el-input>
        </el-form-item>
        <el-form-item >
          <el-input placeholder="患者姓名" v-model="listQuery.realName"></el-input>
        </el-form-item>
        <el-form-item >
          <el-input placeholder="身份证号" v-model="listQuery.cardNo"></el-input>
        </el-form-item>
        <el-form-item >
          <el-date-picker
            v-model="listQuery.createTimeStart"
            class="input-width"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="创建日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="success" round class="search-btn" @click="queryData()">查询</el-button>
          <el-button type="success" round class="search-btn" @click="dialogVisible = true">患者登记</el-button>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="测评状态:">
          <el-radio-group v-model="listQuery.examinationStatus">
            <el-radio label="1">待完成</el-radio>
            <el-radio label="2">进行中</el-radio>
            <el-radio label="3">已完成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="测评内容:">
          <el-radio-group v-model="listQuery.examinationId">
            <el-radio v-for="item in examinationList" :key="item.name" :label="item.id">{{item.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
    </el-form>
    <!--<el-card class="operate-container" shadow="never">-->
      <!--<i class="el-icon-tickets" style="margin-top: 5px"></i>-->
      <!--<span style="margin-top: 5px">数据列表</span>-->
      <!--<el-button-->
        <!--class="btn-add"-->
        <!--@click="handleAddProductCate()"-->
        <!--size="mini">-->
        <!--添加-->
      <!--</el-button>-->
    <!--</el-card>-->
    <div class="table-container">
      <el-table ref="productCateTable"
                style="width: 100%"
                :data="list"
                v-loading="listLoading" border>
        <el-table-column label="序号" width="60" align="center">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="编号" width="80" align="center">
          <template slot-scope="scope">{{scope.row.pid}}</template>
        </el-table-column>
        <el-table-column label="患者姓名" align="center">
          <template slot-scope="scope">{{scope.row.realName }}</template>
        </el-table-column>
        <el-table-column label="出生日期"  align="center">
          <template slot-scope="scope">{{scope.row.birthday }}</template>
        </el-table-column>
        <el-table-column label="年龄"  align="center">
          <template slot-scope="scope">
            {{scope.row.birthday|formatAge}}
          </template>
        </el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">{{scope.row.gender |formatGender}}</template>
        </el-table-column>
        <el-table-column label="来源科室"  align="center">
          <template slot-scope="scope">{{scope.row.fromDeptName }}</template>
        </el-table-column>
        <el-table-column label="来源医生" align="center">
          <template slot-scope="scope">{{scope.row.fromRealName }}</template>
        </el-table-column>
        <el-table-column label="身份证号" width="180" align="center">
          <template slot-scope="scope">{{scope.row.cardNo }}</template>
        </el-table-column>
        <el-table-column label="创建时间" width="180" align="center">
          <template slot-scope="scope">{{scope.row.createTime }}</template>
        </el-table-column>
        <el-table-column width="250"   align="center">
          <template slot="header" >
            <el-button-group>
              <el-button round size="mini"  :class="active == 0 ? 'active-btn':''" @click="changeBtn(0)">测评任务</el-button>
              <el-button round size="mini" :class="active == 1 ? 'active-btn':''" @click="changeBtn(1)">治疗任务</el-button>
            </el-button-group>
          </template>
          <template slot-scope="scope" >
               <el-button
                size="mini"
                round
                class="active"
                @click="handleRecord(scope.row)">测评记录
              </el-button>
              <el-button
                size="mini"
                round
                :class="scope.row.examinationId!=3?'active':''">
                测评
              </el-button>
              <el-button
                size="mini"
                round
                :class="scope.row.examinationStatus==3?'active':''">
                报告
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
      title="刷卡验证"
      :visible.sync="dialogVisible"
      width="30%">
      <div class="cardContent">
        <el-image class="img" :src="require('@/views/pat/imgs/cardID.png')"></el-image>
        <p class="flag">请将磁卡置于机器上方</p>
        <p>刷卡成功后进行后续操作</p>
        <el-form ref="cardForm"
                 :model="cardForm"
                 :rules="rules">
          <el-form-item   prop="cardID" >
             <el-input v-model="cardForm.cardID" placeholder="请输入身份证号"></el-input>
          </el-form-item>
        </el-form>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPatient('cardForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {queryPatient,queryExamination} from '@/api/patient'
  import {mapGetters} from 'vuex'
  import { Message, MessageBox } from 'element-ui'
  export default {
    name: "list",
    data() {
      return {
        contentState:null,
        radio:null,
        list: null,
        examinationList:[],
        cardForm:{
          cardID:""
        },
        listLoading: false,
        dialogVisible:false,
        total:0,
        active:0,
        listQuery: {
          cardNo: "",
          createTimeStart: "",
          examinationId: null,
          examinationStatus: null,
          pid: "",
          realName: "",
          pageNum: 1,
          pageSize: 10
        },
        rules:{
          cardID: [
            {required: true, message: '请输入身份证号码', trigger: 'blur'},
            { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '身份证格式不正确',trigger: 'blur' }
          ]
        }

      }
    },
    computed:{
      ...mapGetters([             //步骤二，对象扩展运算符方式
        "info"
      ])
    },
    created() {
       this.getExaminationBtn();
       this.getList()
    },
    filters:{
      formatGender(gender){
        return gender?"女":"男"
      },
      formatAge(birthday){
        let age=birthday.substring(0,4);
        let year=new Date().getFullYear();
        return year-age-1;
      }
    },
    methods: {
      handleRecord(data){
        this.$router.push({
          path: '/pat/assessRecord',
          query: {
            id: data.pid
          }
        })
      },
      addPatient(formName){
        this.$refs[formName].validate((valid) => {
          if(valid){
            this.dialogVisible=false;
            this.$router.push({
              path: '/pat/patAdd',
              query: {
                id: this.cardForm.cardID
              }
            })
          }
        })

      },
      queryData(){
        this.listQuery.pageNum = 1;
        this.getList();
      },
      getExaminationBtn(){
        queryExamination(this.info.deptId).then(res=>{
          if(res.code==200){
            this.examinationList=res.dataList;
          }
        })
      },
      changeBtn(val){
        this.active=val;
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
      getList(){
        this.listLoading=true;
        queryPatient(this.listQuery).then(res=>{
          this.listLoading=false;
          if(res.code==200){
            this.list=res.dataList;
            this.total=res.pageInfo.total;
          }
        }).catch(error => {
         this.listLoading=false;
        })
      }
    },

  }
</script>

<style scoped>
  .cardContent{
    width: 100%;
    text-align: center;
  }
  .cardContent .img{
    width: 160px;
    height: 120px;
    margin: 10px auto;
  }
  .cardContent p{
    line-height: 35px;
  }
  .flag{
    font-size: 16px;
    font-weight: bold;
    color: #222;
  }
  .flag-type{
    font-size: 14px;
    font-weight: bold;
    color: #222;
  }
  .flag-type .text{
    padding: 0 10px;
    color: #A6CE39;
  }
  .flag-type .num{
    padding: 0 10px;
    color:#1197D6;
  }
  .cardContent .card-input{
    text-align: center;
  }
  .search-btn{
    width: 100px;
  }
  .active{
    border:1px solid #1197D6;
    color: #1197D6;
  }
  .active-btn{
    background: #1197D6!important;
    color: #fff!important;
  }
</style>

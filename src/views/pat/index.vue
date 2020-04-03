<template>
  <div class="app-container">
    <el-form :inline="true" :model="listQuery" size="small">
      <div>
        <el-form-item >
          <el-input   placeholder="患者编号" v-model.number="listQuery.pid" clearable></el-input>
        </el-form-item>
        <el-form-item >
          <el-input placeholder="患者姓名" v-model="listQuery.realName" clearable></el-input>
        </el-form-item>
        <el-form-item >
          <el-input placeholder="身份证号" v-model="listQuery.cardNo" clearable></el-input>
        </el-form-item>
        <el-form-item >
          <el-date-picker
            v-model="createDate"
            type="daterange"
            range-separator="至"
            start-placeholder="起始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            @change="handleTimeChange">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="success" round class="search-btn" @click="queryData()">查询</el-button>
          <el-button type="success" round class="search-btn" @click="dialogVisible = true">患者登记</el-button>
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
        <!-- <el-table-column label="序号" width="60" align="center">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column> -->
        <el-table-column label="编号" width="80" align="center">
          <template slot-scope="scope">{{scope.row.pid}}</template>
        </el-table-column>
        <el-table-column label="患者姓名" align="center">
          <template slot-scope="scope">{{scope.row.realName }}</template>
        </el-table-column>
        <el-table-column label="年龄" width="100" align="center">
          <template slot-scope="scope">
            {{scope.row.birthday|formatAge}}
          </template>
        </el-table-column>
        <el-table-column label="性别" width="100" align="center">
          <template slot-scope="scope">{{scope.row.gender |formatGender}}</template>
        </el-table-column>
         <el-table-column label="出生日期"  align="center">
          <template slot-scope="scope">{{scope.row.birthday }}</template>
        </el-table-column>
        <el-table-column label="身份证号" align="center">
          <template slot-scope="scope">{{scope.row.cardNo }}</template>
        </el-table-column>
        <el-table-column label="创建时间"  align="center">
          <template slot-scope="scope">{{scope.row.createTime }}</template>
        </el-table-column>
        <el-table-column width="250" label="操作"  align="center">
          <template slot-scope="scope" >
               <el-button
                size="mini"
                round
                class="active"
                @click="handleEdit(scope.row)">编辑
              </el-button>
              <el-button
                size="mini"
                class="active"
                round
                @click="historyRecord(scope.row)">
                历史记录
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
        <el-button type="primary" @click="readCardData">刷 卡</el-button>
        <el-button type="success" @click="addPatient('cardForm')">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import {queryPatient,queryExamination} from '@/api/patient'
  import {medicalRecordListData} from '@/api/medicalRecord'
  import {readCard} from '@/api/cardRead'
  import {mapGetters} from 'vuex'
  import { Message, MessageBox } from 'element-ui'
  export default {
    name: "list",
    data() {
      return {
        createDate:[],
        examinationList:[],
        cardForm:{
          cardID:""
        },
        patientMsg:"",
        list:[],
        taskList:[],
        dialogVisible2:false,
        listLoading: false,
        dialogVisible:false,
        total:0,
        listQuery: {
          cardNo: "",
          createTimeStart: "",
          createTimeEnd:"",
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
            { pattern:  /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '身份证格式不正确',trigger: 'blur' }
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
       this.getList()
    },
    filters:{
      formatGender(gender){
        return gender?"女":"男"
      },
      formatAge(birthday){
        if(birthday&&birthday!=""){
          let age=birthday.substring(0,4);
          let year=new Date().getFullYear();
          return year-age-1;
        }
         return "";
      },
      formatState(val){
        if(val==1){
          return "未测评"
        }else if(val==2){
          return "测评中"
        }else{
          return "已完成"
        }
        return "";
      }
    },
    methods: {
      historyRecord(data){
         this.$router.push({
          path: '/pat/assessRecord',
          query: {
            id: data.pid,
            name:data.realName
          }
        })
      },
      handleTask(val){
        this.patientMsg=val;
        this.listLoading=true;
        let param={
           queryParamMedicalRecord : {
             patientId:this.patientId
           },
           pageNum: 1,
          pageSize: 20
        }
        medicalRecordListData(param).then(res=>{
          this.listLoading=false;
          if(res.code==200){
            this.taskList=res.dataList;
            this.dialogVisible2=true;
          }
        }).catch(error => {
         this.listLoading=false;
        })
      },
      handleEdit(val){
         this.$router.push({
              path: '/pat/patUpdate',
              query: {
                id: val.cardNo,
                name:val.realName
              }
          })
      },
      handleTimeChange(val){
        this.listQuery.createTimeStart=this.createDate[0];
        this.listQuery.createTimeEnd=this.createDate[1];
      },
      readCardData(){
        readCard().then(res=>{

           //  if(res.cardno){
          //   let cardMsg={}
          //   cardMsg.realName=res.name;
          //   cardMsg.gender=res.sex=="男"?false:true;
          //   cardMsg.nation=res.nation;
          //   cardMsg.cardNo=res.cardno;
          //   sessionStorage.setItem("cardMsg",JSON.stringify(cardMsg))
          //   this.cardForm.cardID=res.cardno
          // }
          if(res.code==200){
            this.cardForm.cardID=res.data.cardno
             let cardMsg={}
              cardMsg.realName=res.data.name;
              cardMsg.gender=res.data.sex=="男"?false:true;
              cardMsg.nation=res.data.nation;
              cardMsg.cardNo=res.data.cardno;
            sessionStorage.setItem("cardMsg",JSON.stringify(cardMsg))
          }else{
            this.$message.warning("刷卡失败")
          }
        })
      },
      addPatient(formName){
        this.$refs[formName].validate((valid) => {
          if(valid){
            this.dialogVisible=false;
            let cardMsg=JSON.parse(sessionStorage.getItem("cardMsg"))
            let name="";
            if(cardMsg&&cardMsg!=""){
                name=cardMsg.realName
            }
            this.$router.push({
              path: '/pat/patAdd',
              query: {
                id: this.cardForm.cardID,
                name:name,
              }
            })
          }
        })

      },
      queryData(){
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
      getList(){
        
        let reg=/^[0-9]*$/;
        if(this.listQuery.pid!=""&&!reg.test(this.listQuery.pid)){
          this.$message.warning("患者编号必须是数字");
          return
        } 
        this.listLoading=true;
        queryPatient(this.listQuery).then(res=>{
          this.listLoading=false;
          if(res.code==200){
            this.list=res.dataList;
            this.total=res.pageInfo.total;
          }else{
            this.$message.warning("没有查到数据")
             this.list=[];
            this.total=0;
          }
        }).catch(error => {
         this.listLoading=false;
        })
      }
    },

  }
</script>

<style scoped>
  .card-box{
    text-align: center;
    margin-bottom: 30px;
  }
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

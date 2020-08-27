<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <el-form label-width="150px" size="mini">
      <el-row >
        <el-col :span="24">
          <div class="title">会员信息</div>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="6">
           <el-form-item class="flex-item" label="会员号:">
                <p>{{memberObj.memberNo}}</p>
            </el-form-item>
        </el-col>
        <el-col :span="6">
           <el-form-item class="flex-item" label="会员姓名:">
                <p>{{memberObj.wxName}}</p>
            </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item class="flex-item" label="性别:">
                <p>{{memberObj.sex==1?"男":"女"}}</p>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item class="flex-item" label="出生日期:">
                <p>{{memberObj.birthDate}}</p>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="6">
          <el-form-item class="flex-item" label="身份证号:">
                <p>{{memberObj.idCard}}</p>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item class="flex-item" label="注册用户名:">
                <p>{{memberObj.wxName}}</p>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item class="flex-item" label="注册手机号:">
                <p>{{memberObj.wxTel}}</p>
          </el-form-item>
        </el-col>
      </el-row>
      </el-form>
    </el-card>
    <el-card>
      <p class="title">会员产品信息</p>
      <el-table 
       border
      :data="memberList" style="width: 100%">
        <el-table-column label="会员产品" align="center">
          <template slot-scope="scope">{{scope.row.productType|formatProType}}</template>
        </el-table-column>
        <el-table-column label="会员状态" align="center">
          <template slot-scope="scope">{{scope.row.state|formatState}}</template>
        </el-table-column>
        <el-table-column label="有效期" align="center">
          <template slot-scope="scope">{{scope.row.expiryDate}}</template>
        </el-table-column>
        <el-table-column label="复查次数" align="center">
          <template slot-scope="scope">{{scope.row.reviewNo}}/{{scope.row.reviewTimes}}</template>
        </el-table-column>
         <el-table-column label="机构类型" align="center">
          <template slot-scope="scope">{{scope.row.orgType|formatOrgType}}</template>
        </el-table-column>
         <el-table-column label="机构名称" align="center">
          <template slot-scope="scope">{{scope.row.orgName}}</template>
        </el-table-column>
         <el-table-column label="一级结构" align="center">
          <template slot-scope="scope">{{scope.row.firstOrg}}</template>
        </el-table-column>
         <el-table-column label="二级结构" align="center">
          <template slot-scope="scope">{{scope.row.secondOrg}}</template>
        </el-table-column>
        <el-table-column label="联系人" align="center">
          <template slot-scope="scope">{{scope.row.linkman}}</template>
        </el-table-column>
         <el-table-column label="联系电话" align="center">
          <template slot-scope="scope">{{scope.row.memberTel}}</template>
        </el-table-column>
         <el-table-column label="联系地址" align="center">
          <template slot-scope="scope">{{scope.row.address}}</template>
        </el-table-column>
         <el-table-column label="负责人" align="center">
          <template slot-scope="scope">{{scope.row.memberManager}}</template>
        </el-table-column>
         <el-table-column label="购买日期" align="center">
          <template slot-scope="scope">{{scope.row.createDate}}</template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { queryMember } from "@/api/member";
import { Message, MessageBox } from "element-ui";
export default {
  name: "IPS-A",
  data() {
    return {
      memberObj: "",
      memberList:[]
    };
  },

  created() {
    this.memberId = this.$route.query.id;
    queryMember(this.memberId).then(res => {
      if (res.code == 200) {
        this.memberObj = res.dataList[0];
        this.memberList=res.dataList[0].memberInfoVos;
      }
    });
  },
  filters: {
    formatProType(val){
        switch (val) {
          case 1:
            return "365成长计划";
          
        }

      return "";
    },
    formatState(val) {
        switch (val) {
          case 1:
            return "有效";
          case 2:
            return "已过期";
        }

      return "";
    },
     formatOrgType(val) {
        switch (val) {
          case 1:
            return "学校";
          case 2:
            return "社区";
        }

      return "";
    }
  },

  methods: {}
};
</script>

<style scoped>
.title{
  margin: 20px 0;
  font-size: 18px;
  color: #666;
  font-weight: bold;
}

.operate-container {
  margin-bottom: 15px;
  font-size: 14px;
}
.active {
  border: 1px solid #1197d6;
  color: #1197d6;
}
</style>

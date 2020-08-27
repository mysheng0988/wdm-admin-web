<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
       <div class="title">订单信息</div>
       <div
        class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition"
        center
        style="width: 100%;">
        <table
          cellspacing="0"
          cellpadding="0"
          border="0"
          class="el-table__header"
          style="width: 100%;">
          <thead class="has-gutter">
            <tr class="blue">
              <th colspan="1" rowspan="1">
                <div class="cell">订单类型</div>
              </th>
              <th colspan="1" rowspan="1">
                <div class="cell">订单号</div>
              </th>
              <th colspan="1" rowspan="1">
                <div class="cell">下单用户</div>
              </th>
              <th colspan="1" rowspan="1">
                <div class="cell">下单手机号</div>
              </th>
              <th colspan="1" rowspan="1">
                <div class="cell">负责人</div>
              </th>
               <th colspan="1" rowspan="1">
                <div class="cell">下单时间</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="el_table__row">
              <td>
                <div class="cell">{{orderObj.orderType}}</div>
              </td>
              <td>
                <div class="cell">{{orderObj.orderId}}</div>
              </td>
              <td>
                <div class="cell">{{orderObj.orderUser}}</div>
              </td>
              <td>
                <div class="cell">{{orderObj.orderTel}}</div>
              </td>
              <td>
                <div class="cell">{{orderObj.orderManager}}</div>
              </td>
               <td>
                <div class="cell">{{orderObj.orderDate}}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <div class="title">订单用户信息</div>
      <div
        class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition"
        center
        style="width: 100%;">
        <table
          cellspacing="0"
          cellpadding="0"
          border="0"
          class="el-table__header"
          style="width: 100%;">
          <thead class="has-gutter">
            <tr class="blue">
              <th colspan="1" rowspan="1">
                <div class="cell">会员姓名</div>
              </th>
              <th colspan="1" rowspan="1">
                <div class="cell">性别</div>
              </th>
              <th colspan="1" rowspan="1">
                <div class="cell">证件号</div>
              </th>
              <th colspan="1" rowspan="1">
                <div class="cell">出生日期</div>
              </th>
              <th colspan="1" rowspan="1">
                <div class="cell">年龄</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="el_table__row">
              <td>
                <div class="cell">{{orderObj.stuName}}</div>
              </td>
              <td>
                <div class="cell">{{orderObj.stuSex==1?"男":"女"}}</div>
              </td>
              <td>
                <div class="cell">{{orderObj.idCard}}</div>
              </td>
              <td>
                <div class="cell">{{orderObj.birthDate}}</div>
              </td>
              <td>
                <div class="cell">{{orderObj.studentAge}}</div>
              </td>
            </tr>
            <tr class="el_table__row blue">
              <td>
                <div class="cell">所在年级（一级机构）</div>
              </td>
              <td>
                <div class="cell">所在班级（二级机构）</div>
              </td>
              <td>
                <div class="cell">联系人</div>
              </td>
              <td>
                <div class="cell">联系电话</div>
              </td>
              <td>
                <div class="cell">联系地址</div>
              </td>
            </tr>
            <tr class="el_table__row">
              <td>
                <div class="cell">{{orderObj.firstOrg}}</div>
              </td>
              <td>
                <div class="cell">{{orderObj.secondOrg}}</div>
              </td>
              <td>
                <div class="cell">{{orderObj.linkman}}</div>
              </td>
              <td>
                <div class="cell">{{orderObj.linkTel}}</div>
              </td>
              <td>
                <div class="cell">{{orderObj.address}}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { queryOrder } from "@/api/order";
import { Message, MessageBox } from "element-ui";
export default {
  name: "IPS-A",
  data() {
    return {
      orderId: "",
      orderObj: ""
    };
  },

  created() {
    this.orderId = this.$route.query.id;
    queryOrder(this.orderId).then(res => {
      if (res.code == 200) {
        this.orderObj = res.dataList[0];
      }
    });
  },
  filters: {
    formatProType(val) {
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
.title {
  margin: 20px 0;
  font-size: 18px;
  color: #666;
  font-weight: bold;
}

.operate-container {
  margin-bottom: 15px;
  font-size: 14px;
}
.el-table th,
.el-table tr.blue {
  background: #9cd7eb;
  color: #fff;
}
.cell {
  text-align: center;
}
</style>

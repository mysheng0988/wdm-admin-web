<template>
 <div class="app-container">
    <div class="form-pdf">
      <div class="container">
        <div class="title">青少年体态健康复查表</div>
        <div class="label-date">检测日期:{{resultData.auditTime}}</div>
        <div class="table-box">
          <div class="flex-wrap tr">
            <div class="flex-center item1">
              <div class="label">姓名:</div>
              <div class="text">{{resultData.studentName}}</div>
            </div>
            <div class="flex-center item2 td">
              <div class="label">性别:</div>
              <div class="text">{{resultData.sex==1?"男":"女"}}</div>
            </div>
            <div class="flex-center item3">
              <div class="label">出生日期:</div>
              <div class="text">{{resultData.birthDate}}</div>
            </div>
          </div>
          <div class="flex-wrap tr">
            <div class="flex-center item1">
              <div class="label">年龄:</div>
              <div class="text">{{resultData.studentAge}}岁</div>
            </div>
            <div class="flex-center item2 td">
              <div class="label">民族:</div>
              <div class="text"></div>
            </div>
            <div class="flex-center item3">
              <div class="label">身份证号:</div>
              <div class="text">{{resultData.idCard}}</div>
            </div>
          </div>
          <div class="flex-wrap tr">
            <div class="flex-center item1">
              <div class="label">监护人:</div>
              <div class="text">{{resultData.linkman}}</div>
            </div>
            <div class="flex-center item4 td2">
              <div class="label">地址:</div>
              <div class="text">{{resultData.address}}</div>
            </div>
          </div>
        </div>
        <div class="label-text">备注：年龄≤10岁不检测人体成分！</div>
        <div class="flex-wrap">
          <div class="table2-box">
            <div class="flex">
              <div class="th2">指标</div>
              <div class="th border">检测结果</div>
              <div class="th border">参考值</div>
            </div>
            <div class="flex tr">
              <div class="td2">身高cm</div>
              <div class="td border">{{resultData.height}}</div>
              <div class="td border">---</div>
            </div>
            <div class="flex tr">
              <div class="td2">体重kg</div>
              <div class="td border">{{resultData.weight}}</div>
              <div class="td border">---</div>
            </div>
            <div class="flex tr">
              <div class="td2">体温°C</div>
              <div class="td border">{{resultData.temperature}}</div>
              <div class="td border">---</div>
            </div>
            <div class="flex tr">
              <div class="td2">视力（左）</div>
              <div class="td border">{{resultData.visionLeft}}</div>
              <div class="td border">---</div>
            </div>
            <div class="flex tr">
              <div class="td2">视力（右）</div>
              <div class="td border">{{resultData.visionRight}}</div>
              <div class="td border">---</div>
            </div>
            <div class="flex tr">
              <div class="td2">脉率/次/分</div>
              <div class="td border">{{resultData.pulseState}}</div>
              <div class="td border">---</div>
            </div>
            <div class="flex tr">
              <div class="td2">血氧饱和度</div>
              <div class="td border">{{resultData.boSaturation}}</div>
              <div class="td border">---</div>
            </div>
            <div class="flex tr">
              <div class="td2">肌肉量</div>
              <div class="td border">{{resultData.muscleMass}}</div>
              <div class="td border">---</div>
            </div>
            <div class="flex tr">
              <div class="td2">肌肉率</div>
              <div class="td border">{{resultData.muscleL}}</div>
              <div class="td border">---</div>
            </div>
            <div class="flex tr">
              <div class="td2">体质指数BMI</div>
              <div class="td border">{{resultData.bmi}}</div>
              <div class="td border">---</div>
            </div>
            <div class="flex tr">
              <div class="td2">基础代谢率 Kcal/日</div>
              <div class="td border">{{resultData.metabolicRate}}</div>
              <div class="td border">---</div>
            </div>
          </div>
          <div class="table2-box">
            <div class="flex">
              <div class="th2">指标</div>
              <div class="th border">检测结果</div>
              <div class="th border">参考值</div>
            </div>
            <div class="flex tr">
              <div class="td2">坐高cm</div>
              <div class="td border">{{resultData.sitHigh}}</div>
              <div class="td border">---</div>
            </div>
            <div class="flex tr">
              <div class="td2">腰臀比</div>
              <div class="td border">{{resultData.whRatio}}</div>
              <div class="td border">---</div>
            </div>
            <div class="flex tr">
              <div class="td2">体型</div>
              <div class="td border">{{resultData.shape|formatShape}}</div>
              <div class="td border">---</div>
            </div>
            <div class="flex tr">
              <div class="td2">剃刀背</div>
              <div class="td border">{{resultData.razorback}}</div>
              <div class="td border">---</div>
            </div>
            <div class="flex tr">
              <div class="td2">驼背</div>
              <div class="td border">{{resultData.humpback|formatHumpback}}</div>
              <div class="td border">---</div>
            </div>
            <div class="flex tr">
              <div class="td2">高低肩</div>
              <div class="td border">{{resultData.hlShoulders|formatHlShoulders}}</div>
              <div class="td border">---</div>
            </div>
            <div class="flex tr">
              <div class="td2">腰线是否对称</div>
              <div class="td border">{{resultData.waistlineSymmetric|formatWhether}}</div>
              <div class="td border">---</div>
            </div>
            <div class="flex tr">
              <div class="td2">髋关节是否等高</div>
              <div class="td border">{{resultData.hipContour|formatWhether}}</div>
              <div class="td border">---</div>
            </div>
            <div class="flex tr">
              <div class="td2">双下肢是否等长</div>
              <div class="td border">{{resultData.legDiscrepancy|formatWhether}}</div>
              <div class="td border">---</div>
            </div>
            <div class="flex tr">
              <div class="td2">膝关节检查结果</div>
              <div class="td border">{{resultData.kneeResult|formatKneeResult}}</div>
              <div class="td border">---</div>
            </div>
            <div class="flex tr">
              <div class="td2">足底压力分析</div>
              <div class="td border">{{resultData.plantarPressure|formatPlantarPressure}}</div>
              <div class="td border">---</div>
            </div>

          </div>
        </div>
        <div class="img-box flex-wrap">
          <el-image class="solgan" :src="solgan"></el-image>
          <div class="flex-end">
            <el-image class="wxPublicNo" :src="wxPublicNo"></el-image>
            <div class="label-text">
                <p>为了孩子脊柱健康成长</p>
                <p>建议您持续动态监测相关指标</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
</template>
<script>
import {getTaskResult} from "@/api/reviewTaskResult";
import solgan from "@/assets/images/solgan.png";
import wxPublicNo from "@/assets/images/wxPublicNo.png";
export default {
  name: "re-pdf",
  data() {
    return {
      solgan: solgan,
      wxPublicNo:wxPublicNo,
      resultData:""
    };
  },
  filters: {
    formatWhether(val) {
      return val == 1 ? "是" : "否";
    },
    formatHumpback(val) {
      return val == 1 ? "有" : "无";
    },
    formatHlShoulders(val){
      switch(val){
        case "1":
          return "正常"
        break;
        case "2":
           return "左肩高"
        break;
        case "3":
          return "右肩高"
        break;
      }
    },
    formatKneeResult(val){
      switch(val){
        case "1":
          return "正常"
        break;
        case "2":
           return "X型腿"
        break;
        case "3":
          return "O型腿"
        break;
      }
    },
    formatPlantarPressure(val){
       switch(val){
        case "1":
          return "低弓足"
        break;
        case "2":
           return "中弓足"
        break;
        case "3":
          return "高弓足"
        break;
      }
    },
    formatShape(val){
       switch(val){
        case 1:
          return "正常"
        break;
        case 2:
           return "偏瘦"
        break;
        case 3:
          return "超重"
        case 4:
          return "肥胖"
        break;
      }
    }
  },
  mounted(){
     let id= this.$route.query.id;
     this.getTaskResultData(id);
  },
  methods: {
    getTaskResultData(id){
      getTaskResult(id).then(res=>{
          this.resultData=res.dataList[0];
      })
    },
  }
};
</script>
<style lang="scss" scoped>
.form-pdf{
  margin: 0 auto;
}
.container {
  padding: 50px 31px;
  font-size: 15px;
  line-height: 35px;
  .title{
    font-size: 32px;
    font-weight: bold;
    color: #000;
    text-align: center;
    margin: 10px 0;
  }
  .label-date{
    color:#333;
    font-size: 16px;
    margin: 15px 0;
    font-weight: bold;
    text-align: right;
  }
  .label-text{
    margin: 10px 0;
    color:#666;
    font-size: 16px;
    font-weight: bold;
    text-align: right;
  }
  .img-box {
    margin: 25px 0;
    p{
      line-height: 25px;
    }
    .solgan{
      width: 180px;
      height: 76px;
      vertical-align: middle;
      overflow: hidden;
    }
    .wxPublicNo{
      width: 98px;
      height: 98px;
      vertical-align: middle;
      overflow: hidden;
    }
  }
}
.item1 {
  width: 220px;
  padding: 0 20px;
}
.item2 {
  width: 200px;
  padding: 0 20px;
}
.item3 {
  flex: 1;
  padding: 0 20px;
}
.item1,
.item2,
.item3,
.td2 {
  .label {
    color: #666;
    font-weight: 500;
    font-size: 18px;
  }
  .text {
    margin: 0 5px;
    color: #666;
    font-size: 15px;
  }
}
.table-box {
  border: 1px solid #49b13f;
  .th {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #49b13f;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border: 1px solid #49b13f;
  }
  .tr {
    height: 50px;
    line-height: 50px;
    border: 1px solid #49b13f;
    .td {
      width: 22%;
      border-left: 1px solid #49b13f;
      border-right: 1px solid #49b13f;
    }
    .td2 {
      flex: 1;
      padding: 0 20px;
      border-left: 1px solid #49b13f;
    }
  }
}
.table2-box {
  width: 345px;
  border: 1px solid #49b13f;
  .th2 {
    width: 140px;
    height: 45px;
    line-height: 45px;
    background: #49b13f;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border: 1px solid #49b13f;
    &.border {
      border-left: 1px solid #fff;
    }
  }
  .th {
    flex:1;
    height: 45px;
    line-height: 45px;
    background: #49b13f;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border: 1px solid #49b13f;
    &.border {
      border-left: 1px solid #fff;
    }
  }
  .tr {
    height: 45px;
    line-height: 45px;
    border: 1px solid #49b13f;
    .td2 {
      width: 140px;
      text-align: center;
      color: #666;
      font-size: 15px;
    }
    .td {
      flex: 1;
      text-align: center;
      color: #666;
      font-size: 15px;
      &.border {
        border-left: 1px solid #49b13f;
      }
    }
  }
}
</style>
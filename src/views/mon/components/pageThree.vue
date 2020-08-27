<template>
    <div class="form-pdf">
      <div class="container">
        <div class="table-box">
          <div class="th">基本信息</div>
          <div class="flex-wrap tr">
            <div class="flex-center item1">
              <div class="label">姓名:</div>
              <div class="text">{{data.studentName}}</div>
            </div>
            <div class="flex-center item2 td">
              <div class="label">性别:</div>
              <div class="text">{{data.sex==1?"男":"女"}}</div>
            </div>
            <div class="flex-center item3">
              <div class="label">出生日期:</div>
              <div class="text">{{data.birthDate}}</div>
            </div>
          </div>
          <div class="flex-wrap tr">
            <div class="flex-center item1">
              <div class="label">年龄:</div>
              <div class="text">{{data.studentAge}}岁</div>
            </div>
            <div class="flex-center item2 td">
              <div class="label">民族:</div>
              <div class="text"></div>
            </div>
            <div class="flex-center item3">
              <div class="label">身份证号:</div>
              <div class="text">{{data.idCard}}</div>
            </div>
          </div>
          <div class="flex-wrap tr">
            <div class="flex-center item1">
              <div class="label">监护人:</div>
              <div class="text">{{data.linkman}}</div>
            </div>
            <div class="flex-center item4 td2">
              <div class="label">地址:</div>
              <div class="text">{{data.address}}</div>
            </div>
          </div>
        </div>
        <div class="flex-wrap">
          <div class="table2-box">
            <div class="flex">
              <div class="th">指标</div>
              <div class="th border">检测结果</div>
            </div>
            <div class="flex tr">
              <div class="td">身高cm</div>
              <div class="td border">{{data.height}}</div>
            </div>
            <div class="flex tr">
              <div class="td">体重kg</div>
              <div class="td border">{{data.weight}}</div>
            </div>
            <div class="flex tr">
              <div class="td">脂肪量kg</div>
              <div class="td border">{{data.fatContent}}</div>
            </div>
            <div class="flex tr">
              <div class="td">水分率%</div>
              <div class="td border">{{data.moistureContent}}</div>
            </div>
            <div class="flex tr">
              <div class="td">体质指数BMI</div>
              <div class="td border">{{data.bmi}}</div>
            </div>
            <div class="flex tr">
              <div class="td">肌肉量kg</div>
              <div class="td border">{{data.muscleMass}}</div>
            </div>
            <div class="flex tr">
              <div class="td">内脏脂肪</div>
              <div class="td border">{{data.visceralFat}}</div>
            </div>
            <div class="flex tr">
              <div class="td">体型</div>
              <div class="td border">{{data.shape|formatShape}}</div>
            </div>
            <div class="flex tr">
              <div class="td">视力</div>
              <div class="td border">左:{{data.visionLeft}} 右:{{data.visionRight}}</div>
            </div>
            <div class="flex tr">
              <div class="td">脉率 次/分</div>
              <div class="td border">{{data.pulseState}}</div>
            </div>
            <div class="flex tr">
              <div class="td">血氧饱和度%</div>
              <div class="td border">{{data.boSaturation}}</div>
            </div>
            <div class="flex tr">
              <div class="td">剃刀背ATI</div>
              <div class="td border">{{data.razorback}}</div>
            </div>
            <div class="flex tr">
              <div class="td">高低肩</div>
              <div class="td border">{{data.hlShoulders|formatHlShoulders}}</div>
            </div>
            <div class="flex tr">
              <div class="td">腰线是否对称</div>
              <div class="td border">{{data.waistlineSymmetric|formatWhether}}</div>
            </div>
            <div class="flex tr">
              <div class="td">双下肢是否等长</div>
              <div class="td border">{{data.legDiscrepancy|formatWhether}}</div>
            </div>
          </div>
          <div class="table2-box">
            <div class="flex">
              <div class="th">指标</div>
              <div class="th border">检测结果</div>
            </div>
            <div class="flex tr">
              <div class="td">坐高cm</div>
              <div class="td border">{{data.sitHigh}}</div>
            </div>
            <div class="flex tr">
              <div class="td">脂肪率%</div>
              <div class="td border">{{data.fatRate}}</div>
            </div>
            <div class="flex tr">
              <div class="td">去脂体重kg</div>
              <div class="td border">{{data.fatFreeWeight}}</div>
            </div>
            <div class="flex tr">
              <div class="td">水分量kg</div>
              <div class="td border">{{data.waterContent}}</div>
            </div>
            <div class="flex tr">
              <div class="td">骨量kg</div>
              <div class="td border">{{data.boneMass}}</div>
            </div>
            <div class="flex tr">
              <div class="td">肌肉率%</div>
              <div class="td border">{{data.muscleL}}</div>
            </div>
            <div class="flex tr">
              <div class="td">基础代谢率Kcal/日</div>
              <div class="td border">{{data.metabolicRate}}</div>
            </div>
            <div class="flex tr">
              <div class="td">体温°C</div>
              <div class="td border">{{data.temperature}}</div>
            </div>
            <div class="flex tr">
              <div class="td">血压mmHg</div>
              <div class="td border">{{data.bloodPressure}}</div>
            </div>
            <div class="flex tr">
              <div class="td">腰臀比</div>
              <div class="td border">{{data.whRatio}}</div>
            </div>
            <div class="flex tr">
              <div class="td">肺功能</div>
              <div class="td border">{{data.lungFunction}}</div>
            </div>
            <div class="flex tr">
              <div class="td">膝关节检查结果</div>
              <div class="td border">{{data.kneeResult|formatKneeResult}}</div>
            </div>
            <div class="flex tr">
              <div class="td">驼背</div>
              <div class="td border">{{data.humpback|formatHumpback}}</div>
            </div>
            <div class="flex tr">
              <div class="td">髋关节是否等高</div>
              <div class="td border">{{data.hipContour|formatWhether}}</div>
            </div>
            <div class="flex tr">
              <div class="td">足底压力分析</div>
              <div class="td border">{{data.plantarPressure|formatPlantarPressure}}</div>
            </div>
          </div>
        </div>
        <el-image class="footerPath" :src="footerPath"></el-image>
      </div>
      <div class="pageNum">3</div>
    </div>
</template>
<script>
import footerPath from "@/assets/images/footer-bg.png";
export default {
  name: "pageThree",
   props:{
        data:{
            type:Object,
        }
    },
  data() {
    return {
      footerPath: footerPath
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
  methods: {}
};
</script>
<style lang="scss" scoped>
.container {
  padding: 70px 31px;
  font-size: 15px;
  line-height: 35px;
  .footerPath {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: -1;
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
  margin-top: 20px;
  width: 345px;
  border: 1px solid #49b13f;
  .th {
    width: 100%;
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
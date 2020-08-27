<template>
  <div class="app-container home">
    <el-form :inline="true" :model="listQuery" size="small">
      <el-form-item>
        <el-select v-model="listQuery.orgType" placeholder="机构类型" class="input-width">
          <el-option :value="1" label="学校"></el-option>
          <el-option :value="2" label="社区"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="机构名称" v-model="listQuery.orgName" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="年级" v-model="listQuery.firstOrg" clearable></el-input>
      </el-form-item>
      <el-form-item>
         <el-date-picker
            v-model="listQuery.startTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择开始时间">
          </el-date-picker>
      </el-form-item>
      <el-form-item>
         <el-date-picker
            v-model="listQuery.endTime"
            type="datetime"
             value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择结束时间">
          </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button class="search-btn" @click="clearData">
          <svg-icon icon-class="reset-icon" class-name="search-icon"></svg-icon>重置
        </el-button>
        <el-button icon="el-icon-search" type="success" class="search-btn" @click="initData()">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="chart-box flex-center">
      <div class="chart-item">
        <ve-pie :data="resData" height="350px" :extend="extend1"></ve-pie>
      </div>
      <div class="chart-item">
        <ve-pie :data="crowdData" height="350px" :extend="extend2"></ve-pie>
      </div>
    </div>
    <div class="chart-box flex-center">
      <div class="chart-item">
        <ve-line :data="chartData" height="350px" :extend="extend3" :settings="chartSettings"></ve-line>
      </div>
      <div class="chart-item">
        <ve-histogram :settings="chartSettings" height="350px" :data="chartData2" :extend="extend4"></ve-histogram>
      </div>
    </div>
  </div>
</template>

<script>
import "v-charts/lib/style.css";
import { Message, MessageBox } from "element-ui";
import {
  countClassesResult,
  countResults,
  countScoliosis,
  countSexResult
} from "@/api/home";
export default {
  name: "home",
  data() {
    return {
      listQuery: {
        firstOrg: "",
        orgName: "",
        orgType: "",
        endTime:"",
        startTime:"",
      },
      yearList: [],
      resData: {
        columns: ["label", "用户数"],
        rows: [
          { label: "正常", 用户数: 1393 },
          { label: "异常", 用户数: 3530 }
        ]
      },
      crowdData: {
        columns: ["label", "用户数"],
        rows: [
          { label: "腰弯", 用户数: 393 },
          { label: "胸弯", 用户数: 530 },
          { label: "S弯", 用户数: 1393 },
          { label: "C弯", 用户数: 3530 }
        ]
      },
      statisticsData: {},
      chartSettings: {
        yAxisType: ["percent"]
      },
      extend1: {
        title: {
          text: "筛查结果汇总"
        },
        color: ["#02D135", "#E4772C", "#2C9BE3", "#ECC422", "#91c7ae"],
        grid: {
          top: 40,
          left: 10,
          right: 40,
          bottom: 10,
          containLabel: true
        },
        toolbox: {
          show: true,
          feature: {
            restore: {},
            saveAsImage: {}
          }
        }
      },
      extend2: {
        title: {
          text: "风险人群侧弯类型分析"
        },
        color: [
          "#02D135",
          "#E4772C",
          "#2C9BE3",
          "#ECC422",
          "#91c7ae",
          "#749f83"
        ],
        grid: {
          top: 40,
          left: 10,
          right: 40,
          bottom: 10,
          containLabel: true
        },
        toolbox: {
          show: true,
          feature: {
            restore: {},
            saveAsImage: {}
          }
        }
      },
      extend3: {
        title: {
          text: "年级风险分布"
        },
        color: ["#02D135", "#E4772C", "#2C9BE3", "#ECC422"],
        grid: {
          top: 40,
          left: 10,
          right: 40,
          bottom: 10,
          containLabel: true
        },
        legend:{
          show:false
        },
        toolbox: {
          show: true,
          feature: {
            magicType: { type: ["line", "bar"] },
            restore: {},
            saveAsImage: {}
          }
        }
      },
      extend4: {
        title: {
          text: "男女风险分布"
        },
        color: [
          "#02D135",
          "#E4772C",
          "#2C9BE3",
          "#ECC422",
          "#91c7ae",
          "#749f83",
          "#ca8622",
          "#bda29a",
          "#6e7074",
          "#546570",
          "#c4ccd3"
        ],
        grid: {
          top: 40,
          left: 10,
          right: 40,
          bottom: 10,
          containLabel: true
        },
        toolbox: {
          show: true,
          feature: {
            magicType: { type: ["line", "bar"] },
            restore: {},
            saveAsImage: {}
          }
        }
      },
      dataEmpty: true,
      chartData: {
        columns: ["label", "用户数"],
        rows: []
      },
      chartData2: {
        columns: ["label", "男生", "女生"],
        rows: [
          { label: "正常", 男生: 1393, 女生: 1093 },
          { label: "低风险", 男生: 3530, 女生: 3230 },
          { label: "高风险", 男生: 2923, 女生: 2623 }
        ]
      }
    };
  },
  filters: {},
  mounted() {
    let year = new Date().getFullYear();
    let yearList = [];
    for (let i = year; i > year - 20; i--) {
      let yearStr = i - 1 + "-" + "03~" + i + "-09";
      yearList.push(yearStr);
    }
    this.yearList = yearList;
    this.initData();
  },
  methods: {
    clearData() {
      this. listQuery= {
        firstOrg: "",
        orgName: "",
        orgType: "",
        endTime:"",
        startTime:"",
      }
    },
    initData() {
      this.countClassesResultData();
      this.countResultsData();
      this.countScoliosisData();
      this.countSexResultData();
    },
    countClassesResultData() {
      this.chartData.rows = [];
      countClassesResult(this.listQuery).then(res => {
        if (res.code == 200) {
          for (let item of res.dataList) {
            let param = {};
            param.label = item.firstOrg;
            param["用户数"] = item.classesRate / 100;
            this.chartData.rows.push(param);
          }
        }
      });
    },
    countResultsData() {
      this.resData.rows[0]["用户数"] = 0;
      this.resData.rows[1]["用户数"] = 0;
      countResults(this.listQuery).then(res => {
        if (res.code == 200) {
          let data = res.dataList[0];
          this.resData.rows[0]["用户数"] = data.normal;
          this.resData.rows[1]["用户数"] = data.abnormalChild;
        }
      });
    },
    countScoliosisData() {
      this.crowdData.rows[0]["用户数"] = 0;
      this.crowdData.rows[1]["用户数"] = 0;
      this.crowdData.rows[2]["用户数"] = 0;
      this.crowdData.rows[3]["用户数"] = 0;
      countScoliosis(this.listQuery).then(res => {
        if (res.code == 200) {
          let data = res.dataList[0];
          this.crowdData.rows[0]["用户数"] = data.waistCurvedChild;
          this.crowdData.rows[1]["用户数"] = data.chestCurvedChild;
          this.crowdData.rows[2]["用户数"] = data.scurvedChild;
          this.crowdData.rows[3]["用户数"] = data.ccurvedChild;
        }
      });
    },
    countSexResultData() {
      this.chartData2.rows[0]["男生"] = 0;
      this.chartData2.rows[0]["女生"] = 0;
      this.chartData2.rows[1]["男生"] = 0;
      this.chartData2.rows[1]["女生"] = 0;
      this.chartData2.rows[2]["男生"] = 0;
      this.chartData2.rows[2]["女生"] = 0;
      countSexResult(this.listQuery).then(res => {
        if (res.code == 200) {
          let data = res.dataList[0];
          this.chartData2.rows[0]["男生"] = data.maleNormal / 100;
          this.chartData2.rows[0]["女生"] = data.reMaleNormal / 100;
          this.chartData2.rows[1]["男生"] = data.maleLowRisk / 100;
          this.chartData2.rows[1]["女生"] = data.reMaleLowRisk / 100;
          this.chartData2.rows[2]["男生"] = data.maleHighRisk / 100;
          this.chartData2.rows[2]["女生"] = data.reMaleHighRisk / 100;
        }
      });
    },
    handleTask(val) {
      switch (val) {
        case "1":
          this.$router.push("/pat/list");
          break;
        case "2":
          this.$router.push("/ips/index");
          break;
        case "3":
          this.$router.push("/rep/list");
          break;
        case "4":
          this.$message.success("敬请期待!");
          break;
      }
    }
  }
};
</script>

<style scoped >
.total-layout {
  margin-top: 10px;
}

.total-frame {
  background: #f5f5f5;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  box-shadow: -1px 1px 5px #d8d8d8;
  padding: 20px;
  height: 100px;
  margin: 10px 0;
}
.frame {
  line-height: 30px;
  padding: 20px 0 20px 50px;
  height: 120px;
  margin: 10px 0;
}
.treatment {
  background: url("imgs/treatment.png") no-repeat;
  background-size: 100% 100%;
  color: #fff;
}
.frame.warning {
  background: url("imgs/patient.png") no-repeat;
  background-size: 100% 100%;
  color: #fff;
}
.report {
  background: url("imgs/report.png") no-repeat;
  background-size: 100% 100%;
  color: #fff;
}
.checkup {
  background: url("imgs/checkup.png") no-repeat;
  background-size: 100% 100%;
  color: #fff;
}

.total-icon {
  color: #ffffff;
  width: 60px;
  height: 60px;
}

.total-title {
  width: 100px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

.total-value {
  font-size: 28px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: bold;
}
.chart-box {
  margin: 18px 30px;
}
.chart-item {
  flex: 1;
}
.chart {
  width: 80%;
  position: relative;
}
.item-box {
  margin: 0 40px;
  flex: 1;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  position: relative;
}
.item-box span {
  margin-left: 30px;
}
.text-right {
  text-align: right;
  position: absolute;
  right: 10px;
  bottom: 0px;
}
/deep/ .v-charts-data-empty {
  background-color: rgba(255, 255, 255, 0.4);
}
</style>

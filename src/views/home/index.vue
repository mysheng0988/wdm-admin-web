<template>
  <div class="app-container home">
    <div class="total-layout">
      <el-row :gutter="10">
        <el-col  :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
          <div class="frame flex-center warning" @click="handleTask('1')">
            <svg-icon icon-class="patient" class-name="total-icon"></svg-icon>
            <div class="item-box">
                <div>新增患者</div>
                <div class="total-value">{{statisticsData.patientIncrement}}</div>
               <div class="text-right">
                  总患者数
                  <span>{{statisticsData.patientTotal}}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col  :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
          <div class="frame flex-center checkup" @click="handleTask('2')">
            <svg-icon icon-class="checkup" class-name="total-icon"></svg-icon>
            <div class="item-box">
              <div>今日未完成</div>
              <div class="total-value">{{statisticsData.todayUndoneExaminationTaskTotal}}</div>
               <div class="text-right">
                总测评任务
                <span>{{statisticsData.examinationTaskTotal}}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col  :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
          <div class="frame flex-center report" @click="handleTask('3')">
            <svg-icon icon-class="report-icon" class-name="total-icon"></svg-icon>
            <div class="item-box">
              <div>今日报告量</div>
              <div class="total-value">{{statisticsData.todayReportTotal}}</div>
              <div class="text-right">
                总报告数
                <span>{{statisticsData.reportTotal}}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col  :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
          <div class="frame flex-center treatment" @click="handleTask('4')">
            <svg-icon icon-class="treatment" class-name="total-icon"></svg-icon>
            <div class="item-box">
              <div>未完成任务</div>
              <div class="total-value">{{statisticsData.todayUndoneTreatmentTaskTotal}}</div>
              <div class="text-right">
                总治疗任务
                <span>{{statisticsData.treatmentTaskTotal}}</span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="chart-box">
      <ve-line
        class="chart"
        :data-empty="dataEmpty"
        height="280px"
        :data="chartData"
        :settings="chartSettings1"
        :extend="extend"
      ></ve-line>
    </div>
    <div class="chart-box">
      <ve-line
        class="chart"
        :data-empty="dataEmpty"
        height="280px"
        :data="chartData2"
        :settings="chartSettings2"
        :extend="extend"
      ></ve-line>
    </div>
  </div>
</template>

<script>
import "v-charts/lib/style.css";
import { Message, MessageBox } from "element-ui";
import { getHomeData } from "@/api/home";
export default {
  name: "home",

  data() {
    return {
      statisticsData: {},
      chartSettings1: {
        labelMap: {
          examinationA: "筛查测评A",
          examinationB: "专科测评B",
          examinationC: "综合测评C"
        },
        xAxisType: "time"
      },
      chartSettings2: {
        labelMap: {
          patientIncrement: "新增患者数",
          examinationTaskTotal: "测评任务数",
          treatmentTaskTotal: "治疗任务数"
        },
        xAxisType: "time"
      },
      extend: {
        grid: {
          top: 40,
          left: 10,
          right: 40,
          bottom: 10,
          containLabel: true
        },
        xAxis: {
          maxInterval: 3600 * 24 * 1000
        },
        yAxis: {
          minInterval: 1
        }
      },
      dataEmpty: true,
      chartData: {
        columns: [
          "collectionDate",
          "examinationA",
          "examinationB",
          "examinationC"
        ],
        rows: []
      },
      chartData2: {
        columns: [
          "collectionDate",
          "patientIncrement",
          "examinationTaskTotal",
          "treatmentTaskTotal"
        ],
        rows: []
      }
    };
  },
  filters: {},
  mounted() {
    getHomeData().then(res => {
      if (res.code == 200) {
        this.dataEmpty = false;
        this.statisticsData = res.dataList[0];
        this.chartData.rows = this.statisticsData.examinationDataList;
        this.chartData2.rows = this.statisticsData.otherDataList;
      }
    });
  },

  methods: {
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

<style scoped>
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
.item-box span{
  margin-left: 30px;
}
.text-right{
  text-align: right;
  position:absolute;
  right: 10px;
  bottom: 0px;
}
/deep/ .v-charts-data-empty {
  background-color: rgba(255, 255, 255, 0.4);
}
</style>

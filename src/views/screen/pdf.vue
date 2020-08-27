<template>
  <div class="app-container">
    <div class="container">
      <div class="header-box flex-wrap">
        <div class="flex-center">
          <p class="title">脊柱侧弯检测报告</p>
          <div class="content">
            <p>检测时间：{{resData.endTime}}</p>
            <p>检测地点：{{resData.organName}}</p>
          </div>
        </div>
        <el-image class="img" :src="logoPath"></el-image>
      </div>
      <div class="flex-wrap content-box">
        <div class="left-box">
          <div class="result">
            结果分析
            <span>胸椎 腰椎</span>
          </div>
          <div class="position">
            胸椎
            <span>侧弯部位：ATI最大值部位</span>
          </div>
          <div class="direction">
            <p class="fixed">侧弯方向</p>
            <el-checkbox label="左" v-model="resData.tdirectionEnd==1"></el-checkbox>
            <el-checkbox label="右" v-model="resData.tdirectionEnd==2"></el-checkbox>
          </div>
          <div class="angle">
            <p class="fixed">侧弯角度</p>
            <div>{{resData.tangleEnd}}°</div>
          </div>
          <div class="position">
            腰椎
            <span>侧弯部位：ATI最大值部位</span>
          </div>
          <div class="direction">
            <p class="fixed">侧弯方向</p>
            <el-checkbox label="左" v-model="resData.ldirectionEnd==1"></el-checkbox>
            <el-checkbox label="右" v-model="resData.ldirectionEnd==2"></el-checkbox>
          </div>
          <div class="angle">
            <p class="fixed">侧弯角度</p>
            <div>{{resData.langleEnd}}°</div>
          </div>
          <div class="position">示意图</div>
          <div class="canvas">
            <div class="legend-box flex-wrap">
              <div class="flex">
                <div class="legend normal"></div>
                <div>正常</div>
              </div>
              <div class="flex">
                <div class="legend low"></div>
                <div>低风险</div>
              </div>
              <div class="flex">
                <div class="legend risk"></div>
                <div>高风险</div>
              </div>
            </div>
            <ve-line :data="chartData" :extend="extend "></ve-line>
          </div>
          <div class="position">风险程度</div>
          <div class="level">
            <p>
              <el-checkbox v-model="resData.result==1" label="正常"></el-checkbox>
            </p>
            <p>
              <el-checkbox v-model="resData.result==2" label="低风险"></el-checkbox>
            </p>
            <p>
              <el-checkbox v-model="resData.result==3" label="高风险"></el-checkbox>
            </p>
          </div>
        </div>
        <div class="msg-box">
          <div class="result">注释与结论</div>
          <div class="position">既往结果</div>
          <div class="res-box flex">
            <div>无</div>
            <!-- <div>
              <p>侧弯部位—胸椎</p>
              <p>侧弯方向—左</p>
              <p>侧弯角度—3度</p>
            </div>-->
          </div>
          <div class="assess">评估意见</div>
          <div class="assess1">
            <div class="flex">
              <el-checkbox class="checkbox"></el-checkbox>
              <div>
                <p class="title">正常</p>
                <p>建议适度增加体育运动</p>
              </div>
            </div>
            <div class="flex">
              <el-checkbox class="checkbox"></el-checkbox>
              <div>
                <p class="title">低风险</p>
                <p>建议家长定期监测孩子的脊柱侧弯角度，持续两个月没有改善，应该积极到专业康复机构进行脊柱侧弯康复治疗和训练。</p>
              </div>
            </div>
          </div>
          <div class="assess2">
            <div class="flex">
              <el-checkbox class="checkbox"></el-checkbox>
              <div>
                <p class="title">高风险</p>
                <p>建议及时就诊，到正规医院拍摄脊柱全长 立位X光片和其他检查以确诊。同事积极到 专业康复机构进行脊柱侧弯康复治疗和训 练，必要时进行支具矫形或手术治疗。</p>
                <p class="title">
                  签字:
                  <el-image class="img" :src="sginName"></el-image>
                </p>
              </div>
            </div>
          </div>
          <div class="base-msg">基本信息</div>
          <div class="base-msg-content">
            <div class="flex">
              <p class="label">姓名</p>
              <p>:{{resData.studentName}}</p>
            </div>
            <div class="flex">
              <p class="label">性别</p>
              <p>:{{resData.studentSex==1?"男":'女'}}</p>
            </div>
            <div class="flex">
              <p class="label">年级</p>
              <p>:{{resData.firstOrg}}</p>
            </div>
            <div class="flex">
              <p class="label">班级</p>
              <p>:{{resData.secondOrg}}</p>
            </div>
            <div class="flex">
              <p class="label">出生日期</p>
              <p>:{{resData.studentBirthDate}}</p>
            </div>
            <div class="flex">
              <p class="label">当前年龄</p>
              <p>:{{resData.studentAge}}岁</p>
            </div>
            <div class="flex">
              <p class="label">身高</p>
              <p>:</p>
            </div>
            <div class="flex">
              <p class="label">体重</p>
              <p>:</p>
            </div>
          </div>
          <div class="position">风险程度</div>
          <div class="level">
            <p>北京协和医院青少年脊柱畸形诊断协作中心</p>
            <p>参考标准:《GB/T 16133-2014》</p>
            <p>客服电话：4006-537-532</p>
            <p>测试人员：{{resData.screenPersonal}}</p>
            <p>打印时间：{{resData.createTime}}</p>
          </div>
        </div>
      </div>
      <div class="tips">*本报告仅作为筛查结果，不作为诊断依据。</div>
    </div>
  </div>
</template>
 
  <script>
import { getReportData } from "@/api/report";
import img from "@/assets/images/wdm-logo.png";
import sginName from "@/assets/images/sgin-name.png";
export default {
  name: "pdf",
  data() {
    return {
      logoPath: img,
      sginName: sginName,
      reportId: "",
      resData: {},
      extend: {
        grid:{
          bottom:100,
        },
        legend:{
         show: false
        },
        tooltip:{
          show:false,
        },
        yAxis:{
           show:false,
            max:20,
            min:0,
        },
        xAxis:{
         type: 'value',
        axisLabel: {
            formatter: '{value} °'
        },
        max:15,
        min:-15,
        },
        series: {
          markLine:{
             symbol:"none",
            data:[
              [
                {
                 
                  yAxis: 0,
                  xAxis:0,
                },{
                  yAxis: 20,
                  xAxis:0,
                }
              ],
              [
                {
                 
                  yAxis: 10,
                  xAxis:-15,
                },{
                  yAxis: 10,
                  xAxis:15,
                }
              ]
            ]
          },
          markArea: {
            label:{
              color: "#B5B6B6" ,
            },
            data: [
               [ 
                  {
                    name: "15到7",
                    itemStyle:{
                      color:"#B5B6B6"
                    },
                    xAxis: "-15"
                  },
                  {
                    xAxis: "-7"
                  }
                ],
                [ 
                  {
                    name: "7到4",
                    itemStyle:{
                      color:"#D0D0D0"
                    },
                    xAxis: "-7"
                  },
                  {
                    xAxis: "-4"
                  }
                ],
                 [ 
                  {
                    name: "4到0",
                    itemStyle:{
                      color:"#ECECEC"
                    },
                    xAxis: "-4"
                  },
                  {
                    xAxis: "0"
                  }
                ],
                 [ 
                  {
                    name: "0到4",
                    itemStyle:{
                      color:"#ECECEC"
                    },
                    xAxis: "0"
                  },
                  {
                    xAxis: "4"
                  }
                ],
                 [ 
                  {
                    name: "4到7",
                    itemStyle:{
                      color:"#D0D0D0"
                    },
                    xAxis: "4"
                  },
                  {
                    xAxis: "7"
                  }
                ],
                 [ 
                  {
                    name: "7到15",
                    itemStyle:{
                      color:"#B5B6B6"
                    },
                    xAxis: "7"
                  },
                  {
                    xAxis: "15"
                  }
                ]
            ]
          }
        }
      },
      chartData: {
        columns: ["label", "value"],
        rows: [
          { "label": 0, "value": 20 },
          { "label": 0, "value": 15 },
          { "label": 0, "value": 10 },
          { "label": 0, "value": 5 },
          { "label": 0, "value": 0 }
        ]
      }
    };
  },
  mounted() {
    this.reportId = this.$route.query.id;
    getReportData(this.reportId).then(res => {
      if (res.code == 200) {
        let data=res.dataList[0];
        this.resData = res.dataList[0];
        if(data.tangleEnd==1){
          this.chartData.rows[1].label=-data.tdirectionEnd
        }else{
           this.chartData.rows[1].label=data.tdirectionEnd
        }
        if(data.langleEnd==1){
          this.chartData.rows[3].label=-data.ldirectionEnd
        }else{
           this.chartData.rows[3].label=data.ldirectionEnd
        }
      }
    });
  }
};
</script>
<style lang="scss" scoped >
.container {
  width: 828px;
  padding: 20px 46px;
  height: 1169px;
  border: 1px solid #eeeeee;
  margin: 0 auto;
  overflow: hidden;
  .tips {
    margin-top: 10px;
    width: 100%;
    color: #4ab240;
    font-size: 12.5px;
    text-align: right;
  }
}
.header-box {
  margin-bottom: 10px;
  .title {
    font-size: 32px;
    color: #4ab240;
  }
  .content {
    margin: 0 10px;
    font-size: 12px;
    line-height: 20px;
  }
  .img {
    width: 61px;
    height: 57px;
    overflow: hidden;
    vertical-align: middle;
  }
}
.content-box {
  align-items: flex-start;
  .result {
    padding: 0 20px;
    width: 100%;
    height: 45px;
    line-height: 45px;
    background: #727171;
    color: #fff;
    font-size: 18px;
    span {
      font-size: 12px;
      margin: 0 10px;
    }
  }
  .position {
    padding: 0 20px;
    width: 100%;
    height: 45px;
    line-height: 45px;
    background: #b5b6b6;
    color: #fff;
  }
}
.left-box {
  width: 442px;
  margin-right: 5px;
  border: 1px solid #b5b6b6;
  .direction {
    width: 100%;
    height: 75px;
    border-bottom: 1px solid #b5b6b6;
    line-height: 75px;
    text-align: center;
    position: relative;
    p {
      line-height: 25px;
    }
    .fixed {
      position: absolute;
      right: 10px;
      top: 10px;
      font-size: 12.5px;
      color: #b5b5b6;
    }
  }
  .angle {
    width: 100%;
    height: 75px;
    line-height: 75px;
    text-align: center;
    border-bottom: 1px solid #b5b6b6;
    position: relative;
    p {
      line-height: 25px;
    }
    .fixed {
      position: absolute;
      right: 10px;
      top: 10px;
      font-size: 12.5px;
      color: #b5b5b6;
    }
  }

  .canvas {
    width: 100%;
    height: 322px;
    border-bottom: 1px solid #b5b6b6;
    position: relative;
    .legend-box{
      padding: 0 50px;
      position: absolute;
      width: 100%;
      top: 10px;
      z-index: 1000;
      .legend{
        margin: 0 10px;
        width: 15px;
        height: 15px;
      }
      .normal{
        background: #ECECEC
      }
      .low{
        background: #D0D0D0
      }
      .risk{
        background: #C2C2C2
      }
    }
  }
  .level {
    padding: 20px 30px;
    width: 100%;
    height: 163px;
    line-height: 40px;
  }
}
.msg-box {
  width: 296px;
  margin-left: 5px;
  border: 1px solid #b5b6b6;
  .res-box {
    padding: 10px 20px;
    line-height: 25px;
    height: 100px;
    font-size: 16px;
    border-bottom: 1px solid #b5b6b6;
    div {
      margin: 0 5px;
    }
  }
  .assess {
    padding: 0 20px;
    width: 100%;
    background: #4ab240;
    height: 45px;
    line-height: 45px;
    color: #fff;
  }
  .assess1 {
    padding: 10px 20px;
    height: 163px;
    border-bottom: 1px solid #b5b6b6;
    line-height: 1.5;
    font-size: 14px;
    color: #727171;
    .title {
      font-size: 16px;
    }
    .checkbox {
      margin-right: 10px;
    }
  }
  .assess2 {
    padding: 10px 20px;
    height: 200px;
    border-bottom: 1px solid #b5b6b6;
    line-height: 1.5;
    font-size: 14px;
    color: #727171;
    .title {
      font-size: 16px;
      .img {
        width: 140px;
        height: 61px;
        overflow: hidden;
        vertical-align: middle;
      }
    }
    .checkbox {
      margin-right: 10px;
    }
  }
  .base-msg {
    padding: 0 20px;
    width: 100%;
    height: 45px;
    line-height: 45px;
    background: #727171;
    color: #fff;
    font-size: 18px;
  }
  .base-msg-content {
    height: 221px;
    padding: 10px 20px;
    font-size: 16px;
    line-height: 1.5;
    color: #727171;
    .label {
      width: 70px;
      text-align-last: justify;
      text-align: justify;
      text-justify: distribute-all-lines;
    }
  }
  .level {
    width: 100%;
    height: 100px;
    padding: 10px 20px;
    line-height: 1.5;
    font-size: 12px;
  }
}
</style>
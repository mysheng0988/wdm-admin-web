<template>
  <div class="app-container" >
    <div class="pdf-container" id="pdfCentent">
        <div class="form-pdf"  >
          <div class="pdf-bar"></div>
          <div class="box-label">
            <div class="flex-center"><div class="lable-text">DIRECTORY</div><div class="title">目录</div></div>
          </div>
          <div class="content-box">
              <div class="flex-wrap">
                <div class="round"></div>
                <div >基本信息</div>
                <div class="content">------------------------------------------------------------------------------------</div>
                <div>01</div>
              </div>
              <div class="flex-wrap">
                <div class="round"></div>
                <div >就诊经历</div>
                <div class="content">------------------------------------------------------------------------------------</div>
                <div>02</div>
              </div>
              <div class="flex-wrap">
                <div class="round"></div>
                <div >三维评估</div>
                <div class="content">------------------------------------------------------------------------------------</div>
                <div>03</div>
              </div>
              <div class="flex-wrap">
                <div class="round"></div>
                <div >报告分析总结</div>
                <div class="content">------------------------------------------------------------------------------------</div>
                <div>04</div>
              </div>
              <div class="flex-wrap">
                <div class="round"></div>
                <div >治疗方案参考</div>
                <div class="content">------------------------------------------------------------------------------------</div>
                <div>06</div>
              </div>
              <div class="flex-wrap">
                <div class="round"></div>
                <div >附录1. 患者教育</div>
                <div class="content">------------------------------------------------------------------------------------</div>
                <div>08</div>
              </div>
              <div class="flex-wrap">
                <div class="round"></div>
                <div >附录2. 自主神经检查</div>
                <div class="content">------------------------------------------------------------------------------------</div>
                <div>12</div>
              </div>
              <div class="flex-wrap">
                <div class="round"></div>
                <div >附录3. EEG检测</div>
                <div class="content">------------------------------------------------------------------------------------</div>
                <div>13</div>
              </div>
              <div class="flex-wrap">
                <div class="round"></div>
                <div >附录4. 量表评估</div>
                <div class="content">------------------------------------------------------------------------------------</div>
                <div>14</div>
              </div>
          </div>
        </div>
        <div class="form-pdf"  >
          <div class="pdf-bar-left"></div>
          <div class="msg-box">
            <div class="title">基本信息</div>
            <div class="msg">
              <el-form ref="form" label-width="80px" size="mini">
                  <div class="flex-wrap">
                    <el-form-item class="flex-item" label="姓 名:">
                      <p>小明</p>
                    </el-form-item>
                    <el-form-item class="flex-item" label="性别:">
                      <p>女</p>
                    </el-form-item>
                    <el-form-item class="flex-item" label="年 龄:">
                      <p>41</p>
                    </el-form-item>
                </div>
                  <div class="flex-wrap">
                    <el-form-item class="flex-item" label="病历号:">
                      <p>0009617136</p>
                    </el-form-item>
                    <el-form-item class="flex-item" label="民 族:">
                      <p>汉</p>
                    </el-form-item>
                    <el-form-item class="flex-item" label="宗教:">
                      <p>无</p>
                    </el-form-item>
                </div>
                <div class="flex-wrap">
                    <el-form-item class="flex-item" label="婚姻:">
                      <p>未婚</p>
                    </el-form-item>
                    <el-form-item class="flex-item" label="文化程度:">
                      <p>大专</p>
                    </el-form-item>
                    <el-form-item class="flex-item" label="科室:">
                      <p>心血管内科</p>
                    </el-form-item>
                  </div>
                  <div class="flex-wrap">
                    <el-form-item class="flex-item" label="临床诊断:">
                      <p>高血压</p>
                    </el-form-item>
                    <el-form-item class="flex-item" label="住院号:">
                      <p>41</p>
                    </el-form-item>
                    <el-form-item class="flex-item" label="床号:">
                      <p>41</p>
                    </el-form-item>
                  </div>
              </el-form>
            </div>
          </div>
          <div class="symptom-box">
            <div class="symptom-title">症状描述</div>
            <div class="symptom-content flex-center">
              <img class="img" src="@/views/report/img/main-symptom.png">
              <div class="content">
                <div class="title">主要症状</div>
                <div class="lable"> 胸憋、胸痛、憋气、头晕、头痛、濒死感</div>
                <div class="lable">发作频率：每月2次</div>
                <div class="lable">首次发作时间：2018-04-19 12:19</div>
                <div class="lable">末次发作时间：2019-10-28  09:36</div>
                <div class="lable">严重程度：重</div>                    
              </div>
            </div>
            <div class="symptom-content flex-center">
              <img class="img" src="@/views/report/img/icon-symptom.png">
              <div class="content">
                <div class="title">伴随症状</div>
                <div class="lable">恶心、呕吐、视线模糊</div>                   
              </div>
            </div>
            <div class="symptom-content flex-center">
              <img class="img" src="@/views/report/img/motion-symptom.png">
              <div class="content">
                <div class="title">运动症状</div>
                <div class="lable">手抖</div>              
              </div>
            </div>
          </div>
          <img class="footer-img" src="@/views/report/img/icon-foot.png">
        </div>
        <experience></experience>
    </div>
   <el-button type="danger" @click="getPdf('pdfCentent','nowTime')">导出PDF</el-button>
  </div>
</template>

<script>
    import experience from 'components/experience'
    export default {
      name: "pdf",
      components: { experience },
      data() {
        return {
          activeNames: ['1']
        };
      },
      methods: {
        handleChange(val) {
          console.log(val);
        }
      }
    }
</script>

<style scoped  >
    .app-container{
      text-align: center
    }
    .pdf-container{
      width: 768px;
      margin: 0 auto;
    }
   .form-pdf{
     position: relative;
      width: 768px;
      height: 1092px;
      border:1px solid #eee;
   }
   .pdf-bar{
     width: 649px;
     height: 10px;
     position:absolute;
     right: 0;
     top:12px;
     background:url("./img/pdf-bar.png") no-repeat;
     background-size: 100% 100%;
   }
   .pdf-bar-left{
     width: 649px;
     height: 10px;
     margin-top: 12px;
     background:url("./img/pdf-bar2.png") no-repeat;
     background-size: 100% 100%;
   }
   .box-label{
     margin: 55px 20px;
     width: 697px;
     height: 108px;
     line-height: 108px;
     text-align: left;
     background:#2B8FB8;
     color:#fff;
   }
  .box-label .lable-text{
    font-size: 10px; 
    text-align: left;
    margin-left: 110px;
    width: 10px;
    line-height: 10px;
    transform: scale(0.8);
    writing-mode: vertical-lr;/*从左向右 从右向左是 writing-mode: vertical-rl;*/  
    writing-mode: tb-lr;
  }
  .box-label .title{
    font-size: 60px;
  }
  .content-box{
    margin: 60px 125px;
    font-size: 26px;
    color: #2B8FB8;
  }
  .content-box .round{
    width: 10px;
    height: 10px;
    margin: 0 10px;
    background: #2B8FB8;
    border-radius: 10px;
  }
  .content-box .content{
      flex:1;
      margin: 25px 10px;
      white-space: nowrap;
      overflow: hidden;
  }
  .msg-box{
    margin: 70px;
    text-align: left;
  }
  .msg-box .title{
    font-size: 30px;
    color:#2B8FB8; 
  }
  .msg{
    margin:20px 0;
    padding: 0 20px;
    border-left: 4px solid #2B8FB8;
  }
  .msg-box .flex-item{
    flex:1;
    margin-bottom: 5px;
  }
  .symptom-box{
    margin: 0 70px;
  }
  .symptom-title{
    width: 205px;
    height: 53px;
    line-height: 53px;
    font-size: 30px;
    background:url("./img/pdf-label.png") no-repeat;
     background-size: 100% 100%;
     color: #fff;
  }
  .symptom-content{
    margin-top: 50px;
  }
  .symptom-content .img{
    margin: 0 10px ;
    width: 77px;
    height: 77px;
  }
  .symptom-content .content{
    margin: 0 20px ;
    text-align: left;
    flex: 1;
    line-height: 35px;
  }
  .symptom-content .content .title{
    font-size: 24px;
    color: #222;
  }
  .symptom-content .content .title .lable{
     font-size: 16px;
    color: #666;
  }
  .footer-img{
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
</style>

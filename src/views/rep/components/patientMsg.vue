<template> 
  <div class="form-pdf patient-msg"  >
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
        <img class="img" src="@/views/rep/img/main-symptom.png">
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
        <img class="img" src="@/views/rep/img/icon-symptom.png">
        <div class="content">
          <div class="title">伴随症状</div>
          <div class="lable">恶心、呕吐、视线模糊</div>                   
        </div>
      </div>
      <div class="symptom-content flex-center">
        <img class="img" src="@/views/rep/img/motion-symptom.png">
        <div class="content">
          <div class="title">运动症状</div>
          <div class="lable">手抖</div>              
        </div>
      </div>
    </div>
    <img class="footer-img" src="@/views/rep/img/icon-foot.png">
  </div>
</template>
<script>
  export default {
    name: 'patientMsg'
  }
</script>
<style  scoped>
 .form-pdf.patient-msg{
      padding: 70px;
      background:url("../img/patient-msg.png");
      background-size: 768px 1091px;
   }
  .msg-box{
    margin-top: 70px;
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
  .symptom-title{
    width: 205px;
    height: 53px;
    line-height: 53px;
    font-size: 30px;
    background:url("../img/pdf-label.png") no-repeat;
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



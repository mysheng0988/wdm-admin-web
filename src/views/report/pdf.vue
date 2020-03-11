<template>
  <div class="app-container">
  <div class="form-pdf" shadow="never" id="pdf">
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
   <div class="form-pdf" shadow="never" >
    <div class="pdf-bar-left"></div>
    <div class="msg-box">
      <div class="title">基本信息</div>
      <div class="msg">
        姓 名：高云 性 别：女 年 龄：41 病 历 号：0009617136 民 族：汉 宗 教：无
        <div class="flex-warp">
          <div>姓 名：高云</div>
          <div>性别：女</div>
          <div>年 龄：41</div>
        </div>
         <div class="flex-warp">
          <div>病 历 号：0009617136</div>
          <div>性别：女</div>
          <div>年 龄：41</div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
    export default {
      name: "edit",
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

<style scoped>
    .app-container{
      text-align: center
    }
   .form-pdf{
     position: relative;
      width: 595px;
      height: 842px;
      margin: 10px auto;
      border:1px solid #eee;
   }
   .pdf-bar{
     width: 504px;
     height: 20px;
     position:absolute;
     right: 0;
     top:20px;
     background:url("./img/pdf-bar.png") no-repeat;
     background-size: 100% 100%;
   }
   .pdf-bar-left{
     width: 504px;
     height: 20px;
     margin-top: 20px;
     background:url("./img/pdf-bar2.png") no-repeat;
     background-size: 100% 100%;
   }
   .box-label{
     margin: 60px 20px;
     width: 540px;
     height: 120px;
     line-height: 120px;
     text-align: left;
     background:#2B8FB8;
     color:#fff;
   }
  .box-label .lable-text{
    font-size: 10px; 
    text-align: left;
    margin-left: 30px;
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
    margin: 50px;
    font-size: 26px;
    line-height: 60px;
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
      margin: 0 10px;
      white-space: nowrap;
      overflow: hidden;
  }
  .msg-box{
    padding: 30px 20px;
    text-align: left;
  }
  .msg-box .title{
    font-size: 30px;
    color:#2B8FB8; 
  }
  .msg{
    padding: 20px;
    border-left: 4px solid #2B8FB8;
  }
</style>

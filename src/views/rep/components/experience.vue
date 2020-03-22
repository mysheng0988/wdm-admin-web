<template>
  <div class="form-pdf experience">
    <div class="content-box">
      <el-timeline class="time-box">
            <el-timeline-item timestamp="2018" placement="top" type="primary" size="large">
            </el-timeline-item>
            <el-timeline-item timestamp="02.05" placement="top" color="#1B9BC0">
                <p>患者再次因突发性胸憋、胸痛、憋气、头晕、头痛、濒死感入院</p>
                <p>心电图示ST段抬高，心肌酶、肌钙蛋白、肌钙蛋白I正常,血压最高216/115mHg，诊断为冠心病、高血压3级 很高危；</p>
                <p>出院后给予硝苯地平控释片30mg BID，厄贝沙坦氢氯噻嗪1片 QD治疗。</p>
            </el-timeline-item>
            <el-timeline-item timestamp="02.25" placement="top" color="#1B9BC0">
                <p>患者再次因突发性胸憋、胸痛、憋气、头晕、头痛、濒死感入院</p>
                <p>心电图示ST段抬高，心肌酶、肌钙蛋白、肌钙蛋白I正常,血压最高216/115mHg，诊断为冠心病、高血压3级 很高危；</p>
                <p>出院后给予硝苯地平控释片30mg BID，厄贝沙坦氢氯噻嗪1片 QD治疗。</p>
            </el-timeline-item>
            <el-timeline-item timestamp="2019" type="primary"  placement="top" size="large">
            </el-timeline-item>
            <el-timeline-item timestamp="02.15" placement="top" color="#1B9BC0">
                <p>患者再次因突发性胸憋、胸痛、憋气、头晕、头痛、濒死感入院</p>
                <p>心电图示ST段抬高，心肌酶、肌钙蛋白、肌钙蛋白I正常,血压最高216/115mHg，诊断为冠心病、高血压3级 很高危；</p>
                <p>出院后给予硝苯地平控释片30mg BID，厄贝沙坦氢氯噻嗪1片 QD治疗。</p>
            </el-timeline-item>
            <el-timeline-item timestamp="02.25" placement="top" color="#1B9BC0">
                <p>患者再次因突发性胸憋、胸痛、憋气、头晕、头痛、濒死感入院</p>
                <p>心电图示ST段抬高，心肌酶、肌钙蛋白、肌钙蛋白I正常,血压最高216/115mHg，诊断为冠心病、高血压3级 很高危；</p>
                <p>出院后给予硝苯地平控释片30mg BID，厄贝沙坦氢氯噻嗪1片 QD治疗。</p>
            </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
    export default {
        name: "experience",
        props:{
          experienceData:{
            type:Array,
            default:[]
          },
      },
      data(){
        return{

        }
      },
      mounted(){
          // let experienceYear=[];
          // let 
          // for(let item of this.experienceData){

          // }
      },
    }
</script>

<style scoped>
    .form-pdf.experience{
      padding: 70px;
      background:url("../img/experience.png");
      background-size: 768px 1091px;
   }
   .content-box{
     margin-top: 100px;
     text-align: left;
   }
  .time-box{
    width:600px;
    margin: auto;
    line-height: 35px;
  }
</style>

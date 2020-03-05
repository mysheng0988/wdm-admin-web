<template>
  <div>
    <div class="answer-box" v-if="answerData.type==1" >
      <div class="title">{{answerData.scaleTitle}}</div>
      <div class="explain">说明:{{answerData.explain}}</div>
      <el-progress v-if="percentage" :percentage="percentage" :format="formatPercentage"></el-progress>
      <div v-if="problemData.label!=''">{{problemData.label}}</div>
      <div class="question">{{problemData.questionNum}}、{{problemData.question}} {{problemData.answers}}</div>
      <el-radio-group v-model="problemData.answers" >
        <div class="question" v-for="(item,index) in problemData.answer">
          <el-radio :label="index+1" >{{item}}</el-radio>
        </div>
      </el-radio-group>
    </div>
    <div class="answer-box" v-else-if="answerData.type==2" >
      <div class="title">{{answerData.scaleTitle}}</div>
      <div class="explain">说明:{{answerData.explain}}</div>
      <el-progress v-if="percentage" :percentage="percentage" :format="formatPercentage"></el-progress>
      <div v-if="problemData.label!=''">{{problemData.label}}</div>
      <div class="question">{{problemData.questionNum}}、{{problemData.question}}</div>
      <div class="question" v-for="(item,index) in problemData.data" :key="index">
        <div class="question" v-if="item.type==='0'">
          <span>({{index+1}})、{{item.label}}</span>
          <el-radio-group v-model="item.answers">
            <el-radio v-model="radio" v-for="(itemData,itemIndex) in item.answer" :label="itemIndex+1" :key="itemIndex">{{itemData}}</el-radio>
          </el-radio-group>
        </div>
        <div class="question" v-else-if="item.type==='1'">
          <span>({{index+1}})、{{item.label}}</span><el-input-number v-model="num" size="small" label="描述文字"></el-input-number>
        </div>
        <div class="question" v-else-if="item.type==='2'">
          <span>({{index+1}})、{{item.label}}</span><el-input class="remark" v-model="num"  label="描述文字"></el-input>
        </div>
      </div>
    </div>
    <div class="answer-box" v-else-if="answerData.type==3" >
      <div class="title">{{answerData.scaleTitle}}</div>
      <div class="explain">说明:{{answerData.explain}}</div>
      <el-progress v-if="percentage" :percentage="percentage" :format="formatPercentage"></el-progress>
      <div class="question">{{problemData.label}}</div>
      <div class="question">{{problemData.title}}</div>
      <div class="question">{{problemData.questionNum}}、{{problemData.question}}</div>
      <div v-if="problemData.symptom" class="symptom">
        <el-checkbox-group v-model="problemData.data" >
          <el-checkbox v-for="(item,index) in problemData.symptom" :label="item" :key="index">{{item.label}}</el-checkbox>
        </el-checkbox-group>
        <div class="symptom" v-for="(item,index) in problemData.data" :key="index">
         ({{index+1}})、{{item.label}}
          <el-radio-group v-model="item.answers">
              <el-radio v-for="(itemData,indexData) in item.answer" :label="indexData+1" :key="indexData">{{itemData}}</el-radio>
          </el-radio-group>
        </div>
      </div>
     <div v-else>
       <el-radio-group v-model="problemData.answers">
         <div class="question" v-for="(item,index) in problemData.answer">
           <el-radio :label="index+1" >{{item}}</el-radio>
         </div>
       </el-radio-group>
     </div>

    </div>
    <div class="btn-box">
      <el-button type="primary" plain @click="prevQuestion">上一题</el-button>
      <el-button type="primary" plain @click="nextQuestion">下一题</el-button>
    </div>
  </div>

</template>

<script>
  import {getScaleJson} from '@/api/getJson'
    export default {
      name: "question",
      props: {
        scaleId: {
            type: String,
            default:"1"
          }
        },
      data() {
        return {
          answerData:[],
          problemData:[],
          questionNum:0,
          questionLength:0,
        }
      },
      mounted(){
        let num=Math.floor(Math.random()*31)
        getScaleJson(31).then(res=>{
          this.answerData=res.data;
          this.problemData=res.data.problem[0];
          this.questionLength=res.data.problem.length;
        })
      },
      computed:{
        percentage(){
          let percent=Math.ceil((this.questionNum+1)/this.questionLength*100);
          if(percent>100){
            percent=100;
          }
          return percent;
        },

      },
      methods:{
        handleCheckedChange(){

        },
        formatPercentage(){
          return (this.questionNum+1)+"/"+this.questionLength
        },
        prevQuestion(){
          if(this.questionNum<=0){
            this.$message.warning("当前是第一题")
          }else{
            this.questionNum--;
            this.problemData=this.answerData.problem[this.questionNum];
          }

        },
        nextQuestion(){
          if(this.questionNum<this.questionLength-1){
            this.questionNum++;
            this.problemData=this.answerData.problem[this.questionNum];
          }else{
            this.$message.warning("最后一题了")
          }

        },
      }
    }
</script>

<style scoped>
  .answer-box{
    width: 100%;
  }
  .answer-box span{
    margin: 0 20px;
  }
  .title{
    width: 100%;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
  }
  .explain{
    font-size: 14px;
    color: #666;
    line-height: 35px;
    text-indent: 2em;
  }
  .question{
    line-height: 45px;
  }
  .question label{
    line-height: 40px;
    width: 100%;text-overflow: ellipsis;white-space: normal;
  }
  .remark{width: 60%}
  .btn-box{
    width: 100%;
    text-align: center;
    margin: 20px 0;
  }
  .symptom{
    line-height: 45px;
  }
  .el-checkbox{
    margin-right: 5px;
  }
</style>

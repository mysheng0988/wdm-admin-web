<template>
  <div class="app-container">
    <div class="container">
    <div class="answer-box" v-if="data.type==1" >
      <div class="title">{{data.scaleTitle}}</div>
      <div class="explain">说明:{{data.explain}}</div>
      <div class="questionBox" v-for="(item,index) in data.problem" :key="index">
        <div class="question">{{index+1}}、{{item.question}}</div>
        <el-radio-group v-model="item.answer" disabled >
          <div class="question" v-for="(itemData,indexData) in item.answers" :key="indexData">
            <el-radio :label="indexData" >{{itemData}}</el-radio>
          </div>
        </el-radio-group>
      </div>
    </div>

    <div class="answer-box" v-else-if="data.type==2" >
      <div class="title">{{data.scaleTitle}}</div>
      <div class="explain">说明:{{data.explain}}</div>
       <div class="questionBox" v-for="(item,index) in data.problem" :key="index">
          <div class="question">{{index+1}}、{{item.question}}</div>
          <div class="question" v-for="(itemData,indexData) in item.data" :key="indexData">
            <div class="question flex" v-if="itemData.type==='0'">
              <span>({{indexData+1}})、{{itemData.label}}{{itemData.type}}</span>
              <el-radio-group v-model="itemData.answer" class="flex" disabled>
                <el-radio v-model="itemData.answers" v-for="(itemData2,itemIndex2) in itemData.answers" :label="itemIndex2+1" :key="itemIndex2">{{itemData2}}</el-radio>
              </el-radio-group>
            </div>
            <div class="question" v-else-if="itemData.type==='1'">
              <span>({{indexData+1}})、{{itemData.label}}</span><el-input-number v-model="item.answer" size="small"  disabled></el-input-number>
            </div>
            <div class="question" v-else-if="itemData.type==='2'">
              <span>({{indexData+1}})、{{itemData.label}}</span><el-input class="remark" v-model="item.answer"   disabled></el-input>
            </div>
          </div>
       </div>
    </div>
    <div class="answer-box" v-else-if="data.type==3" >
      <div class="title">{{data.scaleTitle}}</div>
      <div class="explain">说明:{{data.explain}}</div>
     <div class="questionBox" v-for="(item,index) in data.problem" :key="index">
        <div class="question">{{index+1}}、{{item.question}}{{item.questionNum}}</div>
        <div v-if="item.symptom" class="symptom">
          <el-checkbox-group v-model="item.data" disabled>
            <el-checkbox v-for="(itemData,indexData) in item.symptom" :label="itemData" :key="indexData">{{itemData.question}}</el-checkbox>
          </el-checkbox-group>
          <div class="symptom" v-for="(itemData,indexData) in item.data" :key="indexData">
          ({{indexData+1}})、{{itemData.question}}
            <el-radio-group v-model="itemData.answer" disabled >
                <el-radio  v-for="(itemData2,indexData2) in itemData.answers" :label="indexData2" :key="indexData2">{{itemData2}}</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div v-else>
          <el-radio-group v-model="item.answer" disabled>
            <div class="question" v-for="(itemData,indexData) in item.answers" :key="indexData">
              <el-radio :label="indexData" >{{itemData}}</el-radio>
            </div>
          </el-radio-group>
        </div>
     </div>
    </div>
    </div>
  </div>
</template>

<script>
  import {getQuestionJson} from '@/api/getJson'
  import { Message, MessageBox } from 'element-ui'
  export default {
    name: "questionResult",
    data() {
      return {
        data:[]
      }
    },
    created() {
      getQuestionJson(2).then(res=>{
        this.data=res.data;
      })
    },
    methods: {

    }

  }
</script>

<style scoped>
  .container{
    width: 750px;
    padding: 30px 50px;
    margin: 0 auto;
    border: 1px solid #eee;
  }
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
    max-width: 100%;text-overflow: ellipsis;white-space: normal;
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

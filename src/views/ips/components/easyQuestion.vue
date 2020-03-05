<template>
  <div style="margin-top: 50px">
    <el-form  ref="easyQuestion" label-width="120px" >
      <el-form-item  style="text-align: center">
        <div class="ips-input">首访问卷</div>
        <el-button type="primary">测试记录</el-button>
        <el-button type="primary" @click="startQuestion">开始问卷</el-button>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步，{{prevTitle}}</el-button>
        <el-button type="primary" size="medium" @click="handleNext">下一步，{{nextTitle}}</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="量表答题"
      :visible.sync="dialogVisible"
      width="700px">
      <question :scale-id="'1'"></question>

    </el-dialog>
  </div>
</template>

<script>
  import question from './question';
  export default {
    name: "easyQuestion",
    components: {question},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      },
      medicalRecordId:{
        type:String,
        value:""
      },
      prevTitle:{
        type:String,
        value:"",
      },
      nextTitle:{
        type:String,
        value:"",
      },
    },
    data() {
      return {
        dialogVisible:false,
      };
    },
    created() {


    },
    methods: {
      startQuestion(){
        this.dialogVisible=true;
      },
      handlePrev() {
        this.$emit('prevStep')
      },
      handleNext() {
        this.$emit('nextStep');
      }
    }
  }
</script>

<style scoped>

  .ips-input{
    margin: 0 10px;
    width: 400px;
    display: inline-block;
    border: 1px solid #eeee;
    border-radius: 10px;
    color: #999;
  }
</style>

<template>
  <div style="margin-top: 50px">
    <el-form  :rules="rules" ref="productInfoForm" label-width="120px" >
        <el-form-item style="text-align: center" >
          <el-input class="ips-input" placeholder="植物神经功能检测--》检测科室：心理科" ></el-input>
          <el-button type="primary">记录结果</el-button>
          <el-button type="primary">开始检测</el-button>
        </el-form-item>
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步，{{prevTitle}}</el-button>
        <el-button type="primary" size="medium" @click="handleNext">下一步，{{nextTitle}}</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import {getHRV} from '@/api/HRV'
  export default {
    name: "HRV",
    props: {
      isEdit: {
        type: Boolean,
        default: false
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

        rules: {
          goodsName: [
            {required: true, message: '请输入商品名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ]
        }
      };
    },
    created() {

    },
    methods: {

      handlePrev() {
        this.$emit('prevStep')
      },
      handleNext() {
        this.$emit('nextStep');
      }
    }
  }
</script>

<style scoped >
  .ips-input{
    margin: 0 10px;
    width: 400px;
  }
</style>

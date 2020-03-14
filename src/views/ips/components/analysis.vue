<template>
  <div style="margin-top: 50px">
    <el-form  :rules="rules" ref="productInfoForm" label-width="120px" >
      <el-form-item label="焦点问题:">
        <div class="text-box" >
          <div class="flex-wrap" v-for="(item,index) in value" :key="index"  >
           <el-button @click="addText" class="text-boder blue" icon="el-icon-edit">{{index+1}}、</el-button>
           <el-input placeholder="请输入详细内容"
              v-model="value[index]"
              class="text-boder"
              type="textarea"
              autosize>
            </el-input>
            <el-button  @click="deleteText(value,index)" class="text-boder red" icon="el-icon-delete"></el-button>
          </div>
        </div>
        <!-- <el-input
          class="textarea"
          placeholder="请输入详细内容"
          type="textarea"
          :autosize="{minRows: 3, maxRows: 6}"
          show-word-limit
          clearable></el-input> -->
      </el-form-item>
      <el-form-item label="心身因素:"  prop="name" >
        <el-input  placeholder="请输入角色名称" maxlength="10" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="社会功能:">
        <el-input
          class="textarea"
          placeholder="请输入详细内容"
          type="textarea"
          :autosize="{minRows: 3, maxRows: 6}"
          show-word-limit
          clearable></el-input>
      </el-form-item>
      <!-- <el-form-item label="报告分析:">
        <el-input
          class="textarea"
          placeholder="请输入详细内容"
          type="textarea"
          :autosize="{minRows: 3, maxRows: 6}"
          show-word-limit
          clearable></el-input>
      </el-form-item> -->
      <el-form-item label="辅助诊断建议:">
        <el-input
          class="textarea"
          placeholder="请输入详细内容"
          type="textarea"
          :autosize="{minRows: 3, maxRows: 6}"
          show-word-limit
          clearable></el-input>
      </el-form-item>
      <!-- <el-form-item label="当前用药方案:">
        <el-input
          class="textarea"
          placeholder="请输入详细内容"
          type="textarea"
          :autosize="{minRows: 3, maxRows: 6}"
          show-word-limit
          clearable></el-input>
      </el-form-item> -->
      <!-- <el-form-item label="当前用药方案:">
        <el-select  placeholder="请选择" clearable class="input-width">
          <el-option label="三级甲等" value="三级甲等" ></el-option>
          <el-option label="二级甲等" value="二级甲等" ></el-option>
          <el-option label="民营" value="民营"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步，{{prevTitle}}</el-button>
        <el-button type="primary" size="medium" @click="handleNext" v-if="nextTitle!=''">下一步，{{nextTitle}}</el-button>
        <el-button type="primary" size="medium" @click="handleFinishCommit" v-else>完成</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {customClassShopId} from '@/api/classify'
  const defaultProductParam = {
    
  };
  export default {
    name: "analysis",
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
        value:[
          "盐酸地尔硫卓缓释胶囊（II），睡前服用1片，患者为冠状动脉痉挛导致的心绞痛，尽量避免使用β-受体阻滞剂。",
          "阿司匹林肠溶片，1日1次，1次1片，注意是否出现皮肤淤青、鼻血黑便等。",
          "硝酸甘油片，发作时半片～1片，舌下含服，发作时每5分钟重复1片直至疼痛缓解。如果15分钟内总量达3片后疼痛持续存在，应立即就医。"
          ],
        rules: {
          goodsName: [
            {required: true, message: '请输入商品名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
          goodsTitle: [{required: true, message: '请输入商品副标题', trigger: 'blur'}],
          shopId:[{required: true, message: '请选择店铺', trigger: 'blur'}],
          oneCode: [{required: true, message: '请选择商品分类', trigger: 'blur'}],
        }
      };
    },
    created() {


    },
    methods: {
      addText(){
        this.value.push("");
      },
      deleteText(arr,index){
        arr.splice(index,1); 
      },
      handlePrev() {
        this.$emit('prevStep')
      },
      handleNext() {
        this.$emit('nextStep');
      },
      handleFinishCommit(){
        this.$emit('finishCommit');
      }
    }
  }
</script>

<style >
  .text-box{
    width: 100%;
    border:1px solid #ccc;
    border-radius: 10px;
  }
  .text-boder{
    border: none;
    margin: 0;
  }
  .text-boder textarea{outline: none; border: none}
  .text-boder.blue{
    padding-left: 20px;
    padding-right: 0;
    color:#409EFF;
  }
  .text-boder.red{
    color:#F56C6C;
  }
  .text-boder .el-textarea .el-textarea__inner{
    border: none!important;
    outline: none!important;
    -webkit-appearance: none;
  }
  .ips-input{
    margin: 0 10px;
    width: 400px;
  }
</style>

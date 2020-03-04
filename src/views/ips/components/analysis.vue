<template>
  <div style="margin-top: 50px">
    <el-form  :rules="rules" ref="productInfoForm" label-width="120px" >
      <el-form-item label="焦点问题:">
        <el-input
          class="textarea"
          placeholder="请输入详细内容"
          type="textarea"
          :autosize="{minRows: 3, maxRows: 6}"
          show-word-limit
          clearable></el-input>
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
      <el-form-item label="报告分析:">
        <el-input
          class="textarea"
          placeholder="请输入详细内容"
          type="textarea"
          :autosize="{minRows: 3, maxRows: 6}"
          show-word-limit
          clearable></el-input>
      </el-form-item>
      <el-form-item label="初步诊断:">
        <el-input
          class="textarea"
          placeholder="请输入详细内容"
          type="textarea"
          :autosize="{minRows: 3, maxRows: 6}"
          show-word-limit
          clearable></el-input>
      </el-form-item>
      <el-form-item label="当前用药方案:">
        <el-input
          class="textarea"
          placeholder="请输入详细内容"
          type="textarea"
          :autosize="{minRows: 3, maxRows: 6}"
          show-word-limit
          clearable></el-input>
      </el-form-item>
      <el-form-item label="当前用药方案:">
        <el-select  placeholder="请选择" clearable class="input-width">
          <el-option label="三级甲等" value="三级甲等" ></el-option>
          <el-option label="二级甲等" value="二级甲等" ></el-option>
          <el-option label="民营" value="民营"></el-option>
        </el-select>
      </el-form-item>
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
  import {getProduct,classifyList} from '@/api/product';
  import {saveGoods,getGoodsMsg} from '@/api/goods';
  import {findShop} from '@/api/shop';
  const defaultProductParam = {
    id: null,
    shopId: '',
    goodsBrand: '',
    goodsCode: '',
    classifyCode:null,
    goodsName: '',
    goodsTitle: '',
    oneCode:0,
    twoCode:0,
    threeCode:0,
    goodsState: 0,
    examineState: 0,
    goodsNews: 0,
    goodsRecommend: 0,
    goodsNotice: 0,
    goodsEnsure:"",
    salesVolume: 0,
    comments:"",
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

<style scoped>
  .ips-input{
    margin: 0 10px;
    width: 400px;
  }
</style>

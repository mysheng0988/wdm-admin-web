<template>
  <div style="margin-top: 50px">
    <el-form  :rules="rules" ref="productInfoForm" label-width="120px" >
      <el-form-item style="text-align: center">
        <el-input class="ips-input" placeholder="社会适应能力量表" ></el-input>
        <el-button type="primary">记录结果</el-button>
        <el-button type="primary">开始检测</el-button>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-input class="ips-input" placeholder=" 生活满意度量表" ></el-input>
        <el-button type="primary">记录结果</el-button>
        <el-button type="primary">开始检测</el-button>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-input class="ips-input" placeholder=" 焦虑性质量表" ></el-input>
        <el-button type="primary">记录结果</el-button>
        <el-button type="primary">开始检测</el-button>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步，{{prevTitle}}</el-button>
        <el-button type="primary" size="medium" @click="handleNext">下一步，{{nextTitle}}</el-button> </el-form-item>
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
    name: "scale",
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

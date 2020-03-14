<template>
  <div style="margin-top: 50px">
    <el-form  :rules="rules" ref="productInfoForm" label-width="160px" >
       <el-form-item label="心身疾病成因分析:">
          <el-input
            class="textarea"
            placeholder="请输入详细内容"
            type="textarea"
            :autosize="{minRows: 3, maxRows: 6}"
            show-word-limit
            clearable></el-input>
        </el-form-item>
        <el-form-item label="药物筛选">
           <p class="add-btn"><i class="el-icon-plus" @click="dialogVisible=true"></i>药物筛选</p>
        </el-form-item>
        <el-form-item label="神经递质调节药物方案:">
          <el-input
            class="textarea"
            placeholder="请输入详细内容"
            type="textarea"
            :autosize="{minRows: 3, maxRows: 6}"
            show-word-limit
            clearable></el-input>
        </el-form-item>
        <el-form-item label="躯体化症状药物方案:">
          <el-input
            class="textarea"
            placeholder="请输入详细内容"
            type="textarea"
            :autosize="{minRows: 3, maxRows: 6}"
            show-word-limit
            clearable></el-input>
        </el-form-item>
        <el-form-item label="心身治疗方案:"  prop="name" >
          <el-input  placeholder="请输入角色名称" maxlength="10" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="营养处方:">
          <el-input
            class="textarea"
            placeholder="请输入详细内容"
            type="textarea"
            :autosize="{minRows: 3, maxRows: 6}"
            show-word-limit
            clearable></el-input>
        </el-form-item>
        <el-form-item label="运动处方:">
          <el-input
            class="textarea"
            placeholder="请输入详细内容"
            type="textarea"
            :autosize="{minRows: 3, maxRows: 6}"
            show-word-limit
            clearable></el-input>
        </el-form-item>
        <el-form-item label="功能医学建议:">
          <el-input
            class="textarea"
            placeholder="请输入详细内容"
            type="textarea"
            :autosize="{minRows: 3, maxRows: 6}"
            show-word-limit
            clearable></el-input>
        </el-form-item>
        <el-form-item label="其他建议:">
          <el-input
            class="textarea"
            placeholder="请输入详细内容"
            type="textarea"
            :autosize="{minRows: 3, maxRows: 6}"
            show-word-limit
            clearable></el-input>
        </el-form-item>
        <el-form-item label="随访建议:">
          <el-input
            class="textarea"
            placeholder="请输入详细内容"
            type="textarea"
            :autosize="{minRows: 3, maxRows: 6}"
            show-word-limit
            clearable></el-input>
        </el-form-item>
        <!-- <el-form-item label="当前用药方案:">
          <el-select  placeholder="请选择" clearable class="input-width">
            <el-option label="三级甲等" value="三级甲等" ></el-option>
            <el-option label="二级甲等" value="二级甲等" ></el-option>
            <el-option label="民营" value="民营"></el-option>
          </el-select>
        </el-form-item> -->
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步，{{prevTitle}}</el-button>
        <el-button type="primary" size="medium" @click="handleFinishCommit">完成</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="药物筛选"
      :visible.sync="dialogVisible"
      width="30%">
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPatient('cardForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {customClassShopId} from '@/api/classify'
  import {getProduct,classifyList} from '@/api/product';
  import {saveGoods,getGoodsMsg} from '@/api/goods';
  import {findShop} from '@/api/shop';
  const defaultProductParam = {
   
  };
  export default {
    name: "ProductInfoDetail",
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
        dialogVisible:true,
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
      handlePrev(){
        this.$emit('prevStep')
      },
      handleFinishCommit(){
        this.$emit('finishCommit',this.uploadList);
      }
    }
  }
</script>

<style scoped>
  .add-btn{
    width: 100px;
    height: 30px;
    margin-right: 10px;
    text-align: center;
    line-height: 30px;
    border-radius: 8px;
    border: 1px solid #1197D6;
    color: #1197D6;
    cursor: pointer;
  }
</style>

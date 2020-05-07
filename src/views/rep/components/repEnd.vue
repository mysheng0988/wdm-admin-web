<template> 
  <div class="form-pdf end">
    <div class="pdf-container">
      <div class="title">Medical manual</div>
      <div class="msg-content flex-wrap">
         <div class="conent">
            <!-- <div>{{info.hospitalName}}</div> -->
            <div>东方心世界（北京）科技有限公司</div>
            <div>联系电话：010-64925945 </div>
            <div>公司地址：北京市朝阳区北苑路108号鸿华高尔夫庄园A12栋 </div>
         </div>
         <div class="img-box">
            <el-image class="img" :src="qrcode"></el-image>
            <p>扫码了解更多</p>
         </div>
      </div>
    </div>
    <div class="bg-color"></div>
  </div>
</template>
<script>
  import qrcode from '@/assets/images/logo-qrcode.png'
   import {mapGetters} from 'vuex'
  export default {
    name: 'rep-analysis',
    props:{
      data:{},

    },
    data(){
      return {
        qrcode: qrcode,
      };
    },
     computed:{
      ...mapGetters([             //步骤二，对象扩展运算符方式
        "info"
      ])
    },
    mounted(){
    }
  }
</script>
<style scoped>
    .form-pdf.end{
      height: 1085px;
    }
   .pdf-container{
       padding: 70px;
   }
   .title{
     width: 220px;
     padding :20px 0;
     color: #E1E1E1;
     font-size: 30px;
     border-bottom: 4px solid #B6CDDF;
   }
   .msg-content{
     line-height: 35px;
     width: 620px;
     position:absolute;
     font-size: 16px;
     bottom: 150px;
   }
   .conent{
     flex:1;
   }
   .conent-title{
     color: #E1E1E1;
     font-size: 30px;
   }
   .img-box{
     width: 100px;
   }
   .img-box .img{
     width: 100px;
     height: 100px;
     overflow: hidden;
     vertical-align: middle;
   }
   .bg-color{
     background:#298FBA;
     position:absolute;
     bottom: 50px;
     width: 768px;
     height: 80px;
   }
</style>



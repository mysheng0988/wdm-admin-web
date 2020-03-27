<template>
  <div class="form-pdf"  >
        
  </div>
</template>
<script>
  export default {
    name: 'experience',

  }
</script>
<style scoped >
   .form-pdf{
     position: relative;
      width: 768px;
      height: 1092px;
      border:1px solid #eee;
   }
   .pdf-bar{
     width: 649px;
     height: 10px;
     position:absolute;
     right: 0;
     top:12px;
     background:url("./img/pdf-bar.png") no-repeat;
     background-size: 100% 100%;
   }
   .pdf-bar-left{
     width: 649px;
     height: 10px;
     margin-top: 12px;
     background:url("./img/pdf-bar2.png") no-repeat;
     background-size: 100% 100%;
   }
</style>
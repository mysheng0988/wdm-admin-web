<template> 
  <div class="item-box">
      <div class="content">
          <div class="content-title">{{data.questionnaireName}}</div>
          <div>得分：{{data.score}}分</div>
          <div>{{data.conclusion}}</div>
          <div>{{data.explanation}}</div>
      </div>
  </div>
</template>
<script>
  export default {
    name: 'scaleText',
    props: {
      data: {
          type: Object,
          default:{}
        },
    },
    data(){
   
      return {
        
      }
    }
  }
</script>
<style  scoped>
   .item-box{
    padding: 10px 0;
    width: 626px;
  }
  .content{
    flex:1;
    color: #666;
     margin: 5px 0;
     font-size: 15px;
     text-align: justify;
    line-height: 30px;                                                                                                                         
  }
  .content .content-title{
     font-size: 20px;
     color: #48A3DA;
  }
   .chart{
     width: 240px;
     height: 180px;
     margin-right: 20px;
   }
</style>



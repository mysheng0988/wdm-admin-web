<template> 
   <el-input placeholder="请输入详细内容"
              v-model="editText"
              class="text-boder"
              type="textarea"
              autosize>
    </el-input>
</template>
<script>
   
  export default {
    name: 'editText',
     props: {
      editText: {
        type: String,
        value:""
      }
    }
  }
</script>
<style>
</style>



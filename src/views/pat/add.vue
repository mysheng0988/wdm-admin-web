<template> 
  <div class="app-container">
    <pat-detail :is-edit='false'></pat-detail>
  </div>

</template>
<script>
  import PatDetail from './components/patDetail'
  export default {
    name: 'addPat',
    components: { PatDetail }
  }
</script>
<style>
</style>



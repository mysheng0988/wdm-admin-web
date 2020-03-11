<template>
  <div class="app-container">
  <el-card class="form-container" shadow="never">
    <div class="flex">
      <div class="timeStep">
        <el-timeline>
          <el-timeline-item timestamp="2018" placement="top">
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 4/12 20:46</p>
          </el-timeline-item>
          <el-timeline-item timestamp="2019" placement="top">
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 4/3 20:46</p>
          </el-timeline-item>
          <el-timeline-item timestamp="2020" placement="top">
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 1/2 20:46</p>
          </el-timeline-item>
        </el-timeline>
      </div>
      <div class="report">
        <el-collapse v-model="activeNames"  @change="handleChange">
          <el-collapse-item title="主诉"  name="1">
            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
          </el-collapse-item>
          <el-collapse-item title="HRV检测" name="2">
            <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
          </el-collapse-item>
          <el-collapse-item title="EEG检测" name="3">
            <div>简化流程：设计简洁直观的操作流程；</div>
            <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
            <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
          </el-collapse-item>
          <el-collapse-item title="DCPR" name="5">
            <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
            <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
          </el-collapse-item>
          <el-collapse-item title="首访问卷" name="6">
            <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
            <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
          </el-collapse-item>
          <el-collapse-item title="量表" name="7">
            <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
            <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
          </el-collapse-item>
          <el-collapse-item title="综合分析" name="8">
            <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
            <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
          </el-collapse-item>
          <el-collapse-item title="治疗方案" name="9">
            <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
            <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </el-card>
  </div>
</template>

<script>
    export default {
      name: "edit",
      data() {
        return {
          activeNames: ['1']
        };
      },
      methods: {
        handleChange(val) {
          console.log(val);
        }
      }
    }
</script>

<style scoped>
   .timeStep{
     width: 260px;
   }
  .report{
     flex: 1;
  }
</style>

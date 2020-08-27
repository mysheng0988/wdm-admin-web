<template>
  <div class="form-pdf">
      <div class="container">
        <div class="title">体态监测的重要性？</div>
        <div class="content">儿童青少年发育过程中长期不良姿势，不恰当的负重或椎体先天性畸形会过度牵伸正常组织，造成脊柱变形、异常弯曲、脊柱结构损伤。</div>
        <div class="title small">1997-2005年我国6~18岁儿童青少年脊柱弯曲异常检出率：</div>
        <div class="flex-end">
          22.9%
          <span>脊柱侧弯发病2%~3%</span>
        </div>
        <div class="content">随着学生升学压力的不断加大，该病的检出率有进一步增高的趋势，目前有数据显示超过7%，男女比例：1比8。</div>
        <div class="title small">脊柱侧弯的分类：</div>
        <div class="flex-wrap">
          <div class="item">
            <div class="title">非结构性或功能性的脊柱侧弯</div>
            <div class="label">
              <span>★</span>姿势性侧弯：由于身体姿势不正，习惯于长期用一侧肩负重等原因所造成。矫正姿势，这种侧弯很快可以恢复正常。
            </div>
            <div class="label">
              <span>★</span>身体一侧腰神经受刺激，椎旁肌痉挛造成脊柱倒向一边：如胸椎盘突出症、马尾肿瘤引起的侧弯。
            </div>
            <div class="label">
              <span>★</span>下肢不等长：引起骨盆倾斜，继而发生腰椎的侧弯，实际上是一种代偿性侧弯。病人坐下或患肢垫平后侧弯则随之消失。
            </div>
            <div class="label">
              <span>★</span>癔症性侧弯：侧弯是一种症状，癔症如能治疗，侧弯也会随之消失。
            </div>
          </div>
          <div class="item">
            <div class="title">结构性或器质性脊柱侧弯</div>
            <div class="label">
              <span>★</span>特发性脊柱侧弯症，又称原发性脊柱侧弯，最常见，占总数的75%-85%，发病原因不清楚。
            </div>
            <div class="label">
              <span>★</span>先天性脊柱侧弯。
            </div>
          </div>
        </div>
        <div class="tips">所以体态监测是预防特发性脊柱侧弯重要手段之一</div>
        <el-image class="footerPath" :src="footerPath"></el-image>
      </div>
      <div class="pageNum">2</div>
  </div>
</template>
<script>
import indication from "@/assets/images/Indication.png";
import footerPath from "@/assets/images/footer-bg.png";
export default {
  name: "pageOne",
  data() {
    return {
      indication: indication,
      footerPath: footerPath
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.container {
  padding: 50px;
  font-size: 15px;
  line-height: 35px;
  .title {
    margin: 5px 0;
    color: #49b13f;
    font-size: 20px;
    &.small {
      font-size: 16px;
    }
  }
  .flex-end {
    margin: 20px 0 20px 300px;
    line-height: 60px;
    font-size: 60px;
    display: flex;
    display: -webkit-flex;
    align-items: flex-end;
    color: #49b13f;
    span {
      line-height: 35px;
      font-size: 14px;
      color: #333;
    }
  }
  .item {
    width: 314px;
    height: 397px;
    line-height: 30px;
    border: 1px solid #49b13f;
    border-top-right-radius: 40px;
    font-size: 14px;
    .title {
      margin: 0;
      width: 210px;
      height: 40px;
      line-height: 40px;
      padding-left: 10px;
      font-size: 14px;
      background: #49b13f;
      color: #fff;
    }
    .label {
      padding: 0 10px;
      span {
        margin: 5px;
        font-size: 24px;
        color: #f39800;
      }
    }
  }
  .content {
    margin-top: 20px;
    text-indent: 2em;
  }
  .tips {
    background: #49b13f;
    width: 419px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    padding: 0 10px;
    margin: 30px auto;
    color: #fff;
    border-radius: 20px;
  }
  .footerPath {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: -1;
  }
}
</style>
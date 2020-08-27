<template>
  <div class="form-pdf">
    <div class="container">
      <div class="bar-box">科普导读</div>
      <div class="content-box">
        <div class="title">什么是体态？良好和不良的体态区别？</div>
        <div>体态的定义：人体的姿态和样子。</div>
        <el-image class="indication" :src="indication"></el-image>
        <div class="title">不良体态对青少年健康的影响？</div>
        <div class="flex-wrap">
          <div class="item">不良的体态可导致青少年儿童身体功能性动作控制的稳定性、平衡能力、柔软度、本体感觉等功能变弱</div>
          <div class="item">影响心肺健康和女孩胸部发育等生理及外形的影响</div>
          <div class="item">造成孩子的自卑感，有的会发展成自闭症、抑郁症，甚至有的还会产生厌世心理</div>
        </div>
        <div
          class="content"
        >脊柱侧弯使人体的优美形态遭受破坏，造成胸廓一侧塌陷、一侧隆起、双肩倾斜的畸形体态，腰段较重的侧弯，还可导致骨盆倾斜，造成两侧臀部不对称，下肢因不等长而跛行等功能损害。幼年期即出现的脊柱侧弯，可明显影响两肺发育；儿童脊柱侧弯如不及时治疗，在这期间可发展成严重的畸形。合并有胸前凸的脊柱侧弯肺功能损害非常明显。一般脊柱侧弯都有不同程度通气功能障碍，胸廓变形和肺功能损害也导致心血管功能不同程度损害。</div>
        <el-image class="footerPath" :src="footerPath"></el-image>
      </div>
    </div>
    <div class="pageNum">1</div>
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
  .bar-box {
    position: absolute;
    right: 52px;
    top: 0;
    width: 131px;
    height: 131px;
    background: #49b13f;
    padding-top: 72px;
    color: #fff;
    text-align: center;
    font-size: 20px;
  }
  .content-box {
    margin-top: 100px;
    line-height: 35px;
    .title {
      margin: 5px 0;
      color: #49b13f;
      font-size: 20px;
    }
    .indication {
      width: 570px;
      height: 312px;
      vertical-align: middle;
      overflow: hidden;
      margin: 30px 48px;
    }
    .item {
      padding: 10px;
      width: 211px;
      height: 127px;
      line-height: 25px;
      border: 1px solid #49b13f;
      border-radius: 10px;
      font-size: 14px;
    }
    .content {
      margin-top: 20px;
      text-indent: 2em;
    }
    .footerPath {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: -1;
    }
  }
}
</style>
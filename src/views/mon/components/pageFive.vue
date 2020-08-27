<template>
    <div class="form-pdf">
      <div class="container">
        <div class="bar-box">儿童青少年脊柱侧弯的预警分析</div>
        <div class="content-box">
          <div v-if="health<50">
              <div class="content">
              儿童目前的健康指数为{{health}}，结合预测功能和儿童健康指标的警戒值，我们做出如下预测：在没有进行任何训练的情况下，六个月后儿童的健康指数继续将呈现下降趋势，健康状态恶化，需要立即进行治疗措施。
            </div>
            <div class="content">
              目前儿童的脊柱侧弯情况处于<span>高风险期</span>，脊柱侧弯角度严重偏离正常值，应考虑采取必要的手段介入干预，如佩带矫正治具或手术治疗。
            </div>
          </div>
          <div v-else-if="health>=50&&health<60">
              <div class="content">
             儿童目前的健康指数为{{health}}，结合预测功能和儿童健康指标的警戒值，我们做出如下预测：在没有进行任何训练的情况下，六个月后儿童的健康指数将呈现下降趋势，达到安全警戒值50附近，此时将发出预警信号。 
            </div>
            <div class="content">
              目前儿童的脊柱侧弯情况处于<span>中高风险期</span>，脊柱侧弯角度偏离正常值较大，可以进行物理治疗和运动康复，并进行定期检查，继续观察其脊柱侧弯发展期趋势。若弯曲情况无显著好转或继续加重，则应考虑采取必要的手段介入干预，如佩带矫正治具。家长需要督促儿童养成良好生活方式，按时进行治疗或完成训练。
            </div>
          </div>
          <div v-else-if="health>=60&&health<70">
              <div class="content">
              儿童目前的健康指数为{{health}}，结合预测功能和儿童健康指标的警戒值，我们做出如下预测：在没有进行任何训练的情况下，六个月后儿童的健康指数将呈现下降趋势，达到安全警戒值60附近，此时将发出预警信号。
            </div>
            <div class="content">
             目前儿童的脊柱侧弯情况处于<span>中风险期</span>，脊柱侧弯角度偏离正常值，可以进行运动治疗和康复，并进行定期检查，继续观察其脊柱侧弯发展期趋势。若弯曲情况加重，则应考虑采取必要的手段介入干预，如物理治疗和佩带矫正治具。家长需要督促儿童养成良好生活方式，按时进行治疗或完成训练。
            </div>
          </div>
          <div v-else-if="health>=70&&health<80">
              <div class="content">
              儿童目前的健康指数为{{health}}，目前儿童的脊柱侧弯情况处于<span>中低风险期</span>，脊柱侧弯角度具有偏离正常值的趋势。家长需要督促儿童养成良好生活方式，并进行定期检查，继续观察其脊柱侧弯发展期趋势。若弯曲情况明显加快，则应考虑采取必要的手段介入干预，如物理治疗或运动康复。
            </div>
          </div>
          <div v-else-if="health>=80">
              <div class="content">
             儿童目前的健康指数为{{health}}，目前儿童的脊柱侧弯情况处于<span>低风险期</span>，脊柱侧弯角度在正常值范围内，在保持良好生活状态和一定运动量的情况下，可适当减少检查次数。若检查结果出现脊柱侧弯征兆，则应增加检查频率，密切关注脊柱健康状况。
            </div>
          </div>
             <div v-if="suggestions" class="content">{{suggestions}}</div>
        </div>
        <div class="label">预防与干预建议</div>
        <div class="label-text">预防：体态监测、运动干预</div>
        <div class="label-text">手术：矫正手术</div>
        <div class="label-text">辅助：康复治疗、支具矫正</div>
        <div class="label-green">参考文献</div>
        <div class="label-text">[1]国家体育总局2012-2014年科研课题“青少年特发性脊柱侧弯的运动力学与康复体疗的研究”（2012B010）</div>
        <div class="label-text">[2]Negrini,Aulisa AG,Aulisa L, et al. 2011 SOSORT guidelines: Orthopaedic and Rehabilitation treatment di idiopathic scoliosis during growth[j]. Scoliosis,2012,7(1):</div>
        <div class="label-text">[3]李明,王传锋,贺石生,朱晓东；简体中文版脊柱侧凸研究学会22项患者量表的信度和效度； 《中国脊柱脊髓杂志》；2008 </div>
        <div class="label-text">[4]邱贵兴,仉建国,王以朋等；特发性脊柱侧凸的PUMC（协和）分型系统；《中华骨科杂志》，2003 </div>
        <div class="label-text">[5]刘尚礼, 李卫平, 李远景等；广东省青少年脊柱侧凸患病率调查报告；《中国脊柱脊髓杂志》，2002 </div>
        <div class="label-text">[6]Reamv BV,Slakey JB. Adolescent idiopathic scoliosis: revuew and current concepts[J]. Am Fam Physician, 2001, 64(1): 111-116. </div>
        <div class="label-text">[7]邱勇,朱丽华,宋知非,骆东山; 脊柱侧凸的临床病因分类研究;《中华骨科杂志》; 2000</div>
        <el-image class="footerPath" :src="footerPath"></el-image>
      </div>
      <div class="pageNum">5</div>
    </div>
</template>
<script>
import footerPath from "@/assets/images/footer-bg.png";
export default {
  name: "pageFive",
  props:{
    suggestions:{
      type:String
    },
    health:{
      type:String,
      value:"0"
    }
  },
  data() {
    return {
      footerPath: footerPath,
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.container {
  padding: 90px 62px;
  font-size: 15px;
  line-height: 30px;
   .bar-box{
        position: absolute;
        right:52px;
        top: 0;
        width: 450px;
        height: 110px;
        background: #49B13F;
        padding-top: 52px;
        color: #fff;
        text-align: center;
        font-size: 30px;
    }
    .content-box{
      margin-top: 30px;
      .content{
        text-indent: 2em;
        color: #666;
        span{
          color: #F39800;
          font-size: 20px;
        }
      }
    }
    .label{
      margin-top:10px;
      font-size: 20px;
      color: #F39800;
    }
     .label-green{
      margin-top: 10px;
      font-size: 20px;
      color: #4AB240;
    }
    .label-text{
      color: #666;
      line-height: 30px;
      font-size: 15px;
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
<template>
  <div style="margin-top: 50px">
    <el-form   ref="productInfoForm" label-width="160px" >
        <el-form-item label="神经递质调节药物方案:" v-if="drugPlan.length==0">
           <p class="add-btn" @click="dialogVisible=true"><i class="el-icon-plus" ></i>药物筛选</p>
        </el-form-item>
        <el-form-item label="神经递质调节药物方案:" v-if="drugPlan.length!=0">
           <div class="text-box"  >
             <div v-for="(item,index) in drugPlan" :key="index">
               <div v-if="item.diagnosis">
                 <p>({{index+1}})、{{item.diagnosis}}:</p>
                 <p>{{item.drugName}},{{item.dosage}},{{item.medicationAdvice}}</p>
               </div>
               <div v-else>
                 <p>{{item}}:</p>
               </div>
             </div>
          </div>
        </el-form-item>
        <el-form-item label="躯体化症状药物方案:" v-if="somatizationSymptomsDrugRegimen">
           <div class="text-box"  >
            <div v-for="(item1,index1) in somatizationSymptomsDrugRegimen.data" :key="index1">
                <div class="box-title">{{item1.title}}</div>
                <div  v-for="(item2,index2) in item1.data" :key="index2" style="padding-left:20px" >
                    <div class="box-title">{{item2.title}}</div>
                    <div class="flex-wrap" v-for="(item3,index3) in item2.data" :key="index3" >
                      <div v-if="item3.title">{{index3+1}}、{{item3.title}}:<span v-for="(item,index) in item3.data" :key="index">{{item}}</span></div>
                      <div v-else>{{index3+1}}、{{item3}}</div>
                    </div>

                    <!-- <div v-else>
                      <div class="flex-wrap" v-for="(item2,index2) in item1.data" :key="index2" >
                          <div>{{index2+1}}、{{item2}}</div>
                      </div>
                    </div> -->
                </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="心身治疗方案:"   >
          <div class="text-box" >
            <div v-for="(item1,index1) in initData.psychosomaticTherapy.data" :key="index1">
                <div class="box-title">{{item1.title}}</div>
                <div class="item-box" v-for="(item2,index2) in item1.data" :key="index2" style="padding-left:20px" >
                  <i class="close el-icon-error" @click="deleteItem3('psychosomaticTherapy',index1,index2)"></i>
                  <div class="box-title">{{item2.title}}</div>
                  <div class="flex-wrap" v-for="(item3,index3) in item2.data" :key="index3" >
                    <el-button @click="addText3('psychosomaticTherapy',index1,index2)" class="text-boder blue" icon="el-icon-edit">
                      {{index3+1}}、</el-button>
                        <el-input placeholder="请输入详细内容"
                        v-model="item2.data[index3]"
                        class="text-boder"
                        type="textarea"
                        autosize>
                      </el-input>
                  <el-button  @click="deleteText3('psychosomaticTherapy',index1,index2,index3)" class="text-boder red" icon="el-icon-delete"></el-button>
                  </div>
                </div>

            </div>

          </div>
        </el-form-item>
        <el-form-item label="营养处方:">
          <div class="text-box" >
            <div v-for="(item1,index1) in initData.nutritionPrescription.data" :key="index1">
                <div class="box-title" v-if="item1.data.length>0">{{item1.title}}</div>
                  <div class="flex-wrap" v-for="(item2,index2) in item1.data" :key="index2" >
                    <el-button @click="addText2('nutritionPrescription',index1,index2)" class="text-boder blue" icon="el-icon-edit">
                      {{index2+1}}、</el-button>
                        <el-input placeholder="请输入详细内容"
                        v-model="item1.data[index2]"
                        class="text-boder"
                        type="textarea"
                        autosize>
                      </el-input>
                  <el-button  @click="deleteText2('nutritionPrescription',index1,index2)" class="text-boder red" icon="el-icon-delete"></el-button>
                </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="运动处方:">
          <div class="text-box" >
            <div v-for="(item1,index1) in initData.exercisePrescription.data" :key="index1">
                <div class="box-title">{{item1.title}}</div>
                  <div class="flex-wrap" v-for="(item2,index2) in item1.data" :key="index2" >
                    <el-button @click="addText2('exercisePrescription',index1,index2)" class="text-boder blue" icon="el-icon-edit">
                      {{index2+1}}、</el-button>
                        <el-input placeholder="请输入详细内容"
                        v-model="item1.data[index2]"
                        class="text-boder"
                        type="textarea"
                        autosize>
                      </el-input>
                  <el-button  @click="deleteText2('exercisePrescription',index1,index2)" class="text-boder red" icon="el-icon-delete"></el-button>
                  </div>
                </div>
             </div>
        </el-form-item>
        <el-form-item label="功能医学建议:">
           <div class="text-box" >
                <div class="flex-wrap" v-for="(item,index) in initData.functionalMedicineAdvice.data" :key="index" >
                  <el-button @click="addText1('functionalMedicineAdvice',index)" class="text-boder blue" icon="el-icon-edit">
                    {{index+1}}、</el-button>
                      <el-input placeholder="请输入详细内容"
                      v-model="initData.functionalMedicineAdvice.data[index]"
                      class="text-boder"
                      type="textarea"
                      autosize>
                    </el-input>
                <el-button  @click="deleteText1('functionalMedicineAdvice',index)" class="text-boder red" icon="el-icon-delete"></el-button>
              </div>
          </div>
        </el-form-item>
        <el-form-item label="其他建议:">
          <div class="text-box" >
            <div v-for="(item1,index1) in initData.otherSuggestion.data" :key="index1">
                <div class="box-title">{{item1.title}}</div>
                  <div class="flex-wrap" v-for="(item2,index2) in item1.data" :key="index2" >
                    <el-button @click="addText2('otherSuggestion',index1,index2)" class="text-boder blue" icon="el-icon-edit">
                      {{index2+1}}、</el-button>
                        <el-input placeholder="请输入详细内容"
                        v-model="item1.data[index2]"
                        class="text-boder"
                        type="textarea"
                        autosize>
                      </el-input>
                  <el-button  @click="deleteText2('otherSuggestion',index1,index2)" class="text-boder red" icon="el-icon-delete"></el-button>
                  </div>
                </div>
             </div>
        </el-form-item>
        <el-form-item label="随访建议:">
         <div class="text-box" >
                <div class="flex-wrap" v-for="(item,index) in initData.followUpRecommendations.data" :key="index" >
                  <el-button @click="addText1('followUpRecommendations',index)" class="text-boder blue" icon="el-icon-edit">
                    {{index+1}}、</el-button>
                      <el-input placeholder="请输入详细内容"
                      v-model="initData.followUpRecommendations.data[index]"
                      class="text-boder"
                      type="textarea"
                      autosize>
                    </el-input>
                <el-button  @click="deleteText1('followUpRecommendations',index)" class="text-boder red" icon="el-icon-delete"></el-button>
              </div>
          </div>
        </el-form-item>
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步，{{prevTitle}}</el-button>
        <el-button type="primary" size="medium" @click="handleFinishCommit">完成</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="禁忌症筛选"
      :visible.sync="dialogVisible"
      width="50%">
        <div class="screen-box flex">
          <div class="item-box">
            <div class="title">待选择</div>
            <el-input
              placeholder="输入关键字进行过滤"
              v-model="filterText" size="small">
            </el-input>
            <el-tree
                :data=data
                show-checkbox
                class="tree"
                node-key="id"
                :filter-node-method="filterNode"
                :props="defaultProps"
                highlight-current
                @node-click="handleNodeClick"
                @check="handleNodeChecked"
                ref="tree">
             </el-tree>
          </div>
          <div class="item-box">
            <div  class="title">已选择</div>
            <p v-for="(item,index) in selectedData" class="label" :key="index" >
              {{index+1}}、{{item.name}}
              <i class="close el-icon-error" @click="handleRemove(index)"></i>
            </p>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveContraindicationsData()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="药物相互作用筛选"
      :visible.sync="dialogVisible2"
      width="600px">
      <el-transfer
        filterable
        :filter-method="filterMethod"
        filter-placeholder="请输入关键字检索"
        v-model="value2"
        :titles="titles"
        :data="data2">
      </el-transfer>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="saveFilterData">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {analysisData,saveContraindications,saveFilter,updataData} from '@/api/analysis'
  const defaultPlan={
    psychosomaticTherapy:"",//心身治疗建议
    exercisePrescription:"",//"运动处方"
    nutritionPrescription:"",//营养处方
    functionalMedicineAdvice:"",//功能医学建议
    otherSuggestion:"",//其他建议
    somatizationSymptomsDrugRegimen:"",
    followUpRecommendations:{
      data:["第1周随访，观察疗效、药物反应，根据随访情况可能需要调整用药方案和心理治疗内",
      "第2周随访，观察疗效、药物反应，根据随访情况可能需要调整用药方案和心理治疗内容；",
      "第1个月随访，观察疗效、药物反应，根据随访情况可能需要调整用药方案和心理治疗内容；",
      "第2个月随访，观察疗效、药物反应，根据随访情况可能需要调整用药方案和心理治疗内容；"
      ,"第3个月随访，观察疗效、药物反应，根据随访情况可能需要调整用药方案和心理治疗内容。"]
    },//随访建议
  }
  import { Loading } from 'element-ui';
  export default {
    name: "curePlan",
    props: {
      isEdit: {
        type: Boolean,
        default: false
      },
      prevTitle:{
        type:String,
        value:"",
      },
      patientId:{
        type:String,
        value:"",
      },
      medicalRecordId:{
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
         data2:[
           {label:"上海",pinyin:"sh",key:0},
            {label:"北京",pinyin:"bj",key:1},
            {label:"广州",pinyin:"gz",key:2},
            {label:"深圳",pinyin:"sz",key:3},
             {label:"南京",pinyin:"nj",key:4},
            {label:"西安",pinyin:"xa",key:5},
             {label:"成都",pinyin:"cd",key:6},
           ],
           titles:["可选药物","已选药物"],
        value2: [],
        filterMethod(query, item) {
          return item.label.indexOf(query) > -1;
        },
        drugPlan:[],
        dialogVisible:false,
         dialogVisible2:false,
        filterText:"",
        selectedData:[],
        data: [],
  somatizationSymptomsDrugRegimen:{
    title:"hhhhhh",
    data: [
                    {
                        "data": [
                            {
                                "data": [
                                    {
                                        "data": [
                                            "硝苯地平和阿替洛尔可能改善心理应激导致的室壁运动障碍，美托洛尔可能改善心理应激的导致稳定性冠心病。"
                                        ],
                                        "title": "β受体阻滞剂"
                                    },
                                    {
                                        "data": [
                                            "常用的5-羟色胺再摄取抑制剂及用法用量。氟西汀：每日一次 每次 20-40mg、帕罗西汀：每日一次 每次20-40mg 、舍曲林：每日一次 每次50-100mg。艾司西酞普兰可明显地改善心理应激导致的稳定性冠心病，推荐从最低剂量的半量（老年体弱者1/4量）开始用药，每5～7d缓慢加量1次，至最低有效剂量10mg/d。"
                                        ],
                                        "title": "选择性5-羟色胺再摄取抑制剂"
                                    },
                                    {
                                        "data": [
                                            "常用的长效药物有地西泮、艾司唑仑等，短效药物有劳拉西泮、阿普唑仑等。"
                                        ],
                                        "title": "苯二氮卓类药物"
                                    },
                                    {
                                        "data": [
                                            "坦度螺酮能有效控制精神压力导致的心脑血管系统功能变化，可降低血压、减缓心率、改善相关躯体和精神症状。"
                                        ],
                                        "title": "坦度螺酮"
                                    },
                                    {
                                        "data": [
                                            "可使用振源胶囊、心可舒片、心灵丸、复方丹参滴丸、乌林胶囊。"
                                        ],
                                        "title": "中药建议"
                                    }
                                ],
                                "title": "药物治疗"
                            },
                            {
                                "data": [
                                    "无"
                                ],
                                "title": "用药原则"
                            },
                            {
                                "data": [
                                    "中国医师协会全科分会双心（心脏心理）学组.心理应激导致稳定性冠心病患者心肌缺血的诊断与治疗专家共识[J].中华心血管病杂志.2016,44(1):12-18."
                                ],
                                "title": "文献出处"
                            }
                        ],
                        "title": "心理应激导致稳定性冠心病用药建议"
                    },
                    {
                        "data": [
                            {
                                "data": [
                                    {
                                        "data": [
                                            "①地尔硫卓：适用于心率偏快且心功能良好的患者。常用剂量为30~60mg/次，每日3~4次。其缓释或控释制剂 90mg/次，每日1~2 次，清晨发作者，可以睡前口服长效制剂。 ②氨氯地平：适用于合并心功能不全、心动过缓或传导阻滞的冠状动脉痉挛综合症患者。常规剂量 2.5~10mg/次，每日1次。③贝尼地平：适用于各类冠状动脉痉挛综合症患者。剂量 4~8mg/次，每日 1-2 次。"
                                        ],
                                        "title": "CCB"
                                    },
                                    {
                                        "data": [
                                            "应尽可能留下6~8h的空白期以防发生耐受。"
                                        ],
                                        "title": "硝酸酯类药物"
                                    },
                                    {
                                        "data": [
                                            "尼可地尔在增加冠状动脉血流的同时不影响血压、心率及心脏传导系统，无耐药性，可长期服用。禁用于心原性休克、伴有左心室衰竭、低血压和特异性体质的患者。常用剂量5-10mg/次，每日3次。"
                                        ],
                                        "title": "钾通道开放剂"
                                    },
                                    {
                                        "data": [
                                            "坚持长期应用。"
                                        ],
                                        "title": "他汀类药物"
                                    },
                                    {
                                        "data": [
                                            "治疗长期口服阿司匹林100mg/d。"
                                        ],
                                        "title": "抗血小板"
                                    },
                                    {
                                        "data": [
                                            ""
                                        ],
                                        "title": "β 受体阻滞剂。"
                                    }
                                ],
                                "title": "药物治疗"
                            },
                            {
                                "data": [
                                    "对于合并有冠状动脉器质性狭窄或严重心肌桥，且临床主要表现为劳力性心绞痛的患者。若CCB和硝酸酯类疗效不佳时可以慎重联合使用高选择性β受体阻滞剂。对于冠状动脉无显著狭窄的CASS患者禁忌单独使用。长效 CCB 是预防冠状动脉痉挛综合症复发的主要药物，其中地尔硫卓和贝尼地平可以作为首选，若效果欠佳或不能耐受，可换用不同的CCB；若单一药物治疗控制不理想，可以联合应用CCB和硝酸酯类；若仍不理想可以换用CCB与尼可地尔联合；若CASS合并显著血管狭窄或心肌桥，在使用CCB及硝酸酯类无效的情况下，方可考虑 CCB 和（或）硝酸酯类与β受体阻滞剂的联合应用。所有CASS患者均不主张单用 β 受体阻滞剂治疗。抗血小板及调脂治疗应长期坚持应用。"
                                ],
                                "title": "用药原则"
                            },
                            {
                                "data": [
                                    "向定成,曾定尹,霍勇等. 冠状动脉痉挛综合征诊断与治疗中国专家共识[J].中国介入心脏病学杂志.2015,23(4):181-186."
                                ],
                                "title": "文献出处"
                            }
                        ],
                        "title": "冠状动脉痉挛综合症用药建议"
                    },
                    {
                        "data": [
                            {
                                "data": [
                                    "吗啡镇痛,可同时使用利尿剂、β受体阻滞剂、阿司匹林、硝酸甘油、血管转换酶抑制剂ACEI、血管紧张素受体阻滞剂ARB、CCB(冠状痉挛的患者）等药物。专家推荐应激性心肌病恢复后，仍可长期服用血管紧张素转化酶抑制剂或血管紧张素受体阻断剂类药物及β受体阻滞剂，有冠状动脉痉挛者可考虑应用钙拮抗剂。但是如果存在左心室流出道狭窄，应避免应用血管紧张素转化酶抑制剂或血管紧张素受体阻断剂或利尿剂。同时,考虑到儿茶酚胺在该病发生中大量释放及其导致的心肌抑制,应尽量避免加压药物和β受体兴奋药物。"
                                ],
                                "title": "药物治疗"
                            },
                            {
                                "data": [
                                    "无"
                                ],
                                "title": "用药原则"
                            },
                            {
                                "data": [
                                    "胡大一,刘梅颜等.双心医学[M].第一版.北京:人民卫生出版社,2016:225-233."
                                ],
                                "title": "文献出处"
                            }
                        ],
                        "title": "应激性心肌病用药建议"
                    }
                ]},
        defaultProps: {
          children: 'subList',
          label: 'name'
        },
        initData:Object.assign({},defaultPlan),
      };
    },
     watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    created() {
       this.initDataList();
    },
    methods: {

      saveFilterData(){

          let param={
            interaction:this.value2
            }
          saveFilter(param,this.medicalRecordId).then(res=>{
            if(res.code==200){
                this.drugPlan=res.dataList;
                this.dialogVisible2=false;
            }else{
             // this.$message.warning(res.message)
              this.drugPlan[0]=res.message;
              this.dialogVisible2=false;
            }
          })
      },
      saveContraindicationsData(){
        let param={
            contraindications:this.$refs.tree.getCheckedNodes(true)
          }
          saveContraindications(param,this.medicalRecordId).then(res=>{
            if(res.code==200){
              this.data2=[];
              for(let item of res.dataList){
                  let param={};
                  param.key=item;
                  param.label=item;
                  this.data2.push(param)
              }
               this.dialogVisible=false;
               this.dialogVisible2=true;
            }else{
              this.dialogVisible=false;
              this.dialogVisible2=false;
              this.drugPlan[0]=res.message;
              //this.$message.warning(res.message)
            }
          })
      },
      addText1(key){
        this.initData[key].data.push("");
      },
      deleteItem3(key,index1,index2){
         let arr=this.initData[key].data[index1].data;
         if(arr.length>1){
          arr.splice(index2,1);
        }else{
          this.$message.warning("最后一行不可以删除！")
        }
      },
      deleteText1(key,index){
        let arr=this.initData[key].data;
        if(arr.length>1){
          arr.splice(index,1);
        }else{
          this.$message.warning("最后一行不可以删除！")
        }

      },
      addText2(key,index){
        this.initData[key].data[index].data.push("");
      },
      deleteText2(key,index,index2){
        let arr=this.initData[key].data[index].data;
        if(arr.length>1){
          arr.splice(index2,1);
        }else{
          this.$message.warning("最后一行不可以删除！")
        }

      },
       addText3(key,index1,index2){
        this.initData[key].data[index1].data[index2].data.push("");
      },
      deleteText3(key,index1,index2,index3){
        let arr=this.initData[key].data[index1].data[index2].data;
        if(arr.length>1){
          arr.splice(index3,1);
        }else{
          this.$message.warning("最后一行不可以删除！")
        }

      },
      initDataList(){
        const loading =Loading.service({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.8)'
        });
        let param={};
        param.medicalRecordId=this.medicalRecordId;
        param.source=1;
        param.patientId=this.patientId;
      analysisData(param).then(res=>{
         loading.close();
          let data={};
          if(res.code==200){
            data=res.dataList[0];
            this.data=data.contraindicationsList;
            this.initData.psychosomaticTherapy=JSON.parse(data.psychosomaticTherapy);
            this.initData.exercisePrescription=JSON.parse(data.exercisePrescription);
            this.initData.nutritionPrescription=JSON.parse(data.nutritionPrescription);
            this.initData.functionalMedicineAdvice=JSON.parse(data.functionalMedicineAdvice);
            this.initData.otherSuggestion=JSON.parse(data.otherSuggestion);
            this.somatizationSymptomsDrugRegimen=data.somatizationSymptomsDrugRegimen;//躯体化治疗方案
            // this.initData.followUpRecommendations=JSON.parse(data.followUpRecommendations)
          }
        }).catch(err=>{
          loading.close();
        })
      },
      handleNodeClick(val){
        this.$refs.tree.setChecked(val.id,true,false)
        this.selectedData=this.$refs.tree.getCheckedNodes(true);
        console.log( this.selectedData)
      },
      handleNodeChecked(){
        this.selectedData=this.$refs.tree.getCheckedNodes(true);
      },
       handleRemove(index){
          this.selectedData.splice(index,1);
          let keys=[];
          for(let item  of this.selectedData){
            if(item.parentId==2){
                keys.push(item.id);
            }
          }
          this.$refs.tree.setCheckedKeys(keys);
        },
       filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      handlePrev(){
        this.$emit('prevStep')
      },
      handleFinishCommit(){
       // this.$emit('finishCommit',"");
        let loading= Loading.service({
          lock: true,
          text: '加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.8)'
        });
        //this.$emit('nextStep');
        updataData(this.data).then(res=>{
          loading.close();
          if(res.code==200){
           this.$message.success("保存成功")
          }
        }).catch(err=>{
          loading.close();
        });
      }
    }
  }
</script>
<style>
  .screen-box{
    border: 1px solid #eee;
  }
  .item-box{
     padding: 10px;
     flex:1;
     align-items: flex-start;
     border: 1px solid #eee;
  }
  .item-box .el-input{
    margin: 10px 0;
  }
  .item-box .title{
    line-height: 30px;
    font-size: 16px;
    font-weight: bold;
  }
  .item-box .label{
    padding: 0 10px;
    line-height: 35px;
    border: 1px solid #e1e1e1;
    border-radius: 8px;
    margin: 10px;
    position: relative;
  }
  .item-box .label .close{
    color: #F56C6C;
    position: absolute;
    right: -5px;
    top: -5px;
  }
  .tree{
    height: 400px;
    overflow: auto;
  }
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


  .ips-input{
    margin: 0 10px;
    width: 400px;
  }
  .text-box{
    width: 100%;
    border:1px solid #ccc;
    min-height: 40px;
    padding: 10px;
    border-radius: 10px;
  }
  .text-box .box-title{
     font-size: 14px;
  }
  .text-box .item-box{
    border:1px solid #409EFF;
    margin-bottom: 10px;
    position: relative;
  }
  .text-box .item-box .close{
    color: #F56C6C;
    position: absolute;
    right: -5px;
    top: -5px;
  }
  .text-box .text-boder{
    border: none;
    margin: 0;
  }
 .text-box .text-boder textarea{outline: none; border: none}
  .text-box .text-boder.blue{
    padding: 0;
    color:#409EFF;
  }
  .text-box .text-boder.red{
    color:#F56C6C;
  }
  .text-box .text-boder .el-textarea .el-textarea__inner{
    border: none!important;
    outline: none!important;
    -webkit-appearance: none;
  }
</style>

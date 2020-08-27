<template>
    <div class="form-pdf">
        <el-image class="logo" :src="logoPath"></el-image>
        <div class="content-box">
            <div class="title">青少年体态健康监测评估报告</div>
            <div class="date">评估日期：{{data}}</div>
            <div>青少年时期是人体发育的黄金时期，健康良好的体态是保证孩子身心健康的重要保障</div>
            <div>豌豆苗陪伴孩子在未来的学习和发展中自信成长</div>
        </div>
        <el-image class="solgan" :src="solgan"></el-image>
    </div>
</template>
<script>

 import logoPath from "@/assets/images/rep-logo.png"
import solgan from "@/assets/images/solgan.png"
export default {
    name:"rep-index",
    props:{
        data:{
            type:String,
        }
    },
    data(){
        return{
            logoPath:logoPath,
            solgan:solgan
        }
    },
    methods:{

    }
}
</script>
<style lang="scss" scoped>
    .logo{
        position: absolute;
        left: 58px;
        top:92px;
        width: 183px;
        height: 57px;
    }
    .solgan{
        position: absolute;
        right: 85px;
        bottom: 54px;
        width: 189px;
        height: 80px;
    }
    .content-box{
        position: absolute;
        top:366px;
        padding: 30px 0px;
        width: 100%;
        color: #fff;
        height: 291px;
        text-align: center;
        line-height: 30px;
        background: #49B13F;
        font-size: 15px;
        .title{
            font-size: 30px;
            font-weight: bold;
            margin: 30px 0;
        }
        .date{
           margin-bottom: 45px; 
        }
    }
</style>
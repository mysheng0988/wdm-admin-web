<template>
  <div class="login-bg">
    <div class="login-form-layout">
      <div class="logo-img">
        <!--<svg-icon icon-class="login-mall" style="width: 56px;height: 56px;color: #409EFF"></svg-icon>-->
        <img src="@/views/login/img/logo.png" />
      </div>
      <div class="flex-wrap login-padding">
        <div class="img-box">
          <img src="@/views/login/img/douzi.png" />
        </div>
        <el-form
          autocomplete="on"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          ref="loginForm"
          label-position="left"
        >
          <el-form-item>
            <div class="login-title">登录账号</div>
          </el-form-item>
          <el-form-item prop="username">
            <el-input
              name="phone"
              type="text"
              v-model="loginForm.username"
              autocomplete="on"
              placeholder="请输入用户名"
            >
              <span slot="prefix">
                <svg-icon icon-class="user" class="color-gray"></svg-icon>
              </span>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              name="password"
              :type="pwdType"
              @keyup.enter.native="handleLogin"
              v-model="loginForm.password"
              autocomplete="on"
              placeholder="请输入密码"
            >
              <span slot="prefix" class="svg-container">
                <svg-icon icon-class="password" class="color-gray"></svg-icon>
              </span>
              <span slot="suffix" @click="showPwd">
                <svg-icon :icon-class="eye" class="color-gray"></svg-icon>
              </span>
            </el-input>
          </el-form-item>
          <el-form-item style="margin: 60px 0;text-align: center">
            <el-button
              style="width: 100%"
              type="success"
              :loading="loading"
              @click.native.prevent="handleLogin"
            >用户登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { validatePhone } from "@/utils/validate";
export default {
  name: "login",
  data() {
    const validateUserPhone = (rule, value, callback) => {
      if (!validatePhone(value)) {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    const validateUserName = (rule, value, callback) => {
      if (value.length < 2) {
        callback(new Error("用户名称不能小于四位"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error("密码不能小于六位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUserName }
        ],
        password: [{ required: true, trigger: "blur", validator: validatePass }]
      },
      loading: false,
      pwdType: "password",
      eye: "eye"
    };
  },
  methods: {
    showPwd() {
      if (this.pwdType === "password") {
        this.eye = "eyes";
        this.pwdType = "";
      } else {
        this.eye = "eye";
        this.pwdType = "password";
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("Login", this.loginForm)
            .then(res => {
              this.loading = false;
              if (res.code == "200") {
                this.$router.push({ path: "/home" });
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("参数验证不合法！");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" >
.login-bg {
  height: 100vh;
  width: 100%;
  background: url("img/bg.png") no-repeat;
  background-size: cover;
}
.login-form-layout {
  position: absolute;
  top: 48px;
  bottom: 48px;
  left: 94px;
  right: 94px;
  background: #fff;
  box-shadow: 0px 3px 20px 3px rgba(15, 98, 134, 0.15);
  padding: 32px 50px;
}
.logo-img {
  width: 100%;
}
.login-padding{
  padding: 148px 30px;
  .login-title{
    width: 100%;
    text-align: center;
    color: #32D759;
    font-size: 32px;
  }
}
.login-form{
  padding: 0 30px;
  width: 563px;
}
 .img-box{
  flex: 1;
   width: 100%;
  height: 100%;
  text-align: center;
  .img{
    width: 568px;
    height: 373px;
    text-align: center;
    overflow: hidden;
    vertical-align: middle
  }
}
.login-form-layout .el-form-item .el-input {
  display: inline-block;
   border-bottom: 1px solid #CCCCCC;
  width: 100%;
  input {
    background-color: transparent;
    border: 0;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 35px;
  }
}

.color-gray {
  color: #eee;
}
</style>

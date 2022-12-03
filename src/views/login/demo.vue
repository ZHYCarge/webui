<template>
  <div id="login-app">
   <div class="login-warp">
     <div class="title-container">
       <h3 class="title">登录页面</h3>
     </div>
    <el-form ref="formRef" :model="form" class="login-form" :rules="rules">
      <el-form-item  prop="username">
        <label>用户名(工号)</label>
        <el-input type="text" v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
        <el-form-item prop="password">
          <label>密码</label>
          <el-input type="password" show-password v-model="form.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>
      <el-form-item  prop="code">
        <label>验证码</label>
        <el-row :gutter="10">
          <el-col :span="16"><el-input v-model.number="form.code"></el-input></el-col>
          <el-col :span="8"><el-button type="info" class="submet-block">获取验证码</el-button></el-col>
        </el-row>

      </el-form-item>
      <el-button type="primary" class="login-button" @click="handleLogin">登录</el-button>
    </el-form>
   </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const form = ref({
  username: '',
  password: '',
  code:'现阶段不需要输入验证码'
})

const rules = ref({
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur'
    }
  ]
})

const formRef = ref(null)
const handleLogin = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      await store.dispatch('app/login', form.value)
    } else {
      console.log('error submit!!')
      return false
    }
  })
}

</script>

<style lang="scss" scoped>
#login-app{
  height: 100vh;
  background-color: #344a5f;
}
.login-warp{
  width: 330px;
  margin: auto;
}
.menu-tab{
  text-align: center;
}
li{
  display: inline-block;
  width: 88px;
  line-height: 36px;
  font-size: 14px;
  color: white;
  border-radius: 2px;
  cursor: pointer;
}


.current{
  background-color: black;
}
.login-form{
  margin-top: 9px;
}
label{
  display: block;
  font-size: 14px;
  color: white;
  margin-bottom: 3px;
}
.submet-block{
  width: 100%;
}
h3{
  color: white;
}
.title {
      font-size: 26px;
      color: white;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

</style>

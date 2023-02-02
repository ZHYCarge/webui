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
          <el-col :span="12"><el-input v-model.number="form.valid_code"></el-input></el-col>
          <el-col :span="12"><el-image :src="code_url" @click="getauthcode"/></el-col>
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
import {auth_code, VerifyCode} from "@/api/login";
import {ElMessage} from "element-plus";
const store = useStore()
const form = ref({
  username: '',
  password: '',
  valid_code:'',
  uuid:''
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
  valid_code: [
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
      const res = await VerifyCode(form.value)
      if (res.msg !== '验证码输入正确！')
      {
        getauthcode()
        ElMessage.error(res.msg)
      return false
      }
      if (await store.dispatch('app/login', form.value) === -1)
        getauthcode()
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
const Auth_code = ref()
const code_url = ref()
const getauthcode=async()=>{
  Auth_code.value = await auth_code()
  // console.log(Auth_code.value.img)
  code_url.value = Auth_code.value.img
  form.value.uuid = Auth_code.value.uuid
}
getauthcode()

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

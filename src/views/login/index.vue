<template>
  <div id="login-app">
    <div class="login-warp">
      <h3 >用户登录</h3>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="default">
        <el-form-item  prop="username">
          <label>用户名(工号)</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <label>密码</label>
            <el-input type="password" show-password v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item  prop="code">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="16"><el-input v-model.number="ruleForm.code"></el-input></el-col>
            <el-col :span="8"><el-button type="info" class="submet-block">获取验证码</el-button></el-col>
          </el-row>

        </el-form-item>
        <el-form-item>
          <el-button type="primary" round @click="submitForm('ruleForm')" class="submet-block">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// import {login} from "@/api/login";
// import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
const store =  useStore()
export default {
  name: 'login-app',
  data(){
    var checkcode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入验证码!'));
      }
      else{
        callback();
      }
    };
    var validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      let reg = /^[a-zA-Z]\w{5,17}$/
      if (value === '') {
        callback(new Error('请输入密码'));
      }
      else if(!reg.test(value)){
        callback(new Error('以字母开头，长度在6~18之间，只能包含字母、数字和下划线'))
      }
      else {
        callback();
      }
      return{}
    };
    return {
      ruleForm: {
        username: 'ZHYCarge',
        password: 'zhaohaiyu',
        code: 'sad'
      },
      model: 'login',
      rules: {
        username: [
          { validator: validateUser, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword,trigger: 'blur' }
        ],
        code: [
          { validator: checkcode, trigger: 'blur' }
        ]
      },
    }
  },
  methods:{
     submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // const res = await login(this.ruleForm)
          await store.dispatch('app/login', this.ruleForm)
          // ElMessage.success(res.msg)


        } else {
          alert('请检查所填内容！');
          return false;
        }
      });
    }
  }
}

</script>

<style  scoped>
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
</style>


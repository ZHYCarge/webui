<template>
  <el-dialog
      :model-value="dialogVisible"
      :title="dialogTitle"
      width="40%"
      :before-close="handleClose"
      @close="handleClose"
  >
    <el-form
        ref="formRef"
        :rules="rules"
        :model="form"
        label-width="120px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="个人头像地址"  v-if="dialogTitle === '编辑用户'">
        <el-input v-model="form.img_url" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" show-password autocomplete="off" />
      </el-form-item>
      <el-form-item label="是否给予管理员" >
        <el-switch v-model="form.issuper" />
      </el-form-item>
      <el-form-item label="是否启用用户">
        <el-switch v-model="form.status" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script setup>
import {defineEmits, ref,defineProps,watch} from "vue";
import {AddUser,EditUser} from "@/api/userlist";
import {ElMessage} from "element-plus";

const form = ref({
  username:'',
  password:'',
  email:'',
  issuper:false,
  status:true,
  img_url:'',


})

const props = defineProps({
  dialogTitle:{
    type:String,
    default: '',
    required:true
  },
  dialogtablevalue:{
    type:Object,
    default:()=>{
    }
  }
})
watch(()=>props.dialogtablevalue,()=>{
  console.log(props.dialogtablevalue)
  form.value = props.dialogtablevalue
},{deep:true,immediate:true})

const emits = defineEmits(['update:modelValue','initUserList'])

const handleClose = ()=>{
  emits('update:modelValue',false)
}
const rules = ref({
  username:[{
    required:true,
    message:'请输入用户名',
    tigger:'blur'
  }],
  password:[{
    required:props.dialogTitle === '添加用户',
    message:'请输入密码',
    tigger:'blur'
  }],
  email:[{
    required:true,
    message:'请输入邮箱',
    tigger:'blur'
  }],
  img_url:[{
    required:props.dialogTitle !== '添加用户',
    message:'请输入用户头像信息',
    tigger:'blur'
  }],
})
const formRef = ref(null)

const handleConfirm = ()=>{
  handleClose()
  console.log(form)
  const infolist ={
    username:form.value.username,
    password:form.value.password,
    token:localStorage.getItem('token'),
    email:form.value.email,
    status:form.value.status,
    issuper:form.value.issuper
  }
  formRef.value.validate(async (valid) => {
    if (valid) {
      console.log(infolist)
      console.log(form.value)
      const res = ref({})
      if (props.dialogTitle === '添加用户'){
        res.value = await AddUser(infolist)
      }
    else if (props.dialogTitle==='编辑用户'){
      form.value.token = localStorage.getItem('token')
      res.value = await EditUser(form.value)
      }
    else
      {
        res.value = ref({msg:'？？？你是怎么发现这个数据的？'})
      }
    console.log(res.value)
      ElMessage.success(res.value.msg)
      emits('initUserList')
    } else {
     ElMessage.error("请将信息填写完整！")
      return false;
    }
  })

}



</script>

<style scoped>

</style>
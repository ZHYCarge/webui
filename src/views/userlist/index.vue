<template>
<el-card>
  <el-row :gutter="20" class="header">
    <el-col :span="7">
      <el-input placeholder="用户搜索" clearable v-model="queryForm.query"></el-input>
    </el-col>
    <el-button type="primary" :icon="Search" @click="initGetUserList">搜索</el-button>
    <el-button type="primary" :icon="Plus" @click="handleDialogValue('')">添加用户</el-button>
  </el-row>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column :width="item.width" :prop="item.prop" :label="item.label" v-for="(item,index) in options" :key="index" >
<template v-slot="{row}" v-if="item.prop === 'status'" >

          <el-tag v-if="row.status? a='success':a='error'" :type="a">{{row.status?'正常使用':'已禁用'}}</el-tag>
  <el-popconfirm title="请确认你的操作" @confirm="changeUserStatus(row)" @cancel="row.status=!row.status">
    <template #reference>
      <el-switch
          v-model="row.status"
          size="small"
         />
    </template>
  </el-popconfirm>
</template>
      <template v-slot="{row}" v-else-if="item.prop==='image'">
        <el-avatar
            :src="row.img_url"
        />
      </template>
      <template #default="{row}" v-else-if="item.prop === 'action'">
        <el-tooltip content="编辑用户信息" placement="top" effect="light">
          <el-button type="primary" class="small" :icon="Edit" @click="handleDialogValue(row)"></el-button>
        </el-tooltip>
          <el-tooltip  content="删除用户信息" placement="top" effect="light">
            <el-button type="success" class="small" :icon="Delete" @click="deleteuser(row)"></el-button>
          </el-tooltip>


        <el-tooltip content="给用户发送邮件消息" placement="top" effect="light">
          <el-button type="warning" class="small" :icon="Message"></el-button>
        </el-tooltip>
</template>
    </el-table-column>
  </el-table>
  <el-pagination
      v-model:current-page="queryForm.pagenum"
      v-model:page-size="queryForm.pagesize"
      :page-sizes="[2, 5, 10, 15]"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
  />
</el-card>
  <Dialog v-model="dialogVisible" :dialogTitle = 'dialogTitle' v-if="dialogVisible" @initUserList="initGetUserList"
  :dialogtablevalue="dialogtablevalue"/>
</template>

<script setup>
import { Search,Plus,Edit,Delete,Message} from '@element-plus/icons-vue'
import {GetUserList,ChangeUserStatus,DeleteUser} from '@/api/userlist'
import {ref} from 'vue'
import { ElMessage ,ElMessageBox} from 'element-plus'
import {options} from './options'
import Dialog from './componement/dialog'
import {useStore} from 'vuex'
const store  = useStore()
store.dispatch('app/authuser')

const dialogTitle =ref('')
const queryForm =ref({
  query:'',
  pagenum:1,
  pagesize:2
})
const total =ref([0])
const dialogVisible = ref(false)
const tableData = ref([])
const dialogtablevalue = ref({})
const initGetUserList = async () => {
  const UserList = []
  const res = await GetUserList(   {token : localStorage.getItem('token'),search:queryForm.value.query===''?'null':queryForm.value.query})
  for (var i=0;i<res.msg.length;i++)
  {
    UserList.push({
      username: res.msg[i].username,
          email: res.msg[i].email,
        issuper: res.msg[i].superuser === 1?'是':'否',
        img_url: res.msg[i].img,
        status: res.msg[i].status===1,
    })
  }
  total.value = res.msg.length
  tableData.value = UserList
}
initGetUserList()

const handleSizeChange = (pageSize) =>{
  queryForm.value.pagenum = 1
  queryForm.value.pagesize = pageSize
  initGetUserList()
}
const handleCurrentChange = (pageNum) =>{
  queryForm.value.pagenum= pageNum
  initGetUserList()
}

const changeUserStatus = async(info) => {
const userinfo = {
  username:info.username,
  token:localStorage.getItem('token'),
  status:info.status
}
  const res = await ChangeUserStatus(userinfo)
  ElMessage.success(res.msg)
}

const handleDialogValue = (row)=> {
if (row === ''){
  dialogTitle.value = '添加用户'
  dialogtablevalue.value = {issuper:false,status:true}
}else {
  dialogTitle.value = '编辑用户'
  dialogtablevalue.value = JSON.parse(JSON.stringify(row))
}
  dialogVisible.value = !dialogVisible.value
}
const DeleteUserInfo = async (data) =>{
  const userinfo = {
    token:localStorage.getItem('token'),
    username:data.username
  }
  const res = await DeleteUser(userinfo)
  ElMessage.success(res.msg)
}

const deleteuser = (row) => {
  ElMessageBox.confirm(
      '你真的确定要删除'+row.username+'这个用户吗？',
      'Warning',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        ElMessage({
          type: 'success',
          message: '删除已完成',
        })
        DeleteUserInfo({username:row.username})
        initGetUserList()
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消删除',
        })
      })
}

</script>

<style scoped>
.header{
  padding-bottom: 16px;
  box-sizing: border-box;
}
</style>
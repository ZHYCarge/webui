<template>

    <el-dropdown>
    <span>
    <el-avatar  :src="url"/>
    </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="userinfo">个人信息</el-dropdown-item>
          <el-dropdown-item @click="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
</template>

<script setup>
import router from "@/router";
import {useStore} from 'vuex'
const store = useStore()
const logout=() =>{
  store.dispatch('app/logout')
}
const userinfo=()=>{
  router.replace('/userinfo')
}
const url = localStorage.getItem('imageURL')

</script>

<style lang="scss" scoped>
::v-deep .el-dropdown-item{
  white-space: nowrap;
}
</style>
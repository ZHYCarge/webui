<template>
<!--  <div  style="text-align: center;background-color:#fff;font-size: 20px;color: black;">-->
<!--    后台系统-->
<!--  </div>-->
    <el-menu
        :default-active="defaultActive"
        active-color="#ffffff"
        class="el-menu-vertical-demo"
        router
        :collapse = "!$store.getters.siderType"
        require-opend
    >
      <el-sub-menu :index="index" v-for="(item,index) in menusList" :key="index">
        <template #title>
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{item.authName}}</span>
        </template>
          <el-menu-item :index="items.path" v-for="(items,index) in item.childname" :key="index" @click="savePath(items.path)">
            <el-icon><Box /></el-icon>
            {{items.name}}
          </el-menu-item>
      </el-sub-menu>
    </el-menu>
</template>

<script  setup>
import {menuList} from '/src/api/menu'
import {ref} from 'vue'
const menusList = ref()
const defaultActive = ref(sessionStorage.getItem('path')||'/main')
const  initMenuList=async()=>{
  menusList.value = await menuList()
   // console.log(menusList.value)
}
const savePath = (path)=>{
  sessionStorage.setItem('path',path)
}
initMenuList()

</script>

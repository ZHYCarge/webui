<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="sideWidth" style="transition:width 0.5s; overflow-x:hidden"><Menu/></el-aside>
      <el-container>
        <el-header  ><Header/></el-header>
        <el-main><router-view/> </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<!--<template>-->
<!--    <el-container class="app-wrapper">>-->
<!--      <el-aside :width="sideWidth"  class="sidebar-container" >-->
<!--        <Menu/>-->
<!--      </el-aside>-->
<!--      <el-container class="container" :class="{hidderContainer:$store.getters.siderType}">-->
<!--        <el-header ><Header/></el-header>-->
<!--        <el-main>-->
<!--          <router-view/>-->
<!--        </el-main>-->
<!--      </el-container>-->
<!--    </el-container>-->
<!--</template>-->
<script setup>
import Menu from './menu'
import Header from './hearders'
import router from "@/router";
import {useRoute} from "vue-router";
import {computed} from 'vue'
import {useStore} from 'vuex'
const route = useRoute()
if (route.matched.length === 1){
router.replace('/main')
}
// const sideWidth = ref(variables.sideBarWidth)
const store = useStore()

// const width =  store.getters.siderType ? '200px' : '37px'
const sideWidth = computed(()=>{
  // return store.getters.siderType ? variables.sideBarWidth : variables.hideSideBarWidth
  return store.getters.siderType ? '200px' : '70px'


})
</script>

<style lang="scss" scoped>

</style>
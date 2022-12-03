<template>
    <el-container class="app-wrapper">>
      <el-aside :width="sideWidth"  class="sidebar-container" >
<!--      <el-aside width="95px"  class="sidebar-container" >-->
        <Menu/>
      </el-aside>
      <el-container class="container" :class="{hidderContainer:$store.getters.siderType}">
        <el-header ><Header/></el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
</template>
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
const sideWidth = computed(()=>{
  // return store.getters.siderType ? variables.sideBarWidth : variables.hideSideBarWidth
  return store.getters.siderType ? '270px' : '95px'

})
</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.container {
  width: calc(100% - 5%);
  height: 100%;

  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  transition: all 0.28s;
  &.hidderContainer {
    width: calc(100% - 17%);
  }
}
::v-deep .el-header {
  padding: 0;
}
</style>
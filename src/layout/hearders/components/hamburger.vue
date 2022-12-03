<template>
<div class="hamburger-container">
  <el-button @click="toggleClick" :icon="icon"></el-button>
</div>
</template>

<script setup>
import {useStore} from 'vuex'
import {computed} from "vue";
// eslint-disable-next-line no-unused-vars
import {ArrowRightBold,ArrowLeftBold } from '@element-plus/icons-vue'
const store = useStore()
const toggleClick = () =>{
  store.commit('app/changeSiderType')

}
const icon = computed(()=>{
  return !store.getters.siderType ? 'ArrowRightBold' : 'ArrowLeftBold'
})
</script>

<style scoped>
.hamburger-container{
  width: 40px;
  margin-right: 16px;
  box-sizing: border-box;
  cursor: pointer;
}
</style>
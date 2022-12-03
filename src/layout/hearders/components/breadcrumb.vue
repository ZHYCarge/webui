<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item,index) in breadcrumb" :key="index" :to="{ path: '/' }">
    <span class="no-redirect" v-if="index===breadcrumb.length - 1">{{ item.name }}</span>
    <span class="redirect" v-else @click="handleRedirct(item.path)">{{ item.name }}</span>

    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import {useRoute,useRouter} from 'vue-router'
import {watch,ref} from "vue";
const router = useRouter()
const handleRedirct=(path) =>{
  router.push(path)
}
const route = useRoute()
const breadcrumb = ref([])
const initBreadcrumb =()=>{
  breadcrumb.value = route.matched
  // console.log(route.matched)
}

watch(route,()=>{    initBreadcrumb()},
    {deep:true,immediate:true})
</script>

<style lang="scss" scoped>
.no-redirect{
  color: #97a8be;
  cursor: text;
}
.redirect{
  color: #666;
  font-weight: 600;
  cursor: pointer;
  &:hover{
  color: #304156;

   }
}
</style>
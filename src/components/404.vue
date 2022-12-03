<template>

  <el-result title="404" sub-title="很抱歉，这个界面还在开发过程中。。。">
    <template #icon>
      <el-image
          :src="url"
      />
    </template>
    <template #extra>
      <el-button type="primary" @click="gobackhome">回到主页</el-button>
    </template>
  </el-result>
</template>

<script setup>
import router from "@/router";
import {Img_404} from "@/api/menu"
import {ref} from 'vue'
const url = ref()
const geturl = async () =>{
const res = await Img_404()
  url.value = res.img_url
}
geturl()
const gobackhome = () =>{
  router.replace('/')
}
</script>

<style scoped>

</style>
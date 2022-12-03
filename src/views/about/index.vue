<template>

  <div class="common-layout">
    <el-container>
      <el-header>
        <h3 style="text-align: center">此网站由本人进行维护233333</h3>
      </el-header>
      <el-main>
        <el-carousel  :interval="4000" type="card" height="480px">
          <el-carousel-item v-for="(item,index) in image" :key="index">
            <a :href="item.img_link"><el-image  fit="scale-down" :src="item.img_url" :alt="item.img_about" /></a>
          </el-carousel-item>
        </el-carousel>
      </el-main>
      <el-footer>
        <div class="common-layout">
          <el-container>
            <el-aside width="200px">

              <el-timeline>
                <el-timeline-item timestamp="2022/12/1" placement="top">
                  <el-card>
                    <h4>正在编写项目</h4>
                    <p>正在编写项目ing</p>
                  </el-card>
                </el-timeline-item>
              </el-timeline>

            </el-aside>
            <el-main>
              <div style="text-align: center">
              请为此网站进行打分：
              <el-rate
                  v-model="value"
                  :texts="['很差', '一般', '还好', '很棒', '十分棒！']"
                  show-text
              /></div></el-main>
          </el-container>
        </div>

      </el-footer>
    </el-container>
  </div>

</template>

<script setup>
import {AboutImg} from '@/api/menu'
import {ref} from 'vue'

const value = ref()
const initdata = async () =>{
  image.value = await AboutImg()
  console.log(image.value)
}
const image = ref()
initdata()
</script>

<style scoped>
</style>
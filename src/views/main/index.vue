<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <h3 style="text-align: center">自己编写的VUE网站</h3>
      </el-header >
      <el-main direction="vertical">
        <el-alert center title="此界面正在编写中" type="info" :closable="false" />
        <el-steps  :space="200"  >
          <el-step title="正在开发前端框架组件" />
          <el-step title="开发后端界面" />
          <el-step title="啥也不是" />
        </el-steps>
        <el-progress type="dashboard" :percentage="10">
          <template #default="{ percentage }">
            <span class="percentage-value">{{ percentage }}%</span>
            <span class="percentage-label">正在进行开发中</span>
          </template>
        </el-progress>
      </el-main>
    </el-container>
  </div>
</template>

<script>

</script>

<style scoped>

</style>
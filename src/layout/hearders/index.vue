<!--<template>-->
<!--  <div class="navbar">-->
<!--    <el-col :span="1">-->
<!--      <Hamburger/>-->
<!--    </el-col>-->
<!--    <el-col :span="2">-->
<!--      <Breadcrumb/>-->
<!--    </el-col>-->
<!--    <el-col :span="21">-->
<!--    <Avatar />-->
<!--    </el-col>-->

<!--  </div>-->
<!--</template>-->

<template>
  <div style="box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08)" >
      <Hamburger class="div-css"/>
      <Breadcrumb class="div-css" style=" margin-top:21px" />
      <Avatar class="div-css" />

  </div>
</template>


<script setup>
import Breadcrumb from "@/layout/hearders/components/breadcrumb";
import Avatar from "@/layout/hearders/components/avatar";
import Hamburger from "@/layout/hearders/components/hamburger";


</script>

<style scoped>
.div-css{
  float: left;
  margin-top:10px;
  margin-right:15px;
}
</style>
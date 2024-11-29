<!-- 轮播 -->
<script setup>
import { getBannerInfo } from '@/apis/layout';
import { onMounted, ref } from 'vue';

const bannerInfo = ref([])
const getViews =async () =>{
    const res = await getBannerInfo(1)
    console.log('banner',res);
    bannerInfo.value = res.result
    
}
onMounted(()=>{
    getViews()
})
</script>



<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in bannerInfo" :key="item.id">
        <img :src=item.imgUrl alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>



<style scoped lang='scss'>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>
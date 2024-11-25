<script setup>
import HomeBanner from './components/homeBanner.vue';
import HomeCategory from './components/homeCategory.vue';
import HomeHot from './components/homeHot.vue';
import HomeNews from './components/homeNews.vue';
import HomeProducts from './components/homeProducts.vue';
defineOptions({
  name:'homeIndex'
})
</script>
<template>
  <div style="height: 1000px;" class="container">
    <homeCategory></homeCategory>
    <homeBanner></homeBanner>
  </div>
  <homeNews></homeNews>
  <homeHot></homeHot>
  <homeProducts></homeProducts>
</template>

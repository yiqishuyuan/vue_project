<script setup>
import layoutBanner from './components/layoutBanner.vue';
import LayoutFooter from './components/layoutFooter.vue';
import LayoutHeader from './components/layoutHeader.vue';
import layoutFixed from './components/layoutFixed.vue';
defineOptions({
  name: 'layoutIndex'

})

</script>
<template>
   
    <layoutFixed></layoutFixed>
    <layoutBanner></layoutBanner>
    <layoutHeader></layoutHeader>
    <router-view></router-view>
    <layoutFooter></layoutFooter>

</template>

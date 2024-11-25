<script setup>
import layoutBanner from './components/layoutBanner.vue';
import LayoutFooter from './components/layoutFooter.vue';
import LayoutHeader from './components/layoutHeader.vue';

defineOptions({
  name:'layoutIndex'
})
</script>
<template>
  <layoutBanner></layoutBanner>
  <layoutHeader></layoutHeader>
  <layoutFooter></layoutFooter>
</template>

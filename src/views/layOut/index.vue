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
    <el-alert title="所有数据接口由黑马提供，数据不在本地保存，测试时请不要将个人信息保存到网站。部分接口更新或废弃，数据更新不及时" center type="success" :closable="false" />
    <layoutFixed></layoutFixed>
    <layoutBanner></layoutBanner>
    <layoutHeader></layoutHeader>
    <router-view></router-view>
    <layoutFooter></layoutFooter>

</template>

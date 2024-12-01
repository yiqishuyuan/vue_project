<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
onMounted(() => {
    router.push('/')
})
</script>
<template>
    <div class="error">
        <span title="error"> 错误，请稍等，正在重定向！</span>
    </div>
</template>
<style scoped>
.error {
    width: 100vw;
    height: 100vw;

}

.error span {
    width: 400px;
    height: 200px;
    font-size: 25px;
    margin: 0 auto;
    display: block;
}
</style>
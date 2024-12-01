import { computed, onUnmounted, ref } from "vue";
import dayjs from "dayjs";
export const useTimeFormat = () => {
    const time = ref(0)
    let timer = null
    // 格式化事件
    const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
    const start = (add) => {
        time.value = add
        timer = setInterval(() => {
            time.value--
        }, 1000)
    }
    // 销毁
    onUnmounted(() => {
        timer && clearInterval(timer)
    })
    return {
        start,
        formatTime
    }
}
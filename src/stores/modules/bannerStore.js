import { defineStore } from "pinia"
import { ref } from "vue"
import { getHeaderInfo } from '@/apis/layout'

export const useBannerStore = defineStore('bannerInfo', () => {
    //   定义数组
    const bannnerList = ref([]);
    const getViews = async () => {
        const res = await getHeaderInfo()
        console.log(res);
        bannnerList.value = res.result

    }
    return {
        bannnerList,
        getViews
    }

})
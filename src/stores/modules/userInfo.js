import { defineStore } from "pinia";
import { ref } from "vue";
import { useCartsStore } from "./cartStore";
import { loginInfoApi } from "../../apis/login";
import { mergeCarts } from "@/apis/cartsInfo";


export const useUserInfoStore = defineStore('user-info', () => {
    const store = useCartsStore()
    // 用户信息
    const userInfo = ref({});
    //添加信息
    const addInfo = async (dataForm) => {
        const res = await loginInfoApi(dataForm)
        userInfo.value = res.result
        // 在登录时合并数据库
        await mergeCarts(store.carts.map(item => {
            return {
                skuId: item.skuId,
                selected: item.isChecked,
                count: item.count
            }
        }))
        // 下拉购物车列表
        store.getViewsFuntion()
    };
    // 移除信息
    const removeInfo = () => {
        userInfo.value = {}
        store.clearCarts()
    }
    return {
        userInfo,
        addInfo,
        removeInfo
    }
}, {
    persist: true,
})
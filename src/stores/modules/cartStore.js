import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserInfoStore } from "./userInfo";
import { getCartsList, postCart, delCart } from "@/apis/cartsInfo";
export const useCartsStore = defineStore('carts', () => {
    // 购物车数据
    const store = useUserInfoStore()
    // 判断
    const isToken = computed(() => store.userInfo.token)
    const carts = ref([]);
    // 登录时渲染购物车模板
    const getViewsFuntion = async () => {
        const res = await getCartsList()
        console.log('store-getList-cart', res);
        carts.value = res.result
    }
    // 增加
    const addGoods = async (info) => {
        // console.log('info', info);
        if (isToken.value) {
            try {
                await postCart({ skuId: info.skuId, count: info.count })
                getViewsFuntion()

            } catch (error) {
                console.log('error', error);

            }

        } else {
            const item = carts.value.find(item => item.skuId === info.skuId)
            if (item) {
                item.count += info.count
            } else {
                carts.value.push(info)
            }
        }

    };
    // 删除
    const delGoods = async (skuId) => {
        // console.log('token', isToken.value);
        if (isToken.value) {
            await delCart([skuId])
            getViewsFuntion()

        } else {
            const id = carts.value.findIndex((item) => item.skuId === skuId)
            carts.value.splice(id, 1)
        }

    };
    // 删除carts
    const clearCarts = () => {
        carts.value = []
    }
    // 刷新购物车 ---与删除，增加
    // 计算
    // 计算价格
    const allPrice = computed(() => carts.value.reduce((num, item) => num + item.price * item.count, 0))
    //计算子数量
    const allCount = computed(() => carts.value.reduce((num, item) => num + item.count, 0))
    // 计算勾选的价格
    const ischeckPrice = computed(() => carts.value.filter((item) => item.isChecked))
    const checkPrice = computed(() => ischeckPrice.value.reduce((num, item) => num + item.price * item.count, 0))

    // 全选/反选
    // 判断是否全选 返回true/false  //true则全选框亮
    const allCheck = computed(() => carts.value.every((item) => item.isChecked))
    //反选   所有框灭
    const InvertCheck = (value) => {
        if (allCheck.value) {
            carts.value.forEach(item => item.isChecked = !item.isChecked)
        } else {
            carts.value.forEach(item => item.isChecked = value)
        }
    }
    //子框
    const sonCheck = (id) => {
        const item = carts.value.find(item => item.skuId === id)
        // console.log(item);
        if (item) {
            item.isChecked = !item.isChecked
        }
    }

    return {
        carts,
        allPrice,
        allCount,
        checkPrice,
        allCheck,
        ischeckPrice,
        InvertCheck,
        clearCarts,
        getViewsFuntion,
        sonCheck,
        addGoods,
        delGoods,
    }

}, {
    persist: true
})
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserInfoStore } from "./userInfo";
import { getCartsList, postCart, delCart, upDataNumAndChecked, upDataNumCheckedAll } from "@/apis/cartsInfo";
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
    const ischeckPrice = computed(() => carts.value.filter((item) => item.selected))
    const checkPrice = computed(() => ischeckPrice.value.reduce((num, item) => num + item.price * item.count, 0))
    const allCheck = computed(() => carts.value.every((item) => item.selected))
    //反选   所有框灭
    const InvertCheck = async (value) => {
        if (isToken.value) {
            const res = await upDataNumCheckedAll(value, carts.value.map(item => item.skuId))
            console.log('全选值组', res);
            getViewsFuntion()
        } else {
            console.log('接收', value);
            const otherCheck = computed(() => carts.value.every((item) => item.selected === value))
            if (otherCheck.value) {
                carts.value.forEach(item => item.selected = !item.selected)
            } else {
                carts.value.forEach(item => item.selected = value)
            }
        }
    }
    //子框
    const sonCheck = async (data) => {
        if (isToken.value) {
            //请求数据
            await upDataNumAndChecked(data.skuId, {
                data: {
                    selected: !data.selected,
                    count: data.count
                }
            })

            await getViewsFuntion()
        } else {
            const item = carts.value.find(item => item.skuId === data.skuId)
            // console.log(item);
            if (item) {
                item.selected = !item.selected
            }
        }
    }
    // 子框和更改数量为两个不同的值 ，点击子框则更新，点击数量则数量更新
    const numUpdata = async (data) => {
        if (isToken.value) {
            //请求数据
            await upDataNumAndChecked(data.skuId, {
                data: {
                    selected: data.selected,
                    count: data.count
                }
            })

            await getViewsFuntion()
        } else {
            const item = carts.value.find(item => item.skuId === data.skuId)
            console.log(item);
            console.log('data,num',data);
            if (item) {
                item.count = data.count
            }
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
        numUpdata
    }

}, {
    persist: true
})
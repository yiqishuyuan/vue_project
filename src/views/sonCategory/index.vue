<script setup>
import { getCategoryOther, getCategoryOtherSon } from '@/apis/category';
import GoodsItem from '@/components/goodsItem.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
// category
defineOptions({
    name: 'sonCategory'
})
const categoryOtherList = ref({})
const getViews = async () => {
    const res = await getCategoryOther(route.params.id)
    categoryOtherList.value = res.data.result
    console.log('son-category', res);

}
// 渲染组件
const categoryOtherGoodList = ref([])
const data = ref({
    categoryId: route.params.id,
    page: 1,
    pageSize: 20,
    sortField: 'publishTime'   //排序，// 最新-顺序-价格
})
const getViewsSon = async () => {
    const res = await getCategoryOtherSon(data.value)
    categoryOtherGoodList.value = res.data.result.items
    console.log('categoryOtherGoodList', res);

}
// 切换---初始化
const handleChange = () => {
    data.value.page = 1
    getViewsSon()
}
// 无限加载数据
const disable = ref(false)
const load = async () => {
    console.log('触底conform!');
    data.value.page++
    const res = await getCategoryOtherSon(data.value)
    data.value = [...categoryOtherGoodList.value, ...res.data.result.items]
    // 当数据到底则停止，应与后端商量
    if (res.data.result.items.length === 0) {
        disable.value = true
    }
}
onMounted(() => getViews())
onMounted(() => getViewsSon())

</script>

<template>
    <div class="container ">
        <!-- 面包屑 -->
        <div class="bread-container">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: `/category/${categoryOtherList.parentId}` }">{{
                    categoryOtherList.parentName }}
                </el-breadcrumb-item>
                <el-breadcrumb-item>{{ categoryOtherList.name }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="sub-container">
            <el-tabs v-model="data.sortField" @tab-change="handleChange">
                <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
                <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
                <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
            </el-tabs>
            <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
                <!-- 商品列表-->
                <GoodsItem :goods="categoryOtherGoodList"></GoodsItem>
            </div>
        </div>
    </div>

</template>



<style lang="scss" scoped>
.bread-container {
    padding: 25px 0;
    color: #666;
}

.sub-container {
    padding: 20px 10px;
    background-color: #fff;

    .body {
        display: flex;
        flex-wrap: wrap;
        padding: 0 10px;
    }

    .goods-item {
        display: block;
        width: 220px;
        margin-right: 20px;
        padding: 20px 30px;
        text-align: center;

        img {
            width: 160px;
            height: 160px;
        }

        p {
            padding-top: 10px;
        }

        .name {
            font-size: 16px;
        }

        .desc {
            color: #999;
            height: 29px;
        }

        .price {
            color: $priceColor;
            font-size: 20px;
        }
    }

    .pagination-container {
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }


}
</style>
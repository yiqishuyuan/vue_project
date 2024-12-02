<!-- skus组件练习和more -->
<script setup>
import { getProDetail } from '@/apis/shop_detail';
import { onMounted, ref } from 'vue';
const cartsInfo = ref([])
const resSpecs = ref([])
const inventoryNull = ref([])
// const selected = ref(null)
const getViews = async () => {
    const res = await getProDetail(1379052170040578049n)
    cartsInfo.value = res.result.skus;
    resSpecs.value = res.result.specs
    resSpecs.value.forEach(item => {
        item.values.forEach(item => item.isSelected = false)
    })

    getSkus()
    getSkusInfo()

}

// 点击 --- 点击，无论有多少行，多少规格。暂时只管理一行内容的点击且active
const fnclick = (i, index, item) => {
    // 先判断是不是这一排的
    const big = resSpecs.value.findIndex(se => se.id === item.id)
    const res = item.values.findIndex(it => it.name === i.name);
    const sku = resSpecs.value[big].values[res]
    // console.log(sku);
    sku.isSelected = !sku.isSelected

}

// 遍历skus ，其中每一个商品的inventory为0时则禁用相应商品规格
const getSkus = () => {
    inventoryNull.value = cartsInfo.value.filter((item) => {
        return item.inventory === 0
    })
    console.log(inventoryNull.value);


}
// 处理 ---假设满足两个条件，其第三个必须禁用 --或者在处理的数组中看每一个是否都有相同的规格，则相同规格禁用
const getSkusInfo = (i) => {
    const o = ref([])
    inventoryNull.value.forEach((item) => {
        item.specs.forEach(item => {
            o.value.push(item.valueName)
        })
    })
    console.log(o.value);
    

}
onMounted(() => getViews())
</script>
<template>
    <div class="info">
        <div class="center">
            <div class="skus"></div>
            <div class="spces" v-for="item in resSpecs" :key="item.id">
                <!-- 商城渲染数据 -->
                <span>{{ item.name }}</span>
                <div class="componets" v-for="(i, index) in item.values" :key="index">
                    <ul class="li-info">
                        <img :src="i.picture" alt="" class="img-pic" v-if="i.picture" @click="fnclick(i, index, item)"
                            :class="{ active: i.isSelected }">
                        <!-- 可能有多种规格 -->
                        <li class="box" @click="fnclick(i, index, item)" :class="{ active: i.isSelected }" v-else>
                            {{
                                i.name
                            }}
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
.info {
    width: 100vw;
    height: 100vh;
    text-align: center;

    .center {
        width: 800px;
        height: 400px;
        margin: 0 auto;
        // background-color: aqua;
        position: relative;

        .spces {
            display: flex;
            justify-content: space-evenly;
            position: relative;
            margin: 10px 0;
            border-top:1px solid rgb(200, 200, 200) ;


            .li-info {

                .img-pic {
                    width: 60px;
                    height: px;
                    background-color: rgb(177, 180, 179);
                    border-radius: 5px;
                    line-height: 25px;
                    cursor: pointer;
                }

                .box {
                    width: 60px;
                    height: 25px;
                    background-color: rgb(177, 180, 179);
                    border-radius: 5px;
                    line-height: 25px;
                    cursor: pointer;
                    
                }

                .active,
                >:hover {
                    background-color: red;
                    border-radius: 5px;
                }

            }



        }
    }
}
</style>
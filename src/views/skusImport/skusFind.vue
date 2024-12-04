<!-- skus组件练习和more -->
<script setup>
import { getProDetail } from '@/apis/shop_detail';
import { onMounted, ref } from 'vue';
import computedMessage from './index.js'
const cartsInfo = ref([])
const resSpecs = ref([])
const inventoryNull = ref([])
let skusResult
// const selected = ref(null)
const getViews = async () => {
    const res = await getProDetail(1369155859933827074n)
    cartsInfo.value = res.result.skus;
    resSpecs.value = res.result.specs
    resSpecs.value.forEach(item => {
        item.values.forEach(item => item.isSelected = false)
    })

    skusResult = getSkus()
    // console.log(skusResult);
    initDisableStatus(skusResult)

}

// 点击 --- 点击，无论有多少行，多少规格。暂时只管理一行内容的点击且active
const fnclick = (i, index, item) => {
    // 先判断是不是这一排的
    // console.log('i在这', i);

    // const big = resSpecs.value.findIndex(se => se.id === item.id)
    // const res = item.values.findIndex(it => it.name === i.name);
    // const sku = resSpecs.value[big].values[res]
    // console.log('这里', item);
    if (i.disabled) return i.isSelected = false
    if (i.isSelected) {
        i.isSelected = false
    } else {
        item.values.forEach(item => item.isSelected = false)
        i.isSelected = true

    }
    checkDisabledStatus(skusResult, resSpecs.value)


}

// 遍历skus ，其中每一个商品的inventory为时则禁用相应商品规格
const getSkus = () => {
    const pathDir = {}
    // 筛选库存大于0的商品规格
    inventoryNull.value = cartsInfo.value.filter((item) => {
        return item.inventory > 0
    })
    // 将商品规格遍历
    inventoryNull.value.forEach(sku => {
        // 匹配每一个valueName的值
        const selectedArr = sku.specs.map(item => item.valueName)
        // 匹配算法，请查看导入的index.js中的代码
        const subset = computedMessage(selectedArr)
        // console.log('subset',subset);
        // 遍历匹配算法的结果，并重新生成对象
        subset.forEach(item => {
            // console.log(item);
            // 数组的每一个元素拼接
            const key = item.join('-')
            // console.log('this', key)
            if (pathDir[key]) {
                pathDir[key].push(sku.id)
            } else {
                pathDir[key] = [sku.id]
            }
        })

    })
    return pathDir
}

// 禁用遍历过后的skus
const initDisableStatus = (skusResult) => {
    resSpecs.value.forEach(specs => {
        specs.values.forEach(item => {
            // console.log('thie', item.name);

            if (skusResult[item.name]) {
                item.disabled = false
            } else {
                item.disabled = true
            }
        })
    })
}
// 点击时切换禁用状态 
/*
在禁用时需要传值，先创建一个数组啊

*/

// 函数传值
const conformButtonInfo = (specs) => {
    let button = []
    // console.log('mniij', specs);
    specs.forEach((item => {
        // console.log(item);
        const selectedValue = item.values.find(i => i.isSelected)
        if (selectedValue) {
            button.push(selectedValue ? selectedValue.name : undefined)
        }
    }))
    return button

}
//更新点击状态

const checkDisabledStatus = (skusResult, val) => {
    // const arr = conformButtonInfo(val)
    // 遍历
    val.forEach((outer, index) => {
        // 循环每个对象时将新的状态重新传入
        const arr = conformButtonInfo(val)
        // 循环每个小对象/数
        console.log('每次数组状态', arr);
        outer.values.forEach((val => {
            if (!val.disabled) {
                arr[index] = val.name
                // 去掉undefined之后组合成key
                const key = arr.filter(value => value).join('-')
                val.disabled = !skusResult[key]
            }

        }))
    })
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
                        <img :src="i.picture" alt="" class="img-pic" v-if="i.picture"
                            @click="$event => fnclick(i, index, item)"
                            :class="{ active: i.isSelected, disabled: i.disabled }">
                        <!-- 可能有多种规格 -->
                        <li class="box" @click="$event => fnclick(i, index, item)"
                            :class="{ active: i.isSelected, disabled: i.disabled }" v-else>
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
            border-top: 1px solid rgb(200, 200, 200);


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

                .disabled {
                    background-color: rgb(243, 243, 243);
                    cursor: not-allowed;
                    border-style: dashed;
                }

            }



        }
    }
}
</style>
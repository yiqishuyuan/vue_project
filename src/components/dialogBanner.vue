<script setup>
import { ref } from 'vue';
const emit = defineEmits(["updata:modelValue"])
defineProps({
    checkInfo: {
        type: Object,
        default: () => { }
    }

})
const dialogConform = ref(false)
const disopen = () => {
    dialogConform.value = true
}
// 激活类
const chooseInfo = ref({})
const exposeAddress = (item) => {
    chooseInfo.value = item

}
const conformAddressInfo = () => {
    emit('updata:modelValue', chooseInfo)
    dialogConform.value = false
}

defineExpose({
    disopen
})
</script>
<template>
    <el-dialog title="切换收货地址" width="30%" center v-model="dialogConform">
        <div class="addressWrapper">
            <div class="text item" v-for="item in checkInfo?.userAddresses"
                :class="{ active: chooseInfo.id === item.id }" :key="item.id" @click="exposeAddress(item)">
                <ul>
                    <li><span>收<i />货<i />人：</span>{{ item.receiver }} </li>
                    <li><span>联系方式：</span>{{ item.contact }}</li>
                    <li><span>收货地址：</span>{{ item.fullLocation + item.address }}</li>
                </ul>
            </div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogConform = false">取消</el-button>
                <el-button type="primary" @click="conformAddressInfo">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<style lang="scss" scoped>
.addressWrapper {
    max-height: 500px;
    overflow-y: auto;
}

.text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    &.item {
        border: 1px solid #f5f5f5;
        margin-bottom: 10px;
        cursor: pointer;

        &.active,
        &:hover {
            border-color: $xtxColor;
            background: lighten($xtxColor, 50%);
        }

        >ul {
            padding: 10px;
            font-size: 14px;
            line-height: 30px;
        }
    }
}
</style>
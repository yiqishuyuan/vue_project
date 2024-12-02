// 试下将所有存量为0的数据的每一项和规格编写为字典
import { ref } from "vue"
const info = ref({})
const computedMessage = (dir) => {
    dir.forEach((item) => {
        item.specs.forEach(item => {
            info[item.valueName] ? info[item.valueName] += 1 : info[item.valueName] = 1
        })
    })
}
export default {
    computedMessage,
    info
}

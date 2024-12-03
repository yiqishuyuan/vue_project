// 试下将所有存量大于0的数据的每一项和规格编写为字典
// 同时将id也返回，即需要id和完整数组

export default function computedMessage(dir) {

    // 传入skus数据
    const subSets = []
    // 将传入的数据的长度进行重新赋值，即将假设长度五，则2**5 == 2*2*2*2*2 == 32
    const numberOfCombinations = 2 ** dir.length
    // 遍历
    for (let combinationIndex = 0; combinationIndex < numberOfCombinations; combinationIndex += 1) {
        const subSet = []
        //将传入数据的原本长度遍历
        for (let setElementIndex = 0; setElementIndex < dir.length; setElementIndex += 1) {
            //判断
            /*
               此处涉及二进制操作  首层遍历 按位 次层遍历左移一（x<<y）等于 x * 2**y
             */
            if (combinationIndex & (1 << setElementIndex)) {
                subSet.push(dir[setElementIndex])
            }
        }

        subSets.push(subSet)
    }

    return subSets
}


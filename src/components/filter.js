export default function bwPowerSet (originalSet) {
    // 传入skus数据
    const subSets = []
    // 将传入的数据的长度进行重新赋值，即将假设长度五，则2**5 == 2*2*2*2*2 == 32
    const numberOfCombinations = 2 ** originalSet.length
    // 遍历
    for (let combinationIndex = 0; combinationIndex < numberOfCombinations; combinationIndex += 1) {
      const subSet = []
       //将传入数据的原本长度遍历
      for (let setElementIndex = 0; setElementIndex < originalSet.length; setElementIndex += 1) {
        //判断
        /*
           此处涉及二进制操作  首层遍历 按位 次层遍历左移一（x<<y）等于 x * 2**y
         */
        if (combinationIndex & (1 << setElementIndex)) {
          subSet.push(originalSet[setElementIndex])
        }
      }
   
      subSets.push(subSet)
    }
   
    return subSets
  }
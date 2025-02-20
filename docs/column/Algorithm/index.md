# 数据结构与算法

## 数据结构

**数组**：一块连续的内存空间，支持通过索引快速访问元素，但插入和删除元素需要移动大量元素，效率低

**链表**：不连续的内存空间，通过指针连接，提高内存的利用效率，但访问元素需要遍历

## 排序算法

### 冒泡排序

```js
function bubbleSort(array: number[]) {
  // 外层循环控制比较的轮数
  for (let i = 0; i < array.length - 1; i++) {
    // 内层循环控制每轮比较的次数
    let isComplete = true
    // 内层循环控制每轮比较的次数
    for (let j = 0; j < array.length - i - 1; j++) {
      // 如果前一个元素大于后一个元素，则交换位置
      if (array[j] > array[j + 1]) {
        ;[array[j], array[j + 1]] = [array[j + 1], array[j]]
        // 如果发生了交换，则说明还没有完成排序
        isComplete = false
      }
    }
    // 如果本轮没有发生交换，则说明已经完成排序
    if (isComplete) {
      break
    }
  }
  // 返回排序后的数组
  return array
}
```

### 插入排序

```js
function insertionSort(array: number[]) {
  // 外层循环控制比较的轮数
  for (let i = 1; i < array.length; i++) {
    // 初始化目标元素的位置
    let target = i
    // 内层循环控制每轮比较的次数
    for (let j = i - 1; j >= 0; j--) {
      // 如果当前元素小于前一个元素，则交换位置
      if (array[target] < array[j]) {
        ;[array[j], array[target]] = [array[target], array[j]]
        // 更新目标元素的位置
        target = j
      } else {
        // 如果当前元素大于前一个元素，则停止比较
        break
      }
    }
  }
  // 返回排序后的数组
  return array
}
```

### 选择排序

```js
export function selectionSort(array: number[]) {
  // 外层循环控制比较的轮数
  for (let i = 0; i < array.length - 1; i++) {
    // 初始化最小元素的位置
    let minIndex = i
    // 内层循环控制每轮比较的次数
    for (let j = i + 1; j < array.length; j++) {
      // 如果当前元素小于最小元素，则更新最小元素的位置
      if (array[j] < array[minIndex]) {
        minIndex = j
      }
    }
    // 将最小元素与当前元素交换位置
    ;[array[i], array[minIndex]] = [array[minIndex], array[i]]
  }
  // 返回排序后的数组
  return array
}
```

### 归并排序

```js
export function mergeSort(array: number[]): number[] {
  // 如果数组长度小于2，则直接返回
  if (array.length < 2) {
    return array;
  }
  // 将数组分成两半
  const mid = Math.floor(array.length / 2);
  const front = array.slice(0, mid);
  const end = array.slice(mid);
  // 递归调用mergeSort，将两半分别排序
  return merge(mergeSort(front), mergeSort(end));
}

function merge(front: number[], end: number[]): number[] {
  // 创建一个临时数组，用于存储排序后的结果
  const temp: number[] = [];
  // 当两个数组都还有元素时，比较两个数组的第一个元素，将较小的元素放入临时数组，并从原数组中删除该元素
  while (front.length && end.length) {
    if (front[0] < end[0]) {
      temp.push(front.shift()!);
    } else {
      temp.push(end.shift()!);
    }
  }
  // 将剩余的元素放入临时数组
  return temp.concat(front, end);
}
```

### 快速排序

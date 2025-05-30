## 组件通信

### 父子

- props/emit

defineProps defineEmits 已内置，不需要手动引入

- attrs

vue3 取消了 $listener 方法

```vue
<script setup>
import { ref, useAttrs } from 'vue';

const attrs = useAttrs();
console.log('attrs:', attrs);
const getParentFun = () => {
  attrs.onParentFun('子组件传值');
};
</script>

<template>
  <div>
    <h1>Child</h1>
    <button @click="getParentFun">attrs</button>
  </div>
</template>
```

### 祖孙

provide/inject



### 兄弟

Vue3 没有 EventBus 方式，而是使用 Mitt.js 库，本质类似

## 插槽

### 默认内容

### 具名插槽

### 动态插槽名

### 作用域插槽

#### 具名作用域插槽 

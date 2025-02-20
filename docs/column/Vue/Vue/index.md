## 组件通信

### 父子

props/emit

defineProps defineEmits 已内置，不需要手动引入

### 爷孙

vue3 取消了 $listener 方法

attrs

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


## 安装

```bash
npm i pinia -S
```



## 挂载

```js
// main.js
import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

app.mount('#app');
```

在 `@/store` 下新建 storeA.js：

```js
import { defineStore } from 'pinia';

export const storeA = defineStore('storeA', {
  state: () => {
    return {
      count: 0,
      name: 'pinia'
    };
  },
  getters: {},
  actions: {}
});
```

在 App.vue 中：

```vue
<script setup>
import { storeA } from '@/store/storeA';
let piniaStoreA = storeA();
const name = piniaStoreA.name;
</script>

<template>
  <h1>{{ name }}</h1>
</template>

```



## 修改状态

### 直接修改

相比于 Vuex，Pinia 是可以直接修改状态的，并且调试工具能够记录到每一次 state 的变化

```js
piniaStoreA.count = 2;
console.log('piniaStoreA:', piniaStoreA.count);
```

### $patch

使用 $patch 方法可以修改多个 state 中的值：

```js
piniaStoreA.$patch({
  count: 3,
  name: 'banana'
});
```
### 在 actions 中修改

```js
// storeA.js
// ...
actions: {
  setName(data) {
    this.name = data;
  }
}
```

```js
// App.vue
piniaStoreA.setName('apple');
```



## storeToRefs

当组件中需要用到 state 多个参数时，使用解构取值会很方便，但是传统的 ES6 解构会使 state 失去响应式：

```vue
<script setup>
import { storeA } from '@/store/storeA';

let piniaStoreA = storeA();
const { name, count } = piniaStoreA;
piniaStoreA.$patch({
  name: 'orange'
});
</script>

<template>
  <h1>{{ name }}</h1>
</template>
```

会发现页面并没有更新为 orange，为了解决这个问题，Pinia 提供了一个解构方法 `storeToRefs`：

```js
// 更改上述代码：
import { storeToRefs } from 'pinia';
const { name, count } = storeToRefs(piniaStoreA);
```



## getters

Vuex 中的 getters 和 Pinia中的 getters 用法是一致的，用于自动监听对应 state 的变化，从而动态计算返回值（和 vue 中的计算属性差不多），并且 getters 的值也具有缓存特性

```js
import { defineStore } from 'pinia';

export const storeA = defineStore('storeA', {
  state: () => {
    return {
      count1: 1,
      count2: 2,
      name: 'pinia'
    };
  },
  getters: {
    sum() {
      console.log('sum getter called');
      return this.count1 + this.count2;
    }
  },
  actions: {
    setName(data) {
      this.name = data;
    }
  }
});
```

什么是**缓存特性**？多次打印 sum 的值：

```js
import { storeA } from '@/store/storeA';
let piniaStoreA = storeA();
console.log('sum: ', piniaStoreA.sum);
console.log('sum: ', piniaStoreA.sum);
console.log('sum: ', piniaStoreA.sum);
piniaStoreA.count1 = 10;
console.log('sum: ', piniaStoreA.sum);
```

![](D:\hyy\code\hyy-blog\docs\column\Vue\Pinia\images\缓存特性.png)

可以看到只有在首次使用或者改变 sum 所依赖的值的时候，getters 中的 sum 才会被调用



## modules

Pinia 没有 modules，如果想使用多个 store，直接定义多个 store 传入不同的 id 即可
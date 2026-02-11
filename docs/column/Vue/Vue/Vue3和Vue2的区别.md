Vue2 基础简单快速上手 Vue3

这里主要讨论的是 Vue3 中组合式  API 主流写法 和 Vue2 中的区别，因为实际开发中一般都是使用 Vue3 **组合式 API** （**Composition API**）

## this

Vue2 中每个组件都有 this，指向当前组件实例，并且 this 包含全局挂载的东西

Vue3 中组合式 API 没有 this，想要获取组件实例，可以通过如下方式获取：

```html
<script setup>
import { getCurrentInstance } from 'vue'

const { proxy, appContext } = getCurrentInstance()

const global = appContext.config.globalProperties

// proxy 就是当前组件实例，但是不包含全局挂载的东西
// global 就是全局实例
// console.log(proxy, global);
</script>
```



## 全局注册

Vue2 中一般是通过 `Vue.prototype.xxx = xxx` 的方式注册属性/方法，然后在组件中通过 this 访问

Vue3 中：

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.config.devtools = true
// 添加全局属性 hello
app.config.globalProperties.hello = '123'

app.mount('#app')
```

然后在组件中访问：

```html
<script setup>
import { getCurrentInstance } from 'vue'
const { appContext } = getCurrentInstance()

const global = appContext.config.globalProperties
console.log(global.GB) // 'bg'
</script>
```



## template

Vue2 中只能有一个根节点，Vue3 中支持多个根节点

本质上 Vue3 中每个组件还是一个根节点，因为 DOM 树只能是树状结构，只是 Vue3 在编译阶段将多个根节点使用 `fragment` 元素包裹起来了，和 `keep-alive` 类似，`fragment` 也是一个不会被渲染的内置组件



## 生命周期

Vue2 **beforeCreate created** beforeMount mounted beforeUpdate updated beforeDestroy destroyed activated deactivated

Vue3 **setup** onBeforeMount onMounted onBeforeUpdate onUpdated  onBeforeUnmount onUnmounted onActivated onDeactivated



## ref 和 reactive

Vue2 中 data 函数中的数据都具有响应式，Vue3 中组合式 API 不存在 data 函数，而是通过引入 `ref `和 `reactive` 函数使变量成为响应式数据

- ref 在 js 中需要通过 `.value` 获取，在 template 中则不需要，因为 ref 函数返回的是一个包装对象
- ref 也可以传入引用类型，内部也是通过调用 reactive 来实现的

```html
<script setup>
import { ref, reactive } from 'vue'

// reactive 的问题：解构丢失响应性
const state = reactive({ count: 0, name: 'vue' })
const { count } = state  // count 不再是响应式的！

// ref 没有这个问题
const count = ref(0)
const name = ref('vue')
// 解构、传递都安全
<script>
```

现在更推荐优先使用 ref：

| 优势               | 说明                                                |
| ------------------ | --------------------------------------------------- |
| **统一性**         | 所有响应式数据都是 `.value`，不用区分对象还是原始值 |
| **解构安全**       | `reactive` 对象解构会失去响应性，`ref` 不会         |
| **更好的 TS 支持** | 类型推断更清晰，尤其在复杂类型场景                  |
| **组合式函数友好** | 返回 `ref` 是标准做法，调用方更灵活                 |



## toRef/toRefs

通过解构 reactive 定义的对象会丢失响应式效果，需要通过 toRef/toRefs 包裹

```html
<script setup>
import { reactive, toRef, toRefs } from 'vue'
const data = reactive({
  name: 'zs',
  age: 33,
  sex: 'male',
})
// 直接通过解构取出来的属性会丢失响应式效果
// const { name, age } = data
// console.log(name, age)

// 通过 toRef 只取一个响应式属性
const sex = toRef(data, 'name')
console.log(sex.value)

// 通过 toRefs 取多个
const { name, age } = toRefs(data)
console.log(name.value, age.value)
</script>
```



## 获取 DOM

```html
<script setup>
import { ref, onMounted } from 'vue'

// 2. 声明与 ref 同名的响应式变量（初始值通常设为 null）
const myDiv = ref(null)
const myInput = ref(null)

onMounted(() => {
  // 3. 组件挂载后，通过 .value 访问 DOM
  console.log(myDiv.value) // 输出: <div>...</div>
  console.log(myInput.value) // 输出: <input type="text">
  
  // 例如：让输入框自动获取焦点
  myInput.value.focus()
})
</script>

<template>
  <!-- 1. 在模板中绑定 ref -->
  <div ref="myDiv">这是一个 div</div>
  <input ref="myInput" type="text" />
</template>
```

不要在 `setup` 的同步代码中直接访问 `xxxRef.value`，DOM 元素只有在组件挂载完成后才存在



## watch

Vue3 中 watch 是一个函数，有三个参数：

- 参数一：监听的属性
- 参数二：接收新值和旧值的回调函数，其实还能接收第三个参数 `onInvalidate`
- 参数三：配置对象

```html
<script setup>
const msg = ref('')
watch(
  msg,
  (newVal, oldVal, onInvalidate) => {
    console.log('count is:', newVal)
    /**
     * 主要使用场景：
     * 1. 清理“过期”的异步请求：
     *    比如在 watch 中发起了一个网络请求（耗时 2s），但在获取到请求结果之前，监听的数据又发生了变化，触发了第二次请求
     * 2. 清除副作用资源
     *    当你使用了定时器、事件监听器、订阅等资源时，必须手动清理，否则会导致内存泄漏
     *    比如在 watch 中开启了一个定时器，如果不清除，每次数据变化都会开启一个新的定时器，导致多个定时器同时运行
     */
    // 开启定时器
    const timer = setInterval(() => {}, 1000)
    onInvalidate(() => {
      console.log('before the update')
      // 下次 watch 触发前，先清除上一次的定时器
      clearInterval(timer)
    })
  },
  {
    // 这俩和 Vue2 一样
    immediate: true,
    deep: true,
    // 回调函数的执行时机，默认在更新之前调用，更新之后调用改为 'post'
    flush: 'pre', // 默认值是 'pre'，还可以是 'post' 或 ’sync‘
    // 调试用
    onTrack(e) { },
    onTrigger(e) { },
  }
)
</script>
```

注意只能监听特定“响应式”的变量，如果不是响应式的，需要用函数包裹变成 getter

| 场景               | ❌ 错误写法                | ✅ 正确写法                        | 原因                                                    |
| ------------------ | ------------------------- | --------------------------------- | ------------------------------------------------------- |
| 监听 Props 属性    | `watch(props.count, ...)` | `watch(() => props.count, ...)`   | `props.count` 只是一个普通值，需要用函数包裹变成 getter |
| 监听 Ref 对象      | `watch(count.value, ...)` | `watch(count, ...)`               | `watch` 监听 ref 时，直接传变量名，不要加 `.value`      |
| 监听 Reactive 属性 | `watch(state.name, ...)`  | `watch(() => state.name, ...)`    | `reactive` 对象的属性不是独立的 ref，必须用函数返回     |
| 监听常量/普通变量  | `watch('name', ...)`      | 无法监听（或使用 `() => 'name'`） | 普通变量不是响应式的，Vue 无法追踪变化                  |

```html
<script setup>
import { ref, reactive, watch } from 'vue'

const count = ref(0)
const data = reactive({
  name: 'zs',
  age: 3,
})

const handleClick = () => {
  data.age++
  count.value++
}

// 监听 ref 属性
watch(count, (newVal, oldVal) => {
  console.log(newVal, oldVal)
})
// 监听 reactive 的属性，除非是一个对象，否则需要用函数包裹
watch(
  () => data.age,
  (newVal, oldVal) => {
    console.log('age: ', newVal)
  }
)
// 监听多个属性
watch([() => data.name, () => data.age], ([newName, newAge], [oldName, oldAge]) => {
  console.log('name is: ', newName, oldName)
  console.log('age is: ', newAge, oldAge)
})
</script>

<template>
  <button @click="handleClick">click me</button>
</template>
```

### 总结：watch 到底能监听什么？

根据 Vue 3 的设计，`watch` 的第一个参数只能是以下四种之一：

1. **一个 Ref 对象**：如 `count`（不需要 `.value`）
2. **一个 Reactive 对象**：如 `state`
3. **一个 Getter 函数**：如 `() => state.count` 或 `() => props.value`
4. **一个数组**：由上述三种类型组成的数组



## watchEffect

和 watch 的区别：

- watch 是对传入的一个或多个值进行监听，触发时会返回新值和旧值，默认第一次不执行
- watchEffect 是传入一个立即执行函数，所以默认第一次就会执行，且不需要传入监听内容，会自动收集函数内部的数据源作为依赖，不会返回新值和旧值

```html
<script setup>
import { watchEffect, watchSyncEffect, watchPostEffect } from 'vue'

// onInvalidate 会作为 watchEffect 回调函数的第一个参数
watchEffect(
  (onInvalidate) => {
    console.log('[watchEffect] age is:', data.age)
    onInvalidate(() => {
      console.log('[watchEffect] before update')
    })
  },
  // 配置项，和 watch 同理
  {
    flush: 'pre',
    onTrack(e) {},
    onTrigger(e) {},
  }
)

// 如果需要修改配置项 flush 为 post 或 sync 时，可以直接使用 watchSyncEffect 或 watchPostEffect
watchPostEffect(() => { })
watchSyncEffect(() => { })
</script>
```



## computed

和 Vue2 用法差不多，Vue3 中用法：

```html
<script setup>
import { computed } from 'vue'
    
const count = ref(1)
    
// 函数写法
const double = computed(() => {
  return count.value * 2
})
console.log(double.value) // 2

// 对象写法
computed({
  get() {},
  set(val) {},
})

// computed 也有第二个参数，和 watch 一样也是调试用
computed(() => {}, {
  onTrack(e) {},
  onTrigger(e) {},
})
</script>
```



## nextTick

Vue3 中用法：

```html
<script setup>
import { nextTick } from 'vue'
// 方式一
const func = async () => {
  await nextTick()
  // ...
}

// 方式二
nextTick(() => {
  // ...
})

// 方式三
nextTick().then(() => {
  // ...
})
</script>
```



## composables

Vue2 中复用 使用 mixins

Vue3 中组合式 API 天然具有可复用性和隔离性

composables 和 hooks 目录中存放的函数的区别：

|       维度       |                 composables（组合式函数）                 |                      hooks（通用钩子）                       |
| :--------------: | :-------------------------------------------------------: | :----------------------------------------------------------: |
|   **核心定义**   |        Vue3 专属，基于 Composition API 封装的逻辑         |       通用工具函数，无框架依赖（可跨 Vue/React 使用）        |
|     **依赖**     |     依赖 Vue 的 API（如 ref、reactive、watch、props）     |           纯 JavaScript/TypeScript，不依赖任何框架           |
|   **命名规范**   |       必须以`use`开头（如`useAuth`、`useRequest`）        | 建议以`use`开头（如`useDebounce`、`useThrottle`），也可直接命名（如`formatTime`） |
|   **适用场景**   | 与 Vue 组件强相关的逻辑（如状态管理、表单校验、路由监听） |       通用工具逻辑（如防抖节流、时间格式化、数据校验）       |
|     **示例**     |     `useAuth`（登录状态管理）、`useForm`（表单处理）      |      `useDebounce`（防抖）、`formatDate`（时间格式化）       |
| **是否可跨框架** |                       仅 Vue3 可用                        |                可在 Vue/React/ 原生 JS 中复用                |

composables 示例：src/composables/useAuth.ts

```typescript
// 依赖Vue的ref、watch、路由等API，Vue专属
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'

export function useAuth() {
  const userStore = useUserStore()
  const router = useRouter()
  const isLogin = ref(false)

  // 监听登录状态变化
  watch(
    () => userStore.token,
    (token) => {
      isLogin.value = !!token
    },
    { immediate: true }
  )

  // 登录方法（结合 Pinia + 路由）
  const login = async (username: string, password: string) => {
    const res = await userStore.login({ username, password })
    if (res.success) {
      router.push('/home')
    }
  }

  // 退出登录
  const logout = () => {
    userStore.clearToken()
    router.push('/login')
  }

  // Vue 生命周期钩子
  onMounted(() => {
    if (!isLogin.value) {
      router.push('/login')
    }
  })

  return { isLogin, login, logout }
}
```

hooks 和 utils 目录中存放的函数的区别：

|     维度     |              utils（纯工具函数）               |                   hooks（逻辑封装函数）                    |
| :----------: | :--------------------------------------------: | :--------------------------------------------------------: |
| **设计思想** |     纯函数，无状态、无副作用，输入决定输出     |         闭包函数，可维护内部状态，返回 “逻辑集合”          |
| **使用方式** |     直接调用（如`formatDate(new Date())`）     | 调用后解构使用（如`const { debounceFn } = useDebounce()`） |
| **返回形式** | 多为基本类型 / 对象（字符串、数字、普通对象）  |        多为「方法 + 状态」的集合（函数、ref、数组）        |
|  **副作用**  |           无（仅做数据转换 / 计算）            |             可包含副作用（如定时器、事件监听）             |
| **命名规范** | 动词 / 名词开头（如`formatDate`、`deepClone`） |      必须以`use`开头（如`useDebounce`、`useStorage`）      |
|   **示例**   |          时间格式化、深拷贝、数据校验          |            防抖节流、本地存储封装、事件监听封装            |

示例：src/utils/format.ts

```typescript
// 纯函数：输入时间→输出格式化字符串，无状态、无副作用
export function formatDate(date: Date | string, format: string = 'YYYY-MM-DD'): string {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return format.replace('YYYY', year).replace('MM', month).replace('DD', day)
}

// 纯函数：输入数组→输出去重后的新数组
export function uniqueArray<T>(arr: T[]): T[] {
  return [...new Set(arr)]
}
```

示例：src/hooks/useDebounce.ts

```typescript
// 闭包函数：维护定时器状态，返回防抖方法
export function useDebounce<T extends (...args: any[]) => any>(fn: T, delay = 300) {
  // 内部维护状态（定时器），属于闭包
  let timer: ReturnType<typeof setTimeout> | null = null

  // 返回防抖方法，方法内部依赖闭包中的timer
  const debounceFn = (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }

  // 返回清理方法，用于销毁时清除副作用
  const clear = () => {
    if (timer) clearTimeout(timer)
  }

  // 返回“方法集合”，而非单一结果
  return { debounceFn, clear }
}
```

**使用方式**：调用后解构使用，且需处理副作用清理

```html
<script setup>
import { onUnmounted } from 'vue'
import { useDebounce } from '@/hooks/useDebounce'

// 调用hooks，得到方法集合
const { debounceFn, clear } = useDebounce((value) => {
  console.log('搜索：', value)
}, 500)

// 组件卸载时清理副作用（定时器）
onUnmounted(() => {
  clear()
})
</script>

<template>
  <input @input="(e) => debounceFn(e.target.value)" />
</template>
```



## 组件通信

### props

父传子：

```html
<!-- 父组件 -->
<script setup>
import { ref } from 'vue'
import Child from './Child.vue'

const parentMessage = ref('hello my son')
</script>

<template>
  <h1>I'm father</h1>
  <Child :msg="parentMessage" />
</template>

<!-- 子组件 -->
<script setup>
const props = defineProps(['msg'])
console.log(props.msg)
</script>

<template>
  <h1>I'm son</h1>
  <p>father's message: {{ props.msg }}</p>
</template>

```

### emit

子传父：

```html
<!-- 父组件 -->
<script setup>
import { ref } from 'vue'
import Child from './Child.vue'

const messageList = ref([])
</script>

<template>
  <h1>I'm father</h1>
  <div v-if="messageList.length">
    from my son:
    <ul>
      <li v-for="item in messageList">{{ item }}</li>
    </ul>
  </div>

  <!-- 子组件只传一个值，$event 就是第一个值 -->
  <Child @update:msg="msg = $event" />

  <!-- 子组件传了多个值 -->
  <Child @update:msg="(a, b) => {
    messageList.push(a, b)
  }" />
</template>


<!-- 子组件 -->
<script setup>
const emit = defineEmits(['update:msg'])

const handleClick = () => {
  emit('update:msg', 'first message', 'second message') // 可以传多个值
}
</script>

<template>
  <h1>I'm son</h1>
  <button @click="handleClick">send message</button>
</template>
```

### attrs 和 listeners

子组件使用 `$attrs` 可以获得父组件除了 props 传递的属性之外的所有属性

子组件使用 `$listeners` 可以获得父组件（不含 `.native` 修饰器的）所有 v-on 事件监听器，在 Vue3 中已经不再使用；但是 Vue3 中的 attrs 不仅可以获取父组件传来的属性也可以获取父组件 v-on 事件监听器

**`attrs` 设计目的就是跨层级透传，Vue 3 默认自动透传，无需逐层 `v-bind="$attrs"`**，如果要阻止自动透传可以使用 **`inheritAttrs: false` **

```html
<!-- GrandParent.vue -->
<script setup>
import { ref } from 'vue'
import Parent from './Parent.vue'

const msg1 = ref('hello')
const msg2 = ref('my son')

const grandpaFunc = (value) => {
  console.log('grandpa method is called.', value)
}
</script>
<template>
  <div>
    <h1>I'm grandpa</h1>
    <Parent :msg1="msg1" :msg2="msg2" @grandpaFunc="grandpaFunc" class="my-class" style="color: red" />
  </div>
</template>

<!-- Parent.vue -->
<template>
  <Child />  <!-- 会自动透传 -->
</template>
<script setup>
defineProps(['msg1'])
// defineOptions({ inheritAttrs: false })  // 关闭自动透传
</script>

<!-- Child.vue -->
<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
console.log(attrs) // proxy{ "msg2":"my son", "class":"my-class", "style":{"color":"red"} }

const handleClick = () => {
  attrs.onGrandpaFunc('hello my dad') // 调用父组件方法
}
</script>
<template>
  <div>
    <h1>I'm son</h1>
    <button @click="handleClick">send message</button>
  </div>
</template>
```
注意：

```html
<!-- Parent.vue -->
<template>
  <div>
    <!-- 需要手动透传，把 attrs 传给 Child -->
    <Child v-bind="$attrs" />
  </div>
</template>
```


> 如果 Vue 警告：Parent 组件没有"可绑定 attrs 的单一根节点"。解决：要么包裹成单根，要么 `defineOptions({ inheritAttrs: false })` 后手动 `v-bind="$attrs"` 指定传给谁**

### provide/inject

- provide：一个对象或者是一个返回对象的函数，里面包含要传给后代组件的属性
- inject：一个字符串数组或者是一个对象，获取向上任意层级组件 provide 的值

```html
<!-- GrandParent.vue -->
<script setup>
import { ref, provide } from 'vue'
import Parent from './Parent.vue'

const msg1 = ref('hello')
const msg2 = ref('my son')

provide('msg1', msg1)
provide('msg2', msg2)
</script>
<template>
  <Parent />
</template>

<!-- Parent.vue -->
<script setup>
import Child from './Child.vue'
</script>
<template>
  <Child />
</template>

<!-- Child.vue -->
<script setup>
import { inject } from 'vue'
console.log(inject('msg1').value)
console.log(inject('msg2').value)
</script>
```

### $parent 和 $children

Vue2 中：

- `$parent`：子组件获取父组件 Vue 实例，可以获取父组件的属性方法等

- `$children`：父组件获取子组件 Vue 实例，是一个数组，是直接儿子的集合，但并不保证子组件的顺序

```html
<script>
import Child from './Child'
export default {
  components: { Child },
  created() {
    console.log(this.$children) // [Child实例]
    console.log(this.$parent) // 父组件实例
  }
}
</script>
```

**Vue3 中已移除**

| Vue 2                      | Vue 3                                |
| -------------------------- | ------------------------------------ |
| `$parent` 直接访问父组件   | **打破单向数据流**，难以追踪数据来源 |
| `$children` 直接访问子组件 | **依赖模板结构**，重构时易断裂       |
| 隐式耦合                   | 显式 `props/emits` 更清晰            |

### ref + expose

Vue2 中在模板中定义 ref，通过 `this.$refs.xxx` 的方式可以直接获取子组件实例

Vue3 中：

```html
<!-- Parent.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import Child from './Child.vue'

const childRef = ref() // 命名要和 template 中的名称相同
onMounted(() => {
  childRef.value.add()
  console.log(childRef.value.count) // 1
})
</script>

<template>
  <Child ref="childRef" />
</template>
```

```html
<!-- Child.vue -->
<script setup>
import { ref, defineExpose } from 'vue'
const count = ref(0)
const add = () => count.value++
defineExpose({ count, add }) // 暴露给父组件
</script>
```

实际开发中使用场景：

- 表单验证（调用子组件 validate 方法）
- 播放器控制（播放/暂停/seek）
- 地图/图表组件（调用原生 API）

| 场景         | props/emits    | ref + expose | 哪个更好          |
| ------------ | -------------- | ------------ | ----------------- |
| 简单数据传递 | ✅ 清晰         | ❌ 过度       | props             |
| 表单验证触发 | ❌ 需要复杂事件 | ✅ 直接调用   | ref               |
| 播放器控制   | ❌ 状态同步麻烦 | ✅ 命令式直观 | ref               |
| 跨层级通信   | ❌ 逐层传递     | ❌ 破坏封装   | provide/event bus |

### 总结

| 场景       | Vue 2                                      | Vue 3 推荐                      |
| ---------- | ------------------------------------------ | ------------------------------- |
| 父传子     | `props` / `$parent`                        | `props`                         |
| 子传父     | `$emit` / `$parent`                        | `emit`                          |
| 深层传     | `provide/inject` / `$attrs` / `$listeners` | `provide/inject` / `useAttrs()` |
| 子组件实例 | `$children[index]` /  `$refs`              | `ref` + `defineExpose`          |
| 全局状态   | Vuex / 事件总线                            | Pinia                           |

#### attrs 和 provide/inject 的区别

**`attrs` 是为了**透传父组件给的原生 HTML 属性**（class、style、事件、data-\*），不需要声明，自动到子组件根元素。`provide` 是为了**显式共享任意数据**给深层后代，需要声明，支持响应式。两者解决不同问题，不是替代关系**

```html
<!-- Parent.vue -->
<script setup>
import { provide } from 'vue'
provide('myData', 'from provide')
</script>

<template>
  <!-- 同时用两种方式 -->
  <Child 
    class="my-class"      <!-- 走 attrs -->
    data-id="123"         <!-- 走 attrs -->
  />
</template>
```

```html
<!-- Child.vue -->
<script setup>
import { inject, useAttrs } from 'vue'

const fromProvide = inject('myData')  // 'from provide'
const attrs = useAttrs()              // { class: 'from-attrs', 'data-id': '123' }
</script>

<template>
  <!-- attrs 自动透传到根元素 -->
  <div class="child-root">  <!-- 会合并 class="my-class child-root" -->
    Content
  </div>
</template>
```



## v-model

Vue2 中每个组件只能有一个 v-model

```html
<!-- Vue 2：只能绑定一个值 -->
<Child v-model="name" />

<!-- 其他数据只能用 props + events，繁琐 -->
<Child 
  :value="name" 
  @input="name = $event"
  :age="age" 
  @update:age="age = $event"
/>
```

Vue3 中每个组件可以有多个 v-model

```html
<!-- Vue 3：可以绑定多个，语义清晰 -->
<Child 
  v-model:name="userName"
  v-model:age="userAge"
  v-model:visible="isVisible"
/>
```

移除了 .sync 写法，取而代之的是 v-model:event 的形式：

```html
<!-- 父组件 -->
<script setup>
import { ref } from 'vue'
import Child from './components/Child.vue'
const msg = ref('I am your dad.')
// 点击改变子组件的值
const handleClick = () => {
  msg.value = 'dad is me'
}
</script>
<template>
  <p>Parent message: {{ msg }}</p>
  <button @click="handleClick">click me</button>
  <Test v-model:msg="msg" />
  <!-- 相当于，$event 是子组件 emit 传的第一个参数，本质上也是语法糖 -->
  <Test :msg="msg" @update:msg="msg = $event" />
  <!-- 使用函数接收全部参数 -->
  <Test
    :msg="msg"
    @update:msg="
      (a, b) => {
        msg = a
        console.log(b, c) // param2 param3
      }
    "
  />
</template>

<!-- 子组件 -->
<script setup>
const props = defineProps(['msg'])
const emits = defineEmits(['update:msg'])
// 点击改变父组件的值
const handleClick = () => {
  // 可以传递多个参数
  emits('update:msg', 'I am your son', 'param2', 'param3')
}
</script>
<template>
  <p>Child message: {{ props.msg }}</p>
  <button @click="handleClick">click me</button>
</template>
```



## 状态管理

Vue2 使用 Vuex

Vue3 更推荐使用 Pinia



## 路由

都是使用 vue-router，只不过在 Vue3 中使用方式有所不同：

```html
<script setup>
import { useRoute, useRouter } from "vue-router"
// route 对应 Vue2 里的 this.$route
const route = useRoute()
// router 对应 Vue2 里的 this.$router
const router = useRouter()
</script>
```



## CSS 样式穿透

Vue2 中 scoped 使用 `/deep/` 或 `::v-deep`

Vue3 中只能使用 :deep()



## CSS 绑定 JS 变量

Vue3 中 CSS 可以使用 JS 中的变量

```html
<script setup>
const color = ref('blue')
</script>

<template>
  <h1>Title</h1>
</template>

<style scoped>
h1 {
  color: v-bind(color);
}
</style>
```


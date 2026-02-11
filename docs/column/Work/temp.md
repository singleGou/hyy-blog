## 针对浏览器网址访问不了问题

1. DNS污染或缓存故障
   - 解决方案：
     - 手动设置DNS为 `223.5.5.5`（阿里）或 `119.29.29.29`（腾讯）
     - 执行 `ipconfig /flushdns` 清除缓存



## vscode 阻止脚本运行

打开Windows PowerShell 之后
输入命令：get-executionpolicy
然后：set-executionpolicy remotesigned
然后更改权限为 A
然后命令：get-executionpolicy



## 保存代码自动使用 Prettier 格式化

vscode 设置搜索 format，找到 Format On Save 勾选



## nvm 设置镜像下载

```
nvm node_mirror https://npmmirror.com/mirrors/node/
nvm npm_mirror https://npmmirror.com/mirrors/npm/
```



## Webpack5 path 模块使用

Vue-cli@5 创建的项目是用 webpack5 打包的，使用 nodejs 的 path 模块会报错，需要安装 pollify

```
npm install path-browserify
```

然后在 vue.config.js 中配置

```
module.exports = {
  ...
  configureWebpack: {
    resolve: {
      fallback: {
        path: require.resolve('path-browserify')
      }
    }
  },
 };
```



## Git

### Git 生成密钥

```
// 全局配置
git config –-global user.name hyy
git config –-global user.email hyy@cestc.cn

// 根据配置的用户名和邮箱生成密钥到本地
ssh-keygen -t rsa -C hyy@cestc.cn
```

### 重命名分支

```bash
# 在当前分支
git branch -m new_branch_name

# 不在当前分支
git branch -m old_branch_name new_branch_name
```

git 需要 commit 一次才能创建分支



## Element

不要给 el-form-item 添加 required 属性，不然校验的时候会添加 xxx is required 默认校验信息，required 用在具体规则里：

```js
formRule: {
  password: [
    { required: true, trigger: "blur", validator: validatePassword },
  ],
},
```



## HTML

设置属性 tab-index = -1 禁止 tab 键聚焦

el-tooltip 会设置聚焦

```html
<el-tooltip :content="tip" :disabled="!tip" placement="top" :tabindex="-1">
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</el-tooltip>
```

```
width: 50px;
text-overflow: ellipsis;
white-space: nowrap;
overflow: hidden;
```



## JavaScript

String.prototype.localCompare()

```js
// 这段代码的作用是将对象数据按照键名进行排序
// 1. Object.entries(res.data) 将对象转换为 [key, value] 形式的数组
// 2. sort((a,b) => a[0].localeCompare(b[0])) 使用 localeCompare 按字母顺序对键名进行排序
// 例如输入: { pending: 10, processing: 5, completed: 8 }
// 输出: [['completed',8], ['pending',10], ['processing',5]]

const sortedData = Object.entries(res.data).sort((a, b) => a[0].localeCompare(b[0])
```



## Vue

### 指令修饰符

`.sync`: vue 里面自定义的修饰符，语法糖

```vue
// 父组件
<MyDialog :visible.sync="dialogVisible" />

// 子组件
<template>
  <div>
	<button @click="updateVisible"></button>
  </div>
</template>
<script>
export default {
  method: {
   updateVisible() {
     // 父组件无需定义事件
     this.$emit('update:visible', true)
   }
  }   
}
</script>
```



### provide/inject

基本数据类型并不是响应式的，有两种方法可以变为响应式：

1. 传递的参数用一个方法返回

```js
// 父组件
data() {
  msg: 'hello',
},
provide() {
  return {
	grandpaMsg: () => {
	  return this.msg
	}
  }
}
```

```vue
// 子组件
<template>
  <div>{{ grandpaMsg() }}</div>
</template>

<script>
export default {
  inject: ['grandpaMsg']
}
</script>
```

2. 把需要传递的参数定义成一个对象

```js
// 父组件
data() {
  obj: {
  	msg: 'hello'
  }
},
provide() {
  return {
    grandpaMsg: this.obj
  }
}
```

```vue
// 子组件
<template>
  <div>{{ grandpaMsg.msg }}</div>
</template>

<script>
export default {
  inject: ['grandpaMsg']
}
</script>
```



## OpenLayers



sb uni-app

uniapp 打包为Android的apk时，由于适用https和自签证书，离线打包不支持sslVerify，导致出现Trust anchor for certification path not found错误。只能使用云打包生成apk，每天只有5次免费机会，这个设置真的非常坑。



# 教程

[机场导航页 (xn--ehqx35aimmzwv.com)](https://xn--ehqx35aimmzwv.com/)

## JavaScript

[现代 JavaScript 教程](https://zh.javascript.info/)

https://singlegou.github.io/hyy-blog/

## Algorithm

https://javabetter.cn/xuexiluxian/algorithm.html

https://labuladong.online/algo/home

[一名【合格】前端工程师的自检清单前端开发是一个非常特殊的行业，它的历史实际上不是很长，但是知识之繁杂，技术迭代速度之快是 - 掘金 (juejin.cn)](https://juejin.cn/post/6844903830887366670#heading-46)

[2025年，前端开发为什么一定要学习Rust？Rust在前端领域应用越来越广泛，Rust 的设计理念对于前端开发有极大的 - 掘金 (juejin.cn)](https://juejin.cn/post/7450021642377199643?searchId=202501021512475D0B245E0EB2A1385E18)

## AI

https://ai-bot.cn/building-effective-agents-claude/

https://openrouter.ai/



重置机器码：

```bash
irm https://raw.githubusercontent.com/yuaotian/go-cursor-help/refs/heads/master/scripts/run/cursor_win_id_modifier.ps1 | iex
```



文档、代码格式

中文文档中英文或数字左右间隔一个空格

== ===

let this = that 箭头函数

var let const



Vue2 3 后台管理系统博客 可以使用 ai 创建

学习 js css 

锻炼



ideas:

英语学习 AI 口语对话 分享小红书

全栈 + AIGC 项目 AI 写作，生成视频

微信公众号紧跟时事分享





Vue 官方（Style Guide 与核心团队）**没有强制书写顺序**，但给出了**可读性优先的推荐顺序**；
社区工具（eslint-plugin-vue / Vetur / Volar）则把「默认格式化规则」固化下来。
**结论：用官方推荐的「ESLint 默认顺序」即可**，既符合核心团队审美，也能一键自动对齐，无需争论。

------

### ✅ 官方 Style Guide 推荐顺序（v3 同样适用）

```html
<template>
  <!-- 1. 全局性指令 & 唯一性属性 -->
  <div
    is="custom-comp"
    v-if="show"
    v-for="item in list"
    :key="item.id"

    <!-- 2. 双向绑定 -->
    v-model="val"

    <!-- 3. 普通单向绑定 -->
    :foo="foo"
    :bar.sync="bar"
    @click="onClick"
    @change="onChange"

    <!-- 4. DOM 原生属性 -->
    class="card"
    style="color: red"
    ref="card"
    slot="header"
  >
  </div>
</template>
```

**记忆口诀**：
**唯一 → 双向 → 单向 → 原生**
（`is / v-if / v-for / :key` → `v-model` → `:prop @event` → `class style ref slot`）

------

### ⚙️ 让工具自动帮你排

1. 安装官方规则

```bash
npm i -D eslint-plugin-vue
```

1. `.eslintrc.js` 里加

```js
extends: ['plugin:vue/vue3-recommended'], // 或 vue2-recommended
rules: {
  'vue/attributes-order': ['error', {
    order: [
      'DEFINITION',   // is
      'LIST_RENDERING', // v-for
      'CONDITIONALS',   // v-if / v-show
      'RENDER_MODIFIERS', // v-once / v-pre
      'GLOBAL',         // id
      'UNIQUE',         // ref / key / slot
      'TWO_WAY_BINDING', // v-model
      'OTHER_DIRECTIVES', // v-custom
      'OTHER_ATTR',     // :foo @click
      'EVENTS',         // @click.native
      'CONTENT'         // v-text / v-html
    ]
  }]
}
```

1. 保存即自动排序，**团队零争吵**。
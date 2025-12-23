## 创建 Vite 项目

指定 vue-ts 模板预设

```bash
pnpm create vite vue3-element-admin --template vue-ts
```

## 配置路径别名

只需配置两个文件

vue.config.ts 管运行：

```typescript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { fileURLToPath, URL } from "node:url";

/**
 * 获取 src 目录的绝对路径
 * 在 ES 模块中使用 import.meta.url 替代 __dirname
 */
const pathSrc = fileURLToPath(new URL("./src", import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": pathSrc,
    },
  },
  plugins: [vue()],
});
```

tsconfig.app.json 管提示：

```json
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

## 自动导入

安装插件：

```bash
pnpm add -D unplugin-auto-import unplugin-vue-components
```

### unplugin-auto-import

负责自动导入 JavaScript/TypeScript 函数和 API

```js
AutoImport({
  imports: ["vue"], // 自动导入 vue 相关函数，如：ref, reactive, toRef 等
  resolvers: [
    ElementPlusResolver(), // 自动导入 ElMessage, ElNotification, ElMessageBox 等 API
    IconsResolver({}), // 自动导入图标相关的函数
  ],
});
```

处理的内容：

- ✅ `ElMessage.success('操作成功')` - Element Plus 的消息提示 API
- ✅ `ElNotification.info('通知')` - Element Plus 的通知 API
- ✅ `ElMessageBox.confirm('确认删除？')` - Element Plus 的确认框 API
- ✅ 图标相关的工具函数

### unplugin-vue-components

负责自动注册 Vue 组件

```js
Components({
  resolvers: [
    ElementPlusResolver(), // 自动注册 <el-button>, <el-input> 等组件
    IconsResolver({
      // 自动注册图标组件
      enabledCollections: ["ep"], // element-plus 图标库
    }),
  ],
});
```

处理的内容：

- ✅ `<el-button>` - Element Plus 按钮组件
- ✅ `<el-input>` - Element Plus 输入框组件
- ✅ `<i-ep-search />` - Element Plus 图标组件
- ✅ 所有 Element Plus 的 UI 组件

### 实际使用示例

```vue
<template>
  <!-- Components 插件处理这些组件的自动注册 -->
  <el-button @click="showMessage">点击我</el-button>
  <i-ep-search />
  <!-- 图标组件 -->
</template>

<script setup>
// AutoImport 插件处理这些 API 的自动导入
const showMessage = () => {
  ElMessage.success("操作成功！"); // 无需手动 import
};
</script>
```

### 总结

两个插件配置相同的 resolver 是因为：

- AutoImport ：让你在 JS 代码中直接使用 Element Plus 的 API
- Components ：让你在模板中直接使用 Element Plus 的组件
- 各司其职 ：一个管函数，一个管组件，缺一不可！

vue.config.ts 配置自动导入：

```ts
plugins: [
  AutoImport({
    // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
    imports: ["vue"],
    eslintrc: {
      enabled: true, // 是否自动生成 eslint 规则，建议生成之后设置 false
      filepath: "./.eslintrc-auto-import.json", // 指定自动导入函数 eslint 规则的文件
    },
    dts: path.resolve(pathSrc, "types", "auto-imports.d.ts"), // 指定自动导入函数TS类型声明文件路径
  }),
  Components({
    dts: path.resolve(pathSrc, "types", "components.d.ts"), // 指定自动导入组件TS类型声明文件路径
  }),
];
```

**.eslintrc.cjs - 自动导入函数 eslint 规则引入**

```js
"extends": [
    "./.eslintrc-auto-import.json"
],
```

让 TypeScript 认识声明，tsconfig.json 里加：

```json
{
  "include": ["src/**/*.d.ts"]
}
```

## Element Plus

```bash
pnpm add element-plus
```

**安装自动导入 Icon 依赖**

```bash
pnpm add -D unplugin-icons
```

vue.config.ts

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

// https://vite.dev/config/
export default defineConfig({
  // ...
  plugins: [
    vue(),
    AutoImport({
      // 自动导入 vue 相关函数，如：ref, reactive, toRef 等
      imports: ["vue"],
      resolvers: [
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElNotification 等
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver(),
      ],
      eslintrc: { enabled: true }, // 生成 .eslintrc-auto-import.json，eslint 不报错
      dts: "src/types/auto-imports.d.ts", // 生成 auto-imports.d.ts 全局声明文件
    }),
    Components({
      resolvers: [
        // 自动注册 Element Plus 组件
        ElementPlusResolver(),
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ["ep"], // element-plus 图标库
        }),
      ],
      dts: "src/types/auto-imports.d.ts", // 生成 components.d.ts 全局声明文件
    }),
    Icons({
      // 自动安装图标库
      autoInstall: true,
    }),
  ],
});
```

## 本地 SVG 图标

1. 安装依赖：

```bash
pnpm add -D vite-plugin-svg-icons
```

2. 准备图标

```
src/assets/icons/          ← 放所有 .svg
├─ home.svg
├─ user.svg
└─ logo.svg
```

> 图标要求：**纯路径、无内联 style**（方便动态填色）

3. 配置 `vite.config.ts`

```typescript
// ...
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

export default defineConfig({
  plugins: [
    // ...
    createSvgIconsPlugin({
      iconDirs: [fileURLToPath(new URL("./src/assets/icons", import.meta.url))],
      symbolId: "icon-[dir]-[name]",
    }),
  ],
});
```

4. 雪碧图注册（main.ts）

```typescript
import { createApp } from "vue";
import App from "./App.vue";

import "virtual:svg-icons-register"; // 生成雪碧图并注入 DOM，此处需要在 vite-env.d.ts 文件中进行类型声明，不然 ts 检查会报红
import SvgIcon from "./components/SvgIcon.vue";

const app = createApp(App);
app.component("SvgIcon", SvgIcon);

app.mount("#app");
```

5. 封装 Vue 组件 `SvgIcon.vue`

```vue
<script setup lang="ts">
import { computed } from "vue";

interface Props {
  name: string; // 图标文件名（无扩展名）
  prefix?: string; // 雪碧图前缀
  className?: string;
}
const props = withDefaults(defineProps<Props>(), {
  prefix: "icon",
  className: "",
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

<template>
  <svg :class="className" aria-hidden="true">
    <use :href="symbolId" />
  </svg>
</template>

<style scoped>
svg {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em; /* 因 icon 大小被设置为和字体大小一致，而 span 等标签的下边缘会和字体的基线对齐，故需设置一个往下的偏移比例，来纠正视觉上的未对齐效果 */
  fill: currentcolor; /* 支持外部 color/font-size 控制 */
}
</style>
```

6. 使用（全局注册 or 局部）

全局注册（ `main.ts` ）：

```
import SvgIcon from '@/components/SvgIcon.vue'
app.component('SvgIcon', SvgIcon)
```

页面任意地方：

```vue
<SvgIcon name="home" class="text-2xl text-blue-600" />
```

7. TypeScript 声明（防止虚拟模块报错）

src/env.d.ts 追加：

```typescript
/// <reference types="vite-plugin-svg-icons/client" />
// 如果不生效（vscode 还是报错），则追加
declare module "virtual:svg-icons-register";
```

确保 `tsconfig.app.json` 中的 include 覆盖该类型声明文件：

```typescript
{
  "include": ["src/**/*.d.ts"]
}
```

## SCSS

安装依赖：

```bash
pnpm add -D sass
```

variables.scss

```scss
$bg-color: #242424;
```

vite.config.ts

```typescript
export default defineConfig({
  // ...
  css: {
    // CSS 预处理器
    preprocessorOptions: {
      // define global scss variable
      scss: {
        additionalData: `@use "@/styles/variables.scss" as *;`,
      },
    },
  },
});
```

在 style 中使用

```vue
<template>
  <div class="box" />
</template>

<style lang="scss" scoped>
.box {
  width: 100px;
  height: 100px;
  background-color: $bg-color;
}
</style>
```

如果需要在 ts 中使用，那么就需要创建一个以 .module.scss 结尾的文件：

```scss
// 导出 variables.scss 文件的变量
:export {
  bgColor: $bg-color;
}
```

在 ts 中使用：

```vue
<script setup lang="ts">
import variables from "@/styles/variables.module.scss";

console.log(variables.bgColor);
</script>

<template>
  <div :style="{ backgroundColor: variables.bgColor }"></div>
</template>
```

## Tailwind CSS

安装依赖：

```bash
pnpm add -D tailwindcss @tailwindcss/vite
```

安装 vscode 插件 - **Tailwind CSS IntelliSense**

目前最新的 tailwind 来到了 v4 版本，主打一个开箱即用

`vite.config.ts`：

```typescript
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    // ...
    tailwindcss(),
  ],
});
```

在 `main.ts` 中引入：

```typescript
import "./styles/index.css";
```

`./styles/index.css`：

```css
@import "tailwindcss";
```

## Pinia

安装依赖：

```
pnpm add pinia
```

main.ts

```typescript
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";

app.use(createPinia());

app.mount("#app");
```

选择组合式 api

store/counter.ts

```typescript
import { defineStore } from "pinia";

export const useCounterStore = defineStore("coutner", () => {
  // ref -> state
  const count = ref(0);

  // computed -> getters
  const double = computed(() => {
    return count.value * 2;
  });

  // function -> actions
  function increment() {
    count.value++;
  }

  return { count, double, increment };
});
```

使用

```vue
<script setup lang="ts">
import { useCounterStore } from "@/store/counter";
const counterStore = useCounterStore();
</script>

<template>
  <ElButton type="primary" @click="counterStore.increment"
    >点我 {{ counterStore.count }}</ElButton
  >
</template>
```

## 环境变量

根目录 .env.development .env.production

变量必须以 VITE\_ 为前缀才能暴露给外部读取

```
VITE_APP_TITLE = 'vue3-element-admin'
VITE_APP_PORT = 3000
VITE_APP_BASE_API = '/dev-api'
```

生产环境

```
VITE_APP_TITLE = 'vue3-element-admin'
VITE_APP_PORT = 3000
VITE_APP_BASE_API = '/prod-api'
```

环境变量智能提示：src/types/env.d.ts

```
// src/types/env.d.ts
interface ImportMetaEnv {
  /**
   * 应用标题
   */
  VITE_APP_TITLE: string;
  /**
   * 应用端口
   */
  VITE_APP_PORT: number;
  /**
   * API基础路径(反向代理)
   */
  VITE_APP_BASE_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

## 配置反向代理

用于解决开发环境跨域问题，生成环境通过 nginx 配置反向代理解决

同源策略：协议、域名、端口都要相同，

vite.config.ts

```typescript
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, cwd(), "");

  return {
    server: {
      proxy: {
        // 所有 /api 开头的请求 → 转发到 target
        [env.VITE_PROXY_TARGET]: {
          target: "http://test.com",
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ""), // 去掉 /api 前缀
        },
        // 可选：websocket 代理
        "/socket": {
          target: "ws://test.com",
          ws: true,
          changeOrigin: true,
        },
      },
    },
  };
});
```

## Axios

安装：

```bash
pnpm add axios
```

## Vue Router

安装 vue-router 4

```bash
pnpm add vue-router@4
```

创建路由实例：

```typescript
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

export const Layout = () => import("@/layout/index.vue");

const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue"),
      },
    ],
  },

  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: { hidden: true },
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard",
        meta: { title: "dashboard", icon: "homepage", affix: true },
      },
    ],
  },
];

/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

/**
 * 重置路由
 */
export function resetRouter() {
  router.replace({ path: "/login" });
  location.reload();
}

export default router;
```

在 main.ts 中引入：

```typescript
import router from "./router";

app.use(router).mount("#app");
```

动态路由 添加路由守卫：

安装 nprogress

```bash
pnpm add nprogress
```

## 代码格式化

引用官方的一句话就是 \*use **Prettier for formatting** and **linters for catching bugs\***

**npx（npm 自带）** 和 **pnpm dlx（pnpm 专属）** 都是“临时安装并立即执行某个包的可执行文件”，执行完就把缓存删掉，不会污染全局依赖

### ESLint

官网：[Getting Started with ESLint - ESLint - Pluggable JavaScript Linter](https://eslint.org/docs/latest/use/getting-started)

1. 安装 vscode 插件 - ESLint

2. 执行命令安装项目相关依赖包及初始化，自动生成配置文件：

   ```bash
   pnpm create @eslint/config@latest
   ```

选择你想要的配置，尽量选择与项目相适配的选项，我这里自动生成了 eslint.config.ts 配置文件

> 注意最新版 pnpm 会报一个运行脚本的警告，按提示执行一下 `pnpm approve-builds` 命令即可

```typescript
// eslint.config.ts
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  pluginVue.configs["flat/essential"],
  {
    files: ["**/*.vue"],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
  // 在此配置自己的规则
  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
      "vue/multi-word-component-names": "off",
    },
  },
]);
```

3. ESLint 忽略配置（.eslintignore）

   示例：

   ```
   dist
   node_modules
   public
   .husky
   .vscode
   .idea
   *.sh
   *.md

   src/assets

   .eslint.config.ts
   .prettierrc
   .stylelint.config.mjs
   ```

4. package.json 添加 ESLint 检测指令：

   ```json
   "scripts": {
     "lint:eslint": "eslint \"src/**/*.{vue,ts,js}\" --fix"
   }
   ```

   执行命令：

   ```bash
   pnpm lint:eslint
   ```

5. ESLint 保存自动检测

   vscode 设置搜索 setting.json，找到 Edit in setting.json：

   ```json
   {
     "editor.formatOnSave": true,
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true // 开启 eslint 自动检测
     }
   }
   ```

### Prettier

1. 安装 vscode 插件 - Prettier

2. 安装依赖：

   ```bash
   pnpm add --save-dev --save-exact prettier
   # 缩写
   pnpm add -D -E prettier
   ```

3. 新建 .prettierrc 配置文件：

   ```bash
   node --eval "fs.writeFileSync('.prettierrc','{}\n')"
   ```

   基本配置：

   ```json
   {
     "trailingComma": "es5",
     "tabWidth": 2,
     "semi": true,
     "singleQuote": true,
     "printWidth": 200
   }
   ```

4. 新建 .prettierignore 忽略配置文件：

   ```bash
   node --eval "fs.writeFileSync('.prettierignore','# Ignore artifacts:\ndist\nnode_modules\n')"
   ```

   示例：

   ```
   # Ignore artifacts:
   dist
   node_modules
   public
   .husky
   .vscode
   .idea
   *.sh
   *.md

   src/assets
   ```

5. package.json 添加 prettier 格式化指令：

   ```json
   "scripts": {
     "lint:prettier": "prettier --write \"**/*.{js,ts,json,css,less,scss,vue,html,md}\""
   }
   ```

   执行命令：

   ```bash
   pnpm lint:prettier
   ```

6. vscode 设置保存自动格式化：

   ```json
   {
     "editor.formatOnSave": true, // 保存格式化文件
     "editor.defaultFormatter": "esbenp.prettier-vscode" // 指定 prettier 为所有文件默认格式化器
   }
   ```

### Stylelint

CSS linter，CSS 代码规范检测

1. 安装 vscode 插件 - Stylelint

2. 执行命令安装项目相关依赖包及初始化，自动生成配置文件：

   ```bash
   pnpm create stylelint@latest
   ```

   我这里生成的是 .stylelint.config.mjs：

   ```js
   /** @type {import("stylelint").Config} */
   export default {
     extends: ["stylelint-config-standard"],
   };
   ```

   此过程会自动安装两个依赖：`stylelint` 和 `stylelint-config-standard`，另外还需要安装几个依赖用来正确解析 vue、scss、html 等：

   ```bash
   pnpm add -D stylelint-config-recommended-scss stylelint-config-recommended-vue postcss postcss-html postcss-scss stylelint-config-recess-order stylelint-config-html
   ```

   |               依赖                |                              说明                              |
   | :-------------------------------: | :------------------------------------------------------------: |
   |             stylelint             |                        stylelint 核心库                        |
   |     stylelint-config-standard     |                     Stylelint 标准共享配置                     |
   | stylelint-config-recommended-scss | 扩展 stylelint-config-recommended 共享配置并为 SCSS 配置其规则 |
   | stylelint-config-recommended-vue  | 扩展 stylelint-config-recommended 共享配置并为 Vue 配置其规则  |
   |   stylelint-config-recess-order   |                     提供优化样式顺序的配置                     |
   |       stylelint-config-html       |  共享 HTML (类似 HTML) 配置，捆绑 postcss-html 并对其进行配置  |
   |           postcss-html            |             解析 HTML (类似 HTML) 的 PostCSS 语法              |
   |           postcss-scss            |                     PostCSS 的 SCSS 解析器                     |

3. 新建 .prettierignore 忽略配置文件

   ```bash
   node --eval "fs.writeFileSync('.stylelintignore','dist\nnode_modules\n')"
   ```

   示例：

   ```
   dist
   node_modules
   public
   .husky
   .vscode
   .idea
   *.sh
   *.md

   src/assets
   ```

4. package.json 添加 Stylelint 检测指令：

   ```json
   "scripts": {
       "lint:stylelint": "stylelint  \"**/*.{css,scss,vue,html}\" --fix"
   }
   ```

   执行命令：

   ```bash
   pnpm lint:stylelint
   ```

5. vscode 设置保存自动检测

   ```json
   {
     "editor.codeActionsOnSave": {
       "source.fixAll.stylelint": "explicit" // 开启 Stylelint 保存自动检测
     },
     // Stylelint 校验文件
     "stylelint.validate": ["css", "scss", "vue", "html"]
   }
   ```

### EditorConfig

用于统一不同 IDE 编辑器的编码风格

1. 安装 vscode 插件 - EditorConfig for VS Code

2. 新建 .editorconfig 配置文件：

   ```bash
   node --eval "fs.writeFileSync('.editorconfig','')"
   ```

   示例：

   ```
   # http://editorconfig.org
   root = true

   # 表示所有文件适用
   [*]
   charset = utf-8 # 设置文件字符集为 utf-8
   end_of_line = lf # 控制换行类型(lf | cr | crlf)
   indent_style = tab # 缩进风格（tab | space）
   insert_final_newline = true # 始终在文件末尾插入一个新行

   # 表示仅 md 文件适用以下规则
   [*.md]
   max_line_length = off # 关闭最大行长度限制
   trim_trailing_whitespace = false # 关闭末尾空格修剪
   ```

## PostCSS

CSS 界的 Babel，把最新 CSS 语法、变量、嵌套、厂商前缀等，编译成浏览器今天就能认的纯 CSS

pnpm

```bash
pnpm store prune
```

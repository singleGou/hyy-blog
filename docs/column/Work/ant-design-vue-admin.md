# 手把手搭建一个使用 Vue3 和 Ant-design-vue 的后台管理系统

在这篇博客中，我们将一步步搭建一个使用 Vue3 和 Ant-design-vue 的后台管理系统。我们将使用最流行的技术栈，并遵循最佳实践，确保系统的高效和可维护性。

## 前置条件

在开始之前，请确保你已经安装了以下工具：

- Node.js (建议版本 16.x 或以上)
- pnpm 包管理工具 (建议使用最新稳定版)
- 代码编辑器 (推荐使用 Visual Studio Code)
- Git (用于版本控制)

## 技术栈概览

本项目将使用以下主要技术：

- Vue 3 - 渐进式 JavaScript 框架
- TypeScript - JavaScript 的超集，添加静态类型
- Vite - 现代前端构建工具
- Ant Design Vue - 企业级 UI 组件库
- Pinia - Vue 的状态管理库
- Vue Router - Vue.js 的官方路由
- Axios - 基于 promise 的 HTTP 客户端

## 创建项目

首先，我们使用 pnpm 配合 vite 创建一个新的 Vue3 项目：

```bash
pnpm create vite ant-design-vue-admin -- --template vue-ts
```

在创建完成后，进入项目目录并安装依赖：
```bash
cd ant-design-vue-admin
pnpm install

# 启动开发服务器
pnpm dev
```

## 安装核心依赖

接下来，我们安装项目所需的核心依赖：

```bash
# 安装 UI 组件库
pnpm add ant-design-vue @ant-design/icons-vue

# 安装路由和状态管理
pnpm add vue-router pinia

# 安装 HTTP 客户端
pnpm add axios

# 安装开发依赖
pnpm add -D sass @types/node
```

## 项目配置

### Vite 配置

创建 `vite.config.ts` 文件，配置项目的构建选项：

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
```

### TypeScript 配置

更新 `tsconfig.json`，添加必要的编译选项：

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "strict": true,
    "jsx": "preserve",
    "sourceMap": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "lib": ["ESNext", "DOM"],
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## 项目最佳实践

### 目录结构优化

```bash
src/
├── api/              # API 请求
│   ├── types/        # API 类型定义
│   └── modules/      # API 模块
├── assets/           # 静态资源
├── components/       # 通用组件
│   └── __tests__/   # 组件测试
├── composables/      # 组合式函数
├── config/          # 全局配置
├── directives/      # 自定义指令
├── layouts/         # 布局组件
├── router/          # 路由配置
├── stores/          # 状态管理
├── styles/          # 全局样式
│   ├── variables/   # 样式变量
│   └── mixins/      # 样式混入
├── types/           # TypeScript 类型
├── utils/           # 工具函数
└── views/           # 页面组件
```

### 代码规范建议

1. 组件命名
```typescript
// 推荐的组件命名方式
components/
├── BaseButton.vue        # 基础组件以 Base 开头
├── AppHeader.vue         # 应用级组件以 App 开头
└── UserProfileCard.vue   # 业务组件使用完整描述性名称
```

2. API 请求封装优化

```typescript
// src/api/types/response.ts
export interface BaseResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

// src/api/request.ts
const handleError = (error: any) => {
  const status = error.response?.status;
  const errorMap: Record<number, string> = {
    400: '请求参数错误',
    401: '未授权或登录过期',
    403: '访问被禁止',
    404: '请求的资源不存在',
    500: '服务器内部错误',
  };
  message.error(errorMap[status] || '请求失败');
  return Promise.reject(error);
};
```

3. 状态管理最佳实践

```typescript
// src/stores/modules/app.ts
export const useAppStore = defineStore('app', {
  state: () => ({
    sidebar: {
      opened: true,
      withoutAnimation: false,
    },
    device: 'desktop',
    theme: 'light',
  }),
  persist: {
    paths: ['theme'], // 只持久化必要的状态
  }
});
```

### 性能优化建议

1. 路由懒加载优化
```typescript
// src/router/modules/system.ts
export const systemRoutes: AppRoute[] = [
  {
    path: '/system',
    component: () => import(/* webpackChunkName: "layout" */ '@/layouts/BasicLayout.vue'),
    children: [
      {
        path: 'user',
        component: () => import(/* webpackChunkName: "system" */ '@/views/system/user/index.vue'),
      }
    ]
  }
];
```

2. 组件缓存策略
```typescript
// src/composables/useCache.ts
export function useCache(componentName: string) {
  const tagsViewStore = useTagsViewStore();
  
  onActivated(() => {
    // 组件被激活时的处理
  });
  
  onDeactivated(() => {
    // 组件被停用时的清理工作
  });
}
```

### 错误处理完善

1. 全局错误处理
```typescript
// src/utils/error.ts
export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'AppError';
  }
}

// src/main.ts
app.config.errorHandler = (err, vm, info) => {
  console.error('Global Error:', err);
  if (err instanceof AppError) {
    // 处理应用级别错误
  }
};
```

2. API 错误处理
```typescript
// src/utils/request.ts
service.interceptors.response.use(
  (response) => {
    const { code, data, message } = response.data;
    if (code !== 200) {
      throw new AppError(code.toString(), message);
    }
    return data;
  },
  (error) => {
    // 网络错误处理
    return handleError(error);
  }
);
```

### TypeScript 类型增强

```typescript
// src/types/store.d.ts
declare module 'pinia' {
  export interface PiniaCustomProperties {
    // 为 store 添加自定义属性
    $reset(): void;
  }
}

// src/types/router.d.ts
declare module 'vue-router' {
  interface RouteMeta {
    title: string;
    icon?: string;
    roles?: string[];
    keepAlive?: boolean;
    hideMenu?: boolean;
  }
}
```

### 环境配置优化

```typescript
// src/config/index.ts
interface AppConfig {
  apiBaseURL: string;
  uploadURL: string;
  staticURL: string;
}

export const getConfig = (): AppConfig => ({
  apiBaseURL: import.meta.env.VITE_API_BASE_URL,
  uploadURL: import.meta.env.VITE_UPLOAD_URL,
  staticURL: import.meta.env.VITE_STATIC_URL,
});
```

## 实现路由

在 `src/router/index.ts` 中配置路由：

```typescript
import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layouts/BasicLayout.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '仪表盘', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
```

## 状态管理

使用 Pinia 创建用户状态存储，在 `src/stores/user.ts` 中：

```typescript
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    userInfo: null
  }),
  actions: {
    setToken(token: string) {
      this.token = token
    },
    logout() {
      this.token = ''
      this.userInfo = null
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ['token']
      }
    ]
  }
})
```

## 布局实现

创建基础布局组件 `src/layouts/BasicLayout.vue`：

```vue
<template>
  <a-layout class="app-container">
    <a-layout-sider v-model:collapsed="collapsed" class="app-sider">
      <div class="logo" />
      <Menu />
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="app-header">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <div class="header-right">
          <UserDropdown />
        </div>
      </a-layout-header>
      <Breadcrumb />
      <TagsView />
      <a-layout-content class="app-content">
        <router-view v-slot="{ Component }">
          <keep-alive :include="cachedViews">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import Menu from '@/components/Menu/index.vue'
import UserDropdown from '@/components/UserDropdown.vue'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import TagsView from '@/components/TagsView/index.vue'
import { useTagsViewStore } from '@/stores/tagsView'

const collapsed = ref(false)
const tagsViewStore = useTagsViewStore()
const cachedViews = computed(() => tagsViewStore.cachedViews)
</script>

<style lang="scss">
// 创建 src/styles/variables.scss
:root {
  --header-height: 64px;
  --sider-width: 200px;
  --primary-color: #1890ff;
}

.app {
  &-container {
    min-height: 100vh;
  }

  &-sider {
    width: var(--sider-width) !important;
  }

  &-header {
    height: var(--header-height);
    padding: 0 16px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &-content {
    margin: 24px 16px;
    padding: 24px;
    background: #fff;
    min-height: 280px;
  }
}
</style>
```

## 网络请求封装

### 环境变量配置

首先创建环境变量文件 `.env.development` 和 `.env.production`：

```bash
# .env.development
VITE_API_BASE_URL=/api
VITE_APP_TITLE=管理系统(开发环境)

# .env.production
VITE_API_BASE_URL=http://api.example.com
VITE_APP_TITLE=管理系统
```

### 请求工具封装

创建 `src/utils/request.ts` 文件：

```typescript
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'ant-design-vue'
import { useUserStore } from '@/stores/user'

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers['Authorization'] = `Bearer ${userStore.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, data, msg } = response.data
    if (code === 200) {
      return data
    }
    message.error(msg || '请求失败')
    return Promise.reject(new Error(msg || '请求失败'))
  },
  (error) => {
    if (error.response?.status === 401) {
      const userStore = useUserStore()
      userStore.logout()
      window.location.href = '/login'
    }
    message.error(error.message || '请求失败')
    return Promise.reject(error)
  }
)

export default service
```

### API 模块封装

创建 `src/api/user.ts` 文件：

```typescript
import request from '@/utils/request'

export interface LoginParams {
  username: string
  password: string
}

export const login = (data: LoginParams) => {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export const getUserInfo = () => {
  return request({
    url: '/user/info',
    method: 'get'
  })
}
```

## 权限管理

### 路由守卫实现

在 `src/router/index.ts` 中添加路由守卫：

```typescript
import { useUserStore } from '@/stores/user'

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  
  if (userStore.token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (!userStore.userInfo) {
        try {
          await userStore.getUserInfo()
          next()
        } catch (error) {
          userStore.logout()
          next(`/login?redirect=${to.path}`)
        }
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})
```

## 登录页面实现

创建 `src/views/login/index.vue`：

```vue
<template>
  <div class="login-container">
    <a-form
      :model="loginForm"
      @finish="handleSubmit"
      class="login-form"
    >
      <h2 class="login-title">系统登录</h2>
      <a-form-item name="username">
        <a-input v-model:value="loginForm.username" placeholder="用户名">
          <template #prefix>
            <UserOutlined />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="password">
        <a-input-password v-model:value="loginForm.password" placeholder="密码">
          <template #prefix>
            <LockOutlined />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" block>登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { useUserStore } from '@/stores/user'
import { useRouter, useRoute } from 'vue-router'

const loginForm = reactive({
  username: '',
  password: ''
})

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const handleSubmit = async () => {
  try {
    await userStore.login(loginForm)
    const redirect = route.query.redirect as string
    router.push(redirect || '/')
  } catch (error) {
    console.error('登录失败:', error)
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.login-form {
  width: 350px;
  padding: 30px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.login-title {
  text-align: center;
  margin-bottom: 30px;
}
</style>
```

## 主题配置

创建 `src/styles/theme.ts` 文件：

```typescript
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context'

export const theme: ThemeConfig = {
  token: {
    colorPrimary: '#1890ff',
    borderRadius: 4,
  },
}
```

## 工具函数

创建 `src/utils/storage.ts` 文件：

```typescript
export const storage = {
  get(key: string) {
    const value = localStorage.getItem(key)
    try {
      return value ? JSON.parse(value) : null
    } catch {
      return value
    }
  },
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  remove(key: string) {
    localStorage.removeItem(key)
  },
  clear() {
    localStorage.clear()
  }
}
```

## 动态路由和菜单实现

### 路由类型定义

创建 `src/types/router.ts` 文件：

```typescript
export interface Meta {
  title: string;
  icon?: string;
  hidden?: boolean;
  roles?: string[];
}

export interface AppRoute {
  path: string;
  name?: string;
  component?: any;
  redirect?: string;
  meta?: Meta;
  children?: AppRoute[];
}
```

### 动态路由配置

创建 `src/router/dynamic-routes.ts` 文件：

```typescript
import { AppRoute } from '@/types/router'
import Layout from '@/layouts/BasicLayout.vue'

export const asyncRoutes: AppRoute[] = [
  {
    path: '/system',
    component: Layout,
    name: 'System',
    meta: { title: '系统管理', icon: 'SettingOutlined' },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/system/user/index.vue'),
        meta: { title: '用户管理', roles: ['admin'] }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/system/role/index.vue'),
        meta: { title: '角色管理', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Profile',
        component: () => import('@/views/profile/index.vue'),
        meta: { title: '个人中心', icon: 'UserOutlined' }
      }
    ]
  }
]
```

### 路由权限控制

更新 `src/stores/permission.ts`：

```typescript
import { defineStore } from 'pinia'
import { asyncRoutes } from '@/router/dynamic-routes'
import { AppRoute } from '@/types/router'
import { useUserStore } from './user'

function hasPermission(roles: string[], route: AppRoute) {
  if (route.meta?.roles) {
    return roles.some(role => route.meta?.roles?.includes(role))
  }
  return true
}

function filterAsyncRoutes(routes: AppRoute[], roles: string[]) {
  const res: AppRoute[] = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    routes: [] as AppRoute[]
  }),
  actions: {
    generateRoutes() {
      const userStore = useUserStore()
      const roles = userStore.roles
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      this.routes = accessedRoutes
      return accessedRoutes
    }
  }
})
```

### 菜单组件实现

创建 `src/components/Menu/index.vue`：

```vue
<template>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    v-model:openKeys="openKeys"
    mode="inline"
    theme="dark"
  >
    <template v-for="route in routes" :key="route.path">
      <menu-item v-if="!route.children" :item="route" />
      <sub-menu v-else :item="route" />
    </template>
  </a-menu>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePermissionStore } from '@/stores/permission'
import MenuItem from './MenuItem.vue'
import SubMenu from './SubMenu.vue'

const permissionStore = usePermissionStore()
const route = useRoute()

const routes = computed(() => permissionStore.routes)
const selectedKeys = ref<string[]>([route.path])
const openKeys = ref<string[]>([])
</script>
```

## 面包屑导航实现

创建 `src/components/Breadcrumb/index.vue`：

```vue
<template>
  <a-breadcrumb class="app-breadcrumb">
    <a-breadcrumb-item v-for="item in breadcrumbs" :key="item.path">
      <router-link v-if="item.path" :to="item.path">
        <component :is="item.meta?.icon" v-if="item.meta?.icon" />
        <span>{{ item.meta?.title }}</span>
      </router-link>
      <span v-else>
        <component :is="item.meta?.icon" v-if="item.meta?.icon" />
        <span>{{ item.meta?.title }}</span>
      </span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { RouteLocationMatched } from 'vue-router'

const route = useRoute()
const breadcrumbs = ref<RouteLocationMatched[]>([])

const getBreadcrumb = () => {
  const matched = route.matched.filter(item => item.meta && item.meta.title)
  breadcrumbs.value = matched
}

watch(
  () => route.path,
  () => {
    getBreadcrumb()
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.app-breadcrumb {
  margin: 16px 0;
}
</style>
```

## 标签页导航实现

创建 `src/stores/tagsView.ts`：

```typescript
import { defineStore } from 'pinia'
import { RouteLocationNormalized } from 'vue-router'

export interface TagView extends Partial<RouteLocationNormalized> {
  title?: string
}

export const useTagsViewStore = defineStore('tagsView', {
  state: () => ({
    visitedViews: [] as TagView[],
    cachedViews: [] as string[]
  }),
  actions: {
    addVisitedView(view: RouteLocationNormalized) {
      if (this.visitedViews.some(v => v.path === view.path)) return
      this.visitedViews.push({
        ...view,
        title: view.meta?.title || 'no-name'
      })
    },
    addCachedView(view: RouteLocationNormalized) {
      if (this.cachedViews.includes(view.name as string)) return
      if (view.meta?.keepAlive) {
        this.cachedViews.push(view.name as string)
      }
    },
    delView(view: RouteLocationNormalized) {
      const i = this.visitedViews.findIndex(v => v.path === view.path)
      if (i > -1) {
        this.visitedViews.splice(i, 1)
      }
      const j = this.cachedViews.indexOf(view.name as string)
      if (j > -1) {
        this.cachedViews.splice(j, 1)
      }
    },
    delOthersViews(view: TagView) {
      this.visitedViews = this.visitedViews.filter(v => 
        v.path === view.path || v.path === '/'
      )
      this.cachedViews = this.cachedViews.filter(name => 
        name === view.name || name === 'Dashboard'
      )
    },
    
    delAllViews() {
      this.visitedViews = this.visitedViews.filter(v => v.path === '/')
      this.cachedViews = ['Dashboard']
    },
    
    updateCachedView(view: RouteLocationNormalized) {
      if (view.meta?.keepAlive === false) {
        const index = this.cachedViews.indexOf(view.name as string)
        if (index > -1) {
          this.cachedViews.splice(index, 1)
        }
      }
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ['visitedViews']
      }
    ]
  }
})
```

创建 `src/components/TagsView/index.vue`：

```vue
<template>
  <div class="tags-view-container">
    <a-tabs
      v-model:activeKey="activeKey"
      type="editable-card"
      hide-add
      @edit="onEdit"
      @change="handleChange"
    >
      <a-tab-pane
        v-for="tag in visitedViews"
        :key="tag.path"
        :tab="tag.title"
        :closable="tag.path !== '/'"
        @contextmenu.prevent="(e) => handleContextMenu(e, tag)"
      >
      </a-tab-pane>
    </a-tabs>
    <context-menu
      v-model:visible="contextMenuVisible"
      :x="contextMenuX"
      :y="contextMenuY"
      @select="handleContextMenuSelect"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTagsViewStore } from '@/stores/tagsView'
import { useRoute, useRouter } from 'vue-router'
import ContextMenu from '../ContextMenu/index.vue'

const route = useRoute()
const router = useRouter()
const tagsViewStore = useTagsViewStore()
const activeKey = ref(route.path)
const visitedViews = ref(tagsViewStore.visitedViews)

const contextMenuVisible = ref(false)
const contextMenuX = ref(0)
const contextMenuY = ref(0)
const currentTag = ref<TagView | null>(null)

watch(
  () => route.path,
  () => {
    addTags()
    activeKey.value = route.path
  }
)

const addTags = () => {
  const { name } = route
  if (name) {
    tagsViewStore.addVisitedView(route)
    tagsViewStore.addCachedView(route)
  }
}

const handleChange = (key: string) => {
  router.push(key)
}

const onEdit = (targetKey: string) => {
  const view = visitedViews.value.find(item => item.path === targetKey)
  if (view) {
    tagsViewStore.delView(view as any)
    if (activeKey.value === targetKey) {
      const latestView = visitedViews.value.slice(-1)[0]
      if (latestView) {
        router.push(latestView.path!)
      } else {
        router.push('/')
      }
    }
  }
}

const handleContextMenu = (e: MouseEvent, tag: TagView) => {
  e.preventDefault()
  contextMenuX.value = e.clientX
  contextMenuY.value = e.clientY
  contextMenuVisible.value = true
  currentTag.value = tag
}

const handleContextMenuSelect = async (action: string) => {
  if (!currentTag.value) return
  
  switch (action) {
    case 'refresh':
      await router.replace({ path: '/redirect' + currentTag.value.path })
      break
    case 'close':
      await closeTag(currentTag.value)
      break
    case 'closeOthers':
      tagsViewStore.delOthersViews(currentTag.value)
      break
    case 'closeAll':
      tagsViewStore.delAllViews()
      router.push('/')
      break
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  background: #fff;
}
</style>
```

## 右键菜单实现

创建 `src/components/ContextMenu/index.vue`：

```vue
<template>
  <div
    v-show="visible"
    :style="style"
    class="context-menu"
    @click="handleClick"
  >
    <ul class="menu-list">
      <li class="menu-item" data-action="refresh">
        <reload-outlined /> 刷新页面
      </li>
      <li class="menu-item" data-action="close">
        <close-outlined /> 关闭当前
      </li>
      <li class="menu-item" data-action="closeOthers">
        <minus-outlined /> 关闭其他
      </li>
      <li class="menu-item" data-action="closeAll">
        <stop-outlined /> 关闭所有
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { ReloadOutlined, CloseOutlined, MinusOutlined, StopOutlined } from '@ant-design/icons-vue'

const props = defineProps<{
  x: number
  y: number
  visible: boolean
}>()

const emit = defineEmits(['select', 'update:visible'])

const style = computed(() => ({
  left: props.x + 'px',
  top: props.y + 'px'
}))

const handleClick = (e: MouseEvent) => {
  const action = (e.target as HTMLElement).closest('.menu-item')?.dataset.action
  if (action) {
    emit('select', action)
    emit('update:visible', false)
  }
}
</script>

<style lang="scss" scoped>
.context-menu {
  position: fixed;
  z-index: 1000;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

  .menu-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .menu-item {
    padding: 8px 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;

    &:hover {
      background: #f5f5f5;
    }
  }
}
</style>
```

## 页面缓存控制

创建路由重定向组件 `src/views/redirect/index.vue`：

```vue
<template>
  <div></div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

onBeforeMount(() => {
  const { params, query } = route
  const { path } = params
  router.replace({ path: '/' + path, query })
})
</script>
```

## 全局状态持久化配置

安装持久化插件：

```bash
pnpm add pinia-plugin-persistedstate
```

创建 `src/stores/index.ts`：

```typescript
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia
```

配置 store 持久化，更新 `src/stores/user.ts`：

```typescript
export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    userInfo: null
  }),
  actions: {
    setToken(token: string) {
      this.token = token
    },
    logout() {
      this.token = ''
      this.userInfo = null
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ['token', 'userInfo']
      }
    ]
  }
})
```

## 使用说明

1. 在 `dynamic-routes.ts` 中定义路由配置
2. 路由元信息中通过 `roles` 字段控制权限
3. 菜单会根据路由配置自动生成
4. 使用 CSS 变量统一管理样式

## 总结

至此，我们已经完成了一个基础的后台管理系统框架的搭建。这个框架包含了：

- 项目基础配置
- 路由系统
- 状态管理
- 基础布局

接下来你可以基于这个框架继续添加：

- 登录认证系统
- 权限管理
- 更多业务页面
- 主题定制
- 国际化支持

完整代码可以在 GitHub 上找到，欢迎关注和贡献！

## 参考资料

- [Vue 3 官方文档](https://v3.vuejs.org/)
- [Ant Design Vue 文档](https://www.antdv.com/components/overview)
- [Vite 官方文档](https://vitejs.dev/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
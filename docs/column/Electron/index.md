https://github.com/Yuezi32/electron-vite-vue-app-2025summer



Electron 三进程架构

1. 主进程 = Node.js 环境，**唯一**能调原生 GUI（窗口、托盘、菜单、autoUpdater）。
2. 渲染进程 = Chromium 标签，**默认**无 Node API（安全）。
3. preload 脚本 = **桥**，拥有 Node 能力，又暴露在 `window.myAPI` 给网页用

主进程与渲染进程

主进程运行在 nodejs 环境，可以使用 nodejs 所有 api，不进行页面渲染

electron 会为每个打开的 BrowserWindow 生成一个单独的渲染器进程，无法直接调用 nodejs api

预加载脚本让渲染进程与主进程通信，预加载脚本属于渲染进程的范畴，与渲染进程共享一个全局 window，但预加载脚本与渲染进程的主要运行环境是隔离的，以避免将任何 api 都加入到渲染进程的网页中：

```

```

## Electron 三进程架构

### 主进程

- 作用：应用程序的入口点，负责创建和管理窗口
- 特点：运行在 Node.js 环境，**唯一**能调原生 GUI（窗口、托盘、菜单、autoUpdater）

```js
// 创建浏览器窗口
const mainWindow = new BrowserWindow({
  width: 900,
  height: 670,
  webPreferences: {
    preload: join(__dirname, '../preload/index.js'), // 指定预加载脚本
    sandbox: false
  }
})
```

### 渲染进程

- 作用：运行 web 技术（HTML、CSS、JavaScript，可以使用 Vue/React 等框架）
- 特点：每个 BrowserWindow 都有自己的渲染进程

### 预加载脚本

- 作用：桥接主进程和渲染进程，在渲染进程中安全地暴露 Node.js API
- 特点：使用 contextBridge 进行安全通信



## 安全机制

语境隔离（Context Isolation）：使预加载脚本和渲染进程的主要运行环境相隔离，以避免将任何 API 都加入到渲染进程的网页中

```js
// preload/index.js
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

if (process.contextIsolated) {
  contextBridge.exposeInMainWorld('electron', electronAPI)
  contextBridge.exposeInMainWorld('api', api)
}
```



## 项目初始化

国内镜像加速：

```bash
npm config set registry https://registry.npmmirror.com
```

全局装 electron-vite（官方推荐脚手架）：

```bash
npm i -g electron-vite
```

创建项目：

```bash
npm create @quick-start/electron
```



## Vite 基础配置

electron.vite.config.mjs

```js
import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer')
      }
    },
    plugins: [vue()]
  }
})
```

vite 本身提供了对预处理器文件的内置支持，直接安装对应预处理器依赖即可直接使用：

```
npm i -D sass
```


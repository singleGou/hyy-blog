## 项目初始化

建议 nodejs v20.0.0+

选择困难症，墙裂推荐使用 pnpm

```bash
pnpm create vite acro-design-admin -- --template vue
```



### 配置 src 路径别名

vite.config.js 中配置：

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [vue()],
})
```

jsconfig.json 文件配置（在项目根目录下，没有就新建一个）：

主要是为了代码编辑器更好的提示，比如此处配置 @ 别名，在编辑器中输入就可以提示路径

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "types": ["vite/client"],
    "jsx": "preserve"
  },
  "exclude": ["node_modules", "dist"],
  "include": ["src/**/*.js", "src/**/*.ts", "src/**/*.vue"]
}
```

![](.\images\jsconfig文件别名提示.png)



## 引入 Acro Design Vue

```bash
pnpm i -S @arco-design/web-vue
```





## 按需加载和自动导入

使用 [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 和 [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) 这两款插件来开启按需加载及自动导入的支持。
插件会自动解析模板中的使用到的组件，并导入组件和对应的样式文件

```bash
pnpm i -D unplugin-auto-import unplugin-vue-components
```

如果对于 Vue3 还不熟建设手动导入

vite.config.js

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ArcoResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  plugins: [
    vue(),
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ["vue"],
      resolvers: [ArcoResolver()],
    }),
    Components({
      resolvers: [
        ArcoResolver({
          sideEffect: true,
        }),
      ],
    }),
  ],
});
```

> 这种方法并不会处理用户在 script 中手动导入的组件，比如 Message 组件，用户仍需要手动导入组件对应的样式文件，例如 `@arco-design/web-vue/es/message/style/css.js`




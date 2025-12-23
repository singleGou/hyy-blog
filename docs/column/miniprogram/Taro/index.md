全局安装 Taro CLI（这里使用 pnpm）：

```bash
pnpm add -g @tarojs/cli
```

pnpm approve builds 

```bash
pnpm config set --location global ignore-scripts true
```



初始化，交互选择：

```
taro init
```

在使用 Taro 创建新项目时，系统会提示是否需要将代码编译为 **ES5**。这个选项的选择取决于项目的兼容性需求和性能要求。

示例

```bash
? 是否需要编译为 ES5 (默认否) (y/N)
```

选择“是”的场景

如果你的项目需要兼容较老版本的浏览器（如 Android 4.4 或 iOS 9 以下），建议选择“是”。编译为 ES5 会将代码转换为更低版本的 JavaScript，从而提高兼容性。

**示例配置：** 在 *package.json* 中添加以下 *browserslist* 配置：

```
"browserslist": {
 "production": [
   "last 3 versions",
   "Android >= 4.1",
   "ios >= 8"
 ]
}
```

选择“否”的场景

如果你的项目目标环境支持现代浏览器（如 Chrome、Safari、Edge 等），可以选择“否”。这样可以减少打包体积并提升编译效率。

**默认配置：**

```
"browserslist": [
 "defaults and fully supports es6-module",
 "maintained node versions"
]
```

注意事项

**性能影响**：编译为 ES5 会增加打包时间和产物体积，因此仅在必要时启用。

**H5 开发**：如果使用 H5 模式且目标设备支持现代浏览器，建议关闭 ES5 编译以优化性能。

根据项目需求合理选择，确保兼顾兼容性和性能。



一定要选择使用 Webpack5 打包，我已经踩坑了，如果使用 Vite 打包 weapp 无法渲染，懒得管是什么原因，如果非要用我也拉不住自行解决即可

![](./images/01.png)




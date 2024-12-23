You are an expert AI programming assistant in VSCode that primarily focuses on producing clear, readable Front-End code.
You are thoughtful, give nuanced answers, and are brilliant at reasoning. You carefully provide accurate, factual, thoughtful answers, and are a genius at reasoning.

- Follow the user’s requirements carefully & to the letter.
- First think step-by-step - describe your plan for what to build in pseudocode, written out in great detail.
- Confirm, then write code!
- Always write correct, up to date, bug free, fully functional and working, secure, performant and efficient code.
- Focus on readability over being performant.
- Fully implement all requested functionality.
- Leave NO todo’s, placeholders or missing pieces.
- Ensure code is complete! Verify thoroughly finalized.
- Include all required imports, and ensure proper naming of key components.
- Be concise. Minimize any other prose.

If you think there might not be a correct answer, you say so. If you do not know the answer, say so instead of guessing.

.cursorrules 是一个存放在项目根目录的特殊文件，用于自定义 Cursor 中的 AI 辅助规则。通过在这个文件中定义具体的规则，您可以为 AI 提供项目背景、编码标准、首选库、文件结构和性能指南等指示，从而使 AI 的代码生成和建议更加符合您的团队需求。

简单来说，.cursorrules 是您与 AI 之间的"沟通桥梁"。有了它，您不必每次都手动调整 AI 的行为，AI 将始终在您的项目需求范围内提供建议。

cursorrules-zhong-ji-0
如何为项目创建最佳的 .cursorrules？
要充分利用 .cursorrules 文件，您需要将项目的各个关键部分清楚地传达给 AI。以下是一些创建高效 .cursorrules 文件的最佳做法：

1. 提供项目背景
为什么重要？
AI 不了解项目的背景，而背景信息可以帮助 AI 理解项目的上下文，生成更合适的代码。

示例：
```
# 项目背景
这是一个基于 Nextjs 的支持多语言的博客 Web 应用程序，使用 Nextjs 框架编写。
```
解释：

在 .cursorrules 文件的开头，您可以提供一个简要的项目背景介绍。像“这是一个基于 Nextjs 的博客 Web 应用程序” 这样的描述可以让 AI 在生成代码时，选择适合的语法风格、文件类型和方法。

2. 定义编码标准
为什么重要？
确保 AI 生成的代码符合团队的代码规范，避免不一致的编码风格。

示例：
```
# 编码标准
- 使用函数式组件和 Hooks，避免类组件
- 变量声明优先使用 const，而不是 let
- 变量和函数名使用 camelCase 规范，组件名使用 PascalCase
```
解释：

这段代码告诉 AI，团队更喜欢函数式组件，而不是类组件。AI 还会优先使用 const 声明变量，并在函数和变量命名中遵循 camelCase 规范，而组件名称采用 PascalCase。

3. 指定首选的库和框架
为什么重要？
如果 AI 不了解您首选的库，它可能会生成不适合的第三方依赖项。

示例：
```
# 首选的库
- 使用 Next.js 进行导航
- 使用 next-intl 做国际化
- 使用 tailwind 进行 CSS-in-JS 样式设计
```
解释：

这告诉 AI 在生成导航代码时优先使用 Next.js，而不是其他库（例如 React Router 路由系统）。对于样式，AI 会默认选择 tailwind，而不是 CSS 模块或其他 CSS 解决方案。

4. 提供文件结构信息
为什么重要？
清晰的文件结构可帮助 AI 生成的文件路径和导入路径更准确，减少路径错误。

示例：
```
# 文件结构
- components: 可复用的 UI 组件
- app/[locale]: 支持多语言的 nextjs 页面
- data/blog: 多语言的博客文件 
- app/api: API 服务函数
```
解释：

告诉 AI 文件的目录结构有助于自动生成 import 路径。例如，当您要求 AI 创建一个新组件时，它会将其放入 src/components 目录，而不会错误地将其放入 src/pages 中。

5. 设置性能优化指南
为什么重要？
如果您不告诉 AI 关注性能，它可能会生成不符合性能最佳实践的代码。

示例：
```
# 性能优化指南
- 对纯函数组件使用 React.memo
- 路由组件实现懒加载
- 优化 useEffect 依赖，防止不必要的重新渲染
```
解释：

这些规则可帮助 AI 生成更高效的代码。例如，当 AI 生成 useEffect 钩子时，它会确保依赖项数组是完整的，从而防止不必要的重新渲染。

6. 设定测试要求
为什么重要？
如果您有特定的测试需求，AI 可以帮助您自动生成符合这些标准的测试用例。

示例：
```
# 测试要求
- 使用 Jest 和 React Testing Library 编写单元测试
- 测试覆盖率应至少达到 80%
- 对 UI 组件使用快照测试 (Snapshot Testing)
```
解释：
这段规则告诉 AI 在生成测试文件时使用 Jest 和 React Testing Library，还会自动生成快照测试 (Snapshot Testing) 以捕获 UI 变化。

7. 编写文档规范
为什么重要？
规范的文档有助于团队协作，并确保 AI 生成的代码自带注释和解释。

示例：
```
# 文档规范
- 使用 JSDoc 格式编写函数和组件的注释
- 组件必须包含 PropTypes 验证
- 每个主要目录必须包含 README.md 文件
- 同时提供英语和中文版本的 README.md 文件
```
解释：

使用 JSDoc 规则可确保 AI 自动生成的函数和组件包含函数定义、参数说明和返回类型的注释。

8. 设置错误处理偏好
为什么重要？
AI 可能不会自动考虑错误处理逻辑。

示例：
```
# 错误处理
- 使用 try/catch 块处理异步操作
- 实现全局错误边界组件
```
解释：

这些规则告诉 AI 在生成异步函数时，自动在内部使用 try/catch 块。AI 还可能在项目中实现一个全局的“错误边界”组件，以捕获运行时错误。

如何在项目中使用 .cursorrules？
创建文件： 在项目根目录创建 .cursorrules 文件。
定义规则： 按照上文的建议，定义项目背景、编码标准和文件结构等规则。
重启 Cursor： 在 Cursor 中，重启 AI 助手以加载新的 .cursorrules 文件。
实时调整： 当项目需求发生变化时，及时更新 .cursorrules 文件。
如何利用“AI 规则”实现全局控制？
除了项目的 .cursorrules 文件，您还可以在 Cursor 的“设置 > 通用 > AI 规则”中编写适用于所有项目的全局 AI 规则。这些规则将自动应用于每个项目，无需手动为每个项目创建 .cursorrules 文件。

# Vue 项目规则

```md
# JavaScript Frameworks
- 使用Vue 3.0作为基础核心框架。
- 使用Pinia进行跨页面数据状态管理。
- 使用Vue Router进行页面路由切换。

# UI Framework and Styling
- 使用ArcoDesign作为UI框架，简化组件开发。
- 使用TailwindCss作为CSS框架，以便简化CSS编写。

# Compilation and Build Tools
- 使用Yarn作为依赖包管理工具。
- 使用Vite作为Vue的构建工具。

# Other Tools
- 使用Fetch接口来实现前端请求。
- 使用Vue Flow库快捷构建流程图。
- 使用Vue Markdown将大模型输出的Markdown转为HTML。
- 使用ECharts将数据转换为统计图表。

# Directory Structure
- 根目录 `/vue-demo` 包含项目的基本结构。
- `/node_modules`: 项目依赖模块。
- `/public`: 包括公共文件，如 `favicon.ico` 和入口 HTML 文件 `index.html`。

## Source Directory (/src)
- `/assets`: 存放静态资源。
- `/assets/images`: 图片资源目录。
- `/assets/styles`: 全局样式配置，包括 `tailwind.css`。
- `/components`: 共享组件的存放目录（优先使用自己定义的组件）。
- `/composables`: 自定义 Hook 函数或组合式 API 的实现（优先使用自己定义的函数或者组合式API）。
- `/config`: 项目配置文件，如环境变量和全局设置。
- `/layouts`: 应用布局组件（如 `DefaultLayout.vue`）。
- `/router`: 路由配置文件目录（如 `index.ts`）。
- `/services`: 项目服务，例如API调用和业务逻辑实现。
- `/stores`: Pinia 状态管理设置目录（如 `index.ts`）。
- `/types`: 类型声明目录，用于声明全局自定义类型及 Vue 的类型补充（如 `custom-types.d.ts`）。
- `/types/auth.d.ts`: 认证类型声明。
- `/types/request.d.ts`: 公共请求类型声明。
- `/types/response.d.ts`: 公共响应类型声明(如 `BaseResponse` 类型)。
- `/utils`: 工具类目录。
- `/utils/request.ts`: 公共请求工具类。
- `/views`: 页面文件夹，包括认证页面、其他页面及主页面（如 `HomeView.vue`）。
- `App.vue`: 根组件。
- `main.ts`: 项目入口文件。

## Configuration Files
- `.editorconfig`: 定义代码风格的共享配置。
- `.eslintrc.js`: 用于代码质量的 ESLint 配置。
- `.gitignore`: Git 忽略文件列表。
- `package.json`: 项目配置和依赖配置文件。
- `yarn.lock`: Yarn 锁文件，用于锁定依赖包版本。
- `tailwind.config.js`: 配置 Tailwind CSS。
- `vite.config.ts`: 配置 Vite 项目构建工具。

# Project-wide Best Practices
- 遵循模块化和功能性的代码结构。
- 利用TypeScript增强代码的可读性和安全性。
- 实现响应式设计并采用移动优先策略。
- 在适当的地方使用动态加载以优化性能。
- 确保所有开发组件具有响应式支持，并为主要页面加载性能进行优化。

# Element Attributes Order
- `class`
- `id`, `ref`, `name`
- `data-*`
- `src`, `for`, `type`, `href`, `value`, `max-length`, `max`, `min`, `pattern`
- `title`, `alt`, `placeholder`, `aria-*`, `role`
- `required`, `readonly`, `disabled`
- `is`
- `v-for`, `key`
- `v-if`, `v-else-if`, `v-else`
- `v-show`
- `v-cloak`
- `v-pre`
- `v-once`
- `v-model`, `v-bind`, `:`, `v-on`, `@`
- `v-html`, `v-text`

# Comment Guidelines
1. 为公共组件使用提供说明。
2. 为组件中的重要函数或类添加说明。
3. 为复杂的业务逻辑处理添加说明。
4. 特殊情况的代码处理说明，包括特殊用途的变量、临界值、hack、算法等。
5. 多重 `if` 判断语句需添加注释。
6. 注释块必须以 `/**（至少两个星号）开头**/` 。
7. 单行注释使用 `//` 。

## 优先级规范

### 1. 基础组件优先级 (@components)
1. BaseButton - 标准按钮组件
   - 统一按钮样式和交互
   - 支持多种类型、状态和尺寸
   - 集成加载状态和禁用状态

2. BaseForm - 标准表单组件
   - 统一表单布局和验证
   - 集成模态框功能
   - 处理表单提交和重置

3. BaseList - 标准列表组件
   - 统一列表页面布局
   - 集成搜索、分页功能
   - 支持自定义工具栏和操作按钮

4. LoadingSpinner - 加载动画组件
   - 统一加载状态展示
   - 支持自定义加载文本

5. CaptchaVerify - 验证码组件
   - 统一验证码交互
   - 自动处理验证码刷新
   - 集成验证逻辑

6. UploadImage - 图片上传组件
   - 统一图片上传交互
   - 支持多种图片展示形状
   - 集成预览和删除功能

7. BaseIcon - 图标组件
   - 统一图标展示样式
   - 支持多种图标库
   - 简化图标调用

8. IconSelector - 图标选择器组件
   - 统一图标选择交互
   - 支持多种图标库
   - 简化图标选择调用

### 2. 组合式API优先级 (@composables)
1. useLoading - 加载状态管理
   - 统一管理加载状态
   - 提供加载文本控制
   - 简化异步操作的加载状态处理

2. useNotification - 通知提示管理
   - 统一消息通知样式
   - 支持多种通知类型
   - 简化消息提示调用

3. useIcons - 图标管理
   - 统一图标调用方式
   - 支持多种图标库
   - 简化图标调用

### 3. 工具函数优先级 (@utils)
1. request - HTTP请求工具
   - 统一请求配置和错误处理
   - 支持请求拦截和响应拦截
   - 集成认证token管理

2. debounce - 防抖函数
   - 优化频繁操作的性能
   - 支持立即执行选项
   - 简化事件处理

3. filterEmptyValue - 对象空值过滤
   - 优化请求参数处理
   - 移除对象中的空值
   - 简化数据清理操作

### 使用优先级规则
1. 组件使用优先级：
   - 第一优先级：使用项目自定义基础组件(@components)
   - 第二优先级：使用ArcoDesign组件库
   - 第三优先级：创建新的组件

2. 组合式API使用优先级：
   - 第一优先级：使用项目自定义组合式API(@composables)
   - 第二优先级：使用Vue核心组合式API
   - 第三优先级：创建新的组合式API

3. 工具函数使用优先级：
   - 第一优先级：使用项目自定义工具函数(@utils)
   - 第二优先级：使用第三方工具库
   - 第三优先级：创建新的工具函数

4. 请求处理规范：
   - 统一使用 @/utils/request 中的请求方法
   - API请求必须在 @/services 目录下定义
   - 请求响应提示统一使用 useNotification

5. 状态管理规范：
   - 组件内部状态优先使用 ref/reactive
   - 跨组件状态优先使用 Pinia store
   - 临时全局状态可使用 provide/inject

6. 类型定义规范：
   - 优先使用项目定义的类型(@types)
   - 其次扩展第三方库的类型
   - 最后定义新的类型
```

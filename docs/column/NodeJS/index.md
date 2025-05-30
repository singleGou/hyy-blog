##  CommonJS(CJS) 模块系统

使用 require 和 module.exports 实现导入和导出

### 导出模块

####  module.exports

- 指定属性导出：

  ```js
  // 导出函数
  module.exports.hello = function () {
    console.log('hello');
  }
  // 导出对象
  module.exports.userInfo = { name: 'zhangsan', age: 18 }
  ```

- 统一的对象导出：

  ```js
  const hello = function () {
    console.log('hello');
  }
  const userInfo = { name: 'lisi', age: 20 }
  
  module.exports = {
    hello,
    userInfo
  }
  ```


#### exports

实际上是 module.exports 的一个引用：

```js
exports.hello = function () {
  console.log('hello');
}
```

等价于：

```js
module.exports.hello = function () {
  console.log('hello');
}
```

但是如果对 `exports` 进行重新赋值， `exports` 就不再指向 `module.exports`，而是指向了一个新的对象，原来的 `module.exports` 对象将会被忽略，因此该模块将不会导出任何内容：

```js
exports = function () {
  console.log('goodbye');
}
```

> 平时开发只使用 module.exports 导出模块就行了



### 引入模块

#### 完整引入

```js
module.exports = {
  hello: function (name) {
    console.log('hello', name);
  },
  userInfo: {
    name: 'zs',
    age: 18
  }
}
```

```js
const context = require('./01-导入和导出.js')
console.log(context.hello(context.userInfo.name));
```

#### 解构引入

如果导出的内容是一个对象，那么就可以使用解构引入：

```js
const { hello, userInfo } = require('./01-导入和导出.js')
console.log(hello(userInfo.name));
```



## ES Modules(ESM)

使用 import 和 export 进行导入和导出

Node.js 会将 `.js` 后缀文件识别为 `CJS` 模块，要在 nodejs 中正确使用 ESM，需满足以下两个条件之一：

- 使用 `.mjs` 作为文件后缀名 (例如 `hello.mjs`)
- package.json 中 `type` 字段设置为 `module`

ES Modules 中的导入导出有多种用法，主要有以下 4 种使用场景：

- 默认导入导出 (`export default`，`import xx from 'module'`)；
- 具名导入导出 (`export xx`，`import { xx } from 'module'`)；
- 导入导出所有 (`export *`，`import * as xx from 'module'`)；
- 重新导出 (`export { xx } from 'module'`，`export * from 'module'`)。

2 种将 ESM 模块转换为 CJS 模块的工具，`tsup` 和 `ncc`



## CJS 和 ESM 的区别

- 加载时机：`CJS` 支持动态加载模块 (`require` 语句可以出现在任意位置)，`ESM` 会在所有模块都加载完毕后才执行代码 (通常会将 import 导入语句放在模块的顶部)
- 导出内容：`ESM` 导入的是值的引用，而 `CJS` 导入的是值的拷贝
- 文件命名：一般都以 `.js` 结尾，通过 `package.json` 中 `"type":"module"` 区分模块加载类型，也可以通过文件命名来区分 `.cjs` 表明是 CJS 规范的模块，`.mjs` 表明是 ESM 规范的模块



## global 全局对象

```js
// 浏览器中
console.log(globalThis === window) // true

// nodejs 中
console.log(globalThis === global) // true
```

### 特殊的全局变量

`__filename`：表示当前正在执行的脚本文件的绝对路径

`__dirname`：表示当前执行脚本所在目录的绝对路径

只在 CJS 模块下存在

ESM 中如果要使用这两个变量以及 require 方法：

```js
// 在 ESM 中可以通过import.meta.url 获取到类似 __filename 的值
console.log(import.meta.url); // file:///D:/hyy/code/learn-nodejs/02-global.mjs

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createRequire } from 'module';

// 再通过 url 模块上的 fileURLToPath 方法将其转换为 __filename 的值
const __filename = fileURLToPath(import.meta.url); 
const __dirname = dirname(__filename); 

console.log('__filename', __filename); // D:\hyy\code\learn-nodejs\02-global.mjs
console.log('__dirname', __dirname) // D:\hyy\code\learn-nodejs

const require = createRequire(import.meta.url);
console.log(require('./package.json').name);
```

> *其中 [import.meta](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/import.meta) 是一个给 JavaScript 模块暴露特定上下文的元数据属性的对象。它包含了这个模块的信息，比如说这个模块的 URL*



### 常用的 global 属性

#### process

- process.argv：返回一个数组，包含启动 Node.js 进程时传递的命令行参数

  ```js
  /**
   * 第一个参数是 node 路径，第二个参数是当前文件路径
   *  [
        'C:\\Program Files\\nodejs\\node.exe',
        'D:\\hyy\\code\\learn-nodejs\\02-global.mjs'
      ] 
   */
  console.log(process.argv);
  ```

- process.cwd()：当前工作目录

  ```js
  console.log(process.cwd()); // D:\hyy\code\learn-nodejs
  ```

- process.env：环境变量对象

  ```
  console.log(process.env); // 如：PATH、HOME 等
  ```

- process.version：获取当前 nodejs 版本

- ... // todo

#### Buffer

用于处理二进制数据。类似于数组，并提供了一些方便的方法来操作二进制数据

1. 创建 Buffer 对象

   ```js
   const buf = Buffer.alloc(10); // 创建一个大小为 10 的 Buffer 对象，默认会用 0 填充
   const buf2 = Buffer.from('Hello, world!'); // 创建一个包含字符串 'Hello, world!' 的 Buffer 对象
   const buf3 = Buffer.from([0x48, 0x65, 0x6c, 0x6c, 0x6f]); // 内容为 hello 构成的 16 进制数组 Buffer 对象 
   console.log(buf); // <Buffer 00 00 00 00 00 00 00 00 00 00>
   console.log(buf2); // <Buffer 48 65 6c 6c 6f 2c 20 77 6f 72 6c 64 21>
   console.log(buf3); // <Buffer 48 65 6c 6c 6f>
   ```

2. 转换内容格式

   ```js
   const buf = Buffer.from('hello world')
   
   // 转换为字符串
   console.log(buf.toString()); // hello world
   
   // 转为16进制字符串输出
   console.log(buf.toString('hex')); // 68656c6c6f20776f726c64
   
   // 转为16进制数组输出
   console.log(Array.from(buf)); // [ 104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100 ]
   
   // 转为 base64 字符串输出
   console.log(buf.toString('base64')); // console.log(buf.toString('base64')); // aGVsbG8gd29yaw==
   ```

3. 写入内容

   ```js
   // 创建一个长度为 10 的 Buffer 实例并将它填充为 0
   const buf = Buffer.alloc(10)
   
   // 将字符串 'Hello' 写入 Buffer 实例的前 5 个字节
   buf.write('Hello')
   
   buf.write('World', 5) // 从第 6 个字节开始写入 'world'
   
   console.log(buf.toString()) // 'HelloWorld'
   ```

4. 合并多个 Buffer 对象

   ```js
   const buf1 = Buffer.from('hello')
   const buf2 = Buffer.from('world')
   const buf3 = Buffer.concat([buf1, buf2])
   console.log(buf3.toString()); // helloworld
   ```

5. 截取 Buffer 对象

   ```js
   const buf = Buffer.from('hello world')
   console.log(buf.slice(0, 5).toString());
   ```




## path

路径相关

### 拼接路径

- path.join()：将多个路径拼接成一个相对路径（或绝对路径，取决于第一个路径是否为绝对路径）

  ```js
  const path = require('path');
  
  path.join(process.cwd(), '/hello'); // D:\hyy\code\learn-nodejs\hello
  ```

- path.resolve()：将多个路径拼接成一个绝对路径

  ```js
  path.resolve('hello', 'world'); // D:\hyy\code\learn-nodejs\hello\world
  ```

### 解析路径

- path.parse()：用于解析文件路径，将其拆分为一个对象

  ```js
  path.parse('./03-path.js'); // { root: '', dir: '.', base: '03-path.js', ext: '.js', name: '03-path' }
  ```

- path.dirname()：返回路径中的目录名

  ```js
  path.dirname('hello/world'); // hello
  ```

- path.basename()：返回路径中的文件名，可去除文件扩展名（可选）

  ```js
  path.basename(path.resolve('./03-path.js'), '.js'); // 03-path
  ```

- path.extname()：返回路径中的文件扩展名

  ```js
  path.extname(path.resolve('./03-path.js')); // .js
  ```

### 规范化路径

- path.normalize()：规范化路径格式

  ```js
  path.normalize('/a//b//c/..'); // D:\a\b
  ```

### 获取分隔符

- path.sep：返回当前系统分隔符

  ```js
  path.sep // '\'
  ```


> 避免因为不同操作系统使用不同的文件路径分隔符而导致的错误，更推荐使用 `path.join` 方法来拼接文件路径



## fs

文件系统模块，用于操作文件和目录

```js
const fs = require('fs');

// 同步读取
const syncData = fs.readFileSync('./test.txt', 'utf-8');
console.log(syncData);

// 异步读取
fs.readFile('./test.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

// promise 形式 异步读取
fs.promises
  .readFile('./test.txt', 'utf-8')
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });

```

> 常用同步读取和 promise 异步读取

### 文件操作

```js
// 读取文件
const buf = fs.readFileSync('./test.txt');
// 修改前两个字符
buf.write('gg');
console.log(buf.toString());

// 写入文件
fs.writeFileSync('./test1.txt', 'hello moto');
// 写入二进制文件：读取一个图片，然后输出到一个新的位置
const imgBuf = fs.readFileSync('./clock.png');
fs.writeFileSync('newClock.png', imgBuf, 'binary');

// 获取文件基本信息
const baseInfo = fs.statSync('./test.txt');
console.log(baseInfo);
console.log(baseInfo.isFile()); // 是否是文件
console.log(baseInfo.isDirectory()); // 是否是目录

// 追加文件内容
fs.appendFileSync('./test.txt', 'appended content');

// 移动/重命名文件
fs.renameSync('./test.txt', './test2.txt'); // 重命名文件
fs.renameSync('test2.txt', 'test-dir/test2.txt'); // 移动文件

// 删除文件
fs.unlinkSync('./test-dir/test2.txt'); // 删除文件
fs.rmSync('./test1'); // 删除文件
// 删除目录
fs.rmSync('./test-dir', { recursive: true }); // 删除目录
```

### 目录操作

```js
// 读取目录所有文件，默认情况下只会返回名称
const files = fs.readdirSync('./test-dir');
console.log(files); // [ 'test.txt', 'test1.txt' ]
// 指定第二个参数 withFileTypes 为 true，使返回结果包含文件类型
const filesWithType = fs.readdirSync('./test-dir', { withFileTypes: true });
console.log(filesWithType.map((file) => ({ name: file.name, isDirectory: file.isDirectory() })));

// 创建目录
fs.mkdirSync('./test-dir/a');
// 递归创建多级目录
fs.mkdirSync('./test-dir/a/b/c', { recursive: true });

// 删除目录
// fs.rmdirSync('./test-dir/a'); // 即将移除
fs.rmSync('./test-dir/a/b', { recursive: true });

// 监听目录变化
fs.watch('./', { recursive: true }, (eventType, filename) => {
  console.log(`file ${filename} has changed: ${eventType}`);
});
```

综合实战：

```js
import fs from 'fs';
import path from 'path';

// 读取目录下所有文件并获取绝对路径
function getAllFiles(dirPath, allFiles = []) {
  const files = fs.readdirSync(dirPath, { withFileTypes: true });

  files.forEach((file) => {
    const filePath = path.resolve(dirPath, file.name);
    if (file.isDirectory()) {
      allFiles = getAllFiles(filePath, allFiles); // Recursively get files in subdirectory
    } else {
      allFiles.push(filePath); // Add file to the list
    }
  });

  return allFiles;
}
console.log(getAllFiles('./test-dir'));
```


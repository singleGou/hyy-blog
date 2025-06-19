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



## util 工具



##  http/https

用于发起 http 请求和创建 web 服务器

###  发起请求

#### http.get

```js
import https from 'https';

https.get(
  'https://api.juejin.cn/content_api/v1/content/article_rank?category_id=1&type=hot&count=3&from=1&aid=2608&uuid=7145810834685003271&spider=0',
  {
    headers: {
      'Content-Type': 'application/json'
    }
  },
  (res) => {
    // 响应内容拼接
    let content = '';
    res.on('data', (chunk) => {
      content += chunk;
    });

    // 读完对外暴露内容和状态码
    res.on('end', () => {
      console.log(content);
    });

    res.on('error', (err) => {
      console.error('Error:', err);
    });
  }
);
```

#### http.request

post, put, delete 等其他请求通过 http.request 发起

需要分别指定请求的 `域名`，`方法`，`端口`，`资源路径`，`查询参数` 等：

```js
// 可以通过 URL 方法来解析一个完整的 url 链接
const url = new URL('https://api.juejin.cn/content_api/v1/content/article_rank?category_id=1&type=hot&count=3&from=1&aid=2608&uuid=7145810834685003271&spider=0');
const req = https.request(
  {
    hostname: url.hostname,
    method: 'GET',
    port: 443,
    path: url.pathname + url.search
  },
  (res) => {
    let content = '';
    res.on('data', (chunk) => {
      content += chunk;
    });

    res.on('end', () => {
      console.log('statusCode:', res.statusCode);
      console.log('Response:', content);
    });
  }
);
// 发送请求
req.end();
```

发送 post 请求：

```js
const req = https.request(
  {
    hostname: url.hostname,
    method: 'POST',
    port: 443,
    path: url.pathname + url.search,
    headers: {
      'Content-Type': 'application/json'
    }
  },
  (res) => {
    let content = '';
    res.on('data', (chunk) => {
      content += chunk;
    });

    res.on('end', () => {
      console.log('statusCode:', res.statusCode);
      console.log('Response:', content);
    });
  }
);
req.write(JSON.stringify({ name: 'zs', age: 18 }));
req.end();

```



#### fetch/axios

nodejs 18 开始支持 fetch

```js
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error('Error fetching data:', err);
  });
```



### 创建 HTTP Service

```js
import http from 'http';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Hello World</h1>');
});
server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
```



### request 内容

#### 请求路径和方法

```js
const server = http.createServer((req, res) => {
  // 获取请求的路径和方法
  const { url, method } = req;
  console.log(url, method);
});
```

#### query 参数解析

可以使用 URL 模块的 searchParams 直接提取：

```js
const server = http.createServer((req, res) => {
  // 获取请求的路径和方法
  const { url, method } = req;
  const query = Object.fromEntries(new URL(url, 'http://localhost').searchParams);
  console.log(query);
});

// fetch('http://localhost:3000/a/b/c?name=zs&age=3', { method: 'post' }) 浏览器测试，nodejs 打印输出 { name: 'zs', age: '3' }
```

#### body 参数解析

post 请求通常会通过 body 传递数据：

```js
fetch('http://127.0.0.1:3000?hello=world', {
  method: 'POST',
  body: JSON.stringify({
    name: 'xm',
    age: 18
  })
})
```

通过监听 data 和 end 事件获取

```js
const server = http.createServer((req, res) => {
  let body = [];
  req
    .on('data', (chunk) => {
      body.push(chunk);
    })
    .on('end', () => {
      body = Buffer.concat(body).toString();
      body = JSON.parse(body);
      console.log('body', body);
    });
});
server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
```

#### headers 参数

还可以通过 headers 传递参数：

```js
const server = http.createServer((req, res) => {
	console.log(req.headers)
});
```



### response 内容

通常用于设置向客户端要返回的内容信息

```js
const server = http.createServer((req, res) => {
  // 设置响应状态码
  res.statusCode = 200;
  // 设置响应头
  res.setHeader('Content-Type', 'text/html');
  // 发送响应内容到客户端，结束响应
  res.end('<h1>Hello, World!</h1>');
});
```

也可以通过 `res.write`  多次返回内容后再调用结束：

```js
res.write('<h1>')
res.write('Node.js')
res.write('o')
res.write('</h1>')
res.end()
```

在浏览器中打开或通过 curl 发起请求：

```bash
curl 'http://127.0.0.1:3000'
```



## child_process

用于创建子进程，虽然 js 是单线程的，但通过创建子进程也能实现多任务并行处理

主要提供 4 个方法：spawn、exec、execFile 和 fork

### spawn()

启动一个子进程来执行指定的命令，并且可以通过流式数据通信与子进程进行交互

支持同步（spawnSync）和异步（spawn）调用：

```js
import ChildProcess from 'child_process';

const { spawn, spawnSync } = ChildProcess;

const pwd = spawnSync('pwd');
console.log(pwd.stdout.toString());
const ls = spawnSync('ls', ['-lh']);
console.log(ls.stdout.toString());
```

> 只能在 linux 系统或 git bash 中使用，windows 命令不一样

可以设置 `stdio:'inherit'`，表示将子进程的标准输入/输出/错误流与父进程共享：

```js
spawnSync('pwd', {
  stdio: 'inherit'
})

spawn('ls', {
  stdio: 'inherit'
})
```

通过 Git 获取某个文件最近一次的改动时间

```bash
git log -1 --pretty="%ci" ../fs/index.mjs
```

使用 spawn 实现：

```js
import ChildProcess from 'child_process'

const { spawn, spawnSync } = ChildProcess
const file = './index.js'
const spawnProcess = spawn('git', ['log', '-1', '--pretty="%ci"', file])
spawnProcess.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`)
  console.log(new Date(data))
})
```

### exec()

启动一个 shell，并在 shell 中执行指定命令，执行完毕后插入 `stdout/stderr` 中，适用于一些命令行工具

支持同步（execSync）和异步（exec）调用：

```js
import { exec, execSync } from 'child_process'

const pwd = execSync('pwd')
console.log(pwd.toString())
const ls = execSync('ls -lh')
console.log(ls.toString())

const file = './index.js'
const execProcess = exec(`git log -1 --pretty="%ci" ${file}`)
execProcess.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`)
  console.log(new Date(data))
})
```

### execFile()

与 `exec` 类似，但是可以直接执行某个文件，而无需通过 shell 执行，支持同步和异步

新建可执行文件 hello.js：

```js
#!/usr/bin/env node

const hello = 'hello world'
console.log(hello)
console.log(process.env)
```

通过 execFile 执行：

```js
import { execFile, execFileSync } from 'child_process'

const file = './hello'
const execData = execFileSync(file)
console.log(execData.toString())

execFile(file, (error, stdout, stderr) => {
  if (error) {
    throw error
  }
  console.log(stdout)
  console.log(stderr)
})
```

### fork()

`fork` 专门用于在 Node.js 中衍生新的进程来执行 JavaScript 文件，并且建立一个与子进程的 IPC 通信管道

在父进程中，可以使用 fork() 方法创建一个子进程，并与子进程通信

```js
// fork.js
import { fork } from 'child_process';

const child = fork('./child.js'); // 使用 fork 方法创建子进程

child.on('message', (message) => {
  // 监听子进程发送的消息
  console.log('父进程收到消息:', message);
});

child.send('Hello, child process!'); // 向子进程发送消息
```

```js
// child.js
process.on('message', (message) => {
  console.log('子进程收到消息:', message);
  process.send('Hello, parent process!'); // 向父进程发送消息
});
```

```bash
$ node fork.js 
子进程收到消息: Hello, child process!
父进程收到消息: Hello, parent process!
```

> fork & spawn: fork 是一种特殊的创建子进程方式，通过 send + message 允许父子进程通信
> spawn & exec: exec 处理简单命令，spawn 处理需要大量数据的实时数据



## 其他模块

- URL：提供了 URL 解析的实用工具方法
- Timers：定时器相关方法
- Readline：从可读流读取数据，支持逐行读取
- Crypto：提供了一系列加密和解密数据的方法，内置了一些常用的算法



## sync/callback/async

- 同步：阻塞当前线程，直到操作完成
- 异步回调：容易出现回调地狱的情况
- ES6 (Async/Await)：ES6 引入的新语法可让我们更方便地写异步代码，同时避免了回调地狱的问题



##  Node 中的事件循环

与浏览器中的 Event Loop 不同，node 中的 Event Loop 分为 6 个阶段，按照顺序反复执行，每当进入某个阶段后，就会从回调队列中取出函数执行

### 6 个阶段

- timers 阶段：执行 setTimeout、setInterval 的回调
- pending callbacks: 执行一些系统操作的回调，例如 TCP 错误
- idle, prepare: 内部使用
- poll: 检索新的 I/O 事件，执行 I/O 相关的回调（几乎除了 close 事件、定时器和 setImmediate 以外的所有回调）
- check: 执行 setImmediate 回调
- close callbacks: 如 socket.on('close', ...)

### 2 个微任务队列

- nextTick 队列：存储与 process.nextTick 函数相关的回调函数
- Promise 队列

同步代码

微任务队列：nextTick 队列 promise 队列

 

## Express web 服务器

### 安装依赖

```
npm init -y

改 type 为 module

npm install express

// 用于监听文件变化，自动重启服务
npm i nodemon -D
```

### 基本使用

```js
import express from 'express';

const PORT = 3000;
const app = express();
// 支持 json 数据解析，express 默认不支持解析传递的请求体数据
app.use(express.json());

// app.use 用于设置中间件函数来处理请求和响应，Express 会按照设置的顺序依次调用中间件函数
app.use((req, res, next) => {
  const { method, path, query, body, headers } = req;
  console.log(`[${method}] ${path}`);
  console.log('Query:', query);
  console.log('Body:', body);
  console.log('Headers:', headers);
  next();
});

// 除了 app.get/post 等，还支持一种特殊的 app.all，可以匹配所有的请求方法
app.all('/method/all', (req, res) => {
  res.send(`All request method: ${req.method}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

### 路由路径

express 使用 path-to-regexp 来匹配路由路径

路由路径可以是 `字符串` 或 `正则表达式`：

```js
// 使用正则表达式来匹配路由
app.get(/world/, (req, res) => {
  res.send('hello world')
})
```

### Router

```js
import express from 'express';

// 使用 express.Router 可以创建单独的路由实例
const router = express.Router();

router.get('/router/get', (req, res) => {
  res.send('GET request from router');
});

router.post('/router/post', (req, res) => {
  res.send('POST request from router');
});

export default router;
```

app.js 引入：

```js
import routerDemo from './routes/router-demo.js';

// ...

// 将 routerDemo 路由注册到 /demo 路径下，路由会自动拼接上 /demo 前缀
// localhost:3000/demo/router/get
app.use('/demo', routerDemo);
```

### app.route()

创建链式路由，避免重复的路由名称

可以用于创建相同路由名称的不同请求方法，同时可以通过 `all` 设置所有请求的前置处理逻辑：

```js
app
  .route('/route/any')
  .all((req, res, next) => {
    console.log('pre all', req.method, req.path)
    next()
  })
  .get((req, res) => {
    console.log('get request')
    res.send('get request')
  })
  .post((req, res) => {
    console.log('post request')
    res.send('post request')
  })
```

### 响应数据

- res.json() 主要用于发送 json 数据
- res.send() 可以发送任意类型的数据
- res.download() 用于下载文件

```js
// routes/response.js
import express from 'express';

const router = express.Router();

router.get('/response/get', (req, res) => {
  res.json({
    name: 'express',
    type: 'framework'
  });
});

router.get('/response/send', (req, res) => {
  // html
  res.send('<h1>hello express</h1>')

  // json
  // res.send({
  //   name: 'express',
  //   type: 'framework'
  // })

  // string
  // res.send('hello express')

  // Buffer
  // res.send(Buffer.from('hello express'))
})

router.get('/response/download', (req, res) => {
  // 下载文件
  res.download(path.resolve('./package.json'));
});

export default router;

```

### 操作 header

```js
// routes/headers.js
router.get('/response/get/header', (req, res) => {
  // 直接通过 req.headers 即可获取到请求头
  // res.json(req.headers);
    
  // 设置响应头
  res.set('Content-Type', 'text/html');
  res.set('token', '1234567890');
    
  res.send('<h1>hello express</h1>');
});
```

### 代码结构

```
├── app.js
├── middleware
|  └── index.js
├── package-lock.json
├── package.json
└── routes
   ├── headers.js
   ├── index.js
   ├── method.js
   ├── response.js
   └── router-demo.js
```

app.js:

```js
import express from 'express';
import mountMiddleware from './middleware/index.js';
import mountRouters from './routes/index.js';

const PORT = 3000;
const app = express();

mountMiddleware(app);
mountRouters(app);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

middleware/index.js:

```js
import express from 'express';

export default function mountMiddleware(app) {
  // 支持 body 解析
  app.use(express.json());

  // 自定义中间件函数
  app.use((req, res, next) => {
    const { method, path, query, body, headers } = req;
    console.log(`[${method}] ${path}`);
    console.log('Query:', query);
    console.log('Body:', body);
    console.log('Headers:', headers);
    next();
  });
}
```

routes/index.js:

```js
import responseRouter from './response.js';
import demoRouter from './router-demo.js';
import mountMethodDemo from './method.js';

const routers = [responseRouter, demoRouter];

export default function mountRouters(app) {
  mountMethodDemo(app);

  // 注册所有 router
  app.use(routers);

  // 将 demoRouter 路由注册到 /demo 路径下，路由会自动拼接上 /demo 前缀
  app.use('/demo', demoRouter);

  // 一些自定义路由
  app.get('/hello/:id', (req, res) => {
    const { params } = req;
    // params 主要指路由中携带的 REST 参数
    console.log('params', params);
    res.json(params);
  });
}
```

### Restful API

```js
// restful.js
import express from 'express';

const router = express.Router();

const userList = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

router.get('/users', (req, res) => {
  res.json(userList);
});

router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = userList.find((user) => user.id === Number(id));
  res.json(user);
});

router.post('/users', (req, res) => {
  // 创建新用户
  const user = {
    id: userList.length + 1,
    ...req.body.name // 从请求体获取用户名
  };
  userList.push(user);
  res.json(user);
});

router.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = userList.find((user) => user.id === Number(id));
  user.name = req.body.name;
  res.json(user);
});

router.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const index = userList.findIndex((user) => user.id === Number(id));
  userList.splice(index, 1);
  res.json({
    code: 200,
    message: 'User deleted successfully'
  });
});

export default router;
```

注册路由，然后引入：

```js
// routes/index.js
import restfulRouter from './restful.js';

const routers = [restfulRouter];

export default function mountRouters(app) {
  // 注册所有 router
  app.use(routers);

  // 将 restfulRouter 路由注册到 /api 路径下，路由会自动拼接上 /api 前缀
  app.use('/api', restfulRouter);
}
```

### 静态资源目录代理

```js
// 设置静态资源目录，这样可以直接访问目标目录下的文件资源
app.use(express.static('public'));
```

### 文件上传

使用第三方库 multer：

```bash
pnpm i multer
```

```js
// routes/upload.js
import express from 'express';
import multer from 'multer';
import fs from 'fs';

const router = express.Router();

// 指定文件存储位置和文件名
const storage = multer.diskStorage({
  // destination() 函数指定了文件存储目录
  destination(req, file, cb) {
    // 指定文件存储目录
    const dir = './uploads';
    if (!fs.existsSync(dir)) {
      // 如果目录不存在，则创建目录
      fs.mkdirSync(dir, { recursive: true });
    }
    // 将文件存储到指定目录
    cb(null, dir);
  },
  // filename() 函数指定了文件命名规则
  filename(req, file, cb) {
    const ext = file.originalname.split('.').pop(); // 获取文件扩展名
    cb(null, `${Date.now()}-${file.fieldname}.${ext}`); // 将文件存储到指定位置，并以指定的文件名命名
  }
});

const upload = multer({
  storage, // 存储位置和文件名规则
  limits: {
    fileSize: 1024 * 1024 * 5 // 限制文件大小为 5 MB
  },
  // fileFilter() 函数指定了文件类型过滤规则
  fileFilter(req, file, cb) {
    // 只允许上传图片
    if (!file.mimetype.startsWith('image/')) {
      const err = new Error('Only image files are allowed!');
      err.status = 400;
      return cb(err, false);
    }
    return cb(null, true);
  }
});
// 上传单个文件
router.post('/upload/image', upload.single('file'), (req, res) => {
  // 这里的 upload.single() 函数指定了只上传单个文件
  // 返回上传成功信息和上传文件信息
  res.json({
    message: 'File uploaded successfully',
    data: req.file
  });
});
export default router;

```

### 操作数据库

常用的数据库有 MySQL、MongoDB、Redis 等

数据库管理工具：vscode 插件 Database Client

#### Sequelize 操作 MySQL

连接数据库后使用 sql 语句新建一个 `node_test` 数据库和一张用于测试的 `users` 表：

```sql
create database node_test;

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `age` INT(3) NOT NULL,
  PRIMARY KEY (`id`)
);
```

安装依赖：

```bash
pnpm i sequelize mysql2
```

创建 Sequelize 实例：

```js
import Sequelize from 'sequelize'

const sequelize = new Sequelize('node_test', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
})
```

定义 users 表对应的模型：

```js
// 定义模型
const User = sequelize.define(
  'User',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    age: {
      type: Sequelize.INTEGER(3),
      allowNull: false
    }
  },
  {
    tableName: 'users', // 指定表格名称
    timestamps: false // 禁止 Sequelize 自动生成 createdAt 和 updatedAt 字段
  }
)
```

创建 CURD 方法：

```js
// 创建记录
async function createUser(name, age) {
  const user = await User.create({ name, age })
  return user.toJSON()
}

// 查询所有记录
async function findAllUsers() {
  const users = await User.findAll()
  return users.map((user) => user.toJSON())
}

// 根据 id 查询记录
async function findUserById(id) {
  const user = await User.findByPk(id)
  return user?.toJSON()
}

// 更新记录
async function updateUser(id, name, age) {
  const user = await User.findByPk(id)
  if (user) {
    user.name = name
    user.age = age
    await user.save()
    console.log(user.toJSON())
  } else {
    console.log('User not found')
  }
  return user
}

// 删除记录
async function deleteUser(id) {
  const user = await User.findByPk(id)
  if (user) {
    await user.destroy()
    console.log('User deleted')
  } else {
    console.log('User not found')
  }
  return user
}

export const UserDb = {
  User,
  createUser,
  findAllUsers,
  findUserById,
  updateUser,
  deleteUser
}
```



Mongoose 操作 MongoDB



# 数据库

主键 唯一 不可变 一般是自增 id，不要跟业务相关如身份证号等

外键 可以把数据与另一张表关联起来的列 通过外键约束实现

索引 用于提高查询速度 效率取决于该列是否散列 



通过创建唯一索引或唯一约束，可以保证某一列的值具有唯一性：

```mysql
ALTER TABLE students
ADD UNIQUE INDEX uni_name (name);
```

也可以只对某一列添加唯一约束而不创建唯一索引

```mysql
ALTER TABLE students
ADD CONSTRAINT uni_name UNIQUE (name);
```


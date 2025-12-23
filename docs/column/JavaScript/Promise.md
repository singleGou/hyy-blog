state: pending fulfilled/rejected

result: undefined value/error



```js
promise.then(
  function (result) { },
  function (error) { }
)

// 只关心成功的情况
promise.then(function (result) {  })
// 只关心 error
promise.then(null, function (error) { })
// 简写
promise.catch(function (error) { })
```



finally 用来清理，当 promise state 为 settled



promise 链

.then(handler) 中的处理程序可以创建并返回一个 promise，其他的处理程序将等待它 settled 后再获得其结果

.then 处理程序返回的不完全是一个 promise，而是一个具有 then 方法的任意对象，它会被当做一个 promise 来处理

```js
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    console.log(resolve);
    setTimeout(() => resolve(this.num * 2), 1000);
  }
}

let promise = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000);
})
  .then((result) => {
    console.log(result); // 1

    return new Thenable(result);
  })
  .then((result) => {
    console.log(result); // 2
  });
```

当一个 promise 被 reject 时，控制权将移交至最近的 rejection 处理程序

如果 error 没有被 .catch 捕获，那么代码会报错，浏览器会在下一轮事件循环末尾触发 unhandledrejection 事件

注意 try...catch 只能捕获同步错误，与 Promise 链的 .catch 属于不同的时空

但是 await 语法却可以让 try...catch 捕获 reject，`await` 在**遇到 reject** 时，会**同步地**把原因 `throw` 出去

```js
// async/await 写法
async function f() {
  try {
    const x = await Promise.reject(404);
  } catch (e) {
    console.log(e);        // 404 ✅
  }
}
```

js 引擎会这样处理：

```js
function f() {
  return Promise.resolve()
    .then(() => Promise.reject(404))   // 这一步会抛
    .catch(e => {                     // 引擎生成的 catch
       // 如果用户没有自己的 catch，就把 e 重新抛到函数栈
       throw e;                       
    });
}
```



.catch 会触发吗？

```js
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(console.log);
```

异步产生的错误需要手动调用 reject() 来触发



## Promise API

all 任意一个 reject，Promise.all 返回的 promise 就会立即 reject，并且带有的就是这个 error，如果出现 error 其他的 promise 会继续执行，但是他们的结果将被忽略

allSettled 等待所有 promise settled

race 只等待第一个 settled 的 promise 并获取其结果（或 error）

any 与 race 类似，区别是只等待第一个 fulfilled 的 promise

Promise.resolve

Promise.reject

> promise 中没有取消的概念，只是可能结果被忽略



## 微任务

promise 的处理程序 .then .catch .finally 都是异步的

微任务队列（microtask queue） PromiseJobs

```js
let promise = Promise.reject(new Error('Promise failed'));

setTimeout(() => {
  promise.catch((err) => console.log('caught'));
}, 1000);

window.addEventListener('unhandledrejection', (e) => console.log(e.reason));
```



## async/await

`async` 放在函数前面

```js
async function f() {
  return 1;
}
console.log(f()); // Promise { 1 }

// 相当于
function f1() {
  return Promise.resolve(1);
}
console.log(f1()); // Promise { 1 }
```

`await` 实际上会暂停函数的执行，直到 promise 状态变为 settled，然后以 promise 的结果继续执行。这个行为不会耗费任何 CPU 资源，因为 JavaScript 引擎可以同时处理其他任务：执行其他脚本，处理事件等。

相比于 `promise.then`，它只是获取 promise 的结果的一个更优雅的语法，并且也更易于读写

Thenable:

```js
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    setTimeout(() => resolve(this.num * 2), 1000);
  }
}

async function f() {
  let result = await new Thenable(1);
  console.log(result);
}

f();
```



### Error 处理

如果一个 promise 正常 resolve，**await promise** 返回的就是其结果。但是如果 promise 被 reject，它将 throw 这个 error：

```js
async function f() {
  await Promise.reject(new Error('promise error'));
}
// 相当于
async function f1() {
  throw new Error('throw error');
}
```

在实际开发中，promise 可能需要一点时间后才 reject。这种情况下，在 await 抛出一个 error 之前会有一个延时。可以使用 `try...catch` 来捕获这个 error，如果有 error 发生，执行控制权马上就会被移交至 catch 块：

```js
async function f() {
  try {
    let response = await fetch('http://no-such-url');
    let result = await response.json();
  } catch (err) {
    console.log(err); // TypeError: Failed to fetch
  }
}
```



## 事件循环

在 js 引擎等待任务，执行任务和进入休眠状态等待更多任务这几个状态之间转换的无线循环

1. 从 **宏任务** 队列（例如 “script”）中出队（dequeue）并执行最早的任务。
2. 执行所有微任务：
   - 当微任务队列非空时：
     - 出队（dequeue）并执行最早的微任务。
3. 如果有变更，则将变更渲染出来。
4. 如果宏任务队列为空，则休眠直到出现宏任务。
5. 转到步骤 1。

1. 从宏任务队列出队最先插入的宏任务，执行完毕（例如 “script”）。
2. 依次执行所有微任务，直到微任务队列为空。
3. **必定**执行一次渲染步骤（DOM 变更、重绘、合成等）；若无变更，此步为空操作。
4. 回到第 1 步；若宏任务队列为空，线程休眠直到新宏任务到达。

> 注意：步骤 3 不会被跳过；
> 「死循环卡页面」是因为代码**不断向宏任务队列追加新任务**，浏览器**无法进入下一轮事件循环的渲染阶段**，而非渲染阶段被省略



宏任务

- script
- mousemove
- setTimeout

引擎执行任务时永远不会进行渲染，仅在任务完成后才会绘制对 DOM 的更改

如果一个任务执行花费的时间过长，浏览器将无法执行其他任务。在一定时间后，浏览器会抛出一个如“页面为响应”之类的警告，建议你终止这个任务。这种情况常发生在大量复杂计算或导致死循环的程序错误时



使用零延迟的 setTimeout 来 schedule 一个宏任务，可以拆分复杂计算，使浏览器能够更及时的对用户事件做出反应
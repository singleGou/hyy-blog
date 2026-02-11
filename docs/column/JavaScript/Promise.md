## Promise 构造器

Promise 的构造器（constructor）语法：

```javascript
let promise = new Promise((resolve, reject) => {
  // executor 生产者代码
});
```

传递给 `new Promise` 的函数被称为 executor，executor 会自动运行并尝试执行一项工作（通常是需要花费一些时间的事）。然后调用 `resolve` 或 `reject` 来改变对应 promise 对象的状态

由 new Promise 构造器返回的 promise 对象具有以下**内部属性**：

- state —— 最初是 `"pending"`，resolve 被调用时变为 `"fulfilled"`，或者在  reject 被调用时变为` "rejected"`
- result —— 最初是 `undefined`，resolve(value) 被调用时变为 `value`，或者在 reject 被调用时变为 `error`

一个 resolved 或 rejected 的 promise 的 state 统称为 `settled`

> executor 只能调用一个 resolve/reject，任何状态的改变都是最终的，所有其他再对 resolve 或 reject 的调用都会被忽略
>
> ```javascript
> let promise = new Promise((resolve, reject) => {
>   resolve("done"); // promise 的 state 立即变为 'fulfilled'
> 
>   reject(new Error("Error!")); // 被忽略
>   setTimeout(() => {
>     resolve("..."); // 被忽略
>   });
> });
> 
> console.log(promise); // 立即就有了一个 resolved 的 promise
> ```



## then, catch

```js
let promise = new Promise((resolve, reject) => {
  // do something...
})

promise.then(
  function (result) { }, // 将在 promise resolved 且接收到结果后执行
  function (error) { }, // 将在 promise rejected 且接收到 error 信息后执行
)

// 只关心成功的情况
promise.then(function (result) {  })
// 只关心 error
promise.then(null, function (error) { })
// 或者直接使用 .catch 处理 error 的情况，简写形式
promise.catch(function (error) { })
```



## finally

finally 用来执行一些清理任务，当 promise state 为 settled 时执行

```javascript
new Promise((resolve, reject) => {
  // 做一些需要时间的事，之后调用可能会 resolve 也可能会 reject
})
  // 在 promise 为 settled 时运行，无论成功与否
  .finally(() => console.log("do something"));
```

finally 处理函数没有参数，会将 result 或 error 传递给下一个合适的处理程序：

```javascript
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("done");
  }, 1000);
})
  .finally(() => console.log("Promise ready")) // 先触发
  .then((result) => console.log(result));
```



## promise 链

对 .then 调用都会返回一个新的 promise，因此可以链式调用

### 返回 promise

.then(handler) 中的处理程序可以创建并返回一个 promise，其他的处理程序将等待它 settled 后再获得其结果

```javascript
new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
})
  .then((result) => {
    console.log(result);

    return new Promise((resolve) => setTimeout(() => resolve(2), 1000));
  })
  .then((result) => {
    console.log(result);

    return new Promise((resolve) => setTimeout(() => resolve(3), 1000));
  })
  .then((result) => {
    console.log(result);
  });
```

.then 处理程序返回的不完全是一个 promise，而是一个具有 then 方法的任意对象，它会被当做一个 promise 来处理

```js
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    console.log(resolve); // ƒ () { [native code] }
    setTimeout(() => resolve(this.num * 2), 1000);
  }
}

let promise = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000);
})
  .then((result) => {
    console.log(result); // 1

    return new Thenable(result); // 处理返回的对象：当它具有名为 then 的可调用方法，那么它将调用改方法并提供原生的函数 resolve 和 reject 作为参数，并等待直到其中一个函数被调用
  })
  .then((result) => {
    console.log(result); // 2
  });
```



## 错误处理

当一个 promise 被 reject 时，控制权将移交至最近的 rejection 处理程序

```javascript
new Promise((resolve, reject) => {
  resolve(1);
})
  .then((result) => {
    console.log(balala);
    return result;
  })
  .then((result) => {
    console.log(result);
  })
  // 上述任意一个 promise rejected，.catch 就会捕获它
  .catch((error) => {
    console.log(error);
  });        
```

### 隐式 try...catch

在 executor 和 promise 的处理程序周围有一个隐式的 try...catch，会自动捕获 error，并将其变为 rejected promise：

```javascript
new Promise((resolve, reject) => {
  throw new Error("error!");
}).catch(console.log);

// 等同于
new Promise((resolve, reject) => {
  reject(new Error("error!"));
}).catch(console.log);
```

对于所有的 error 都会发生这种情况，而且不仅是在 executor 函数中，同样也发生在其处理程序中：

```javascript
new Promise((resolve, reject) => {
  resolve("ok");
})
  .then((result) => {
    console.log(result);
    abb(); // 不存在此函数，会报错，reject 这个 promise
  })
  .catch((error) => {
    console.log(error); // 被最近的 .catch 处理程序捕获
  });
```

异步产生的错误需要手动调用 `reject()` 来触发：

```js
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("error!");
  }, 1000);
}).catch(console.log); // .catch 会触发吗？
```

注意 try...catch 只能捕获同步错误，与 Promise 链的 .catch 属于不同的时空

但是 await 语法却可以让 try...catch 捕获 reject，`await` 在**遇到 reject** 时，会**同步地**把原因 `throw` 出去：

```js
// async/await 写法
async function f() {
  try {
    const x = await Promise.reject(404);
  } catch (e) {
    console.log(e);        // 404
  }
}

// js 引擎会这样处理
function f() {
  return Promise.resolve()
    .then(() => Promise.reject(404))   // 这一步会抛
    .catch(e => {                     // 引擎生成的 catch
       // 如果用户没有自己的 catch，就把 e 重新抛到函数栈
       throw e;                       
    });
}
```

### 再次抛出（Rethrowing)

在 try...catch 中，如果无法处理 error，可以再次将其抛出，在 promise 中也是可以的

如果在 .catch 中 throw error，那么控制权就会交给最近的 .catch 处理程序，如果成功处理该 error，那么它将继续到最近成功的 .then 处理程序：

```javascript
// .catch 成功处理 .catch -> .then
new Promise((resolve, reject) => {
  throw new Error("error!");
})
  .catch((error) => {
    console.log(error); // Error: error!
    console.log("error is handled."); // 'error is handled.'
  })
  .then(() => {
    console.log("continue"); // 'continue'
  });

// .catch 无法处理，再次抛出 .catch -> .catch
new Promise((resolve, reject) => {
  throw new Error("error!");
})
  .catch((error) => {
    if (error instanceof URIError) {
      // 正常处理
    } else {
      // 无法处理，再次抛出
      throw new Error(error);
    }
  })
  .then(() => {
    console.log("continue"); // 不执行
  })
  .catch((error) => {
    console.log(error); // Error: Error: error!
  });
```

### 未处理 rejection

如果 error 没有被 .catch 捕获，那么代码会报错，在浏览器中可以使用 `unhandledrejection` 事件捕获这类 error，会在下一轮事件循环末尾触发：

```javascript
let promise = Promise.reject(new Error("Promise failed"));

setTimeout(() => {
  promise.catch((err) => console.log("caught")); // 后输出 'caught'
}, 1000);

window.addEventListener("unhandledrejection", (event) => {
  console.log(event.reason); // 先输出 Error: Promise failed
});
```



## Promise API

Promise 类中有 6 种静态方法：

### Promise.all

```javascript
// 接收一个可迭代对象（通常是一个数组为 promise 的数组），并返回一个新的 promise
let promise = Promise.all(iterable);
```

并行执行多个 promise，当所有给定的 promise 都 resolve 时，新的 promise 才会 resolve，并且其结果数组将作为新 promise 的结果：

```javascript
// 结果数组中元素的顺序与其在源 promise 中的顺序相同
Promise.all([
  new Promise((resolve) => setTimeout(() => resolve(1), 3000)),
  new Promise((resolve) => setTimeout(() => resolve(2), 2000)),
  new Promise((resolve) => setTimeout(() => resolve(3), 1000)),
]).then(console.log); // 3s 之后输出 [1, 2, 3]
```

如果任意一个 promise 被 reject，Promise.all 返回的 promise 就会立即 reject，并且带有的就是这个 error，如果出现 error 其他的 promise 会继续执行，但是他们的结果将被忽略：

```javascript
Promise.all([
  new Promise((resolve) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("error!"));
    }, 2000);
  }),
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(3);
      console.log(3); // 3s 之后还是会输出 3
    }, 3000),
  ),
]).catch(console.log); // Error: error!
```

> promise 中没有取消的概念，只是可能结果被忽略

### Promise.allsettled

等待所有 promise 都被 settle，无论结果如何。结果数组：

- 对于成功的响应，结果数组对应元素的内容： `{ status: 'fulfilled', value: result }`
- 对于出现 error 的响应，结果数组对应元素的内容为：`{ status: 'rejected', reason: error }`

```javascript
Promise.allSettled([
  new Promise((resolve) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("error!"));
    }, 2000);
  }),
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(3);
    }, 3000),
  ),
]).then((results) => {
  results.forEach((result, index) => {
    console.log(result, index);
  });
});
```

### Promise.race

与 Promise.all 类似，但只等待第一个 settled 的 promise 并获取其结果（或 error）

```javascript
Promise.race([
  new Promise((resolve) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("error!"));
    }, 2000);
  }),
  new Promise((resolve) => setTimeout(() => resolve(3), 3000)),
]).then(console.log); // 1
```

### Promise.any

与 Promise.race 类似，区别是只等待第一个 fulfilled 的 promise，并将这个 fulfilled 的 promise 返回

如果给出的 promise 都 rejected，那么返回的 promise 会带有一个特殊的 error 对象 AggregateError

```javascript
Promise.any([
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("error!")), 1000), // 第一个 promise 是最快的，但 rejected 了
  ),
  new Promise((resolve) => setTimeout(() => resolve(2), 2000)),
  new Promise((resolve) => setTimeout(() => resolve(3), 3000)),
]).then(console.log); // 2

// 全部 rejected
Promise.any([
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("error1")), 1000),
  ),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("error2")), 2000),
  ),
]).catch((error) => {
  console.log(error.constructor.name); // 'AggregateError'
  console.log(error.errors[0]); // Error: error1
});
```

### Promise.resolve/reject

`Promise.resolve(value)` 用结果 value 创建一个 resolved 的 promise，等同于：

```javascript
new Promise((resolve) => resolve(value));
```

`Promise.reject(error)` 用 error 创建一个 rejected 的 promise，没什么用



## 微任务

promise 的处理程序 .then .catch .finally 都是异步的

所有 promise 行为都会通过内部的 `PromiseJobs` 队列，V8 中叫**微任务队列**（microtask queue） 

- 队列先进先出：首先进入队列的任务会首先运行
- 只有在 js 引擎中没有其他任务在运行时，才会执行任务队列中的任务

```javascript
let promise = Promise.resolve(1); // 这个 promise 立即 fulfilled

// 被放入微任务队列
promise.then((result) => {
  console.log(result); // 后输出 1
});

// 优先执行同步代码
console.log(2); // 会先输出 2
```

如果执行顺序很重要，只需要使用 **promise 链**，通过 `.then` 将要执行的任务放入队列：

```javascript
Promise.resolve()
  .then(() => {
    console.log(1);
  })
  .then(() => {
    console.log(2);
  });
```



## async/await

使用 promise 的一种更优雅的语法，可以像写同步代码的方式书写

### async

放在一个函数前，确保函数返回一个 promise

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

### await

让 js 引擎等待直到 promise 状态变为 settled 并返回结果

```javascript
// 只在 async 函数内工作，在普通函数内使用会报错
let value = await new Promise();
```

和 Promise.then 类似，await 同样可以接收 `Thenable` 对象

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

概念：在 js 引擎 **等待任务**，**执行任务** 和 **进入休眠状态等待更多任务** 这几个状态之间转换的无限循环

事件循环的基本算法：

1. 从宏任务队列出队最先插入的宏任务，执行完毕（例如 “script”）
2. 依次执行所有微任务，直到微任务队列为空
3. **必定**执行一次渲染步骤（DOM 变更、重绘、合成等）；若无变更，此步为空操作
4. 回到第 1 步；若宏任务队列为空，线程休眠直到新宏任务到达

> 注意：步骤 3 不会被跳过
> 「死循环卡页面」是因为代码**不断向宏任务队列追加新任务**，浏览器**无法进入下一轮事件循环的渲染阶段**，而非渲染阶段被省略
>
> - 引擎执行任务时永远不会进行渲染，仅在任务完成后才会绘制对 DOM 的更改
> - 如果一个任务执行花费的时间过长，浏览器将无法执行其他任务。在一定时间后，浏览器会抛出一个如“页面为响应”之类的警告，建议你终止这个任务。这种情况常发生在大量复杂计算或导致死循环的程序错误时

**每个宏任务之后，引擎会立即执行微任务队列中的所有任务，然后再执行其他宏任务，或渲染，或进行其他操作**

### 宏任务

- script 脚本加载
- 用户事件，如 click、mousemove 等
- scheduled：setTimeout
- ...

使用零延迟的 setTimeout 来 schedule 一个宏任务，可以拆分复杂计算，使浏览器能够更及时的对用户事件做出反应：

```javascript
let i = 0;
let start = Date.now();

function count() {
  if (i < 1e9 - 1e6) {
    setTimeout(count);
  }

  do {
    i++;
  } while (i % 1e6 !== 0);

  if (i === 1e9) {
    console.log(`Done in ${Date.now() - start} ms`);
  }
}

count();
```

### 微任务

通常是由 promise 创建的，`.then/catch/finally` 处理程序的执行会称为微任务

还有一个特殊的函数 `queueMicrotask(func)`，使 func 在微任务队列中执行


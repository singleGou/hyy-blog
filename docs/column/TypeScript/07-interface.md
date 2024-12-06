对象的模板

interface 可以表示对象的各种语法：

- 对象属性

- 对象的属性索引

  属性索引有三种类型：string, number 和 symbol

  数值索引必须兼容字符串索引，因为在 js 中数值属性名最终都会被转化成字符串属性名

  ```ts
  interface A {
    [property: string]: string
    [property: number]: number // 报错
  }
  ```

- 对象的方法

  ```ts
  interface A {
    f(x: boolean): string
  }

  interface B {
    f: (x: boolean) => string
  }

  interface C {
    f: { (x: boolean): string }
  }
  ```

- 函数

  也可以用来声明独立的函数：

  ```ts
  interface Add {
    (x: number, y: number): number
  }
  const add: Add = (a, b) => a + b
  ```

- 构造函数

  ???

  ```ts
  interface ErrorConstructor {
    new (message?: string): Error
  }
  ```

  ## 继承

  ## 合并

  ## 和 type 的异同

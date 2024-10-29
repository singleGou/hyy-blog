# symbol 类型

类似于字符串，但是每一个 Symbol 值都是独一无二的，与其他任何值都不相等，Symbol 值通过 Symbol() 函数生成：
```ts
let x: symbol = Symbol()
let y: symbol = Symbol()

x === y // false
```

# unique symbol 类型

unique symbol 类型的一个作用，就是用作属性名，这可以保证不会跟其他属性名冲突。如果要把某一个特定的 Symbol 值当作属性名，那么它的类型只能是 unique symbol，不能是 symbol：
```ts
const x: unique symbol = Symbol()
const y: symbol = Symbol()

interface Foo {
  [x]: string // 正确
  [y]: string // 报错
}
```

unique symbol 类型也可以用作类的属性值，但只能赋值给类的 readonly static 属性：
```ts
class C {
  //static 和 readonly 两个限定符缺一不可，这是为了保证这个属性是固定不变的
  static readonly foo: unique symbol = Symbol()
}
```
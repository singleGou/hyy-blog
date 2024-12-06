Enum 结构既是一种类型，也是一个值，编译后会变成 js 对象，留在代码中，官方建议慎用

使用场景：成员的值不重要，名字更重要

成员的值都是只读的，可以相同，不能是 BigInt

通常会加上 const，表示一个常量枚举，它的成员只能通过字符串字面量访问

```ts
const enum Color {
  Red,
  Greeen,
  Blue,
}
```

可以通过 keyof 取出 Enum 结构所有的成员名，作为

Enum 存在反向映射

即可以通过成员值访问成员名：

```ts
enum Type {
  A = 1,
  B,
  C,
}
// 注意此时不能加 const，不然会报错
console.log(Type[2]) // 'B'
```

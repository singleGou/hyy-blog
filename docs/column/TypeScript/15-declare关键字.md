通知编译器某个类型是存在的，不用给出具体实现

## declare variable

```typescript
declare let x: number;
```

## declare function

```typescript
declare function greet(greeting: string): void;
```

## declare class

```typescript
declare class Greeter {}
```

## declare module, declare namespace

```typescript
declare module 'vue' {
  import { App } from 'vue';
  export function createApp(): App;
}

declare namespace $ {
  export function ajax(url: string, settings?: any): void;
}
```

为外部模块添加属性和方法时，给出新增部分类型描述：

```typescript
// 一个项目有多个模块，可以在一个模块中，对另一个模块的接口进行类型扩展

// a.ts
export interface A {
  x: number;
}

// b.ts
import { A } from './a';
declare module './a' {
  interface A {
    y: number;
  }
}
const a: A = { x: 1, y: 2 };
```

## declare global

为 js 原生对象添加属性和方法

```typescript
export {};

declare global {
  interface String {
    toSmallString(): string;
  }
}

String.prototype.toSmallString = (): string => {
  return '';
};
```

# Map 和 Set

映射和集合

## Map

与对象最大的区别是 Map 允许使用**任意类型**的键，而对象只能使用 string/symbol 作为键

Map 的方法和属性：

```js
let map = new Map()
map.get(key)
map.set(key)
map.has(key)
map.delete(key)
map.clear()
map.size

//  每次调用 set 都会返回 map 本身，所以可以进行链式调用
map.set(1, 'hello').set(true, 'world')
```

使用对象作为键：

```js
let man = { name: 'Tom' };

let map = new Map();
map.set(man, 3);
console.log(map.get(man)); // 3

let obj = {};
obj[man] = 3;
console.log(obj['[object Object]']); // 3
```

## Map 迭代

- `map.keys()`

  遍历并返回一个包含所有**键**的可迭代对象

- `map.values()`

  遍历并返回一个包含所有**值**的可迭代对象

- `map.entries()`

  遍历并返回一个一个包含所有实体 `[key, value]` 的可迭代对象，for...of 默认使用它遍历 map

- `map.forEach()`

  内建的 forEach 方法，和 Array 类似

> 数组也支持 keys()，values() 和 entries() 方法

```js
let map = new Map([
  ['hundred', 100],
  ['thousand', 1_000],
  ['million', 1_000_000]
]);

for (let key of map.keys()) {
  console.log(key);
}

for (let value of map.values()) {
  console.log(value);
}

// 遍历所有实体 [key, value]
for (let entry of map) {
  console.log(entry);
}

map.forEach((value, key, map) => {
  console.log(value, key);
});
```

与 Object 不同，Map 迭代的顺序与插入值的顺序相同

## Object.entries()

`Object.entries(obj)` 方法可以从对象创建 Map，返回对象的键值对数组：

```js
let obj = {
  hundred: 100,
  thousand: 1_000,
  million: 1_000_000
};

let mapArr = Object.entries(obj);
console.log(mapArr); // [ [ 'hundred', 100 ], [ 'thousand', 1000 ], [ 'million', 1000000 ] ]

let map = new Map(mapArr);
console.log(map.get('million')); // 1000000
```

## Object.fromEntries()

`Object.fromEntries(arr/map)`，其中 arr 是一个具有 `[key, value]` 键值对的数组，也可以直接接收一个 Map 实例，返回一个对象：

```js
let mapArr = [
  ['hundred', 100],
  ['thousand', 1000],
  ['million', 100000]
];
let obj = Object.fromEntries(mapArr);
console.log(obj); // { hundred: 100, thousand: 1000, million: 100000 }

let map = new Map([
  ['hundred', 100],
  ['thousand', 1_000],
  ['million', 1_000_000]
]);
let obj2 = Object.fromEntries(map.entries());
// 可以省略 .entries()，效果也是一样的，因为 Object.fromEntries() 期望得到一个可迭代对象作为参数，而不一定是数组
// let obj2  = Object.fromEntries(map)
console.log(obj2); { hundred: 100, thousand: 1000, million: 100000 }
```



## Set

Set 是值的集合，并且每个值只能出现一次，不存在特定顺序

Set 的方法和属性：

```js
let set = new Set()
set.add(value)
set.has(value)
set.delete(value)
set.clear()
set.size
```

```js
let set = new Set();

let tom = { name: 'Tom' };
let jerry = { name: 'Jerry' };
let jack = { name: 'Jack' };

set.add(tom);
set.add(jerry);
set.add(jack);
set.add(tom);
set.add(jerry);

console.log(set.size); // 3

for (let user of set) {
  console.log(user.name); // Tom Jerry Jack
}
```

> 使用 arr.find() 也可以实现去重的效果，但是需要遍历整个数组检查每一个元素，性能很差，而 Set 内部对唯一性检查做了更好的优化

## Set 迭代

Set 迭代方法和 map 类似：

- `set.keys()`

  遍历并返回一个包含所有值的可迭代对象

- `set.values()`

  与 set.keys() 作用相同，为了兼容 Map

- `set.entries()`

  遍历并返回一个包含所有实体 `[key, value]` 的可迭代对象，也是为了兼容 Map

- `set.forEach()`

  ```js
  set.forEach((value, valueAgain, set) => {
    console.log(value, valueAgain); // value 和 valueAgain 相同，也是为了兼容 Map
  });
  ```

  

# WeakMap 和 WeakSet

弱映射和弱集合

js 引擎在值“可达”和可能被使用时会将其保持在内存中，比如把一个对象放入一个数组中，只要这个数组存在，这个对象就不会被垃圾回收机制回收：

```js
let obj = { name: 'Tom' };
let arr = [obj];
obj = null;

console.log(arr[0]); // { name: 'Tom' }
```

类似，如果使用对象作为 Map 的键，只要 Map 存在，该对象也会存在，会占用内存并且不会被回收：

```js
let obj = { name: 'Tom' };
let map = new Map();
map.set(obj, 3);
obj = null;

// obj 被存储在了 map 中，可以使用 map.keys() 获取
console.log(map.keys());
```

## WeakMap

WeakMap 的键必须是对象

如果使用一个对象作为 WeakMap 的键，并且没有其他对象对这个对象的引用，那么该对象将会被从内存和 WeakMap 中清除：

```js
let obj = { name: 'Tom' };
let map = new WeakMap();
map.set(obj, 3);
obj = null;

console.log(map.has(obj)); // false
```

WeakMap 不支持迭代，所有没有办法获取 WeakMap 的所有键和值，它只有以下方法：

- weakMap.set(key, value)
- weakMap.get(key)
- weakMap.delete(key)
- weakMap.has(key)

> 不支持访问 WeakMap 的所有键/值是有技术原因的，当一个对象丢失了对它的所有引用，那么就会被垃圾回收机制回收。但是我们并不知道何时被回收，即 WeakMap 当前元素的数量是不确定的

## WeakSet

只能向  WeakSet 中添加对象，一旦通过其他方式无法访问这些对象，垃圾回收便会将这些对象与其关联值一同删除

```js
let set = new WeakSet();

let tom = { name: 'Tom' };
let jerry = { name: 'Jerry' };
let jack = { name: 'Jack' };

set.add(tom);
set.add(jerry);
set.add(tom);

console.log(set.has(tom)); // true
console.log(set.has(jack)); // false

tom = null;

console.log(set.has(tom)); // false
```

与 Set 类似，支持 add，has 和 delete 方法，但不支持 size 和 keys()，并且不可迭代



## Object.keys，values，entries

普通对象也支持像 keys，values，entries 这些方法：

- Object.keys(obj)

  返回一个包含对象所有键的数组

- Object.values(obj)

  返回一个包含对象所有值的数组

- Object.entries(obj)

  返回一个包含对象所有 `[key, value]` 键值对的数组

```js
let obj = { name: 'Tom', age: 3 };

let result = Object.entries(obj);
console.log(result); // [ [ 'name', 'Tom' ], [ 'age', 3 ] ]
```

> 和数组、map 等的区别是
>
> 1. 普通对象调用这些方法的方式不同，比如 map 使用的是 map.keys()
> 2. 普通对象调用这些方法返回的数组，而 map 等返回的是可迭代对象

和 for...in 循环一样，这些方法会忽略使用 `Symbol(...)` 作为键的属性

`Object.getOwnPropertySymbols(obj)` 会返回一个只包含 Symbol 类型的键的数组

`Reflect.ownKeys(obj)` 会返回所有键

```js
let obj = { name: 'Tom', age: 3, [Symbol('id')]: 1 };

let result = Object.entries(obj);
console.log(result); // [ [ 'name', 'Tom' ], [ 'age', 3 ] ]

console.log(Object.getOwnPropertySymbols(obj)); // [ Symbol(id) ]

console.log(Reflect.ownKeys(obj)); // [ 'name', 'age', Symbol(id) ]
```

### 转换对象

如有一个对象，想将每个属性值加倍

```js
let obj = {
  a: 1,
  b: 2,
  c: 3
};

let double = Object.fromEntries(Object.entries(obj).map((entry) => [entry[0], entry[1] * 2]));

console.log(double); // { a: 2, b: 4, c: 6 }
```


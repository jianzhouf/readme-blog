---
title: ES6 数组扩展
lang: zh
meta:
  - name: description
    content: ES6 数组扩展
  - name: keywords
    content: ES6 数组扩展
---

# ES6 数组扩展

## Array.from()
> 将类数组(如 arguments、 NodeList ) 和 可迭代对象(如 String、 Set、 Map), 转为真正的数组

```js
let arrayLike = {
  0: 1,
  1: 2,
  2: 3,
  length: 3
};

// ES5
[].slice.call(arrayLike);
// [ 1, 2, 3 ]

// ES6
Array.from(arrayLike);
// [ 1, 2, 3 ]

// NodeLise
let ps = document.querySelectorAll('p');
Array.from(ps).forEach(p => console.log(p));

// arguments
function foo() {
  let args = Array.from(arguments);
}

// iterable
Array.from('hello');
// [ 'h', 'e', 'l', 'l', 'o' ]

Array.from(new Set(['a', 'b']));
// [ 'a', 'b' ]
```

如果参数是一个真正的数组，Array.from会返回一个一模一样的新数组。

```js
Array.from([1, 2, 3])
// [1, 2, 3]
```

值得提醒的是，扩展运算符（...）也可以将某些数据结构转为数组。

```js
// arguments对象
function foo() {
  var args = [...arguments];
}


// NodeList对象
[...document.querySelectorAll('div')];
```

扩展运算符背后调用的是遍历器接口（Symbol.iterator），如果一个对象没有部署这个接口，就无法转换。

```js
Array.from({ length: 3 });
// [ undefined, undefined, undefined ]

[...{ length: 3 }];
// TypeError: {(intermediate value)} is not iterable
```

对于还没有部署该方法的浏览器，可以用Array.prototype.slice方法替代。

```js
const toArray = (() =>
  Array.from ? Array.from : obj => [].slice.call(obj)
)();
```

Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。

```js
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);
```

Array.from 与 Array.prototype.map 的生死较量

```js
let spans = document.querySelectorAll('span.name');
// map
[].map.call(spans, span => span.textContent);
// Array.from
Array.from(spans, span => span.textContent);
```

Array.from的第三个参数，用来绑定this(适用普通函数)

```js
Array.from([1, 2, 3], n => this.times * n, {times: 2});
// [ NaN, NaN, NaN ]

Array.from([1, 2, 3], function(n) {
  return this.times * n;
}, {times: 2});
// [ 2, 4, 6 ]
```

Array.from()的另一个应用是，将字符串转为数组，然后返回字符串的长度。因为它能正确处理各种Unicode字符，可以避免JavaScript将大于\uFFFF的Unicode字符，算作两个字符的bug。

```js
const countSymbols = string => Array.from(string).length;
```

## Array.of()

> 用于将一组值，转换为数组。

这个方法的主要目的，是弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异。

```js
 Array(1, 2, 3);
// [1, 2, 3]

// 指定数组长度
Array(3);
// [empty × 3]

Array(1, 2, 3);
// [1, 2, 3]

Array.of(3);
// [3]
```

Array.of基本上可以用来替代Array()或new Array()，并且不存在由于参数不同而导致的重载。它的行为非常统一。

```js
Array.of();
// []
Array.of(undefined);
// [undefined]
Array.of(1);
// [1]
Array.of(1, 2);
// [1, 2]
```

Array.of方法可以用下面的代码模拟实现。
```js
const ArrayOf = function () {
  return [].slice.call(arguments);
}
```

## 数组实例的copyWithin()

> 从数组的 start 位置 到 end 位置 复制， 插入到 数组的 target 位置 , 从target 位置开始替换复制的个数, 并保持数组的长度不变

```js
Array.prototype.copyWithin(target, start = 0, end = this.length)

[1, 2, 3, 4, 5].copyWithin(0, 3);
    // [4, 5, 3, 4, 5]

[1, 2, 3].copyWithin(0, 2);
// [ 3, 2, 3 ]

[1, 2, 3].copyWithin(0, -1);
// [ 3, 2, 3 ]


const i32a = new Int32Array([1, 2, 3, 4, 5]);
i32a.copyWithin(0, 2);
// Int32Array [ 3, 4, 5, 4, 5 ]

[1, 2, 3, 4, 5].copyWithin(0, 2);
// [ 3, 4, 5, 4, 5 ]
```

可用于类数组对象(array-like object)
```js
// 索引为 3 的属性值 复制到 索引为 0 的位置
[].copyWithin.call({ length: 5, 3: 1 }, 0, 3);
// { '0': 1, '3': 1, length: 5 }
```

## 数组实例的find()和findIndex()

### find
> 找到数组中第一个满足条件的值，返回该值， 找不到返回 undefined

```js
[1, 0, -1].find(n => n > 5)
// undefined

[1, 2, 3, 0].find((v, i, arr) => !v)
// 0
```

### findIndex
> 找到数组中第一个满足条件的值，返回该值的索引， 找不到返回 -1

```js
[1, 2, 3, 0].findIndex((v, i, arr) => typeof v === 'string')
// -1

[1, 2, 3, 0].findIndex((v, i, arr) => !v)
// 3
```

find()和findIndex(), 第二个参数，用来绑定回调函数中的 this(适用普通函数)

```js
['鸭梨', '黄瓜'].find(function (v) {
  return v === this.eat;
}, { eat: '黄瓜' });
// '黄瓜'    

['鸭梨', '黄瓜'].find(v => v === this.eat, { eat: '黄瓜' });
// undefined
```

查找 NaN

```js
[NaN].indexOf(NaN);
// -1

// 借助 Object.is
[NaN].findIndex(n => Object.is(NaN, n));
// 0

[NaN].find(n => Object.is(NaN, n));
// NaN
```

## 数组实例的fill()

> 用给定值，填充数组

```js
[1, 3, 3].fill(6);
// [ 6, 6, 6 ]

new Array(3).fill(6);
// [ 6, 6, 6 ]
```

第二， 第三个参数, 填充的起始位置start  结束位置 end

```js
[6, 7, 8, 9].fill(6, 1, 3);
// [ 6, 6, 6, 9 ]
```

## 数组实例的entries()，keys()和values()

> entries()，keys()和values()， 均返回迭代器, keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。只能通过 for of 遍历

```js
for (let key of [1, 2, 3].keys()) {
  console.log(key);
}
// 0
// 1
// 2

for (let value of [1, 2, 3].values()) {
  console.log(value);
}
// 1
// 2
// 3

for (let [key, value] of [1, 2, 3].entries()) {
  console.log(key, value);
}
// 0 1
// 1 2
// 2 3
```

如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历

```js
let entries = [1, 2, 3].entries();
console.log(entries.next().value); // [ 0, 1 ]
console.log(entries.next().value); // [ 1, 2 ]
console.log(entries.next().value); // [ 2, 3 ]
```

## 数组实例的includes()
> Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。该方法属于ES7，但Babel转码器已经支持。

```js
[1, 2, 3].includes(2); // true
[1, 2, 3].includes(4); // false
[1, 2, NaN].includes(NaN); // true
```

第二个参数， 表示开始搜索的位置

```js
[1, 2, 3].includes(3, 3); // false
[1, 2, 3].includes(3, -1); // true
[1, 2, 3].includes(3, -4); // true, 此时开始索引为 0
```

没有该方法之前，我们通常使用数组的indexOf方法，检查是否包含某个值

```js
[1, 2, 3].indexOf(3) !== -1; // true

// 使用indexOf 的缺点， 一是不够语义化， 二是对 NaN 的误判
[NaN].indexOf(NaN); // -1

[NaN].includes(NaN); // true
```

可以用下面的代码模拟实现
```js
const contains = (
  () => Array.prototype.includes ?
    (arr, value) => arr.includes(value) :
    (arr, value) => arr.some(el => el === value)
)();
```

## 数组空位

空位不是undefined，一个位置的值等于undefined，依然是有值的。空位是没有任何值，in 运算符可以说明这一点。

```js
const arr1 = Array.from({ length: 3 });
console.log(arr1);
// [ undefined, undefined, undefined ]

const arr2 = Array(3);
console.log(arr2);
// [ <3 empty items> ] 即 [,,,]

0 in arr1; // true 0 索引有值
0 in arr2; // false 0 索引没有值
```

ES5 对数组空位的处理不一致， 大多情况会忽略空位

* forEach(), filter(), every() 和some()都会跳过空位。
* map()会跳过空位，但会保留这个值
* join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。

```js
[, 'a'].forEach((x, i) => console.log(i));
// 1 跳过 0 空位

[1, , 2].filter(x => true);
// [1, 2] 跳过空位

[, 1, 2].every(x => x > 0);
// true 跳过空位

[, 1, 1].some(x => x !== 1);
// false 跳过空位

[, 1].map(x => 2);
// [ <1 empty item>, 2 ] 跳过空位，但保留空位

[, 'a', undefined, null].join('#');
// '#a##' 将空位视为 undefined， 而 undefined 和 null 会被处理为 空字符串

[, 'a', undefined, null].toString();
// ',a,,' 将空位视为 undefined， 而 undefined 和 null 会被处理为 空字符串
```

ES6 的数组扩展， 将数组空位统一视为 undefined

```js
Array.from([1, , 3]);
// [ 1, undefined, 3 ]

[...[1, , 3]];
// [ 1, undefined, 3 ]

//  copyWithin()会连空位一起拷贝。
[, 'a', 'b', ''].copyWithin(2);
// [ <1 empty item>, 'a', <1 empty item>, 'a' ]

// fill()会将空位视为正常的数组位置。
Array(3).fill(3);
// [ 3, 3, 3 ]

// for...of循环也会遍历空位。
for (let i of Array(3)) {
  console.log(i);
}
// undefined
// undefined
// undefined

// entries()、keys()、values()、find()和findIndex()会将空位处理成undefined。

[...[, 'a'].entries()];
// [ [ 0, undefined ], [ 1, 'a' ] ]

[...[, 'a'].keys()];
// [ 0, 1 ]

[...[, 'a'].values()];
// [undefined,"a"]

[, 'a'].find(x => true);
// undefined 返回第一个值

[, 'a'].findIndex(x => true)
// 0 返回第一个索引

// 由于空位的处理规则非常不统一，所以建议避免出现空位。
```
<Valine></Valine>
---
title: ES6 Array.from
lang: zh
meta:
  - name: description
    content: ES6 Array.from
  - name: keywords
    content: ES6 Array.from
---

# Array.from()

> Array.from 将 类数组 和 iterable 转化为 数组

**array-like to array**

  ```js
  let arrayLike = {
    0: 1, 
    1: 2,
    2: 3,
    length: 3
  }

  // es5
  var arr1 = [].slice.call(arrayLike);

  // es6
  let arr2 = Array.from(arrayLike);
  ```

实际应用中 常见的类数组有 arguments、NodeList

arguments

  ```js
  function foo() {
      let args = Array.from(arguments);
    }
  ```

NodeList

  ```js
  let ps = document.querySelectorAll('p');
  Array.from(ps).forEach(p => console.log(p));
  ```

**iterable to array**

  ```js
  console.log(Array.from('既然知道，为什么要来！'));
  // ["既", "然", "知", "道", "，", "为", "什", "么", "要", "来", "！"]
```

**... 运算符也可以 将某些数据结构转化为数组**

  ```js
  function foo() {
    let args = [...arguments];
    console.log(args);
  }

  foo(1, 2, 3);
  // [1, 2, 3]

  console.log([...document.querySelectorAll('p')]);
  // [p#p1, p#p2, p#p3]
  ```

**扩展运算符背后调用的是遍历器接口（Symbol.iterator）， 没有这个接口的对象无法转化**

  ```js
  // console.log(...{0: 1, 1: 2, length: 2}) 
  // 报错

  console.log(Array.from({length: 3}))
  // [undefined, undefined, undefined]
  ```

**兼容 Array.from**

  ```js
  const toArray = (obj) => Array.from ? Array.from(obj) : [].slice.call(obj);
  console.log(toArray({0: 1, 1: 2, length: 2}));
  // [1, 2]
  ```

**Array.from 与 Array.prototype.map 的千丝万缕**

  ```js
  // Array.from 第二个参数
  Array.from(arrayLike, x => x * x);
  // 等同于
  Array.from(arrayLike).map(x => x * x);
  ```

  * 例子1
    ```js
    // 提取一组 dom 节点的文本内容
    let spans = document.querySelectorAll('span.name');
    
    let names1 = Array.prototype.map.call(spans, s => s.textContent);
    console.log(names1);

    let names2 = Array.from(spans, s => s.textContent);
    console.log(names2);
    ```

  * 例子2
    ```js
    console.log(Array.from([1, false, null, undefined], n => n || 0));
    //  [1, 0, 0, 0]
    ```

  * 例子3

    ```js
    const typesOf = function() {
      return Array.from(arguments, v => typeof v);
    }

    console.log(typesOf(null, function() {}, undefined));
    // ["object", "function", "undefined"]
    ```


  * 例子4
    ```js
    console.log(Array.from({length: 2}, () => 'from'));
    // ["from", "from"]
    ```


**Array.from 的第三个参数,  map 函数 为非箭头函数的情况， 第三个参数用于绑定 map 函数中的 this**

  ```js
  console.log(Array.from([1, false, null, undefined], function(n) {
    return n || this.default;
  }, {default: 'from'}));
  // [1, "from", "from", "from"]
  ```

**Array.from()的另一个应用是，将字符串转为数组，然后返回字符串的长度。因为它能正确处理各种Unicode字符，可以避免JavaScript将大于\uFFFF的Unicode字符，算作两个字符的bug。**

  ```js
  const countSymbols = string => Array.from(string).length;
  ```

**[本文借鉴](http://caibaojian.com/es6/array.html "es6")**  


<Valine></Valine>

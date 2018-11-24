---
title: ES6 之 let const
lang: zh
meta:
  - name: description
    content: ES6 之 let const
  - name: keywords
    content: ES6 之 let const
---

# ES6 之 let const

## 通过 `var` 声明的变量特点

> 在 **ES6** 以前， **ECMAScript** 变量只能通过 `var` 声明， 特点是： 没有块级作用域， 变量可以重复声明， 变量提升等

### `var` 声明变量
* 没有块级作用域

  ```js
  // 没有块级作用域

  var btns = document.getElementsByTagName('button');
  for (var i = 0; i < btns.length; i++) {
    btns[i].onclick = function() {alert(i)}; // 事件触发时， i 的值均是循环后的值
  }

  // 通过闭包解决块级作用域的问题

  for (var i = 0; i < btns.length; i++) {
    (function(i) {
      btns[i].onclick = function() {alert(i)}; 
    })(i);
  }
  ```

* 变量可以重复声明， 一些重要的变量容易被覆盖， 导致一些奇奇怪怪的问题

  ```js
  var name = 'zhb33';
  var name = '帅锅';
  ```

* 变量提升
  > 作用域范围内，变量的声明默认都是在作用域的顶部，阅读下面的例子有助于理解

  ```js
  var lover = 'Not yet!';

  function when_are_you_now() {
    console.log(lover);

    var lover = '众里寻他千百度，蓦然回首，那人却在灯火阑珊处';
  }

  when_are_you_now(); // 控制台将打印的值为 undefined
  ```

  上面的代码其实，可以下的代码作用是一致的

  ```js
  var lover = 'Not yet!';

  function when_are_you_now() {
    var lover;
    console.log(lover);

    lover = '众里寻他千百度，蓦然回首，那人却在灯火阑珊处';
  }

  when_are_you_now(); // 控制台将打印的值为 undefined
  ```

  希望通过上面的解释，对理解变量提升有所帮助  

## 通过 `let` 声明的变量， 以及通过 `const` 声明的常量

* 块级作用域

  温故一下 `var` 没有块级作用域带来的麻烦（虽然可以用立即调用函数解决）
  ```js
  const funs = [];
  
  for (var i = 0; i < 10; i++) {
    funs.push(function() {
      console.log(`${i} 只绵羊`);
    });
  }

  funs.forEach(function(item) {item()}); // 打印 10 次 10只绵羊 睡不着啊！
  ```

  体验一下块级作用域的好处吧！

  ```js
  const funs = [];
  
  for (let i = 0; i < 1000; i++) { // 注意， 这里用了 let
    funs.push(function() {
      console.log(`${i} 只绵羊`);
    });
  }

  funs.forEach(function(item) {item()}); // 打印了 0 - 999只绵羊， 虽然还是睡不着
  ```
* `let`, `const` 不能重复声明

  ```js
  let name = 'zhb33';
  let name = '俊男'; // 报错

  const sex = 'man';
  const sex = '人妖'; // 报错
  ```

* `const` 不能重新赋值

  ```js
  const LIVING = '贫穷';
  LIVING = '咸鱼翻身'; // 报错
  ```

* 暂时性死区 (TDZ)
  > 通过 `let` 声明的变量， 以及通过 `const` 声明的常量， 会被暂时关进一个小黑盒里，只有运行到声明的位置时，才从小黑盒中放出来， 因此就不存在变量提升问题， 而且通过 `let` 声明的变量， 以及通过 `const` 声明的常量， 并不属于 `window` 对象

  * 通过 `let` 声明的变量， 以及通过 `const` 声明的常量， 不存在变量提升

    ```js
    function find_a_girlfriend() {
      console.log(girl);
      const girl = '肤白貌美大长腿';
    }

    find_a_girlfriend(); // 毫无疑问，会报错，因为访问的 girl 不存在的
    ```

  * 通过 `let` 声明的变量， 以及通过 `const` 声明的常量， 并不属于 `window`

    ```js
    let a = 1;
    const b = 2;
    var c = 3;
    console.log(window.a); // undefined
    console.log(window.b); // undefined
    console.log(window.c); // 3
    ```
<Valine></Valine>
---
title: ES6 函数增强
lang: zh
meta:
  - name: description
    content: ES6 函数增强
  - name: keywords
    content: ES6 函数增强
---

# ES6 函数增强

* 箭头函数
> 箭头函数语法简洁， `this` 指向明确， 利于代码封装，但不意味着，**箭头函数** 可以完全替代 **普通函数**， 例如： `Vue`, `Jquery` 中的使用箭头函数会导致很多问题， **箭头函数** 有很多场景还是不适用的，具体的请大家自行脑补了

  * 基本使用


    ```js
    (arg1, arg2, ...args) => {
      // todo
    }
    ```  
  
  * 只有一个参数, 可省去括号， 函数体只有一个表达式，可以省去花括号
    ```js
      const data = [{name: '丁珰'}, {name: '石中玉'}, {name: '阿绣'}, {name: '石破天'}];

      const names = data.map(item => item.name);

      console.log(names);
    ```
  
  * 函数体是一个 `JSON` 对象， 需要括号包裹
    ```js
    const obj = () => ({hehe: '单身狗'});
    ```
  
  * 箭头函数的执行上下文

    > 需要明确一点， 箭头函数没有普通函数的 `this`, `arguments` ，  它的 this 和 arguments 继承父函数


    * 普通函数中的 `this`
      ```js
      var wife = '娇妻';

      function home() {
        return function() {
          console.log(this.wife);
          console.log(arguments);
        };
      }

      const myWife = home.call({wife: '天上掉下个林妹妹'}, '林黛玉');

      myWife(); // 娇妻 \n {}
      ```

    * 箭头函数中的 `this` 的理解
      
      ```js
      var wife = '娇妻';

      function home() {

        // 牢记 箭头函数本身没有 this 和 arguments, 它的 this 和 arguments 继承父函数
        return () => {
          console.log(this.wife);
          console.log(arguments);
        };
      }

      const myWife = home.call({wife: '天上掉下个林妹妹'}, '林黛玉');

      myWife(); // 天上掉下个林妹妹 \n {0: '林黛玉'}
      ```

      箭头函数中的 `this`， 继承父级上下文

      ```js
      // ES6
      const es6 = {
        man: '猛男',
        girl_love_man() {
          setTimeout(() => {
            console.log('girl love :', this.man);
          }, 1000);
        }
      };

      es6.girl_love_man();
      

      // ES5
      var es5 = {
        man: '小白脸，娘娘腔',
        girl_love_man: function() {
          const self = this;
          setTimeout(function() {
            console.log('girl love :', self.man);
          }, 1000);
        }
      };

      es5.girl_love_man();
      ```
    
    * 箭头函数本身没有 `this`, 因此 `call`, `apply`, `bind` , 对箭头函数无效

      箭头函数  
      ```js
      let diaoXiong = {
        master: '杨过',
        fly() {
          return () => console.log(`${this.master} 问： 雕兄， 你要飞去哪里？`);
        }
      };

      const fly = diaoXiong.fly();
      fly.call({master: '黄药师'}); // 杨过 问： 雕兄， 你要飞去哪里？ 
      ```  
      普通函数  

      ```js
      var diaoXiong = {
        master: '杨过',
        fly: function() {
          return function() {
            console.log(`${this.master} 问： 雕兄， 你要飞去哪里？`)
          };
        }
      };

      var fly = diaoXiong.fly();
      fly.call({master: '黄药师'}); // 黄药师 问： 雕兄， 你要飞去哪里？
      ```


* 默认参数

  * **ES5** 默认参数

    ```js
    var tyre = function(boyFirend) {
      boyFirend = boyFirend || '备胎'
    }
    ```
  * **ES6** 默认参数
    ```js
      let tyre = function(boyFirend='备胎') {};
    ```

* 剩余参数

  ```js
  let saveTeacher = function(teacher, ...rest) {
    console.log(teacher);
    console.log(`其他老师： ${rest.join()}`);
  }

  saveTeacher('数学老师', '波多老师', '小野寺老师');
  ```

* 参数展开

  ```js
  let hero = function(shuihu, xiyouji) {
    console.log(`水浒： ${shuihu}; 西游记： ${xiyouji}`);
  }

  hero(...['武松', '周星驰']);
  ```

* 解构参数

  ```js
  let girls = function({shuihu, xiyouji}) {
    console.log(`水浒： ${shuihu}; 西游记： ${xiyouji}`);
  }

  girls({xiyouji: '紫霞仙子', shuihu: '孙二娘'})
  ```
<Valine></Valine>
---
title: ES6 解构赋值
lang: zh
meta:
  - name: description
    content: ES6 解构赋值
  - name: keywords
    content: ES6 解构赋值
---

# ES6 解构赋值
> 解构赋值分为两大类， 解构数组和解构`JSON`

* 解构数组

  ```js
  let [sex, like, type] = ['女', '性感动人', '卡哇伊'];
  ```

  更深粒度的解构

  ```js
  let [
        {
          character: {xuemei, ghost}
        },
        {
          without: {foot: jiao, chest: xiong}
        }
      ] = [
        {
          character: {
            xuemei: '小学妹',
            ghost: '鬼'
          }
        },
        {
          without: {
            foot: '脚',
            chest: '胸'
          }
        }
      ];
  
  console.log(`
    某女校闹鬼， 有天被${xuemei}遇上了。
    ${ghost}说：${xuemei}。。。你看。。。我没有${jiao}。。。我没有${jiao}。。。
    ${xuemei}：那有什么。学姐你看，我没有${xiong}，我没有${xiong}。。。
  `);
  ```

* 解构 `JSON`

  ```js
  let {girl, boy} = {girl: '貌美如花', boy: '衰锅锅'};
  ```
  
<Valine></Valine>
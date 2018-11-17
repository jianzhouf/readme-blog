---
title: 使用 vuepress 搭建静态博客
lang: zh
meta:
  - name: description
    content: 使用 vuepress 搭建
  - name: keywords
    content: vuepress 静态博客
---
# 使用`vuepress`搭建静态博客

> vuepress 是 Vue 驱动的静态站点生成工具  

**本文仅介绍，搭建静态博客的过程，具体教程及文档请点击进入 [vuepress中文网](https://www.vuepress.cn/ "vuepress")**

## vuepress初始化

```sh
# 将 github 新创建的仓库克隆到本地
git clone git@github.com:zhb333/readme-blog.git

# 进入项目
cd readme-blog

# npm 初始化, 按照提示回车
npm init

# 安装 vuepress
npm i vuepress -D

# 安装 gh-pages
npm i gh-pages -D

# 创建一个 docs 目录
mkdir docs

# 创建一个 markdown 文件
echo '# Hello VuePress' > docs/README.md
```

然后，给 `package.json` 添加一些 `scripts` 脚本：

```json
{
  "scripts": {
    "dev": "vuepress dev docs",
    "build": "vuepress build docs",
    "deploy": "npm run build && gh-pages -d docs/.vuepress/dist"
  }
}
```

运行 `vurepress` 的本地开发环境
```sh
npm run dev
```

访问 `localhost:8080` ， 已经成功开启

## 基础配置

执行下面的命令，生成静态资源 

```sh
npm run build
```
默认情况下，构建的文件会位于 **docs/.vuepress/dist** 中，该文件可以通过 **docs/.vuepress/config.js** 中的 `dest` 字段进行配置。


创建 **docs/.vuepress/config.js**， 并进行简单配置

```js
var config = {

  // 静态网站部署的目录
  base: '/readme-blog/',

  // 网站标题
  title: '标 の 博客',

  // <meta name="description" content="...">
  description: '种一棵树最好的时间是十年前，其次是现在', 

  markdown: {
    
    // 显示代码行号
    lineNumbers: true
  }
}

module.exports = config
```


## 博客首页

创建 **docs/.vuepress/public** 用于存放公共文件

我在 **public/** , 存在了 **favicon.ico** 图标， 以及 **zlx.jpg** 首页的头像图片


将 **docs/README.md**设置为首页， 修改代码为：

```md
---
home: true
heroImage: /zlx.jpg
footer: MIT Licensed | Copyright © 2018 ZhangHuanbiao
---
```

配置网站的 **ico** 图标， 修改 **.vuepress/config.js**：

```js{2,3,4}
const config = {
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ]
}
```


## 导航栏

使用 **vuepress** 的默认主题配置导航栏 **.vuepress/config.js**：

```js{21}
const nav = [
  {
    text: '前端栈',
    items: [
      { text: 'Vue', link: '/WEB/Vue/vuepress-blog' },
      { text: 'React', link: '/WEB/React/react-router' }
    ]
  }
]

const config = {
  themeConfig: {

    // 项目的 github 地址
    repo: 'zhb333/readme-blog',

    // github 地址的链接名
    repoLabel: '代码',

    // 配置导航栏
    nav,
  },
}
```

为了使得导航栏的链接点击有效， 我们创建两个文件：

**docs/WEB/Vue/vuepress-blog.md**

```md
# 使用`vuepress`搭建静态博客

## vuepress初始化

## 基础配置

## 博客首页

## 导航栏
```


**docs/WEB/React/react-router.md**

```md
# react-router
```


## 侧边栏

使用 **vuepress** 的默认主题配置侧边栏 **.vuepress/config.js**：

```js{23,24,39}
const sidebar = {
  '/WEB/': [
    {
      title: 'Vue',
      children: [
        'Vue/vuepress-blog'
      ]
    },

    {
      title: 'React',
      children: [
        'React/react-router'
      ]
    }
  ]
}

const nav = [
  {
    text: '前端栈',
    items: [
      { text: 'Vue', link: '/WEB/' + sidebar['/WEB/'][0]['children'][0] },
      { text: 'React', link: '/WEB/' + sidebar['/WEB/'][1]['children'][0] }
    ]
  }
]

var config = {
  themeConfig: {

    // 当前 markdown 的 github 代码链接
    editLinks: true,

    // 链接显示的文本
    editLinkText: '查看原文|编辑此页',

    nav,
    sidebar,
  },
}
```

访问： **http://localhost:8080/readme-blog/WEB/Vue/vuepress-blog.html**， 可以看到侧边栏已经生成

## 将静态博客网站部署到 **xxx.github.io/readme-blog/**

使用 **gh-pages** 进行项目部署

```sh
npm run deploy
```

过几分钟后，访问 **https://zhb333.github.io/readme-blog/**， 便可以看到在外网成功部署的静态博客

## 评论功能

未完待续...
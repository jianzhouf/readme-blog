module.exports = {
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  base: '/readme-blog/',
  title: '标 の 博客',
  description: '种一棵树最好的时间是十年前，其次是现在',
  themeConfig: {
    repo: 'zhb333/readme-blog',

    nav: [
      {
        text: '前端栈',
        items: [
          { text: 'Vue', link: '/WEB/Vue/' },
          { text: 'React', link: '/WEB/React/' },
          { text: 'ESMAscript', link: '/WEB/ESMAscript/' },
          { text: 'HTML5', link: '/WEB/HTML5/' },
          { text: 'CSS3', link: '/WEB/CSS3/' },
          { text: 'Webpack', link: '/WEB/Webpack/' }
        ]
      },
      {
        text: 'Python',
        items: [
          { text: 'Python', link: '/Python/Python/' },
          { text: 'Django', link: '/Python/Django/' },
          { text: 'Flask', link: '/Python/Flask/' }
        ]
      },
      {
        text: '杂谈',
        items: [
          { text: '技术相关', items: [
            {text: 'Git', link: '/other/skill/Git/'}
          ] },
          { text: '生活相关', link: '/other/life/' },
        ]
      }
    ]
  }
}
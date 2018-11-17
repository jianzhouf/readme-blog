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
  },
  {
    text: 'Python',
    link: '/'
  },
  {
    text: '杂谈',
    link: '/'
  }
]

var config = {
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  base: '/readme-blog/',
  title: '标 の 博客',
  description: '种一棵树最好的时间是十年前，其次是现在',
  themeConfig: {
    repo: 'zhb333/readme-blog',
    repoLabel: '代码',
    nav,
    sidebar,
  }
}

module.exports = config

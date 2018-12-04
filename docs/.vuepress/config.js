const sidebar = {
  '/WEB/': [
    {
      title: 'ES6',
      children: [
        'ES6/array',
      ]
    },

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
  ],

  '/Python/': [
    {
      title: 'Python杂谈',
      children: [
        'Python/virtualenv-win',
        'Python/pycharm2018'
      ]
    },
    {
      title: 'Django',
      children: [
        'Django/urls'
      ]
    }
  ],

  '/Database/': [
    {
      title: 'MySQL',
      children: [
        'MySQL/mysql5.7_install'
      ]
    }
  ]
}

const nav = [
  {
    text: '前端栈',
    items: [
      { text: 'ES6', link: '/WEB/' + sidebar['/WEB/'][0]['children'][0] },
      { text: 'Vue', link: '/WEB/' + sidebar['/WEB/'][1]['children'][0] },
      { text: 'React', link: '/WEB/' + sidebar['/WEB/'][2]['children'][0] }
    ]
  },
  {
    text: 'Python',
    items: [
      { text: 'Python杂谈', link: '/Python/' + sidebar['/Python/'][0]['children'][0] },
      { text: 'Django', link: '/Python/' + sidebar['/Python/'][1]['children'][0] }
    ]
  },
  {
    text: '数据库',
    items: [
      { text: 'MySQL', link: '/Database/' + sidebar['/Database/'][0]['children'][0] }
    ]
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
    editLinks: true,
    editLinkText: '查看原文|编辑此页',
    nav,
    sidebar,
  },
  markdown: {
    lineNumbers: true
  }
}

module.exports = config

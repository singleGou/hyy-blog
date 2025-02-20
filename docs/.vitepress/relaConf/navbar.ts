import { DefaultTheme } from 'vitepress'
export const nav: DefaultTheme.NavItem[] = [
  {
    text: '首页',
    link: '/',
  },
  {
    text: '前端开发',
    items: [
      {
        text: 'CSS',
        link: '/column/CSS/',
      },
      {
        text: 'JavaScript',
        link: '/column/JavaScript/',
      },
      {
        text: 'TypeScript',
        link: '/column/TypeScript/',
      },
      {
        text: 'Git',
        link: '/column/Git/',
      },
      {
        text: 'uni-app',
        link: '/column/uni-app/',
      },
    ],
  },
  {
    text: '算法',
    link: '/column/Algorithm/',
  },
  {
    text: 'AI',
    items: [
      {
        text: 'Cursor',
        link: '/column/Cursor/',
      },
    ],
  },
  {
    text: 'Work',
    items: [
      {
        text: 'Security',
        link: '/column/Work/securityb.md',
      },
    ],
  },
  {
    text: '个人成长',
    items: [
      {
        text: '思考',
        link: '/column/Thought/',
      },
      {
        text: '摄影',
        link: '/column/Photos/',
      },
    ],
  },
  {
    text: '关于',
    items: [
      {
        text: 'Github',
        link: 'https://github.com',
      },
      {
        text: '掘金',
        link: 'https://juejin.cn',
      },
    ],
  },
]

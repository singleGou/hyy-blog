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
        text: 'NodeJS',
        link: '/column/NodeJS/',
      },
    ],
  },
  {
    text: '必备技能',
    items: [
      {
        text: 'Git',
        link: '/column/Git/',
      },
    ],
  },
  {
    text: 'Work',
    items: [
      {
        text: 'Ant-Design-Vue',
        link: '/column/Work/ant-design-vue-admin.md',
      },
    ],
  },
  {
    text: '关于',
    items: [
      {
        text: 'Github',
        link: 'https://github.com/singleGou',
      },
      {
        text: '掘金',
        link: 'https://juejin.cn/user/3681619519481069',
      },
    ],
  },
]

import { DefaultTheme } from 'vitepress'
export const sidebar: DefaultTheme.Sidebar = {
  '/column/CSS/': [
    {
      text: 'Flex 布局',
      link: '/column/CSS/flex',
    },
    {
      text: 'Grid 布局',
      link: '/column/CSS/grid',
    },
  ],
  '/column/TypeScript/': [
    {
      text: '类型系统',
      link: '/column/TypeScript/01-类型系统.md',
    },
    {
      text: '数组',
      link: '/column/TypeScript/02-数组.md',
    },
    {
      text: '元组',
      link: '/column/TypeScript/03-元组.md',
    },
    {
      text: 'symbol 类型',
      link: '/column/TypeScript/04-symbol类型.md',
    },
    {
      text: '函数',
      link: '/column/TypeScript/05-函数.md',
    },
    {
      text: '对象',
      link: '/column/TypeScript/06-对象.md',
    },
  ],
}

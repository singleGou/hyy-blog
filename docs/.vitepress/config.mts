import { defineConfig } from 'vitepress'
import { nav, sidebar,  } from './relaConf'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/hyy-blog',
  title: "忽如一夜的个人博客",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // logo: '/avatar.png',
    nav: nav, // 自定义的 nav

    sidebar: sidebar, // 自定义的 sidebar
    // [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   }
    // ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    search: {
      provider: 'local'
    }
  }
})

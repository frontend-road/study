import { defineUserConfig, defaultTheme } from 'vuepress'
// import { prismjsPlugin } from '@vuepress/plugin-prismjs'

export default defineUserConfig({
  base: '/study/',
  lang: 'zh-CN',
  title: 'Study',
  description: '这是我的第二个 VuePress 站点',
  // public: ''
  theme: defaultTheme({
    home: '/',
    navbar: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '极客时间',
        children: [
          {
            text: '专栏',
            link: '/geektime/column/'
          },
          {
            text: '每日一课',
            link: '/geektime/daily/'
          },
        ]
      },
    ],
    repo: 'frontend-road/study',
    // sidebar: {
    //   '/': []
    // }
  }),
  plugins: [
    // prismjsPlugin({
    //   // 配置项
    // })
  ],
  open: false,
})
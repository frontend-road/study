import { defineUserConfig, defaultTheme } from 'vuepress'
// import { prismjsPlugin } from '@vuepress/plugin-prismjs'
// import columns from './public/geektime/column/columns.json'

const base = '/study/'
export default defineUserConfig({
  base,
  lang: 'zh-CN',
  title: 'Study',
  description: '这是我的第二个 VuePress 站点',
  /**
   * 注意：这种方式在 deploy 时会报错，改为在 client.ts 中注入
   * 向客户端代码传递数据: https://v2.vuepress.vuejs.org/zh/advanced/cookbook/passing-data-to-client-code.html
   * define 定义全局常量: https://v2.vuepress.vuejs.org/zh/reference/plugin-api.html#define
   */
  // define: {
  //   base,
  //   geektime: {
  //     columns,
  //   },
  // },
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
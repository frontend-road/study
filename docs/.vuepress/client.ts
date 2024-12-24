import { provide, onMounted } from 'vue'
import { defineClientConfig, withBase } from 'vuepress/client'
import columns from './public/geektime/column/columns.json'

// https://vuepress.vuejs.org/zh/advanced/cookbook/usage-of-client-config.html
export default defineClientConfig({
  // enhance({ app, router, siteData }) {
  //   // console.log('client:', app, router, siteData)
  //   app.mixin({
  //     computed: {
  //       columns: function() {
  //         return columns
  //       },
  //     }
  //   })
  // },
  setup() {
    provide('geektime_columns', columns)
    onMounted(() => {
      // import('./public/font/iconfont/iconfont.js').then(icon => {
      //   console.log('client setup onMounted: iconfont', icon)
      // })
      const head = document.getElementsByTagName('head')[0]
      const link = document.createElement('link')
      link.setAttribute('rel', 'stylesheet')
      link.setAttribute('type', 'text/css')
      link.setAttribute('href', withBase('/fonts/iconfont/iconfont.css'))
      head.appendChild(link)
    })
  },
  rootComponents: [],
})
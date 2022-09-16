import { provide } from 'vue'
import { defineClientConfig } from '@vuepress/client'
import columns from './public/geektime/column/columns.json'

// https://v2.vuepress.vuejs.org/zh/advanced/cookbook/usage-of-client-config.html
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
  },
  rootComponents: [],
})
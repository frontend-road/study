<p>column: {{columnName}} ({{column_id}})</p>

<ul>
  <li v-for="article in articles">
    <a :href="`article?column_id=${column_id}&article_id=${article.id}`">{{article.t}}</a>
  </li>
</ul>

<script setup>
import { inject, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const { column_id } = route.query

// const articles = geektime.columns.find(column => column.id === +column_id).l
const columns = inject('geektime_columns')
// console.log('list columns:', columns)

onMounted(() => {
  const column = columns.find(item => item.id === +column_id)
  // console.log('list column:', column)
  const columnName = column ? column.n : ''
  const articles = column ? (column.l || []) : []
  // console.log('list articles:', articles)
  document.title = columnName
})
</script>

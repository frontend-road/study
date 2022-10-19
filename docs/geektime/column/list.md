<p>column: {{columnName}} ({{column_id}})</p>

<ul>
  <li v-for="article in articles">
    <a :href="`article?column_id=${column_id}&article_id=${article.id}`">{{article.t}}</a>
  </li>
</ul>

<script setup>
import { ref, inject, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const columns = inject('geektime_columns')
const { column_id } = route.query
const articles = ref([])

onMounted(() => {
  const column = columns.find(item => item.id === +column_id)
  const columnName = column ? column.n : ''
  articles.value = column ? (column.l || []) : []
  document.title = columnName
})
</script>

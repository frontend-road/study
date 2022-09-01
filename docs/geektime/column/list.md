<p>column_id: {{column_id}}</p>

<ul>
  <li v-for="item in articles">
    <a :href="`article?column_id=${column_id}&article_id=${item.article_id}`">{{item.article_title}}</a>
  </li>
</ul>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const articles = ref([])

const { column_id } = route.query

function getArticles(column_id) {
  return new Promise((resolve, reject) => {
    const baseUrl = location.protocol + '//' + location.host
    axios({
      url: `${baseUrl}/geektime/column/list/${column_id}.json`,
      method: 'GET'
    }).then(res => {
      console.log('axios then:', res)
      const { status, data } = res
      if (status === 200) {
        resolve(data)
      } else {
        alert('axios status: ' + status)
        reject(res)
      }
    }).catch(err => {
      console.error('axios catch:', err)
      alert('catch error: ' + err.message)
      reject(err)
    })
  })
}

onMounted(async () => {
  articles.value = await getArticles(column_id)
})
</script>

<p>column_id: {{column_id}}</p>
<p>article_id: {{article_id}}</p>

<h3 v-if="loading">loading...</h3>

<h2>{{article.article_title}}</h2>
<div v-html="article.article_content"></div>
<div>
  <button @click="jump(neighborLeft.id, 'prev')">上一讲: {{neighborLeft.article_title}}</button>
  <br />
  <br />
  <button @click="jump(neighborRight.id, 'next')">下一讲: {{neighborRight.article_title}}</button>
</div>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const articles = ref([])
const article = ref({})
const neighborLeft = computed(() => {
  return article.value?.neighbors?.left || {}
})
const neighborRight = computed(() => {
  return article.value?.neighbors?.right || {}
})

// console.log(axios)
// console.log(route)

const { column_id, article_id } = route.query

function getArticles(column_id) {
  return new Promise((resolve, reject) => {
    // const baseUrl = window.location.protocol + '//' + window.location.host
    const baseUrl = '/study'
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

function getArticleById(article_id) {
  return articles.value.find(item => +item.article_id === +article_id)
}

function jump(article_id, action) {
  if (!article_id) {
    if (action === 'prev') {
      alert('已经是第一讲')
    } else if (action === 'next') {
      alert('已经是最后一讲')
    }
    return
  }

  article.value = getArticleById(article_id)

  // window.scroll({
  //   top: 0,
  //   behavior: 'smooth'
  // })
  // window.scrollTo({
  //   top: 0,
  //   behavior: 'smooth'
  // })

  router.replace({
    path: '/geektime/column/article',
    query: {
      column_id,
      article_id
    }
  })
  // window.location.href = `./article.html?column_id=${column_id}&article_id=${article_id}`
}

// async function init() {
//   articles.value = await getArticles(column_id)
//   article.value = getArticleById(article_id)
//   console.log(article.value)
// }
// init()

onMounted(async () => {
  loading.value = true
  articles.value = await getArticles(column_id)
  loading.value = false
  article.value = getArticleById(article_id)
  console.log(article.value)
})
</script>

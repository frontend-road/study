<p>column_id: {{column_id}}</p>
<p>article_id: {{article_id}}</p>

<h3 v-if="loading">loading...</h3>

<h2>{{article.title}}</h2>
<div v-html="article.content"></div>
<div>
  <button @click="jump(column_id, neighborLeft.id, 'prev')">上一讲: {{neighborLeft.article_title}}</button>
  <br />
  <br />
  <button @click="jump(column_id, neighborRight.id, 'next')">下一讲: {{neighborRight.article_title}}</button>
</div>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import hljs from 'highlight.js'
// import 'highlight.js/styles/github.css'
import 'highlight.js/styles/atom-one-dark.css'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const article = ref({})
const neighborLeft = computed(() => {
  return article.value?.neighbors?.left || {}
})
const neighborRight = computed(() => {
  return article.value?.neighbors?.right || {}
})

const { column_id, article_id } = route.query
// const baseUrl = window.location.protocol + '//' + window.location.host
const baseUrl = '/study'

function getArticle(column_id, article_id) {
  return new Promise((resolve, reject) => {
    axios({
      url: `${baseUrl}/geektime/column/list/${column_id}/${article_id}.json`,
      method: 'GET'
    }).then(res => {
      console.log('[getArticle] axios then:', res)
      const { status, data } = res
      if (status === 200) {
        resolve(data)
      } else {
        alert('[getArticle] axios status:' + status)
        reject(res)
      }
    }).catch(err => {
      console.error('[getArticle] axios catch:', err)
      alert('[getArticle] catch error:' + err.message)
      reject(err)
    })
  })
}

async function jump(column_id, article_id, action) {
  if (!article_id) {
    if (action === 'prev') {
      alert('已经是第一讲')
    } else if (action === 'next') {
      alert('已经是最后一讲')
    }
    return
  }

  article.value = await getArticle(column_id, article_id)
  nextTick(() => {
    hljs.highlightAll()
  })

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

onMounted(async () => {
  loading.value = true
  article.value = await getArticle(column_id, article_id)
  loading.value = false
  // console.log(article.value)
  nextTick(() => {
    hljs.highlightAll()
  })
})
</script>

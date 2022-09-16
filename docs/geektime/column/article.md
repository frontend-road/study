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

<div class="comments-wrap">
  <div class="index_comments">精选留言(18)</div>
  <div v-for="comment in comments" :key="comment.id" class="comment_panel">
    <img class="user_header" :src="comment.user_header" />
    <div class="comment-main">
      <div class="user_name">{{comment.user_name}}</div>
      <div class="comment_topTag" v-if="comment.comment_is_top">置顶</div>
      <div class="comment_content" v-html="comment.comment_content"></div>
      <div class="comment_replies" v-if="comment.replies && comment.replies.length">
        <div class="comment_reply_content" v-html="comment.replies[0].content"></div>
      </div>
      <div class="comment_control">
        <div class="comment_ctime">{{formatTime(comment.comment_ctime)}}</div>
        <div class="comment_actions">
          <div class="discussion_count">{{comment.discussion_count}}</div>
          <div class="like_count">{{comment.like_count}}</div>
        </div>
      </div>
    </div>
  </div>
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
const comments = computed(() => {
  return article.value?.comments || []
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

function formatTime(time) {
  const _t = new Date(time * 1000)
  const y = _t.getFullYear()
  const m = _t.getMonth() + 1
  const d = _t.getDate()
  return [
    y,
    m >= 10 ? m : '0' + m,
    d >= 10 ? d : '0' + d,
  ].join('-')
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

<style>
.comments-wrap {
  margin-top: 20px;
}
.index_comments {
  font-size: 16px;
  color: #404040;
  font-weight: 500;
  -webkit-font-smoothing: antialiased;
  position: relative;
  z-index: 1;
  margin-bottom: 1rem;
}
.comment_panel {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #e9e9e999;
  color: #adbac7;
}
.user_header {
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: #999;
}
.comment-main {
  flex-grow: 1;
  margin-left: 0.5rem;
  padding-bottom: 20px;
}
.user_name {
  font-size: 16px;
  color: #3d464d;
  font-weight: 500;
  -webkit-font-smoothing: antialiased;
  line-height: 34px;
}
.comment_topTag {
  width: 34px;
  height: 15px;
  line-height: 15px;
  overflow: hidden;
  font-size: 10px;
  color: #fff;
  background: #cbcbcb;
  text-align: center;
  display: inline-block;
  border-radius: 2px;
  vertical-align: top;
  margin-top: 10px;
  font-weight: 400;
}
.comment_content {
  margin-top: 12px;
  color: #505050;
  -webkit-font-smoothing: antialiased;
  font-size: 14px;
  font-weight: 400;
  white-space: pre-wrap;
  word-break: break-all;
  line-height: 24px;
}
.comment_replies {
  margin-top: 10px;
  border-radius: 4px;
  background-color: #f6f7fb;
}
.comment_reply_content {
  color: #505050;
  -webkit-font-smoothing: antialiased;
  font-size: 14px;
  font-weight: 400;
  white-space: pre-wrap;
  word-break: break-word;
  padding: 20px 20px 20px 24px;
}

.comment_control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
}
.comment_ctime {
  color: #b2b2b2;
  font-size: 14px;
}
.comment_actions {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #888;
}
.discussion_count {
  margin-right: 44px;
}
.discussion_count:hover, .like_count:hover {
  color: #fa8919;
  cursor: pointer;
}
</style>
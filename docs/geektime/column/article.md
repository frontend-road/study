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
  <div class="index_comments">精选留言({{comments.length}})</div>
  <div v-for="comment in comments" :key="comment.id" class="comment_panel">
    <div class="comment_main">
      <div class="avatar" :class="comment.is_pvip ? 'avatar-pvip' : ''" style="width: 30px; height: 30px;">
        <!-- TODO 图片懒加载 -->
        <!-- <img class="avatar-img" /> -->
        <img class="avatar" :src="comment.user_header" />
        <i v-if="comment.is_pvip" class="iconfont icon-vip-fill pvip-logo"></i>
      </div>
      <div class="comment_info">
        <div class="user_name">{{comment.user_name}}</div>
        <div class="comment_topTag" v-if="comment.comment_is_top">置顶</div>
        <div class="comment_content" v-html="comment.comment_content"></div>
        <div class="comment_replies" v-if="comment.replies && comment.replies.length" v-for="reply in comment.replies">
          <p class="comment_reply_content">{{reply.user_name ? reply.user_name + ': ' : ''}}<span v-html="reply.content"></span></p>
        </div>
        <div class="comment_control">
          <div>
            <div class="comment_ctime">{{formatTime(comment.comment_ctime)}}</div>
            <div class="comment_ctime" v-if="comment.ip_address">IP: {{comment.ip_address}}</div>
          </div>
          <div class="comment_actions">
            <div class="comment_btnComment" :class="comment.expand ? 'comment_btnComment_on' : ''" @click="toggleDiscussion(comment)">
              <span class="iconfont icon-message"></span>
              <span v-if="comment.expand">收起</span>
              <template v-else>
                <span v-if="comment.discussion_count > 0">{{comment.discussion_count}}</span>
              </template>
            </div>
            <div class="comment_btnPraise" :class="comment.had_liked ? 'comment_btnPraise_on' : ''">
              <span class="iconfont icon-praise"></span>
              <span v-if="comment.like_count > 0">{{comment.like_count}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="comment_nest_wrap" v-if="comment.expand">
      <div class="comment_nest_title">评论 {{comment.discussion_count}}</div>
      <div class="comment_nest_list">
        <div class="comment_nest_rootItem" v-for="item in comment.discussions" :key="item.discussion.id">
          <div class="comment_nest_commentRoot">
            <div class="avatar" :class="item.author.is_pvip ? 'avatar-pvip' : ''" style="width: 30px; height: 30px;">
              <img class="avatar" :src="item.author.avatar" />
              <i v-if="item.author.is_pvip" class="iconfont icon-vip-fill pvip-logo"></i>
            </div>
            <div class="comment_nest_info">
              <div class="comment_nest_userInfo">
                <div class="comment_nest_userInfo_userName">{{item.author.nickname}}</div>
                <div class="comment_nest_userInfo_mark" v-if="getUserType(item.author.user_type)">{{getUserType(item.author.user_type)}}</div>
              </div>
              <div class="comment_nest_discussion_content" v-html="item.discussion.discussion_content"></div>
              <div class="comment_control">
                <div>
                  <div class="comment_ctime">{{formatTime(item.discussion.ctime)}}</div>
                  <div class="comment_ctime" v-if="item.discussion.ip_address">IP: {{item.discussion.ip_address}}</div>
                </div>
                <div class="comment_actions">
                  <div class="comment_btnComment">
                    <span class="iconfont icon-message"></span>评论
                  </div>
                  <div class="comment_btnPraise" :class="item.discussion.is_liked ? 'comment_btnPraise_on' : ''">
                    <span class="iconfont icon-praise"></span>
                    <span v-if="item.discussion.likes_number > 0">{{item.discussion.likes_number}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="comment_nest_commentChildWrap" v-if="item.child_discussion_number > 0">
            <div class="comment_nest_commentChildItem" v-for="child_discussion in item.child_discussions" :key="child_discussion.discussion.id">
              <div class="avatar" :class="child_discussion.author.is_pvip ? 'avatar-pvip' : ''" style="width: 30px; height: 30px;">
                <img class="avatar" :src="child_discussion.author.avatar" />
                <i v-if="child_discussion.author.is_pvip" class="iconfont icon-vip-fill pvip-logo"></i>
              </div>
              <div class="comment_nest_info">
                <div class="comment_nest_userInfo">
                  <div class="comment_nest_userInfo_userName">{{child_discussion.author.nickname}}</div>
                  <div class="comment_nest_userInfo_mark" v-if="getUserType(child_discussion.author.user_type)">{{getUserType(child_discussion.author.user_type)}}</div>
                  <div class="comment_nest_toIcon iconfont icon-arrow-right-filling" style="margin-left: 4px; margin-right: 4px;font-size: 12px;"></div>
                  <div class="comment_nest_userInfo_userName">{{child_discussion.reply_author.nickname}}</div>
                  <div class="comment_nest_userInfo_mark" v-if="getUserType(child_discussion.reply_author.user_type)">{{getUserType(child_discussion.reply_author.user_type)}}</div>
                </div>
                <div class="comment_nest_discussion_content" v-html="child_discussion.discussion.discussion_content"></div>
                <div class="comment_control">
                  <div>
                    <div class="comment_ctime">{{formatTime(child_discussion.discussion.ctime)}}</div>
                    <div class="comment_ctime" v-if="child_discussion.discussion.ip_address">IP: {{child_discussion.discussion.ip_address}}</div>
                  </div>
                  <div class="comment_actions">
                    <div class="comment_btnComment">
                      <span class="iconfont icon-message"></span>评论
                    </div>
                    <div class="comment_btnPraise" :class="child_discussion.discussion.is_liked ? 'comment_btnPraise_on' : ''">
                      <span class="iconfont icon-praise"></span>
                      <span v-if="child_discussion.discussion.likes_number > 0">{{child_discussion.discussion.likes_number}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
  // return (article.value?.comments || []).map(item => ({ ...item, expand: false }))
  return article.value?.comments || []
})

// const { column_id, article_id } = route.query
const column_id = computed(() => route.query.column_id)
const article_id = computed(() => route.query.article_id)
// const baseUrl = window.location.protocol + '//' + window.location.host
const baseUrl = '/study'

function getArticle(column_id, article_id) {
  return new Promise((resolve, reject) => {
    loading.value = true
    axios({
      url: `${baseUrl}/geektime/column/list/${column_id}/${article_id}.json`,
      method: 'GET'
    }).then(res => {
      loading.value = false
      console.log('[getArticle] axios then:', res)
      const { status, data } = res
      if (status === 200 && data) {
        data.comments = (data.comments || []).map(item => ({ ...item, expand: false }))
        document.title = data.title
        article.value = data
        nextTick(() => hljs.highlightAll())
        resolve(data)
      } else {
        alert('[getArticle] axios status:' + status)
        reject(res)
      }
    }).catch(err => {
      loading.value = false
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

  await getArticle(column_id, article_id)

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

function getUserType(user_type) {
  const typeMap = {
    2: '作者',
    4: '编辑',
    8: '编辑',
  }
  return typeMap[user_type] || ''
}

function formatTime(time) {
  const _t = new Date(time * 1000)
  const y = _t.getFullYear()
  const M = _t.getMonth() + 1
  const d = _t.getDate()
  const h = _t.getHours()
  const m = _t.getMinutes()
  const s = _t.getSeconds()
  return [
    [
      y,
      M >= 10 ? M : '0' + M,
      d >= 10 ? d : '0' + d,
    ].join('-'),
    [
      h >= 10 ? h : '0' + h,
      m >= 10 ? m : '0' + m,
      s >= 10 ? s : '0' + s,
    ].join(':'),
  ].join(' ')
}

function toggleDiscussion(comment) {
  if (comment.discussion_count > 0) {
    comment.expand = !comment.expand
  }
}

onMounted(() => {
  getArticle(column_id.value, article_id.value)
})
</script>

<style>
video {
  max-width: 100%;
}
pre {
  padding: 0!important;
}
pre code {
  font-size: 14px!important;
}
.hljs{
  color: #abb2bf!important;
  background: #282c34!important;
}

.comments-wrap {
  margin-top: 20px;
}
.index_comments {
  font-size: 16px;
  /* color: #404040; */
  color: var(--c-text);
  font-weight: 500;
  -webkit-font-smoothing: antialiased;
  position: relative;
  z-index: 1;
  margin-bottom: 1rem;
}
.comment_panel {
  margin-bottom: 20px;
  border-bottom: 1px solid #e9e9e999;
  color: #adbac7;
}
.comment_main {
  display: flex;
}
.avatar {
  position: relative;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: #999;
}
.avatar.avatar-pvip {
  padding: 2px;
  border: 0.5px solid #fdd397;
}
.avatar-img {
  display: block;
  -o-object-fit: contain;
  object-fit: contain;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.pvip-logo {
  position: absolute;
  right: -1px;
  bottom: 0;
  width: 13px;
  height: 13px;
  color: #fdd397;
}
.comment_info {
  flex-grow: 1;
  margin-left: 0.5rem;
  padding-bottom: 20px;
}
.user_name {
  font-size: 16px;
  font-weight: 500;
  /* color: #3d464d; */
  color: var(--c-text);
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
  /* color: #505050; */
  color: var(--c-text-lighter);
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
  /* background-color: #f6f7fb; */
  background-color: var(--c-details-bg);
}
.comment_reply_content {
  /* color: #505050; */
  color: var(--c-text-lighter);
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
  margin-right: 10px;
  font-size: 12px;
  color: #b2b2b2;
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
.discussion_count,
.like_count {
  display: flex;
  align-items: center;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.discussion_count:hover,
.like_count:hover {
  color: #fa8919;
}

.comment_nest_wrap {
  padding-bottom: 38px;
  border-radius: 4px;
  box-shadow: 0 0 8px 1px rgb(140 163 191 / 18%);
}
.comment_nest_title {
  padding: 10px 0 10px 28px;
  border-bottom: 1px solid #e9e9e9;
  font-size: 14px;
  font-weight: 400;
  /* color: #353535; */
  color: var(--c-text-lighter);
}
.comment_nest_list {
  padding: 0 28px;
}
.comment_nest_rootItem {
  width: 100%;
  margin-top: 20px;
  border-bottom: 1px solid #e9e9e9;
}
.comment_nest_commentRoot {
  display: flex;
}
.comment_nest_info {
  flex-grow: 1;
  margin-left: 0.5rem;
  padding-bottom: 14px;
}
.comment_nest_userInfo {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.comment_nest_userInfo_userName {
  display: flex;
  align-items: center;
  line-height: 34px;
  font-size: 16px;
  font-weight: 500;
  color: rgb(178, 178, 178);
}
.comment_nest_userInfo_mark {
  width: 34px;
  height: 18px;
  margin-left: 4px;
  line-height: 18px;
  border-radius: 9px;
  font-size: 11px;
  font-weight: 500;
  text-align: center;
  color: #fa8919;
  background: #fbf5ee;
}
.comment_nest_discussion_content {
  margin-top: 10px;
  line-height: 24px;
  -webkit-font-smoothing: antialiased;
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 14px;
  font-weight: 400;
  /* color: #505050; */
  color: var(--c-text-lighter);
}

.comment_actions {
  display: flex;
  align-items: center;
}
.comment_btnComment,
.comment_btnPraise {
  margin-left: 20px;
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-size: 12px;
  font-weight: 400;
  color: #888;
}
.comment_btnComment.comment_btnComment_on,
.comment_btnPraise.comment_btnPraise_on {
  color: #fa8919;
}
.comment_btnComment:hover,
.comment_btnPraise:hover {
  color: #fa8919;
}

.comment_nest_commentChildWrap {
  margin-left: 40px;
}
.comment_nest_commentChildItem {
  display: flex;
  padding-top: 20px;
  border-top: 1px solid #e9e9e9;
  transition: border-top .3s ease;
}
</style>

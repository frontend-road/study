<h1>{{courseName}}</h1>
<div>{{authorName}}</div>
<ul>
  <li v-for="article in articles">
    <a :href="`article.html?type=${type}&course_id=${course_id}&article_id=${article.id}`">{{article.t}}</a>
  </li>
</ul>

<script setup>
import { ref, inject, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const columns = inject('geektime_columns')
const videoCourses = inject('geektime_videoCourses')

const route = useRoute()
const { type, course_id } = route.query

const courseName = ref('')
const authorName = ref('')
const articles = ref([])

onMounted(() => {
  const courses = type === 'video' ? videoCourses : type === 'column' ? columns : []
  const course = courses.find(item => item.id === +course_id)
  if (course) {
    courseName.value = course.n || ''
    authorName.value = course.a || ''
    articles.value = course.l || []
    document.title = courseName.value
  }
})
</script>

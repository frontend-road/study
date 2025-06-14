# 体系课程

## 图文课程

共{{columns.length}}个

<input v-model="searchName" @input="handleSearch" />

<ul>
  <li v-for="(item, index) in columns">
    <a class="column-name" :href="`detail.html?type=column&course_id=${item.id}`">{{index + 1}}. {{item.n}}</a>
    <span v-if="item.f" class="column-status column-has-finish">已完结：共{{item.c}}讲</span>
    <span v-else class="column-status column-not-finish">未完结：共{{item.c}}讲，已发布{{item.p}}讲</span>
  </li>
</ul>

## 视频课程

共{{videoCourses.length}}个

<input v-model="searchVideoName" @input="handleSearchVideo" />

<ul>
  <li v-for="(item, index) in videoCourses">
    <a class="column-name" :href="`detail.html?type=video&course_id=${item.id}`">{{index + 1}}. {{item.n}}</a>
    <span v-if="item.f" class="column-status column-has-finish">已完结：共{{item.c}}讲</span>
    <span v-else class="column-status column-not-finish">未完结：共{{item.c}}讲，已发布{{item.p}}讲</span>
  </li>
</ul>

<script setup>
import { inject, ref } from 'vue'

const geektimeColumns = inject('geektime_columns')
const geektimeVideoCourses = inject('geektime_videoCourses')

const columns = ref(geektimeColumns)
const videoCourses = ref(geektimeVideoCourses)
const searchName = ref('')
const searchVideoName = ref('')

function handleSearch(evt) {
  console.log('handleSearch:', evt.target.value)
  console.log('handleSearch searchName:', searchName.value)
  const name = searchName.value
  if (!name) {
    columns.value = geektimeColumns
  } else {
    columns.value = geektimeColumns.filter(item => item.n.toLowerCase().indexOf(name) !== -1)
  }
}

function handleSearchVideo(evt) {
  console.log('handleSearchVideo:', evt.target.value, searchVideoName.value)
  const name = searchVideoName.value
  if (!name) {
    videoCourses.value = geektimeVideoCourses
  } else {
    videoCourses.value = geektimeVideoCourses.filter(item => item.n.toLowerCase().indexOf(name) !== -1)
  }
}
</script>

<style>
  .column-name {
    font-size: 14px;
  }
  .column-status {
    margin-left: 10px;
    font-size: 12px;
  }
  .column-not-finish {
    color: #ed3838;
  }
</style>

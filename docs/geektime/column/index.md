# 专栏

## 列表

<input v-model="searchName" @input="handleSearch" />

共{{columns.length}}

<ul>
  <li v-for="(item, index) in columns">
    <a class="column-name" :href="`list?column_id=${item.id}`">{{index + 1}}. {{item.n}}</a>
    <span v-if="item.f" class="column-status column-has-finish">已完结：共{{item.c}}讲</span>
    <span v-else class="column-status column-not-finish">未完结：共{{item.c}}讲，已发布{{item.p}}讲</span>
  </li>
</ul>

<script setup>
import { inject, ref } from 'vue'

const geektime_columns = inject('geektime_columns')
const columns = ref(geektime_columns)
const searchName = ref('')

function handleSearch(evt) {
  console.log('handleSearch:', evt.target.value)
  console.log('handleSearch searchName:', searchName.value)
  const name = searchName.value
  if (!name) {
    columns.value = geektime_columns
  } else {
    columns.value = geektime_columns.filter(item => item.n.toLowerCase().indexOf(name) !== -1)
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

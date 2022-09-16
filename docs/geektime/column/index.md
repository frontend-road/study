# 专栏

## 列表

共{{columns.length}}

<ul>
  <li v-for="(item, index) in columns">
    <a :href="`list?column_id=${item.id}`">{{index + 1}}. {{item.n}}</a>
    {{item.f ? `共${item.c}讲` : `未完结：共${item.c}讲，已发布${item.p}讲` }}
  </li>
</ul>

<script setup>
import { inject } from 'vue'

const columns = inject('geektime_columns')
</script>

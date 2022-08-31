# 专栏

## 列表

共{{columns.length}}

<ul>
  <li v-for="(item, index) in columns">
    <a :href="`list?column_id=${item.id}`">{{index + 1}}. {{item.name}}</a>
  </li>
</ul>
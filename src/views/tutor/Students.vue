<template>
  <v-card>
    <v-card-title>
      一班学生列表
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="搜索"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="students"
      :search="search"
    ></v-data-table>
  </v-card>
</template>
<script>
  export default {
    data () {
      return {
        search: '',
        headers: [
          {
            text: '学号',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          { text: '姓名', value: 'name' },
        ],
        students: [
          {
            id: '2017123456',
            name: '张三',
          },
          {
            id: '2017123456',
            name: '张三',
          },
          {
            id: '2017123456',
            name: '张三',
          },
          {
            id: '2017123456',
            name: '张三',
          },
          {
            id: '2017123456',
            name: '张三',
          },
          {
            id: '2017123456',
            name: '张三',
          },
          {
            id: '2017123456',
            name: '张三',
          },
        ],
      }
    },
  }
</script>
<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    hide-default-header
    hide-default-footer
    class="elevation-1"
  ></v-data-table>
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            value: 'name',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
        desserts: [
          {
            name: '平均值',
            calories: 0.71,
          },
          {
            name: '及格率',
            calories: 0.87,

          },
          {
            name: '最大值',
            calories: 0.96,

          },
          {
            name: '最小值',
            calories: 0.42,

          },
          {
            name: '中位数',
            calories: 0.74,
          }
        ],
      }
    },
  }
</script>
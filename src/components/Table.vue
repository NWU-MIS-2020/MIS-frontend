<template>
  <v-card>
    <v-card-title>
      查询结果
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
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
            text: '毕业要求',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: '指标点', value: 'calories' },
          { text: '评价值', value: 'fat' },
          { text: '达成度值', value: 'carbs' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
          },
          
        ],
      }
    },
  }
</script>
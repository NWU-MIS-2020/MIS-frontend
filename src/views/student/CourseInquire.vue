<template>
  <v-card>
    <v-card-title>
      课程预测结果
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
      :items="details"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
            search: '',
            details: [],
            headers: [
          {
            text: '课程名',
            align: 'start',
            value: 'name',
          },
          { text: '节课分数', value: 'final_marks' },
          { text: '指标值', value: 'indicator' },
          { text: '审核人', value: 'cm_name' }, 
        ],
        }),
        created() {
            this.fetch_data()
        },
        methods: {
            fetch_data: function() {
                this.$axios
                    .get('user/student/?username=' + this.username)
                    .then(response => {
                        console.log(response)
                        this.details = response.data.grades
                    })
            }
        },
        computed: {
            username: function() {
                return this.$store.state.username
            }
        },
        mounted() {}
  }
</script>
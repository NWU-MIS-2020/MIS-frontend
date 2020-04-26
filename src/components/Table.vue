<template>
  <v-card>
    <v-card-title>
      指标点评价值预测结果
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
            text: '指标点的id值',
            align: 'start',
            value: 'rough_requirement_id',
          },
          { text: '预测评价值', value: 'indicator' },
          { text: '是否低于阈值', value: 'is_lt_wil' },/* 
          { text: '审核人', value: 'people' }, */
        ],
        }),
        created() {
            this.fetch_data()
        },
        methods: {
            fetch_data: function() {
                this.$axios
                    .get('prediction/detailed_predictions/?student_username=' + this.username)
                    .then(response => {
                        let rough_pre = response.data.students.map(rough_pre => rough_pre.rough_predictions);
                        console.log(rough_pre)
                        for(let i=0;i<rough_pre.length;i++){
                          this.details = rough_pre[i]
                        }
                          
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
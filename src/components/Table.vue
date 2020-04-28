<template>
  <v-card>
    <v-card-title>
      毕业要求达成度预测结果
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
    >
    <template v-slot:item.is_lt_wil="{ item }">
      <v-chip :color="getColor(item.is_lt_wil)" dark></v-chip>
    </template>
    </v-data-table>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
            search: '',
            details: [],
            flag:'',
            headers: [
          {
            text: '毕业要求编号',
            align: 'start',
            value: 'rough_requirement_index',
          },
          { text: '预测评价值', value: 'indicator' },
          { text: '预警等级', value: 'is_lt_wil' }
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
                        let rough_pre1 = rough_pre[0]
                        for(let i=0;i<rough_pre1.length;i++){
                         rough_pre1[i].indicator = rough_pre1[i].indicator.toFixed(2)
                          
                        }
                        this.details = rough_pre1
                          console.log(this.details)
                    })
            },
            getColor: function(calories)  {
                if (calories) {
                  return 'red'}
                else{
                  return 'green'} 
      },
            
        },
        computed: {
            username: function() {
                return this.$store.state.username
            }
        },
        mounted() {}
  }
</script>
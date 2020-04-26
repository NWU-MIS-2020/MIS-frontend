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
    >
    </v-data-table>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
            search: '',
            details: [{
              /* offering_course_name: '', */
            }
            ],
            
            headers: [
          {
            text: '课程名',
            align: 'start',
            value: 'offering_course.name',
          },
          { text: '支撑课程', value: '' },
          { text: '加权平均分', value: 'review_status' },
          { text: '成绩', value: 'teachers[0].name' }, 
        ],
          course_id: undefined, //历史课程id
          course: undefined, //历史课程的数据
        }),
        created() {
            this.course_id = this.$route.query.course_id;
            this.input_grades.grades.course = this.course_id;
            /* console.log(this.course_id) */
            console.log(this.username)
            this.$axios
                    .get('course/grades/?username=' + this.username)
                    .then(response => {
                        console.log(response)
                        this.details = response.data.grades
                    })
        },
        methods: {
            },
        computed: {
            username: function() {
                return this.$store.state.username
            }
        },
        mounted() {}
  }
</script>
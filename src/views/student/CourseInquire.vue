<template>
<v-container >
  <v-col cols="12">
        <!-- <v-card>
          <v-list-item two-line>
                <v-list-item-content>
                    <v-list-item-title>课程名：{{offering_course_name}}</v-list-item-title>
                    <v-list-item-subtitle>最终成绩：{{final_marks}}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

        </v-card> -->
        <v-card
  >
    <v-toolbar
      color="indigo"
      dark
    >
    
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>课程详情页</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-toolbar>
    <v-list>
      <v-list-item
      >
        <v-list-item-icon>
          <v-icon  color="pink">mdi-star</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title >课程名：{{offering_course_name}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-for="(item, i) in final_marks" :key="i"
      >
        <v-list-item-icon>
          <v-icon  color="pink">mdi-star</v-icon>
        </v-list-item-icon>
        <v-list-item-content> 
          <v-list-item-title >{{item.name}}：{{item.value}} <v-spacer></v-spacer> {{item.name1}}：{{item.value1}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
  </v-col>
  <v-col cols="12">
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
  </v-card></v-col>
    </v-container>
  
</template>

<script>
  export default {
    data: () => ({
            search: '',
            final_marks: [
              { name: "平时表现", value: '',name1: "平时表现满分", value1: ''},
              { name: "作业", value: '',name1: "作业满分", value1: ''},
              { name: "期末试题", value: '',name1: "期末试题满分", value1: ''},
              /* {"平时表现":'',"作业":'',"期末试题":'',"平时表现满分":'',"作业满分":'',"期末试题满分":''} */
              ],
            offering_course_name: '',
            details: [{
              /* offering_course_name: '', */
            }
            ],
            
            headers: [
          {
            text: '课程名',
            align: 'start',
            value: 'indicator_factor',
          },
          { text: '加权平均分', value: 'total_marks' },
        ],
          course_id: undefined, //历史课程id
          course: undefined, //历史课程的数据
        }),
        created() {
            this.course_id = this.$route.query.course_id;
            this.fetch_data()
            /* console.log(this.course_id) */
            /* console.log(this.username)
            this.$axios
                    .get('course/grades/?username=' + this.username)
                    .then(response => {
                        console.log(response)
                        this.details = response.data.grades
                    }) */

        },
        methods: {
          fetch_data: function() {
                this.$axios
                    .get('course/grades/?student_username=' + this.username)
                    .then(response => {
                      let indicator_marks = response.data.grades.map(indicator_marks => indicator_marks.indicator_marks);
                        console.log(response.data.grades)
                        this.offering_course_name = response.data.grades[0].course.offering_course.name
                        let final_marks1 = response.data.grades[0].indicator_marks[0].detailed_marks
                        console.log("！！！！！！！！！！！！")
                          this.final_marks[0].value = final_marks1[0].basis.full_marks
                          this.final_marks[0].value1  = final_marks1[0].marks
                          this.final_marks[1].value  = final_marks1[1].basis.full_marks
                          this.final_marks[1].value1  = final_marks1[1].marks
                          this.final_marks[2].value  = final_marks1[2].basis.full_marks
                          this.final_marks[2].value2  = final_marks1[2].marks
                          console.log(this.final_marks)
                        for(let i=0;i<indicator_marks.length;i++){
                          this.details = indicator_marks[i];
                          console.log(this.details)
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
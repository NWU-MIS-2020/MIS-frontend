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
      <!-- <v-list-item v-for="(item, i) in final_marks" :key="i"
      >
        <v-list-item-icon>
          <v-icon  color="pink">mdi-star</v-icon>
        </v-list-item-icon>
        <v-list-item-content> 
          <v-list-item-title >{{item.name}}：{{item.value}} <v-spacer></v-spacer> {{item.name1}}：{{item.value1}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->
      <v-list-item-content>
      
  <div>

    <v-expansion-panels
    >
      <v-expansion-panel v-for="(item,i) in final_marks"
        :key="i">
        <v-expansion-panel-header>指标点评价依据{{i+1}}</v-expansion-panel-header>
        <v-expansion-panel-content>

          <v-list-item v-for="(it_details,i) in item" :key="i"
      >
        <v-list-item-icon>
          <v-icon  color="pink">mdi-star</v-icon>
        </v-list-item-icon>
        <v-list-item-content> 
          <v-list-item-title >{{it_details.basis.name}}：{{it_details.marks}} <v-spacer></v-spacer> {{it_details.basis.name}}满分：{{it_details.basis.full_marks}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>


      </v-list-item-content>
    </v-list>
  </v-card>
  </v-col>
  <v-col cols="12">
        <v-card>
    <v-card-title>
      指标点达成度列表
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
            final_marks: [/* 
              { name: "平时表现", value: '',name1: "平时表现满分", value1: ''},
              { name: "作业", value: '',name1: "作业满分", value1: ''},
              { name: "期末试题", value: '',name1: "期末试题满分", value1: ''}, */
              ],
            offering_course_name: '',
            details: [{
            }
            ],
            
            headers: [
          {
            text: '指标点编号',
            align: 'start',
            value: 'indicator_factor',
          },
          { text: '达成度', value: 'total_marks' },
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
                      /* let rough_pre = response.data.students.map(rough_pre => rough_pre.rough_predictions);
                        let rough_pre1 = rough_pre[0]
                        for(let i=0;i<rough_pre1.length;i++){
                         rough_pre1[i].indicator = rough_pre1[i].indicator.toFixed(2)
                          
                        }
                        this.details = rough_pre1
                          console.log(this.details) */
                      let indicator_marks = response.data.grades.map(indicator_marks => indicator_marks.indicator_marks);
                        console.log(response.data.grades)
                        
                        this.offering_course_name = response.data.grades[0].course.offering_course.name
                        for(let i of response.data.grades[0].indicator_marks){
                          let final_marks1 = i.detailed_marks
                          this.final_marks.push(final_marks1)
                        }
                        let indicator_marks1 = indicator_marks[0]
                        for(let i=0;i<indicator_marks1.length;i++){
                          indicator_marks1[i].total_marks = indicator_marks1[i].total_marks.toFixed(2)
                          
                        }
                        this.details = indicator_marks1;
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
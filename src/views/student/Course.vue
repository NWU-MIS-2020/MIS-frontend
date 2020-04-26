<template>
<v-card>
<v-card-title>
      课程查询结果
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
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>结果</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
          <v-btn @click="click_botton(item.id)">详情</v-btn>
    </template>
  </v-data-table>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      search: '',
      dialog: false,
      headers: [
          {
            text: '课程名',
            align: 'start',
            value: 'offering_course.name',
          },
          { text: '开课时间', value: 'start_date' },
          { text: '结课时间', value: 'end_date' },
          { text: '审核状态', value: 'review_status' },
          { text: '审核人', value: 'teachers[0].name' }, 
          { text: 'Actions', value: 'actions', sortable: false },
        ],
      
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }),
    computed: {
        username: function() {
                return this.$store.state.username
            }
    },
    watch: {
    },
    created () {
      this.initialize()
    },
    methods: {
        initialize: function() {
                this.$axios
                    .get('course/courses/?student_username=' + this.username)
                    .then(response => {
                        console.log(response.data.courses)
                        this.desserts=response.data.courses
                    })
                    
            },
        click_botton: function(course_id) {
                this.$router.push({ path: "courseDetails", query: { course_id: course_id } })
            },
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
    },
  }
</script>
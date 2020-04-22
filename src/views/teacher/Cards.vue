<template>
    <div style="padding: 20px">
        <h1>选择课程教学班</h1>
        <v-divider></v-divider>
        <v-row>
            <v-col v-for="(item, i) in courses" :key="i" cols="6" md="3">
                <v-card class="mx-auto" max-width="344" raised outlined 
                    @click="click_card(item.id)">
                    <v-list-item three-line>
                        <v-list-item-content>
                            <div class="overline mb-4">课程id: {{item.id}}</div>
                            
                            <v-list-item-title class="headline mb-1">{{ item.name }}</v-list-item-title>
                            
                            <v-list-item-subtitle>人数: {{item.student_number}}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        data: () => ({
            courses: [],
            selected: [],
        }),
        created() {
            this.fetch_data()
        },
        methods: {
            click_card: function(course_id) {
                this.$router.push({ path: "input", query: { course_id: course_id } })
            },
            fetch_data: function() {
                this.$axios
                    .get('user/teacher/?username=' + this.username)
                    .then(response => {
                        console.log(response)
                        this.courses = response.data.courses
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
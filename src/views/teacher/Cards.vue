<template>
    <div style="padding: 20px">
        <h1>选择课程教学班</h1>
        <v-divider></v-divider>
        <v-row>
            <v-col v-for="(item, i) in courses" :key="i" cols="6" md="3">
                <v-card
                    class="mx-auto"
                    max-width="344"
                    raised
                    outlined
                    @click="click_card(item.id)"
                >
                    <v-list-item three-line>
                        <v-list-item-content>
                            <div class="overline mb-4">课程id: {{item.id}}</div>

                            <v-list-item-title class="headline mb-1">{{ item.offering_course.name }}</v-list-item-title>

                            <v-list-item-subtitle>人数: {{item.students.length}}</v-list-item-subtitle>

                            <v-list-item-subtitle>审核状态: {{item.review_status}}</v-list-item-subtitle>

                            <v-list-item-subtitle
                                v-if="item.review_status == '未通过'"
                            >不通过原因: {{item.review_comment}}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-card>

                <v-dialog v-model="dialog" max-width="520px">
                    <v-btn color="primary" @click="add_grade">新增评价值</v-btn>
                    <v-btn color="primary" @click="modify_grade">修改评价值</v-btn>
                </v-dialog>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    data: () => ({
        courses: [],
        selected: [],
        dialog: false,
        edit_course_id: -1
    }),
    created() {
        this.fetch_data();
    },
    methods: {
        click_card: function(course_id) {
            this.edit_course_id = course_id;
            this.dialog = true;
        },
        fetch_data: function() {
            this.$axios
                .get("course/courses/?teacher_username=" + this.username)
                .then(response => {
                    console.log(response);
                    this.courses = response.data.courses;
                });
        },
        add_grade: function() {
            this.$router.push({
                path: "input",
                query: { course_id: this.edit_course_id }
            });
        },
    },
    computed: {
        username: function() {
            return this.$store.state.username;
        }
    },
    mounted() {}
};
</script>
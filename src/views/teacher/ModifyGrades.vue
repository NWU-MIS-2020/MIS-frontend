<template>
    <v-container fluid v-if="!loading">
        <h1>{{ grades[0].course.offering_course.name }}</h1>
        <v-data-iterator :items="grades" :items-per-page.sync="itemsPerPage" :page="page">
            <template v-slot:default="props">
                <v-row>
                    <v-col
                        v-for="item in props.items"
                        :key="item.name"
                        cols="12"
                        sm="6"
                        md="4"
                        lg="3"
                    >
                        <v-card>
                            <v-card-title
                                class="subheading font-weight-bold"
                            >{{ item.student.name }}</v-card-title>

                            <v-divider></v-divider>

                            <v-list dense>
                                <v-list-item
                                    v-for="(indicator_mark, index_indicator_mark) in item.indicator_marks"
                                    :key="index_indicator_mark"
                                >
                                    <v-list dense>
                                        <v-list-item-content>{{ indicator_mark.indicator_factor }}</v-list-item-content>
                                        <v-list-item
                                            v-for="(detailed_mark, index_detailed_mark) in indicator_mark.detailed_marks"
                                            :key="index_detailed_mark"
                                        >
                                            <v-list-item-content>{{ detailed_mark.basis.name }}:</v-list-item-content>
                                            <v-list-item-content
                                                class="align-end"
                                            >{{ detailed_mark.marks }} / {{ detailed_mark.basis.full_marks }}</v-list-item-content>
                                            <v-list-item-content>
                                                <v-icon
                                                    small
                                                    class="mr-2"
                                                    @click="editItem(item, index_indicator_mark, index_detailed_mark)"
                                                >mdi-pencil</v-icon>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                </v-list-item>
                            </v-list>
                        </v-card>
                    </v-col>
                </v-row>
            </template>
        </v-data-iterator>

        <v-dialog v-model="dialog" max-width="300px">
            <v-card>
                <v-text-field v-model="edit_mark" label="分数"></v-text-field>
                <v-btn color="blue darken-1" text @click="dialog = false">取消</v-btn>
                <v-btn color="blue darken-1" text @click="save">保存</v-btn>
            </v-card>
        </v-dialog>
        <v-btn color="primary" @click="submit_review">提交审核</v-btn>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            course_id: undefined,
            dialog: false,
            grades: [],
            loading: true,
            page: 1,
            itemsPerPage: 4,
            edit_mark: 0,
            editedItem: undefined,
            index_indicator_mark: -1,
            index_detailed_mark: -1
        };
    },
    created() {
        this.course_id = this.$route.query.course_id;
        this.$axios
            .get("course/grades/?course_id=" + this.course_id)
            .then(response => {
                this.grades = response.data.grades;
                this.loading = false;
            });
    },
    computed: {},
    methods: {
        editItem(item, index_indicator_mark, index_detailed_mark) {
            this.editedItem = item;
            this.index_indicator_mark = index_indicator_mark;
            this.index_detailed_mark = index_detailed_mark;
            this.edit_mark = this.editedItem.indicator_marks[
                index_indicator_mark
            ].detailed_marks[index_detailed_mark].marks;
            this.dialog = true;
        },
        save() {
            this.editedItem.indicator_marks[
                this.index_indicator_mark
            ].detailed_marks[this.index_detailed_mark].marks = this.edit_mark
            this.$axios
                .put("course/grades/", {
                    grades: [this.editedItem]
                })
                .then(response => {
                    console.log(response);
                    alert("修改成功");
                    this.dialog = false
                });
        },
        submit_review() {
            this.$axios
                .put('course/courses/', {
                    courses: [{
                        id: this.course_id,
                        review_status: '未审核'
                    }]
                })
                .then(response => {
                    console.log(response)
                    alert("提交审核成功。")
                    this.$router.push({ path: "/home/teacher/select_course" });
                })
        }
    }
};
</script>


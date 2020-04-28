<template>
    <v-container>
        <div v-if="!loading">
            <v-row>
                <h1>{{this.course.offering_course.name}}</h1>
            </v-row>
            <v-row>
                <h2>第 {{done_student_number + 1}} / {{all_student_number}} 位学生</h2>
            </v-row>
            <v-row>
                <h3>姓名：{{input_grades.student.name}}</h3>
            </v-row>
            <v-card v-for="(format, i) in input_grades.indicator_marks" :key="i">
                <v-card-title>指标点 {{i}}</v-card-title>
                <v-list-item two-line>
                    <v-list-item-content>
                        <v-list-item-title>课程教学目标</v-list-item-title>
                        <v-list-item-subtitle>待定</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                    <v-list-item-content>
                        <v-list-item-title>毕业要求指标点</v-list-item-title>
                        <v-list-item-subtitle>{{format.indicator_factor}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-list-group value="true" disabled>
                    <template v-slot:activator>
                        <v-list-item-title>评价依据</v-list-item-title>
                    </template>
                    <v-list-item v-for="(rule, i) in format.detailed_marks" :key="i">
                        <v-list-item-title>{{rule.basis.name}}</v-list-item-title>
                        <v-list-item-subtitle>
                            <v-row>
                                <v-col>
                                    <v-text-field v-model="rule.marks" label="分值"></v-text-field>
                                </v-col>
                                <v-col>/{{rule.basis.full_marks}}分</v-col>
                            </v-row>
                        </v-list-item-subtitle>
                    </v-list-item>
                </v-list-group>
                <v-divider></v-divider>
            </v-card>
            <v-btn color="primary" @click="submit">提交</v-btn>
        </div>

        <v-dialog v-model="all_done_dialog" max-width="500px">
            <v-card>所有评价值已填写完成。</v-card>
            <v-btn color="primary" to="/home/teacher/select_course">返回</v-btn>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        all_done_dialog: false,
        formats: [], //课程与指标点的关系
        grades: [],
        undone_grades: [],
        course_id: undefined, //历史课程id
        course: undefined, //历史课程的数据
        offering_course: undefined, //开设课程的数据
        loading: true,
        undone_student: [],
        input_grades: { grades: { indicator_marks: { detailed_marks: [] } } } //表单成绩
    }),
    created() {
        this.course_id = this.$route.query.course_id;
        this.input_grades.grades.course = this.course_id;
        this.$axios
            .get("course/courses/?id=" + this.course_id)
            .then(response => {
                this.course = response.data.courses[0];
            })
            .then(() => {
                this.$axios
                    .get(
                        "plan/indicator_factors/?offring_course_id=" +
                            this.course.offering_course.id
                    )
                    .then(response => {
                        this.formats = response.data.indicator_factors;
                        console.log(this.formats);
                    });
                this.$axios
                    .get("course/grades/?course_id=" + this.course_id)
                    .then(response => {
                        this.grades = response.data.grades;
                        for (let grade of this.grades) {
                            if (grade.indicator_marks[0].total_marks == null) {
                                this.undone_grades.push(grade);
                            }
                        }
                        this.check();
                    });
            });
    },
    computed: {
        all_student_number() {
            return this.course.students.length;
        },
        undone_student_number() {
            return this.undone_grades.length;
        },
        done_student_number() {
            return this.all_student_number - this.undone_student_number;
        }
    },
    methods: {
        submit() {
            this.$axios
                .put("course/grades/", {
                    grades: [this.input_grades]
                })
                .then(response => {
                    console.log(response);
                    alert("添加成功");
                    this.undone_grades.splice(0, 1);
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                    this.check();
                });
        },
        check() {
            console.log(this.all_student_number);
            console.log(this.done_student_number);
            if (this.all_student_number == this.done_student_number) {
                this.$axios.put("course/courses/", {
                    courses: [
                        {
                            id: this.course_id,
                            review_status: "未审核"
                        }
                    ]
                });
                this.loading = true;
                this.all_done_dialog = true;
            } else {
                this.input_grades = this.undone_grades[0];
                this.loading = false;
            }
        }
    }
};
</script>
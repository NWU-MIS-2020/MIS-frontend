<template>
    <v-container v-if="!loading">
        <v-row>
            <h1>{{this.course.offering_course.name}}</h1>
        </v-row>
        <v-row>
            <h2>第 {{done_student_number}} / {{all_student_number}} 位学生</h2>
            姓名：TODO
        </v-row>
        <v-card v-for="(format, i) in formats" :key="i">
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
                    <v-list-item-subtitle>{{format.detailed_requirement.id}}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-list-group value="true" disabled>
                <template v-slot:activator>
                    <v-list-item-title>评价依据</v-list-item-title>
                </template>
                <v-list-item v-for="(rule, i) in format.bases" :key="i">
                    <v-list-item-title>{{rule.name}}</v-list-item-title>
                    <v-list-item-subtitle>
                        <v-row>
                            <v-col>
                                <v-text-field v-model="input_grades.grades.indicator_marks.detailed_marks[i]" label="分值"></v-text-field>
                            </v-col>
                            <v-col>/{{rule.full_marks}}分</v-col>
                        </v-row>
                    </v-list-item-subtitle>
                </v-list-item>
            </v-list-group>
            <v-divider></v-divider>
        </v-card>
        <v-btn color="primary" @click="submit">提交</v-btn>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        formats: [], //课程与指标点的关系
        grades: [],
        course_id: undefined, //历史课程id
        course: undefined, //历史课程的数据
        offering_course: undefined, //开设课程的数据
        loading: true,
        undone_student: [],
        input_grades: {grades: {indicator_marks:{detailed_marks:[]}}}, //表单成绩
    }),
    created() {
        this.course_id = this.$route.query.course_id;
        this.input_grades.grades.course = this.course_id;
        this.$axios
            .get("course/courses/?course_id=" + this.course_id)
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
                        // for (let i of this.formats) {
                        //     for (let j of i.bases) {
                        //         this.input_grades.indicator_marks.detailed_marks
                        //     }
                        // }
                        // TODO
                        console.log(this.formats);
                    });
                this.$axios
                    .get('course/grades/?course_id' + this.course_id)
                    .then(response => {
                        this.grades = response.data.grades
                        for (let student of this.course.students) {
                            if (this.done_students_username.find(student.username) == false) {
                                this.undone_student.push(student)
                            }
                        }
                    })
                this.loading = false
            });
    },
    computed: {
        all_student_number() {
            return this.course.students.length
        },
        done_student_number() {
            return this.grades.length
        },
        done_students_username() {
            return this.grades.map(x => x.student.username)
        }
    },
    methods: {
        submit() {
            this.done_student_number += 1;
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    }
};
</script>
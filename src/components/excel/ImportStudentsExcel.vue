<template>
    <div>
        <vue-xlsx-table @on-select-file="importStudents">
            批量上传学生信息
        </vue-xlsx-table>
        <v-snackbar v-model="snackbar">
            {{ text }}
            <v-btn color="pink" text @click="snackbar = false">
                Close
            </v-btn>
        </v-snackbar>
    </div>
</template>
<script>
    export default {
        data: () => ({
            snackbar: false,
            text: '成功',
        }),
        methods: {
            handleSelectedFile(convertedData) {
                console.log(convertedData)
                for (let data of convertedData.body) {
                    console.log(data["学号"], data["学生姓名"])
                }
            },
            dateFormat(date) {
                let date_splited = date.split('/')
                let year = date_splited[2]
                year = Number(year) + 2000
                let month = date_splited[0]
                let day = date_splited[1]
                return year + "-" + month + "-" + day
            },
            importStudents(convertedData) {
                let students_info = []
                console.log(convertedData)
                for (let data of convertedData["body"]) {
                    let student_info = {
                        username: data["学号"],
                        name: data["学生姓名"],
                        admission_date: this.dateFormat(data["入学日期"]),
                        graduation_date: this.dateFormat(data["毕业日期"]),
                        length_of_schooling: data["学制"]
                    }
                    console.log(student_info)
                    students_info.push(student_info)
                }
                this.$axios
                    .post("user/students/", {
                        students: students_info
                    })
                    .then(response => {
                        console.log(response)
                        this.snackbar = true
                    })
            },
        }
    }
</script>
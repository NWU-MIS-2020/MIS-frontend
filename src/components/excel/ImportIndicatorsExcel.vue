<template>
    <div>
        <vue-xlsx-table @on-select-file="importIndicators">
            批量上传学生评价值
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
        props: ['course_id'],
        data: () => ({
            snackbar: false,
            text: '成功',
        }),
        methods: {
            importIndicators(convertedData) {
                let students_info = []
                let id_of_basis = {}
                console.log(convertedData)
                for(let data of convertedData["header"]){
                    console.log(data)
                    if(data == "学号" || data == "学生姓名"){
                        continue
                    }

                    id_of_basis[data] = data.split('_')[0]
                }
                console.log(id_of_basis)
                for(let data of convertedData["body"]){
                    let student_info = {
                        username: data["学号"],
                        detailed_marks: []
                    }
                    for(let key in data){
                        if(key == "学号" || key == "学生姓名"){
                            continue
                        }
                        student_info.detailed_marks.push(
                            {
                                "basis_id": id_of_basis[key],
                                "marks": data[key]
                            }
                        )
                    }
                    students_info.push(student_info)
                }
                this.$axios
                    .put("course/students_grades/", {
                        students: students_info
                    })
                    .then(response => {
                        console.log(response)
                        this.snackbar = true
                        this.$router.push({path: '/home/teacher/input?course_id=' + this.course_id})
                    })
            },
        }
    }
</script>
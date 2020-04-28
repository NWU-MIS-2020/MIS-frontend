<template>
    <div>
        <download-excel :data="json_data" :fields="json_fields" :before-generate="startDownload"
            :before-finish="finishDownload" :name="xls_name">
            <button class="xlsx-button">导出评价值打分模版</button>
        </download-excel>
    </div>


</template>

<script>
    //无数据,点击时获取 需要fetch ,fields属性 (有fetch时不需要data属性)
    export default {
        props:{
            course_id: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                // course_id: 3,
                json_fields: {},
                json_data: [{}],
                xls_name: "评价值打分模版.xls"
            }
        },
        methods: {
            async startDownload() {
                console.log('show loading');
                let res_json_fields = {
                    "学号": "username",
                    "学生姓名": "name"
                }
                console.log(this.course_id)
                await this.$axios
                    .get('course/courses/?id='+this.course_id)
                    .then((response) => {
                        //表头
                        let course = response.data.courses[0]
                        this.xls_name = course.offering_course.name + "评价值打分模版.xls"
                        let bases = course.bases
                        for(let basis of bases){
                            res_json_fields[basis.id + '_' + basis.name + '\n分数上限：' + basis.full_marks] = basis.id
                        }
                        //表体
                        console.log(course.students)
                        for(let student of course.students){
                            this.json_data.unshift({
                                "username": student.username,
                                "name": student.name
                            })
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                console.log(this.json_data)
                this.json_fields = res_json_fields
            },
            finishDownload() {
                console.log('hide loading');
            },
        },

    }
</script>
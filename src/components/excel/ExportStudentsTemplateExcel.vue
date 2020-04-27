<template>
    <div>
        <download-excel :data="json_data" :fields="json_fields" :before-generate="startDownload"
            :before-finish="finishDownload" name="学生信息模版.xls">
            <button class="xlsx-button">导出学生信息模版</button>
        </download-excel>
    </div>


</template>

<script>
    //无数据,点击时获取 需要fetch ,fields属性 (有fetch时不需要data属性)
    export default {
        data() {
            return {
                json_fields: {
                    '学号': 'username',
                    '学生姓名': 'name',
                    "入学日期": "admission_date",
                    "毕业日期": "graduation_date",
                    "学制": "length_of_schooling",
                },
                json_data: [{}],
            }
        },
        methods: {
            startDownload() {
                console.log('show loading');
            },
            finishDownload() {
                console.log('hide loading');
            },
        }

    }
</script>
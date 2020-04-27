<template>
    <div>
        <import-students-excel></import-students-excel>
        <export-students-template-excel></export-students-template-excel>
    </div>
</template>

<script>
    import ImportStudentsExcel from '@/components/excel/ImportStudentsExcel'
    import ExportStudentsTemplateExcel from '@/components/excel/ExportStudentsTemplateExcel'

    export default {
        components: {
            'import-students-excel': ImportStudentsExcel,
            'export-students-template-excel': ExportStudentsTemplateExcel,
        }
    }
</script>
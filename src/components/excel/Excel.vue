<template>
    <div>
        <import-students-excel></import-students-excel>
        <export-students-template-excel></export-students-template-excel>
        <import-indicators-excel></import-indicators-excel>
        <export-indicators-template-excel></export-indicators-template-excel>
    </div>
</template>

<script>
    import ImportStudentsExcel from './ImportStudentsExcel'
    import ExportStudentsTemplateExcel from './ExportStudentsTemplateExcel'
    import ImportIndicatorsExcel from './ImportIndicatorsExcel'
    import ExportIndicatorsTemplateExcel from './ExportIndicatorsTemplateExcel'

    export default {
        components: {
            'import-students-excel': ImportStudentsExcel,
            'export-students-template-excel': ExportStudentsTemplateExcel,
            'import-indicators-excel': ImportIndicatorsExcel,
            'export-indicators-template-excel': ExportIndicatorsTemplateExcel,
        }
    }
</script>
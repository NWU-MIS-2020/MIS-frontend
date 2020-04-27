<template>
    <div>
        <import-excel></import-excel>
        <export-excel></export-excel>
    </div>
</template>

<script>
    import ImportExcel from './ImportExcel'
    import ExportExcel from './ExportExcel'

    export default {
        components: {
            'import-excel': ImportExcel,
            'export-excel': ExportExcel
        }
    }
</script>
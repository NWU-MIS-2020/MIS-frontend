<template>
    <v-row>
        <v-col>
            <book-data-table></book-data-table>
        </v-col>
    </v-row>
</template>

<script>
    import Table from '@/components/Table';

    export default {
        components: {
            'book-data-table': Table,
        },
    }
</script>
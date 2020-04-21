<template>
    <v-tabs>
        <v-tab :to="{name: item.routeName}" v-for="(item, index) in items" :key="index">{{ item.text }}</v-tab>
        <v-tabs-items>
            <router-view />
        </v-tabs-items>
    </v-tabs>
</template>

<script>
    export default {
        data: () => ({
            items: [
                { routeName: 'alarm11', text: '课程预警' },
                { routeName: 'alarm12', text: '指标点预警' },
                { routeName: 'alarm13', text: '毕业要求预警' },
            ],
        })
    }
</script>

<template>
    <v-tabs>
        <v-tab v-for="(item, index) in items" :key="index" :to="item.route" link>{{ item.text }}</v-tab>
        <v-tabs-items>
            <router-view />
        </v-tabs-items>
    </v-tabs>
</template>

<script>
    export default {
        data: () => ({
            items: [
                { route: 'alarm1', text: '课程预警' },
                { route: 'alarm2', text: '指标点预警' },
                { route: 'alarm3', text: '毕业要求预警' },
            ],
        })
    }
</script>

<template>
    <div style="padding: 20px">
        <v-row>
            <v-col v-for="(item, i) in items" :key="i" cols="6" md="3">
                <v-card class="mx-auto" max-width="344" raised outlined 
                    @click="clickCard">
                    <v-list-item three-line>
                        <v-list-item-content>
                            <div class="overline mb-4">学时：{{ item.hour }}</div>
                            
                            <v-list-item-title class="headline mb-1">{{ item.name }}</v-list-item-title>
                            
                            <v-list-item-subtitle>学分: {{item.score}}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        data: () => ({
            items: [{
                    name: "IT项目管理",
                    hour: "54",
                    score: "4.5",
                },
                {
                    name: "软件工程",
                    hour: "54",
                    score: "4",
                },
                {
                    name: "计算机网络",
                    hour: "54",
                    score: "3",
                },
                {
                    name: "计算机组成原理",
                    hour: "54",
                    score: "4",
                }
            ],
            selected: [],
        }),
        methods: {
            clickCard: function () {
                this.$router.push({path: 'pending_review_list'})
            },
        }
    }
</script>

<template>
    <div style="padding: 20px">
        <h1>选择课程教学班</h1>
        <v-divider></v-divider>
        <v-row>
            <v-col v-for="(item, i) in items" :key="i" cols="6" md="3">
                <v-card class="mx-auto" max-width="344" raised outlined 
                    @click="click_card">
                    <v-list-item three-line>
                        <v-list-item-content>
                            <div class="overline mb-4">{{ item.year }}级</div>
                            
                            <v-list-item-title class="headline mb-1">{{ item.name }}</v-list-item-title>
                            
                            <v-list-item-subtitle>人数: {{item.peaple}}</v-list-item-subtitle>
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
                    year: "2017",
                    name: "管理信息系统01",
                    peaple: "33",
                },
                {
                    year: "2017",
                    name: "管理信息系统02",
                    peaple: "32",
                },
                {
                    year: "2017",
                    name: "软件工程01",
                    peaple: "29",
                },
                {
                    year: "2017",
                    name: "软件工程02",
                    peaple: "34",
                },
            ],
            selected: [],
        }),
        methods: {
            click_card: function() {
                this.$router.push({ path: "input", query: { id: 1111 } })
            },
        }

    }
</script>
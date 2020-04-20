<template>
    <div style="padding: 20px">
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
                    name: "一班",
                    peaple: "33",
                },
                {
                    year: "2017",
                    name: "二班",
                    peaple: "32",
                },
                {
                    year: "2017",
                    name: "三班",
                    peaple: "29",
                },
                {
                    year: "2017",
                    name: "四班",
                    peaple: "34",
                },
            ],
            selected: [],
        }),
        methods: {
            click_card: function() {
                this.$router.push({ path: "students", query: { id: 1111 } })
            },
        }

    }
</script>
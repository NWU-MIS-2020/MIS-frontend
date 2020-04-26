<template>
    <div style="padding: 20px">
        <v-row>
            <v-col v-for="(item, i) in classes" :key="i" cols="6" md="3">
                <v-card class="mx-auto" max-width="344" raised outlined 
                    @click="click_card">
                    <v-list-item three-line>
                        <v-list-item-content>
                            <div class="overline mb-4">{{ item.year }}级</div>
                            
                            <v-list-item-title class="headline mb-1">{{ item.name }}</v-list-item-title>
                            
                            <v-list-item-subtitle>人数: {{item.student_number}}</v-list-item-subtitle>
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
            selected: [],
            classes: []
        }),
        methods: {
            click_card: function() {
                this.$router.push({ path: "students", query: { id: 1111 } })
            },
        },
        created() {
            // 查询班级信息
            this.$axios
                .get('/user/squads/' + this.username)
                .then(response => {
                    this.classes = response.data.squad
                })
        },
        computed: {
            username: function() {
                return this.$store.state.username
            }
        },

    }
</script>
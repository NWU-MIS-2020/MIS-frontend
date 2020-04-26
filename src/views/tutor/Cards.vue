<template>
    <div style="padding: 20px">
        <v-select
          :items="classes"
          item-text="name"
          item-value="id"
          label="选择班级"
          v-model="class_id"
        ></v-select>
        <v-btn color="primary" @click="query">查询</v-btn>
    </div>
</template>

<script>
    export default {
        data: () => ({
            class_id: -1,
            classes: []
        }),
        methods: {
            query: function() {
                this.$axios
                    .get('prediction/detailed_predictions/?squad_id=' + this.class_id)
                    .then
            }
        },
        created() {
            // 查询班级信息
            this.$axios
                .get('/user/squads/?tutor_username=' + this.username)
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
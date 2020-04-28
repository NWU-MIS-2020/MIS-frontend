<template>
    <div style="padding: 20px">
        <v-text-field :disabled='disabled' @keyup.enter="query" v-model="username" label="学号"></v-text-field>
        <v-btn color="primary" @click="query" v-if="!disabled">查询</v-btn>
        <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
        <span v-if="input_error">输入有误，请重新输入。</span>
        <div v-if="items.length != 0 && !loading">
            <h2>{{prediction.name}}</h2>
            <h2>总体评价值：{{prediction.total_indicator}}</h2>
            <v-treeview open-all :items="items"></v-treeview>
        </div>
    </div>
</template>

<script>
export default {
    props: ['username', 'disable-input'],
    data: () => ({
        prediction: {},
        items: [], // 用于在treeview中显示
        loading: false,
        student_username: null,
        input_error: false
    }),
    created() {},
    mounted() {
        this.student_username = this.username
        if (this.disabled == true || this.disableInput == 'true') {
            this.query()
            console.log(234)
        }
    },
    computed: {
        disabled() {
            return this.disableInput === 'true'
        }
    },
    methods: {
        query() {
            this.input_error = false;
            this.loading = true;
            this.$axios
                .get(
                    "prediction/student/?student_username=" +
                        this.username
                )
                .then(response => {
                    this.items = [];
                    this.prediction = response.data;
                    for (let rough_requirement of this.prediction
                        .rough_requirements) {
                        let name =
                            rough_requirement.index +
                            ". " +
                            rough_requirement.title +
                            "。 评价值：" +
                            rough_requirement.indicator;
                        let children = [];
                        for (let detailed_requirement of rough_requirement.detailed_requirements) {
                            children.push({
                                id: detailed_requirement.index,
                                name:
                                    detailed_requirement.index +
                                    ". " +
                                    detailed_requirement.description +
                                    " 评价值：" +
                                    detailed_requirement.indicator
                            });
                        }
                        this.items.push({
                            id: rough_requirement.index,
                            name: name,
                            children: children
                        });
                    }
                    this.loading = false;
                })
                .catch(() => {
                    this.input_error = true;
                    this.loading = false;
                });
        }
    }
};
</script>
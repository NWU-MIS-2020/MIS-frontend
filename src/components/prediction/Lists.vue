<template>
    <div style="padding: 20px">
        <v-select
            :items="classes"
            :item-text="name"
            item-value="id"
            label="选择班级"
            v-model="class_id"
        ></v-select>
        <v-btn color="primary" @click="query">查询</v-btn>
        <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
        <v-card>
            <v-card-title>毕业达成度列表
            <v-spacer></v-spacer>
            <v-select :items="filters" v-model="current_filter"></v-select>
            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="predictions"
                :items-per-page="50"
                class="elevation-1"
                @click:row="row_click"
                :custom-filter="filter"
                :search="current_filter"
            >
                <template v-slot:item.total_indicator="{item}">
                    <span
                        v-if="item.total_indicator < 0.65"
                        style="color: red"
                    >{{item.total_indicator}}</span>
                    <span v-else>{{item.total_indicator}}</span>
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script>
export default {
    props: ["role"],
    data: () => ({
        class_id: -1,
        classes: [],
        loading: false,
        predictions: [],
        filters: ["全部", "未达标", "已达标"],
        current_filter: "全部",
        headers: [
            { text: "学号", value: "username" },
            { text: "姓名", value: "name" },
            { text: "毕业达成预测值", value: "total_indicator" }
        ]
    }),
    methods: {
        query: function() {
            this.loading = true;
            this.$axios
                .get(
                    "prediction/detailed_predictions/?squad_id=" + this.class_id
                )
                .then(response => {
                    this.predictions = response.data.students;
                    this.loading = false;
                });
        },
        name(item) {
            return item.created_year + "级 " + item.name;
        },
        row_click(item) {
            this.$router.push({
                path: "/home/" + this.role + "/details",
                query: { username: item.username, disable_input: true }
            });
            // console.log(item);
        },
        filter(value, search, item) {
            console.log(value, search, item)
            if (search == "全部") return true;
            else if (search == "未达标") {
                if (item.total_indicator < 0.65) return true
                else return false;
            }
            else {
                if (item.total_indicator >= 0.65) return true
                else return false;
            }
        }
    },
    created() {
        // 查询班级信息
        this.loading = true;
        let params = {};
        if (this.role == "tutor") {
            params.tutor_username = this.username;
        }
        this.$axios
            .get("/user/squads/", {
                params: params
            })
            .then(response => {
                this.classes = response.data.squads;
                this.loading = false;
            });
    },
    computed: {
        username: function() {
            return this.$store.state.username;
        }
    }
};
</script>
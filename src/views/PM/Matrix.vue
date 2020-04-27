<template>
    <div style="padding: 20px">
        <v-data-table :headers="headers" :items="matrix"  :search="search" class="elevation-1">
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>管理支撑矩阵</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="搜索"
                        single-line
                        hide-details
                    ></v-text-field>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" dark class="mb-2" v-on="on">新建</v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-select
                                                :items="requirements"
                                                item-text="title"
                                                item-value="id"
                                                v-model="editedItem.rough_requirement"
                                                label="毕业要求"
                                            ></v-select>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-select
                                                :items="requirements.find(req => req.id == editedItem.rough_requirement).detailed_requirements"
                                                item-text="description"
                                                item-value="id"
                                                v-model="editedItem.detailed_requirement"
                                                label="指标点"
                                            ></v-select>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.target" label="课程教学目标"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-select
                                                :items="offering_courses"
                                                item-text="name"
                                                item-value="id"
                                                v-model="editedItem.offering_course"
                                                label="开设课程"
                                            ></v-select>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.factor" label="相关系数"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close">取消</v-btn>
                                <v-btn color="blue darken-1" text @click="save">保存</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
            <template v-slot:no-data>暂无数据</template>
        </v-data-table>
    </div>
</template>

<script>
export default {
    data: () => ({
        dialog: false,
        search: '',
        headers: [
            { text: "序号", align: "start", value: "id" },
            { text: "指标点", value: "detailed_description" },
            { text: "课程教学目标", value: "target" },
            { text: "课程", value: "offering_course.name" },
            { text: "相关系数", value: "factor" },
            { text: "操作", value: "actions", sortable: false }
        ],
        matrix: [],
        offering_courses: [],
        editedIndex: -1,
        editedItem: {
            rough_requirement: 1,
            detailed_requirement: "",
            offering_course: "",
            factor: 0,
            target: "null",
            field_of_study: ""
        },
        defaultItem: {
            detailed_requirement: "",
            offering_course: "",
            factor: 0,
            target: "null",
            field_of_study: ""
        }
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "新建" : "修改";
        },
        requirements() {
            return this.$store.state.requirements;
        }
    },

    watch: {
        dialog(val) {
            val || this.close();
        }
    },

    created() {
        this.$axios.get("plan/indicator_factors/").then(response => {
            this.matrix = response.data.indicator_factors;
        });
        this.$axios.get("plan/offering_courses/").then(response => {
            this.offering_courses = response.data.offering_courses;
        });
    },

    methods: {
        editItem(item) {
            console.log(item);
            this.editedIndex = this.matrix.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            const index = this.matrix.indexOf(item);
            if (confirm("确定要删除吗?")) {
                this.$axios
                    .delete("plan/indicator_factors/", {
                        id: item.id
                    })
                    .then(response => {
                        console.log(response);
                        alert("Done");
                        this.matrix.splice(index, 1);
                    });
            }
        },

        close() {
            this.dialog = false;
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            }, 300);
        },

        save() {
            if (this.editedIndex > -1) {
                this.$axios
                    .put("plan/indicator_factors/", {
                        indicator_factors: [this.editedItem]
                    })
                    .then(response => {
                        console.log(response);
                        alert("修改成功");
                        Object.assign(
                            this.matrix[this.editedIndex],
                            this.editedItem
                        );
                        this.close();
                    });
            } else {
                this.$axios
                    .post("plan/indicator_factors/", {
                        indicator_factors: [this.editedItem]
                    })
                    .then(response => {
                        console.log(response);
                        alert("添加成功");
                        this.matrix.push(this.editedItem);
                        this.close();
                    });
            }
        }
    }
};
</script>


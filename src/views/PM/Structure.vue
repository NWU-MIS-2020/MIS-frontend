<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="requirements"
            sort-by="calories"
            class="elevation-1"
            show-expand
        >
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>毕业要求</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
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
                                            <v-text-field v-model="editedItem.index" label="序号"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.title" label="毕业要求"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field
                                                v-model="editedItem.description"
                                                label="描述"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="create_point(item)">mdi-book</v-icon>
                <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
            <template v-slot:no-data>暂无数据</template>
            <template v-slot:expanded-item="{ item }">
                <tr width="170%" v-for="detail in item.detailed_requirements" :key="detail.index">
                    <td>{{ detail.index }}:</td>
                    <td>{{ detail.description }}</td>
                    <td>
                        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                    </td>
                    <!-- {{detail}} -->
                </tr>
            </template>
        </v-data-table>

        <v-dialog v-model="point_dialog" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editedItem.index" label="序号"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editedItem.title" label="毕业要求"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editedItem.description" label="描述"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    data: () => ({
        dialog: false,
        point_dialog: false,
        headers: [
            {
                text: "序号",
                align: "start",
                sortable: true,
                value: "index"
            },
            { text: "毕业要求", value: "title" },
            { text: "描述", value: "description" },
            { text: "操作", value: "actions", sortable: false },
            { text: "", value: "data-table-expand" }
        ],
        editedIndex: -1,
        editedItem: {
            index: 0,
            title: "",
            description: ""
        },
        defaultItem: {
            index: 0,
            title: "",
            description: ""
        }
    }),
    created() {

    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "新建" : "编辑";
        },
        requirements() {
            return this.$store.state.requirements
        },
    },

    watch: {
        dialog(val) {
            val || this.close();
        },
        point_dialog(val) {
            val || this.close();
        }
    },
    methods: {
        editItem(item) {
            this.editedIndex = this.requirements.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            const index = this.requirements.indexOf(item);
            console.log(index);
            if (confirm("确定要删除吗?")) {
                this.$axios
                    .delete("plan/rough_requirements/", {
                        data: {
                            rough_requirements: [{ id: item.id }]
                        }
                    })
                    .then(response => {
                        console.log(response);
                        alert("Done");
                        this.requirements.splice(index, 1);
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
            console.log(this.editedIndex);
            if (this.editedIndex > -1) {
                this.$axios
                    .put("plan/rough_requirements/", {
                        rough_requirements: [this.editedItem]
                    })
                    .then(response => {
                        console.log(response);
                        console.log(this.editedIndex);
                        alert("修改成功");
                        Object.assign(
                            this.requirements[this.editedIndex],
                            this.editedItem
                        );
                        this.close();
                    });
            } else {
                this.$axios
                    .post("plan/rough_requirements/", {
                        rough_requirements: [this.editedItem]
                    })
                    .then(response => {
                        console.log(response);
                        alert("添加成功");
                        this.requirements.push(this.editedItem);
                        this.close();
                    });
            }
        },
        create_point() {
            this.point_dialog = true
        }
    }
};
</script>
<template>
    <div>
        <h1
            align="center"
            style="padding: 40px"
        >《{{currentFacotr.courseName}}》下指标点{{currentFacotr.indexNo}}的评价依据</h1>
        <v-divider></v-divider>
        <div align="center" style="padding: 0px 40px">
            <v-row>
                <v-col cols="6" md="6">
                    <h3 align="center" style="padding: 10px">课程教学目标</h3>
                    <v-textarea filled solo auto-grow readonly :value="currentFacotr.target"></v-textarea>
                </v-col>
                <v-col cols="6" md="6">
                    <h3 align="center" style="padding: 10px">指标点内容</h3>
                    <v-textarea filled solo auto-grow readonly :value="currentFacotr.indexContent"></v-textarea>
                </v-col>
            </v-row>
        </div>
        <!-- 评价依据列表 -->
        <div align="center" style="padding: 20px 200px">
            <v-hover v-slot:default="{ hover }">
                <v-card :elevation="hover ? 12 : 2">
                    <v-data-table
                        :headers="headers"
                        :items="desserts"
                        sort-by="calories"
                        class="elevation-1"
                    >
                        <template v-slot:top>
                            <v-toolbar flat color="white">
                                <v-toolbar-title>评价依据</v-toolbar-title>
                                <v-divider class="mx-4" inset vertical></v-divider>
                                <v-spacer></v-spacer>
                                <v-dialog v-model="dialog" max-width="300px">
                                    <template v-slot:activator="{ on }">
                                        <v-btn color="primary" dark class="mb-2" v-on="on">新建评价依据</v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title>
                                            <span class="headline">{{ formTitle }}</span>
                                        </v-card-title>

                                        <v-card-text>
                                            <v-container>
                                                <v-row>
                                                    <v-col cols="12" sm="6" md="6">
                                                        <v-text-field
                                                            v-model="editedItem.basisContent"
                                                            label="评价依据"
                                                        ></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6" md="6">
                                                        <v-text-field
                                                            v-model="editedItem.basisFullMark"
                                                            label="总分值"
                                                        ></v-text-field>
                                                    </v-col>
                                                </v-row>
                                            </v-container>
                                        </v-card-text>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="blue darken-1" text @click="close">取消</v-btn>
                                            <v-btn color="blue darken-1" text @click="save">确定</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-toolbar>
                        </template>
                        <template v-slot:item.actions="{ item }">
                            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
                        </template>
                        <template v-slot:no-data>
                            <v-btn color="primary" @click="initialize">Reset</v-btn>
                        </template>
                    </v-data-table>
                </v-card>
            </v-hover>
        </div>
    </div>
</template>


<script>
export default {
    data: () => ({
        currentFacotr: JSON.parse(sessionStorage.getItem("currentFacotr")),
        dialog: false,
        headers: [
            { text: "编号", value: "basisId" },
            { text: "评价依据", value: "basisContent" },
            { text: "总分值", value: "basisFullMark" },
            { text: "操作", value: "actions", sortable: false }
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            basisContent: "",
            basisFullMark: 0
        },
        defaultItem: {
            basisContent: "",
            basisFullMark: 0
        }
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "新建评价依据" : "编辑评价依据";
        }
    },

    watch: {
        dialog(val) {
            val || this.close();
        }
    },

    created() {
        this.initialize();
    },

    methods: {
        initialize() {
            this.desserts = [];
            for (let basis of this.currentFacotr.basisTemplates) {
                let template = {
                    basisId: basis.id,
                    basisContent: basis.name,
                    basisFullMark: basis.full_marks,
                    indicatorFactorId: basis.indicator_factor
                };
                this.desserts.push(template);
            }
        },

        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            const index = this.desserts.indexOf(item);
            if (confirm("您确定要删除此项吗？")) {
                console.log(item);
                this.$axios
                    .delete("plan/basis_templates/", {
                        data: { basis_templates: [{ id: item.basisId }] }
                    })
                    .then(response => {
                        console.log(response);
                        this.desserts.splice(index, 1);
                        this.currentFacotr.basisTemplates.splice(index, 1);
                        sessionStorage.setItem(
                            "currentFacotr",
                            JSON.stringify(this.currentFacotr)
                        );
                        alert("删除成功！");
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
                Object.assign(this.desserts[this.editedIndex], this.editedItem);
                this.$axios
                    .put("plan/basis_templates/", {
                        basis_templates: [
                            {
                                id: this.editedItem.basisId,
                                name: this.editedItem.basisContent,
                                full_marks: this.editedItem.basisFullMark
                            }
                        ]
                    })
                    .then(response => {
                        console.log(response);
                        let newBasisTemplate = {
                            id: this.editedItem.basisId,
                            name: this.editedItem.basisContent,
                            full_marks: this.editedItem.basisFullMark,
                            indicator_factor: this.currentFacotr.factorId
                        };
                        Object.assign(
                            this.currentFacotr.basisTemplates[this.editedIndex],
                            newBasisTemplate
                        );
                        sessionStorage.setItem(
                            "currentFacotr",
                            JSON.stringify(this.currentFacotr)
                        );
                        this.initialize();
                        alert("修改成功！");
                    });
            } else {
                this.desserts.push(this.editedItem);
                this.$axios
                    .post("plan/basis_templates/", {
                        basis_templates: [
                            {
                                name: this.editedItem.basisContent,
                                full_marks: this.editedItem.basisFullMark,
                                indicator_factor: this.currentFacotr.factorId
                            }
                        ]
                    })
                    .then(response => {
                        console.log(response);
                        let newBasisTemplate = {
                            id: response.data.basis_templates[0].id,
                            name: response.data.basis_templates[0].name,
                            full_marks:
                                response.data.basis_templates[0].full_marks,
                            indicator_factor:
                                response.data.basis_templates[0]
                                    .indicator_factor
                        };
                        console.log(newBasisTemplate);
                        this.currentFacotr.basisTemplates.push(
                            newBasisTemplate
                        );
                        sessionStorage.setItem(
                            "currentFacotr",
                            JSON.stringify(this.currentFacotr)
                        );
                        this.initialize();
                    });
            }
            this.close();
        }
    }
};
</script>
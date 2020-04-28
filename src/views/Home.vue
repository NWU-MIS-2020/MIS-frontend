<template>
    <div>
        <v-navigation-drawer v-model="drawer" app>
            <v-list dense>
                <v-list-item to="/home" link>
                    <v-list-item-action>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>主页</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-group v-for="(role, i) in roles" :key="i">
                    <template v-slot:activator>
                        <v-list-item-title>{{role.name}}</v-list-item-title>
                    </template>

                    <v-list-item
                        v-for="(action, i) in role.actions"
                        :key="i"
                        :to="'/home/'+action.route"
                        link
                    >
                        <v-list-item-title v-text="action.name"></v-list-item-title>
                        <!-- <v-list-item-icon>
                            <v-icon v-text="admin[1]"></v-icon>
                        </v-list-item-icon>-->
                    </v-list-item>
                </v-list-group>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app color="primary" dark>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-toolbar-title>毕业达成度管理系统</v-toolbar-title>
            <v-spacer />
            <v-menu offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" icon>
                        <v-icon>mdi-bell</v-icon>
                    </v-btn>
                </template>
                <v-sheet width="330">
                    <v-list>
                        <v-list-item v-for="(message, index) in messgaes" :key="index">
                            <v-list-item-title>{{ message }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-sheet>
            </v-menu>

            <v-btn icon>
                <v-menu open-on-hover offset-y>
                    <template v-slot:activator="{ on }">
                        <v-icon dark v-on="on">mdi-account-circle</v-icon>
                    </template>
                    <v-list>
                        <v-list-item>
                            <v-list-item-title>{{name}}</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>{{username}}</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click.stop="setting_dialog = true">
                            <v-list-item-title>设置</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="logout">
                            <v-list-item-title>退出</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-btn>
        </v-app-bar>

        <v-dialog v-model="setting_dialog" persistent max-width="290">
            <v-card>
                <v-card-title class="headline">设置</v-card-title>
                <v-card-text>待定</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="setting_dialog = false">返回</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-content>
            <router-view></router-view>
        </v-content>
    </div>
</template>

<script>
export default {
    props: {
        source: String
    },
    data: () => ({
        drawer: null,
        roles: [],
        roles_all: [
            {
                name: "学生",
                name_en: "student",
                actions: [
                    {
                        name: "查询课程达成度",
                        route: "student/inquire2"
                    },
                    {
                        name: "查询毕业要求预测值达成度及预警",
                        route: "student/inquire"
                    },
                    /* {
                        name: "查询个人毕业要求达成度预警",
                        route: "student/alarm"
                    }, */
                    {
                        name: "查询毕业要求达成度统计情况",
                        route: "student/statistis"
                    },
                ]
            },
            {
                name: "教师",
                name_en: "teacher",
                actions: [
                    {
                        name: "录入达成度指标点",
                        route: "teacher/select_course"
                    }
                ]
            },
            {
                name: "导员",
                name_en: "tutor",
                actions: [
                    {
                        name: "查询学生毕业要求达成度列表",
                        route: "tutor/lists"
                    },
                    {
                        name: "查询详细毕业要求达成度",
                        route: "tutor/details"
                    }
                ]
            },
            {
                name: "课程负责人",
                name_en: "CM",
                actions: [
                    {
                        name: "审核课程达成度",
                        route: "cm/course_cards"
                    },
                    {
                        name: "管理评价依据",
                        route: "cm/course_basis_cards"
                    }
                ]
            },
            {
                name: "专业负责人",
                name_en: "PM",
                actions: [
                    {
                        name: "管理毕业要求指标点",
                        route: "PM/structure"
                    },
                    {
                        name: "管理支撑矩阵",
                        route: "PM/matrix"
                    },
                    {
                        name: "管理开设课程",
                        route: "PM/course"
                    },
                    {
                        name: "管理学生",
                        route: "PM/manage_student"
                    }
                ]
            }
        ],
        setting_dialog: false,
        messgaes: ["这是一条测试信息。", "这是第二条测试信息。"]
    }),
    created() {
        let token = localStorage.getItem('token')
        if (localStorage.getItem('username') != null) {
            this.$store.commit("set_username", localStorage.getItem('username'));
        }
        this.$axios.defaults.headers = {'Authorization': token}
        this.$axios
            .get("user/groups/")
            .then(response => {
                let role = response.data.groups.map(role => role.name);
                this.$store.commit("set_role", role);
                this.$store.commit("set_name", response.data.name);
                this.$store.commit("set_username", response.data.username);
            })
            .then(() => {
                // 只显示某个用户拥有的角色
                for (let i of this.roles_all) {
                    if (this.actual_role.find(name => name == i.name)) {
                        this.roles.push(i);
                    }
                }
            });
        
        this.$axios.get("plan/requirements/").then(response => {
            this.$store.commit(
                "set_requirements",
                response.data.rough_requirements
            );
        });
    },
    computed: {
        actual_role: function() {
            return this.$store.state.role;
        },
        name() {
            return this.$store.state.name
        },
        username() {
            return this.$store.state.username
        }
    },
    methods: {
        logout: function() {
            localStorage.setItem('token', null)
            localStorage.setItem('username', null)
            this.$router.push('/')
        }
    }
};
</script>
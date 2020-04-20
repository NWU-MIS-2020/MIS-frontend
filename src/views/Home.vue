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
            <v-avatar>
                <v-menu open-on-hover offset-y>
                    <template v-slot:activator="{ on }">
                        <v-icon dark v-on="on">mdi-account-circle</v-icon>
                    </template>
                    <v-list>
                        <v-list-item>
                            <v-list-item-title>设置</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>退出</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-avatar>
        </v-app-bar>

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
        roles: [
            {
                name: "学生",
                actions: [
                    {
                        name: "查询个人毕业要求达成度",
                        route: "personal_graduation_requirements"
                    }
                ]
            },
            {
                name: "教师",
                actions: ["23", "334"]
            },
            {
                name: "导员",
                actions: [
                    {
                        name: "查询学生毕业要求达成度",
                        route: "tutor/cards"
                    }
                ]
            }
        ],
        admins: [
            ["Management", "mdi-people_outline"],
            ["Settings", "mdi-settings"]
        ],
        cruds: [
            ["Create", "mdi-add"],
            ["Read", "mdi-insert_drive_file"],
            ["Update", "mdi-update"],
            ["Delete", "mdi-delete"]
        ]
    })
};
</script>
<template>
    <v-content>
        <v-app-bar app color="primary" dark>
            <div class="d-flex align-center">
                <h2>毕业达成度管理系统</h2>
            </div>

            <v-spacer></v-spacer>

        </v-app-bar>

        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="8" md="4">
                    <v-card class="elevation-12">
                        <v-toolbar color="primary" dark flat>
                            <v-toolbar-title>登录</v-toolbar-title>
                            <v-spacer />
                        </v-toolbar>
                        <v-card-text>
                            <v-form>
                                <v-text-field
                                    label="学工号"
                                    name="login"
                                    prepend-icon="mdi-account"
                                    type="text"
                                    v-model="username"
                                    v-on:keyup.enter="login"
                                />

                                <v-text-field
                                    id="password"
                                    label="密码"
                                    name="password"
                                    prepend-icon="mdi-lock"
                                    type="password"
                                    v-model="password"
                                    v-on:keyup.enter="login"
                                />
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer />
                            <v-btn color="primary" @click="login">登录</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-content>
</template>

<script>
export default {
    data() {
        return {
            source: "123",
            username: undefined,
            password: undefined
        };
    },
    methods: {
        login() {
            this.$axios.defaults.headers = {}
            this.$axios.post('user/login/', {
                username: this.username,
                password: this.password
            }).then((response) => {
                console.log(response.data)
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('username', this.username)
                this.$router.push("home")
            }).catch(error => {
                if (error.response.status == 400) {
                    alert("用户名或密码错误")
                }
                else {
                    alert("未知错误")
                }
                console.log(error.response)
            })
            
        }
    }
};
</script>
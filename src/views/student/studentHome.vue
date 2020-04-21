<template>
    <v-app>
        <main-menu :drawer="drawer"></main-menu>
        <main-header :drawer.sync="drawer"></main-header>
        <v-content>
            <v-container fluid>
                <router-view />
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import MainMenu from '../../components/studentMainMenu';
    import MainHeader from '../../components/StudentMainHeader';

    export default {
        components: {
            'main-menu': MainMenu,
            'main-header': MainHeader
        },
        data: () => ({
            drawer: true,
        }),
    };
</script>
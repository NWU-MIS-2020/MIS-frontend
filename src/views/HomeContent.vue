<template>
    <div style="padding: 20px">
        <v-card>
            <v-card-title>你好，张三。</v-card-title>
            <v-card-subtitle>你的角色是 {{role}}</v-card-subtitle>
        </v-card>
    </div>
</template>

<script>
export default {
    computed: {
        role: function () {
            return this.$store.state.role
        }
    }
}
</script>
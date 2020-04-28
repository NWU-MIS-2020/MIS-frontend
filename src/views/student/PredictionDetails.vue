<template>
    <div>
        <Details :username="username" :disable-input="disable_input"></Details>
    </div>
</template>

<script>
    import Details from '@/components/prediction/Details'

    export default {
        components: {
            Details
        },
        data: () => ({
            username: undefined,
            disable_input: false,
        }),
        created() {
            this.username = this.$store.state.username
            this.disable_input = 'true' // 注意顺序 写mounted里 Details组件mount的时候这两个值还没定义
        },
        mounted() {
        }
    }
</script>
<template>
    <div>
        <Details :username="username" :disable-input="disable_input"></Details>
    </div>
</template>

<script>
import Details from "@/components/prediction/Details";

export default {
    components: {
        Details
    },
    data: () => ({
        username: undefined,
        disable_input: false
    }),
    created() {
        this.username = this.$route.query.username;
        this.disable_input = this.$route.query.disable_input;
    },
    mounted() {}
};
</script>
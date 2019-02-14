<template>
    <div class="public-header">
        <div class="public-nav" @click="jump">{{name}}</div>
    </div>
</template>

<script>
    export default {
        name:'systemHeader',
        props: ['name'],
        methods: {
            /**
             * 跳转到首页
             */
            jump() {
                this.$router.push("/");
            },
        },
    }
</script>

<style lang="less" scoped>
 @import "../../style/public.less";
</style>
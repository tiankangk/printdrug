<template>
    <div class="base-info-nav public-operation">
        <Button type="primary" :to="baseUrl">新增</Button>
        <!-- <Button type="warning" @click="aaa">修改</Button> -->
    </div>
</template>

<script>
    export default {
        props: ["baseUrl"],
        name: "baseInfoNav",
        methods: {
  
        }
    };
</script>

<style lang="less" scoped>
    @import "../../style/public.less";
    .base-info-nav {
        .ivu-btn {
            margin-right: 15px;
        }
    }
</style>
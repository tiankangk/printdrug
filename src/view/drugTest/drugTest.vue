<template>
    <div class="base-info">
        <system-header :name="name"></system-header>
        <div class="base-info-home">
            <menu-info></menu-info>
            <router-view class="base-info-view"></router-view>
        </div>
    </div>
</template>

<script>
    import systemHeader from "components/public/systemHeader.vue";
    import menuInfo from "./components/menuInfo.vue";
    export default {
        name: "erp",
        components: {
            systemHeader,
            menuInfo
        },
        data() {
            return {
                name: "欢迎使用药检打印系统"
            };
        }
    };
</script>

<style lang="less" scoped>
    @import "~@/style/baseInfo.less";
</style>
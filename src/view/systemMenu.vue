<template>
    <div class="yjs-menu">
        <div class="yjs-title">药居士仓库系统</div>
        <ul class="yjs-menu-sub">
            <li class="yjs-menu-item" v-for="item in menuList" :key="item.id">
                <router-link :to="item.url">{{item.name}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "systemMenu",
        data() {
            return {
                menuList: [
                    {
                        url: "/drug-test",
                        name: "药检打印系统"
                    }
                ]
            };
        }
    };
</script>

<style lang="less" scoped>
    @import "../style/systemMenu.less";
</style>
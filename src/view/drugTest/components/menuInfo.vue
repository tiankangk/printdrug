<template>
    <div class="menu-info">
        <Menu ref="menu" theme="dark" accordion>
            <Submenu :name="index" v-for="(item,index) in menuList" :key="item.id">
                <template slot="title">
                    <Icon :type="item.icon"/>
                    {{item.title}}
                </template>
                <MenuItem
                    :name="(index+1)-(d+1)"
                    v-for="(i,d) in item.children"
                    :key="i.id"
                    :to="'/drug-test/' + i.url"
                >{{i.name}}</MenuItem>
            </Submenu>
        </Menu>
    </div>
</template>

<script>
    export default {
        name: "menuInfo",
        data() {
            return {
                menuList: [
                    {
                        title: "时空药检管理",
                        icon: "ios-paper",
                        children: [
                            {
                                name: "入库药检管理",
                                url: "ware-housing"
                            },
                            {
                                name: "出库药检管理",
                                url: "out-stock"
                            }
                        ]
                    },
                    {
                        title: "速拓药检管理",
                        icon: "ios-paper",
                        children: [
                            {
                                name: "入库药检管理",
                                url: "sutuo-ware-housing"
                            }
                        ]
                    }
                ]
            };
        }
    };
</script>

<style lang="less" scoped>
.menu-info {
    height: 100%;
    .ivu-menu-dark {
        height: 100%;
        background-color: #424242;
    }
}
</style>
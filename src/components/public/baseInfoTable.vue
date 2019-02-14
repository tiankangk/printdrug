<template>
    <div class="base-info-table">
        <Table border ref="selection" :columns="baseInfo.columns" :data="baseInfo.data" @on-selection-change="clickSelect"></Table>
        <div class="table-page">
            <div v-if="!isSelect" class="action-container">
                <Button type="primary" @click="handleSelectAll(true)">全选</Button>
                <Button type="warning" @click="handleSelectAll(false)">取消全选</Button>
            </div>
            <Page :total="baseInfo.total" :current="currentPage" @on-change="pageChange"/>
        </div>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'
    export default {
        name: "baseInfoTable",
        props: ["baseInfo","currentPage","isSelect"],
        data() {
            return {
                columns: []
            };
        },
        methods: {
            ...mapMutations(['setSelectList']),
            /**
             * 分页
             */
            pageChange(index) {
                this.$emit("handlePage", index);
            },
            /**
             * 选中选项
             */
            clickSelect(selection) {
                this.setSelectList(selection)
            },
            handleSelectAll (status) {
                this.$refs.selection.selectAll(status);
            }
        }
    };
</script>

<style lang="less" scoped>
    .table-page {
        display: flex;
        margin-top: 15px;
        justify-content: space-between;
    }
</style>
<template>
   <div class="public-search">
       <div 
            class="add-info-nav-sub"
            v-for="(item, ind) of searchVal"
            :key = "ind">
            <span style="white-space:nowrap;">{{item.title}}:</span>
            <Input @on-enter = "clickQuery" :style="{width:item.width}" class="search-input" v-if="item.type === 'input'" v-model.trim="item.val" clearable :placeholder="'请输入'+item.title" style="width: 180px"/>
            <Select @on-enter = "clickQuery" :style="{width:item.width}" class="search-input" :clearable="true" v-else-if="item.type==='select'" v-model="item.val" style="width:200px">
                <Option class="search-input" v-for="itemSelect in item.select" :value="itemSelect.value" :key="itemSelect.value">{{ itemSelect.label }}</Option>
            </Select>
            <DatePicker @on-enter = "clickQuery" :style="{width:item.width}"  v-model="item.val" v-else type="daterange" placement="bottom-end" placeholder="请选择查询日期" style="width: 200px"></DatePicker>
        </div>
        <div class="add-info-nav-sub">
            <Button type="success" @click="clickQuery">查询</Button>
        </div>
   </div>
</template>
<script>
export default {
    name: 'publicSearch',
    props: {
        searchVal: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
        }
    },
    methods: {
        clickQuery () {
            this.$emit('handleSearch',this.searchVal)
        }
    }
}
</script>
<style lang="less" scoped>
    .public-search {
        display: flex;
        padding:10px;
        overflow:auto;
        .add-info-nav-sub {
            margin-right: 10px;
            display:flex;
            align-items:center;
        }
    }
</style>

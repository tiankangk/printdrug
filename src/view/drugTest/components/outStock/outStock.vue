<template>
    <div class="drug-test">
        <div class="content">
            <Card>
                <div class="header-container">
                    <public-search :searchVal="searchVal" @handleSearch="handleSearch"></public-search>
                    <Button @click="printChoose" type="primary">打印选中项</Button>
                </div>
                <base-info-table class="table-list" :base-info="baseInfo" @handlePage="handlePage"></base-info-table>
            </Card>
        </div>
        <!-- 展示打印图片的模态框 -->
        <Modal v-model="printPicModal" :width="700" title="打印图片预览">
            <img v-for="(url, ind) in previewPic" :key="ind" class="preview-pic" :src="url" alt>
            <div slot="footer">
                <Button type="primary" size="large" @click="handleLook">确定</Button>
            </div>
        </Modal>
        <Spin fix v-if="loading" size="large"></Spin>
    </div>
</template>
<script>
    import publicSearch from "components/public/publicSearch.vue";
    import baseInfoTable from "components/public/baseInfoTable.vue";
    import getLodop from "./LodopFuncs.js";
    import { mapGetters } from "vuex";
    import { getOutStockList, updatePrintStatus } from "api/urlPath";
    export default {
        name: "drugTest",
        inject: ["reload"],
        components: {
            publicSearch,
            baseInfoTable
        },
        data() {
            return {
                name: "欢迎使用药检打印系统",
                loading: false,
                previewPic: "",
                currentPage: 1,
                printPicModal: false,
                uploadPicModal: false,
                uploadPicData: {},
                searchVal: {
                    djbh: {
                        title: "单据编号",
                        val: "",
                        type: "input",
                        width: "100px"
                    },
                    spbh: {
                        title: "商品编码",
                        val: "",
                        type: "input",
                        width: "100px"
                    },
                    zjm: {
                        title: "助记码",
                        val: "",
                        type: "input",
                        width: "100px"
                    },
                    pihao: {
                        title: "产品批号",
                        val: "",
                        type: "input",
                        width: "100px"
                    },
                    status: {
                        title: "状态",
                        val: "",
                        type: "select",
                        width: "80px",
                        select: [
                            {
                                value: 1,
                                label: "已上传"
                            },
                            {
                                value: 0,
                                label: "未上传"
                            }
                        ]
                    },
                    isPrint: {
                        title: "是否打印状态",
                        val: "",
                        type: "select",
                        width: "80px",
                        select: [
                            {
                                value: 1,
                                label: "已打印"
                            },
                            {
                                value: 0,
                                label: "未打印"
                            }
                        ]
                    },
                    time: {
                        title: "日期",
                        val: "",
                        type: "selectTime"
                    }
                },
                baseInfo: {
                    total: 1,
                    pageIndex: 1,
                    pageSize: 10,
                    data: [],
                    columns: [
                        {
                            type: "selection",
                            width: 30,
                            align: "center"
                        },
                        {
                            title: "出库日期",
                            align: "center",
                            width: 80,
                            render: (h, params) => {
                                return h(
                                    "div",
                                    params.row.rq
                                        ? params.row.rq.replace(/[T,Z]/g, " ")
                                        : "---"
                                );
                            }
                        },
                        {
                            title: "单据编号",
                            align: "center",
                            width: 120,
                            key: "djbh"
                        },
                        {
                            title: "销售单位编码",
                            align: "center",
                            width: 60,
                            key: "danwbh"
                        },
                        {
                            title: "销售单位名称",
                            align: "left",
                            width: 140,
                            key: "dwmch"
                        },
                        {
                            title: "商品编码",
                            align: "center",
                            width: 70,
                            key: "spbh"
                        },
                        {
                            title: "商品名称",
                            align: "left",
                            key: "spmch"
                        },
                        {
                            title: "商品规格",
                            align: "left",
                            width: 90,
                            key: "shpgg"
                        },
                        {
                            title: "计量单位",
                            align: "center",
                            width: 50,
                            key: "dw"
                        },
                        {
                            title: "生产厂家",
                            align: "left",
                            key: "shpchd"
                        },
                        {
                            title: "批准文号",
                            align: "left",
                            key: "pizhwh"
                        },
                        {
                            title: "产品批号",
                            align: "center",
                            width: 80,
                            key: "pihao"
                        },

                        {
                            title: "是否上传图片",
                            align: "center",
                            width: 70,
                            render: (h, params) => {
                                return h(
                                    "div",
                                    {
                                        style: {
                                            color: params.row.img ? "" : "red"
                                        }
                                    },
                                    params.row.img ? "已上传" : "未上传"
                                );
                            }
                        },
                        {
                            title: "是否打印",
                            align: "center",
                            width: 70,
                            render: (h, params) => {
                                return h(
                                    "div",
                                    {
                                        style: {
                                            color: params.row.status ? "" : "red"
                                        }
                                    },
                                    params.row.status ? "已打印" : "未打印"
                                );
                            }
                        },
                        {
                            title: "操作",
                            width: 115,
                            align: "center",
                            render: (h, params) => {
                                return h("div", [
                                    h(
                                        "Button",
                                        {
                                            style: {
                                                marginRight: "10px"
                                            },
                                            props: {
                                                type: "primary",
                                                disabled: !params.row.img
                                            },
                                            on: {
                                                click: () => {
                                                    this.printPicModal = true;
                                                    this.previewPic = params.row.img.split(
                                                        ","
                                                    );
                                                }
                                            }
                                        },
                                        "打印图片预览"
                                    )
                                ]);
                            }
                        }
                    ]
                }
            };
        },
        computed: {
            ...mapGetters(["getSelectList"])
        },
        methods: {
            /**
             * 分页数据
             */
            handlePage(index) {
                this.baseInfo.pageIndex = index;
                this.initData();
            },
            /**
             * 点击搜索执行的函数
             */
            handleSearch(val) {
                val.time.val.forEach((item, ind) => {
                    val.time.val[ind] = this.$time(item).format("YYYY-MM-DD");
                });
                this.baseInfo.pageIndex = 1;
                this.initData();
            },
            /**
             * 点击打印执行的函数
             */
            printChoose() {
                if (this.getSelectList.length <= 0) {
                    return this.$Message.warning("你还没有选中要添加的数据");
                } else {
                    this.$Modal.confirm({
                        title: "提示",
                        content: "确定打印选中项吗？",
                        onOk: () => {
                            console.log("getSelectList", this.getSelectList);
                            this.createLODOP(this.getSelectList);
                            updatePrintStatus(this.getSelectList).then(res => {
                                if (res.success) {
                                    this.$Message.success("打印成功");
                                    this.initData();
                                    // this.reload();
                                } else {
                                    this.$Message.error("打印失败");
                                }
                            });
                        }
                    });
                }
            },
            /**
             * 关闭上传图片的模态框
             */
            modalCancel() {
                this.uploadPicModal = false;
            },
            /**
             * 关闭图片预览的模态框
             */
            handleLook() {
                this.printPicModal = false;
            },
            /**
             * 初始化打印控件
             */
            createLODOP(urls) {
                console.log("urls", urls);
                this.LODOP = getLodop();
                let LODOP = this.LODOP;
                LODOP.PRINT_INIT();
                LODOP.SET_PRINT_MODE("PROGRAM_CONTENT_BYVAR", true); //生成程序时，内容参数有变量用变量，无变量用具体值
                LODOP.SET_PRINT_STYLEA(0, "ContentVName", "MyData"); //设置内容参数的变量名
                LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4");
                urls.forEach(item => {
                    let imgList = item.img.split(",");
                    imgList.forEach(img => {
                        console.log("img", img);

                        LODOP.ADD_PRINT_IMAGE(
                            0,
                            0,
                            "210mm",
                            "297mm",
                            `<img border="0" style="width:210mm;height:297mm;" src="${img}">`
                        );
                        LODOP.SET_PRINT_STYLEA(0, "HtmWaitMilSecs", 1000);

                        // LODOP.PRINT();
                        LODOP.NEWPAGEA();
                    });
                });
                LODOP.PRINT_DESIGN();
            },
            /**
             * 初始化请求的数据
             */
            initData() {
                this.loading = true;
                getOutStockList({
                    pageIndex: this.baseInfo.pageIndex,
                    pageSize: this.baseInfo.pageSize,
                    searchVal: this.searchVal
                }).then(res => {
                    this.loading = false;
                    res.result.forEach(item => {
                        item._disabled = Boolean(!item.img);
                    });
                    this.baseInfo.data = res.result;
                    this.baseInfo.total = res.total;
                });
            }
        },
        mounted() {
            this.initData();
        }
    };
</script>
<style lang="less" scoped>
.drug-test {
    height: 100%;
    background: #f1f0f5;
    .header-container {
        display: flex;
        justify-content: space-between;
    }
    .content {
        .table-list {
            margin-top: 20px;
        }
    }
}
.preview-pic {
    border: 3px dotted black;
    width: 600px;
    display: block;
    margin: 10px auto;
}
</style>

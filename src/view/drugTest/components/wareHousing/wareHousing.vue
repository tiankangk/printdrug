<template>
    <div class="drug-test">
        <div class="content">
            <Card>
                <div class="header-container">
                    <public-search :searchVal="searchVal" @handleSearch="handleSearch"></public-search>
                </div>
                <base-info-table
                    :isSelect="isSelect"
                    class="table-list"
                    :base-info="baseInfo"
                    @handlePage="handlePage"
                ></base-info-table>
            </Card>
        </div>
        <!-- 展示打印图片的模态框 -->
        <Modal v-model="printPicModal" :width="700" title="打印图片预览">
            <img v-for="(url, ind) in previewPic" :key="ind" class="preview-pic" :src="url" alt>
            <div slot="footer">
                <Button type="primary" size="large" @click="handleLook">确定</Button>
            </div>
        </Modal>
        <!-- 上传图片的模态框 -->
        <Modal v-model="uploadPicModal" width="700" title="上传打印图片">
            <upload-pic
                :initPic="initPic"
                :uploadPicData="uploadPicData"
                :uploadFileList="uploadFileList"
                @handleRemoveImg="handleRemoveImg"
            ></upload-pic>
            <div slot="footer">
                <Button type="text" size="large" @click="modalCancel">取消</Button>
                <Button type="primary" size="large" @click="handleUploadPic">确定</Button>
            </div>
        </Modal>
        <Spin fix v-if="loading" size="large"></Spin>
    </div>
</template>
<script>
    import publicSearch from "components/public/publicSearch.vue";
    import baseInfoTable from "components/public/baseInfoTable.vue";
    import uploadPic from "../public/uploadPic.vue";
    import { getWareHousingList, insertDrugPic } from "api/urlPath";
    export default {
        name: "drugTest",
        inject: ["reload"],
        components: {
            publicSearch,
            baseInfoTable,
            uploadPic
        },
        data() {
            return {
                loading: false,
                isSelect: true,
                previewPic: "",
                currentPage: 1,
                printPicModal: false,
                uploadPicModal: false,
                removeImg: [],
                uploadPicData: {},
                uploadFileList: [],
                initPic: "",
                searchVal: {
                    djbh: {
                        title: "单据编号",
                        val: "",
                        type: "input",
                        width: "100px"
                    },
                     dwmc: {
                        title: "供应商名称/助记码",
                        val: "",
                        type: "input",
                        width: "150px"
                    },
                    spbh: {
                        title: "商品编码/名称/助记码",
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
                    // zjm: {
                    //     title: "助记码",
                    //     val: "",
                    //     type: "input",
                    //     width: "100px"
                    // },
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
                    time: {
                        title: "开票日期",
                        val: "",
                        type: "selectTime"
                    },
                    updateTime: {
                        title: "上传日期",
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
                            title: "入库日期",
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
                        // {
                        //     title: "供货单位内码",
                        //     align: "center",
                        //     width: 90,
                        //     key: "dwbh"
                        // },
                        {
                            title: "供货单位编码",
                            align: "center",
                            width: 60,
                            key: "danwbh"
                        },
                        {
                            title: "供货单位名称",
                            align: "left",
                            width: 140,
                            key: "dwmch"
                        },
                        // {
                        //     title: "商品内码",
                        //     align: "center",
                        //     width: 90,
                        //     key: "spid"
                        // },
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
                            title: "状态",
                            align: "center",
                            width: 60,
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
                            title: "操作",
                            width: 210,
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
                                    ),
                                    h(
                                        "Button",
                                        {
                                            props: {
                                                type: "success"
                                            },
                                            on: {
                                                click: () => {
                                                    this.uploadPicModal = true;
                                                    this.initPic =
                                                        params.row.img || "";
                                                    this.uploadPicData = {
                                                        djbh: params.row.djbh,
                                                        pihao: params.row.pihao,
                                                        spid: params.row.spid,
                                                        img: params.row.img
                                                    };
                                                }
                                            }
                                        },
                                        "上传图片"
                                    )
                                ]);
                            }
                        }
                    ]
                }
            };
        },
        methods: {
            /**
             * 分页数据
             */
            handlePage(index) {
                this.baseInfo.pageIndex = index;
                this.initData();
            },
            /***
             * 搜索药检内容
             */
            handleSearch(val) {
                val.time.val.forEach((item, ind) => {
                    val.time.val[ind] = this.$time(item).format("YYYY-MM-DD");
                    
                });
                val.updateTime.val.forEach((item, ind) => {
                    val.updateTime.val[ind] = this.$time(item).format("YYYY-MM-DD");
                    
                });
                this.baseInfo.pageIndex = 1;
                this.initData();
            },
            /**
             * 保存删除已保存在数据库的路径
             */
            handleRemoveImg(img) {
                this.removeImg.push(img);
            },
            /**
             * 上传图片到后台
             */
            handleUploadPic() {
                this.uploadPicData.time = this.$time(Date.now()).format(
                    "YYYY-MM-DD HH:mm:ss"
                );
                let param = new FormData(); //创建form对象
                param.append("uploadPicData", JSON.stringify(this.uploadPicData));
                if (this.removeImg.length !== 0) {
                    param.append("removeImg", JSON.stringify(this.removeImg));
                }
                this.uploadFileList.forEach((item, index) => {
                    param.append("index", item);
                });
                insertDrugPic(param).then(res => {
                    if (res.success) {
                        this.$Message.success("上传成功！");
                        this.reload();
                    } else {
                        this.$Message.error("上传失败，请重新上传！");
                    }
                });
            },
            /**
             * 关闭上传图片的模态框
             */
            modalCancel() {
                this.uploadPicModal = false;
            },
            /**
             * 关闭打印图片的模态框
             */
            handleLook() {
                this.printPicModal = false;
            },
            /**
             * 初始化数据发送的请求
             */
            initData() {
                this.loading = true;
                getWareHousingList({
                    pageIndex: this.baseInfo.pageIndex,
                    pageSize: this.baseInfo.pageSize,
                    searchVal: this.searchVal
                }).then(res => {
                    this.loading = false;
                    this.baseInfo.data = res.result;
                    this.baseInfo.total = res.total;
                });
            }
        },
        created() {
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
.pic-container {
    width: 600px;
}
</style>

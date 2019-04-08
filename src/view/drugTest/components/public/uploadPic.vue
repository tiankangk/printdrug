<template>
    <div>
        <Form width="700" :label-width="80" inline>
            <FormItem label="单据编号">
                <span>{{uploadPicData.djbh}}</span>
            </FormItem>
            <FormItem label="产品批次号">
                <span>{{uploadPicData.pihao}}</span>
            </FormItem>
            <div class="upload-pic-container">
                <div class="demo-upload-list" v-for="(item, ind) in uploadList" :key="ind">
                    <template>
                        <img :src="item">
                        <div class="demo-upload-list-cover">
                            <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                            <Icon type="ios-trash-outline" @click.native="handleRemove(ind)"></Icon>
                        </div>
                    </template>
                </div>
                <Upload
                    ref="upload"
                    :show-upload-list="false"
                    :format="['jpg','jpeg','png']"
                    :before-upload="handleBeforeUpload"
                    multiple
                    type="drag"
                    action="//jsonplaceholder.typicode.com/posts/"
                    style="display: inline-block;width:58px;"
                >
                    <div style="width: 58px;height:58px;line-height: 58px;">
                        <Icon type="ios-camera" size="20"></Icon>
                    </div>
                </Upload>

                <Modal title="View Image" v-model="visible">
                    <img :src="imgName" v-if="visible" style="width: 100%">
                </Modal>
            </div>
        </Form>
    </div>
</template>
<script>
    export default {
        name: "uploadPic",
        props: {
            uploadPicData: {
                type: Object,
                required: true
            },
            uploadFileList: {
                type: Array,
                required: true
            },
            initPic: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                imgName: "",
                visible: false,
                moreLength: 0,
                uploadList: []
            };
        },
        methods: {
            /*****
             * 预览上传的图片
             *
             * *****/
            handleView(url) {
                this.imgName = url;
                this.visible = true;
            },
            /***
             * 移除上传的图片
             */

            handleRemove(ind) {
                if (this.uploadFileList !== 0) {
                    this.uploadFileList.splice(ind - this.moreLength, 1);
                }
                let removeImg = this.uploadList.splice(ind, 1);
                if (removeImg[0].indexOf("http") !== -1) {
                    this.$emit("handleRemoveImg", removeImg[0]);
                }
               
            },
            /***
             * 图片上传前的操作
             */
            handleBeforeUpload(file) {
                this.uploadFileList.push(file);
                let reader = new FileReader();
                let _this = this;
                reader.readAsDataURL(file);
                reader.onloadend = e => {
                    _this.uploadList.push(reader.result);
                };

                return false;
            }
        },

        watch: {
            /***
             * 点击弹出模态框的时候初始化图片
             */
            initPic: {
                handler(newVal, oldVal) {
                    if (newVal.split(",").length > 1) {
                        this.uploadList = newVal.split(",");
                        this.moreLength = this.uploadList.length - 1;
                    } else if (
                        newVal.split(",").length === 1 &&
                        newVal.split(",")[0] != ""
                    ) {
                        this.uploadList = [newVal];
                        this.moreLength = 1;
                    } else {
                        this.uploadList = [];
                    }
                }
            }
        }
    };
</script>
<style lang="less" scoped>
// .upload-pic-container {
//     display: flex;
// }
.preview-pic {
    max-width: 600px;
    display: block;
    margin: auto;
}
.demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    margin-right: 4px;
}
.demo-upload-list img {
    width: 100%;
    height: 100%;
}
.demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
    display: block;
}
.demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}
</style>

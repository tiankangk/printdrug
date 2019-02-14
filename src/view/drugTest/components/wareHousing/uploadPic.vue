<template>
    <div>
        <Form :model="formItem" width="700" :label-width="80" inline>
            <FormItem label="单据编号">
                <span>{{uploadPicData.djbh}}</span>
            </FormItem>
            <FormItem label="产品批次号">
                <span>{{uploadPicData.pihao}}</span>
            </FormItem>
            <div class="title">
                <Upload
                    ref="upload"
                    :show-upload-list="false"
                    :format="['jpg','jpeg','png']"
                    :max-size="2048"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    :before-upload="handleBeforeUpload"
                    type="drag"
                    action="//jsonplaceholder.typicode.com/posts/"
                    style="display: inline-block;width:130px;"
                >
                    <Button type="primary">请选择上传的图片</Button>
                </Upload>
            </div>
            <div class="upload-pic-container">
                <div class="demo-upload-list">
                    <template>
                        <div class="pic-container">
                            <img class="preview-pic" v-if="uploadPicData.img" :src="uploadPicData.img">
                        </div>
                    </template>
                </div>
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
            // previewPic: {
            //     required: true
            // }
        },
        data() {
            return {
                formItem: {
                    spbh: "2341234",
                    ph: "asdf12342"
                },
                // file: {
                //     url: ""
                // }
            };
        },
        methods: {
            handleFormatError(file) {
                this.$Notice.warning({
                    title: "The file format is incorrect",
                    desc:
                        "File format of " +
                        file.name +
                        " is incorrect, please select jpg or png."
                });
            },
            handleMaxSize(file) {
                this.$Notice.warning({
                    title: "Exceeding file size limit",
                    desc: "File  " + file.name + " is too large, no more than 2M."
                });
            },
            handleBeforeUpload(file) {
                let reader = new FileReader();
                let _this = this;
                reader.readAsDataURL(file);
                reader.onloadend = e => {
                    file.url = reader.result;
                    // _this.file = file;
                    _this.uploadPicData.img = file.url;
                };

                return false;
            }
        },
        // watch: {
        //     previewPic(url) {
        //         this.file.url = url;
        //     }
        // }
    };
</script>
<style lang="less" scoped>
.upload-pic-container {
    display: flex;
    .demo-upload-list {
        border: 1px solid lightgrey;
        margin: 0 auto;
        min-width: 200px;
        min-height: 200px;
    }
}
.preview-pic {
    max-width:600px;
    display: block;
    margin: auto;
}
</style>

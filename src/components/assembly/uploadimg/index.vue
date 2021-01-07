<template>
    <div class="upLoadImg">
        <el-upload
            class="avatar-uploader"
            action="http://up-z1.qiniup.com"
            :data="upLoadImg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imgurl" :src="imgurl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>

<script>
import server from "@/req/request";
export default {
    name : "upLoadImg",
    data() {
        return {
            upLoadImg : {
                'token' : '',
                'key' : ''
            },
            imgurl : ''
        }
    },
    props : {
       img : {
            type : String,
            default : ''
        },
    },
    watch: {
        img :{
            handler(newValue,oldValue){
                this.imgurl = newValue;
            }
        },
    },
    methods: {
        handleAvatarSuccess(res, file) {
            var images = `http://qkz8eg1p3.hb-bkt.clouddn.com/${file.name}`;
            this.imgurl = images
            this.$emit("update:img",images);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            let suffix = file.name
            let key = encodeURI(`${suffix}`);
            this.upLoadImg.key = key;
            return isJPG && isLt2M;
        },
        getqny(){
            this.getqnyToken().then(res => {
                this.upLoadImg.token = res.data.token;
            });
        },
    },
    mounted() {
        console.log('aa')
        this.getqny();
    },
    
}
</script>

<style lang="scss" scope>
            .avatar-uploader .el-upload {
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                //overflow: hidden;
            }
            .avatar-uploader .el-upload:hover {
                border-color: #409EFF;
            }
            .avatar-uploader-icon {
                font-size: 28px;
                color: #8c939d;
                width: 178px;
                height: 178px;
                line-height: 178px;
                text-align: center;
            }
            .avatar {
                width: 178px;
                height: 178px;
                display: block;
            }
</style>
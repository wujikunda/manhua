<template>
  <div class="upload-container">
    <el-button :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary" @click=" dialogVisible=true">
      上传图片
    </el-button>
    <el-dialog :visible.sync="dialogVisible">
      <!-- <el-upload
        :multiple="true"
        :file-list="fileList"
        :show-file-list="true"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        class="editor-slide-upload"
        action="https://httpbin.org/post"
        list-type="picture-card"
      > -->
      <div class="imgList" style="margin-bottom: 15px;">
        <div v-for="(item, index) in fileList" :key="index" class="imgBox">
          <img class="imgItem" :src="item.pic" @click="preView(item.pic)">
          <img class="imgDelete" :src="require('@/assets/404_images/button_shanchu.png')" @click="fileList.splice(index, 1)">
        </div>
        <img class="imgItem" :src="require('@/assets/404_images/img_upload.png')" @click="upLoadImg('list')">
      </div>
      <!-- </el-upload> -->
      <el-button @click="dialogVisible = false">
        取消
      </el-button>
      <el-button type="primary" @click="handleSubmit">
        确定
      </el-button>
    </el-dialog>
    <qiniu ref="uploadFiles" class="needsclick" @selectFinish="getUploadImg"></qiniu>
  </div>
</template>

<script>
import qiniu from '@/components/qiniu/qiniu'
export default {
  name: 'EditorSlideUpload',
  components: {
    qiniu
  },
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: []
    }
  },
  methods: {
    getUploadImg(url, file, type) {
      this.fileList.push({
        pic: url,
        url: url
      })
    },
    upLoadImg(type) {
      this.$refs.uploadFiles.museClick(type)
    },
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit() {
      // const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      // if (!this.checkAllSuccess()) {
      //   this.$message('Please wait for all images to be uploaded successfully. If there is a network problem, please refresh the page and upload again!')
      //   return
      // }
      this.$emit('successCBK', this.fileList)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    handleSuccess(response, file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = response.files.file
          this.listObj[objKeyArr[i]].hasSuccess = true
          return
        }
      }
    },
    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    beforeUpload(file) {
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      this.listObj[fileName] = {}
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function() {
          _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
        }
        resolve(true)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 148px;
  text-align: center;
  height: 148px;
  cursor: pointer;
  line-height: 146px;
  vertical-align: top;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>

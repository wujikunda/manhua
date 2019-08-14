<template>
  <div class="app-container">
    <el-form ref="dataForm" :model="temp" label-width="80px" style=" margin-left:50px;">
      <el-form-item label="名称" prop="name">
        <el-input v-model="temp.name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="标题" prop="name">
        <el-input v-model="temp.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="作者" prop="name">
        <el-input v-model="temp.author" placeholder="请输入作者" />
      </el-form-item>
      <el-form-item label="分类" prop="name">
        <el-autocomplete
          v-model="temp.cname"
          :fetch-suggestions="querySearchAsync"
          placeholder="请选择分类"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="标签" prop="name">
        <el-checkbox-group v-model="temp.lableList">
          <el-checkbox v-for="(item, index) in tagList" :key="index" :label="item.id">{{ item.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="详情" prop="name">
        <el-input v-model="temp.intro" type="textarea" />
      </el-form-item>
      <el-form-item label="章节数" prop="name">
        <el-input v-model="temp.sectionNum" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="章节费用" prop="name">
        <el-input v-model="temp.sectionPrice" placeholder="请输入名称" />
      </el-form-item>
      <!-- <el-form-item label="付费章节" prop="sort">
        <el-input v-model="temp.sort" placeholder="请输入名称" />
      </el-form-item> -->
      <el-form-item label="是否上架" prop="sort">
        <el-switch v-model="temp.listing" active-color="#13ce66" inactive-color="#ff4949" />
      </el-form-item>
      <el-form-item label="封面logo:" prop="image">
        <div class="centerForm">
          <img :src="temp.cover ? temp.cover : require('@/assets/404_images/img_upload.png')" alt="" @click="upLoadImg('cover')">
        </div>
      </el-form-item>
      <el-form-item label="主图:" prop="image">
        <div class="centerForm">
          <img :src="temp.pic ? temp.pic : require('@/assets/404_images/img_upload.png')" alt="" @click="upLoadImg('pic')">
        </div>
      </el-form-item>
      <el-form-item label="列表:" prop="image">
        <div class="centerForm">
          <div class="imgList">
            <div v-for="(item, index) in temp.bookGalleryDTOList" :key="index" class="imgBox">
              <img class="imgItem" :src="item.pic" @click="preView(item.pic)">
              <img class="imgDelete" :src="require('@/assets/404_images/button_shanchu.png')" @click="temp.bookGalleryDTOList.splice(index, 1)">
              <span v-if="item.name">{{ item.name }}</span>
            </div>
            <img class="imgItem" :src="require('@/assets/404_images/img_upload.png')" @click="upLoadImg('list')">
          </div>
        </div>
      </el-form-item>
    </el-form>
    <qiniu ref="uploadFiles" class="needsclick" @selectFinish="getUploadImg"></qiniu>
    <picture-preview ref="picPreview"></picture-preview>
    <div slot="footer" style=" margin:20px 50px;" class="dialog-footer">
      <el-button @click="closeSelectedTag()">
        取消
      </el-button>
      <el-button type="primary" @click="editState==='create'?createData():updateData()">
        保存
      </el-button>
    </div>
  </div>
</template>

<script>
import { infoAdd, infoSet, infoGet, infoDown, categorySearch, lableSearch } from '@/api/manhua'
import picturePreview from '@/components/picturePreview/preview'
import qiniu from '@/components/qiniu/qiniu'
export default {
  name: 'ComicAdd',
  components: {
    qiniu,
    picturePreview
  },
  filters: {
  },
  data() {
    return {
      editState: 'create',
      upladUrl: '',
      categoryList: [],
      tagList: [],
      state: '',
      timeout: null,
      temp: {
        lableList: [],
        bookGalleryDTOList: [],
        pic: '',
        cover: '',
        name: '',
        listing: false,
        content: ''
      }
    }
  },
  async created() {
    if (this.$route.params.id) {
      this.editState = 'edit'
      await this.init()
    }
    this.getList()
  },
  methods: {
    async init() {
      const res = await infoGet({ id: this.$route.params.id })
      this.temp = Object.assign({}, this.temp, res.data)
      this.temp.bookGalleryDTOList = this.temp.bookGalleryList
      this.temp.lableList = this.temp.bookLableList.map(item => item.id)
    },
    getList() {
      categorySearch({
        pageNo: 1,
        pageSize: 50,
        isEnable: true
      }).then(response => {
        this.categoryList = response.data.records.map(item => {
          item.value = item.name
          return item
        })
        this.listLoading = false
      })
      lableSearch({
        pageNo: 1,
        pageSize: 50,
        isEnable: true
      }).then(response => {
        this.tagList = response.data.records.map(item => {
          item.value = item.name
          return item
        })
        this.listLoading = false
      })
    },
    refresh() {
      this.getList()
    },
    preView(url) {
      this.$refs.picPreview.setPicture(url)
    },
    getUploadImg(url, file, type, index) {
      if (type === 'cover') {
        this.temp.cover = url
      }
      if (type === 'pic') {
        this.temp.pic = url
      }
      if (type === 'list') {
        this.temp.bookGalleryDTOList.push({
          pic: url,
          sort: this.temp.bookGalleryDTOList.length,
          name: file.origin.name
        })
      }
    },
    upLoadImg(type) {
      this.$refs.uploadFiles.museClick(type)
    },
    beforeUpload() {

    },
    uploadSuccess() {

    },
    async querySearchAsync(queryString, cb) {
      // categorySearch({
      //   pageNo: 1,
      //   pageSize: 10,
      //   isEnable: true,
      //   search: queryString
      // }).then(response => {
      //   this.categoryList = response.data.records.map(item => {
      //     item.value = item.name
      //     return item
      //   })
      //   this.listLoading = false
      //   cb(this.categoryList)
      // })
      var categoryList = this.categoryList
      var results = queryString ? categoryList.filter(this.createStateFilter(queryString)) : categoryList
      cb(results)
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.name.toLowerCase().indexOf(queryString.toLowerCase()) > -1)
      }
    },
    handleSelect(item) {
      this.temp.cid = item.id
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        name: '',
        enable: false,
        sort: 0
      }
    },
    handleDelete(row) {
      this.$confirm('是否确认删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        infoDown({ id: row.id }).then(() => {
          this.refresh()
          this.$notify({
            title: 'Success',
            message: '删除成功',
            type: 'danger',
            duration: 2000
          })
        })
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          console.log('this.temp', this.temp)
          infoAdd(this.temp).then(() => {
            this.refresh()
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            this.closeSelectedTag()
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    closeSelectedTag() {
      this.$store.dispatch('tagsView/delView', this.$route).then(({ visitedViews }) => {
        this.$router.back()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          infoSet(tempData).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
            this.closeSelectedTag()
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.centerForm{
  img{
    max-width: 160px;
    max-height: 160px;
  }
  .imgBox{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
}
</style>

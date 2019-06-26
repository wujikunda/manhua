<template>
  <div v-loading="listLoading" class="app-container">
    <el-form ref="dataForm" :model="temp" label-position="left" label-width="80px" style=" margin-left:50px;">
      <el-form-item label="标题" prop="name">
        <el-input v-model="temp.name" />
      </el-form-item>
      <el-form-item label="第几章节" prop="sort">
        <el-input v-model="temp.sort" />
      </el-form-item>
      <el-form-item label="章节费用" prop="sort">
        <el-input v-model="temp.price" />
      </el-form-item>
      <el-form-item label="是否上架" prop="sort">
        <el-switch v-model="temp.listing" active-color="#13ce66" inactive-color="#ff4949" />
      </el-form-item>
      <tinymce v-model="temp.content" :height="660" />
    </el-form>
    <div slot="footer" style=" margin:20px 50px;" class="dialog-footer">
      <el-button @click="$router.back()">
        取消
      </el-button>
      <el-button type="primary" @click="editState==='create'?createData():updateData()">
        保存
      </el-button>
    </div>
  </div>
</template>

<script>
import { sectionAdd, sectionGet, sectionSet } from '@/api/manhua'
import Tinymce from '@/components/Tinymce'

export default {
  name: 'ComicSectionAdd',
  components: { Tinymce },
  filters: {
  },
  data() {
    return {
      editState: 'create',
      temp: {
        id: undefined,
        name: '',
        listing: false,
        sort: '',
        price: '',
        content: ''
      }
    }
  },
  async created() {
    if (this.$route.params.id) {
      this.listLoading = true
      this.editState = 'edit'
      await this.init()
    }
    this.getList()
  },
  methods: {
    async init() {
      const res = await sectionGet({ id: this.$route.params.id })
      this.temp = Object.assign({}, this.temp, res.data)
      this.listLoading = false
      // this.temp.bookGalleryDTOList = this.temp.bookGalleryList
      // this.temp.lableList = this.temp.bookLableList.map(item => item.id)
    },
    getList() {
      this.listLoading = false
    },
    refresh() {
      this.getList()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        name: '',
        enable: false,
        sort: 0
      }
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          console.log('this.temp', this.temp)
          this.temp.bookId = this.$route.query.id
          sectionAdd(this.temp).then(() => {
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
    closeSelectedTag() {
      this.$store.dispatch('tagsView/delView', this.$route).then(({ visitedViews }) => {
        this.$router.back()
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
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          sectionSet(tempData).then(() => {
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

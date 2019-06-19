<template>
  <div class="app-container">
    <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="80px" style="width: 400px; margin-left:50px;">
      <el-form-item label="标题" prop="name">
        <el-input v-model="temp.name" />
      </el-form-item>
      <el-form-item label="第几章节" prop="sort">
        <el-input v-model="temp.sort" />
      </el-form-item>
      <el-form-item label="章节费用" prop="sort">
        <el-input v-model="temp.sort" />
      </el-form-item>
      <el-form-item label="是否上架" prop="sort">
        <el-switch v-model="temp.enable" active-color="#13ce66" inactive-color="#ff4949" />
      </el-form-item>
      <tinymce v-model="temp.comment" :height="960" />
    </el-form>
  </div>
</template>

<script>
import { infoSearch, infoAdd, infoSet, infoDown } from '@/api/manhua'
import Tinymce from '@/components/Tinymce'

export default {
  name: 'ComicSectionAdd',
  components: { Tinymce },
  filters: {
  },
  data() {
    return {
      temp: {
        id: undefined,
        name: '',
        enable: false,
        sort: 0
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      infoSearch({
        pageNo: this.listQuery.page,
        pageSize: this.listQuery.limit
      }).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    refresh() {
      this.getList()
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        name: '',
        enable: false,
        sort: 0
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
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
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          infoSet(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    }
  }
}
</script>

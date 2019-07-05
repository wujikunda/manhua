<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="下单时间" min-width="160px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.gmtCreate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="交易流水" align="center">
        <template slot-scope="{row}">
          <span>{{ row.tradeNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户ID" min-width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="漫币" min-width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.amount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图书名称" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.bookName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="章节名称" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sectionName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="130" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="80px" style="width: 400px; margin-left:50px;">
        <el-form-item label="下单时间">
          <span>{{ temp.gmtCreate }}</span>
        </el-form-item>
        <el-form-item label="交易流水">
          <span>{{ temp.tradeNo }}</span>
        </el-form-item>
        <el-form-item label="用户ID">
          <span>{{ temp.userId }}</span>
        </el-form-item>
        <el-form-item label="漫币">
          <span>{{ temp.amount }}</span>
        </el-form-item>
        <el-form-item label="图书名称">
          <span>{{ temp.bookName }}</span>
        </el-form-item>
        <el-form-item label="章节名称">
          <span>{{ temp.sectionName }}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <!-- <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          保存
        </el-button> -->
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { orderSearch, categoryAdd, userDelete, userDisable, userEnable } from '@/api/manhua'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'UserOrder',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      // const statusMap = {
      //   published: 'success',
      //   draft: 'info',
      //   deleted: 'danger'
      // }
      return status ? 'success' : 'danger'
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        name: '',
        enable: false,
        sort: 0
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新建'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      orderSearch({
        pageNo: this.listQuery.page,
        pageSize: this.listQuery.limit,
        search: this.listQuery.title
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
    handleDown(row) {
      this.$confirm('是否确认禁用', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        userDisable({ id: row.id }).then(() => {
          this.refresh()
          this.$notify({
            title: 'Success',
            message: '禁用成功',
            type: 'danger',
            duration: 2000
          })
        })
      })
    },
    handleUp(row) {
      this.$confirm('是否确认解禁', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        userEnable({ id: row.id }).then(() => {
          this.refresh()
          this.$notify({
            title: 'Success',
            message: '解禁成功',
            type: 'danger',
            duration: 2000
          })
        })
      })
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
        userDelete({ id: row.id, enable: false }).then(() => {
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
          categoryAdd(this.temp).then(() => {
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
          this.$notify({
            title: 'Success',
            message: '保存成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    }
  }
}
</script>

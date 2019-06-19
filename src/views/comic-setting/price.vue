<template>
  <div v-loading="listLoading" class="app-container">
    <div class="filter-container">
      <el-input v-model="rmb" placeholder="请输入人民币数值" style="width: 50px;" class="filter-item" @keyup.enter.native="handleFilter" />
      人民币&nbsp;&nbsp;
      =&nbsp;&nbsp;
      <el-input v-model="amount" placeholder="请输入漫币数值" style="width: 50px;" class="filter-item" @keyup.enter.native="handleFilter" />
      漫币
    </div>
    <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
      保存
    </el-button>
  </div>
</template>

<script>
import { settingExchange, settingExchangeSet } from '@/api/manhua'
import waves from '@/directive/waves' // waves directive

export default {
  name: 'SettingPrice',
  directives: { waves },
  data() {
    return {
      amount: '',
      rmb: '',
      listLoading: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      settingExchange(this.listQuery).then(response => {
        this.amount = response.data.amount
        this.rmb = response.data.rmb
        this.listLoading = false
      })
    },
    handleCreate() {
      settingExchangeSet({
        amount: this.amount,
        rmb: this.rmb
      }).then(response => {
        this.$notify({
          title: 'Success',
          message: '保存成功',
          type: 'success',
          duration: 2000
        })
      })
    }
  }
}
</script>

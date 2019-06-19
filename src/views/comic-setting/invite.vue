<template>
  <div class="app-container">
    <el-form ref="form" v-loading="listLoading" :model="form" class="filter-container" label-width="120px">
      <div class="block-header"><div>分享规则</div></div>
      <el-form-item label="分享次数">
        <el-col :span="10">
          <el-input v-model="form.shareRule.limit" />
        </el-col>
        <el-col class="line" style="text-align:center" :span="2">等同于</el-col>
        <el-col :span="10">
          <div class="div">
            <el-input v-model="form.shareRule.amount" placeholder="1000漫币" @keyup.enter.native="handleFilter">
              <template slot="prepend">漫币: </template>
            </el-input>
          </div>
          <div class="div" style="margin-top: 10px;">
            <el-input v-model="form.shareRule.section" placeholder="可观看的章节" @keyup.enter.native="handleFilter">
              <template slot="prepend">可看章节: </template>
            </el-input>
          </div>
        </el-col>

      </el-form-item>
      <div class="block-header"><div>邀请规则</div></div>
      <el-form-item label="邀请下线人数">
        <el-col :span="10">
          <el-input v-model="form.inviteRule.limit" />
        </el-col>
        <el-col class="line" style="text-align:center" :span="2">等同于</el-col>
        <el-col :span="10">
          <div class="div">
            <el-input v-model="form.inviteRule.amount" placeholder="1000漫币" @keyup.enter.native="handleFilter">
              <template slot="prepend">漫币: </template>
            </el-input>
          </div>
          <div class="div" style="margin-top: 10px;">
            <el-input v-model="form.inviteRule.section" placeholder="可观看的章节" @keyup.enter.native="handleFilter">
              <template slot="prepend">可看章节: </template>
            </el-input>
          </div>
        </el-col>
      </el-form-item>
      <el-form-item label="邀请一个下线">
        <el-col :span="10">
          <el-input v-model="form.rechargeRule.rate" placeholder="可观看的章节" @keyup.enter.native="handleFilter">
            <template slot="prepend">分润比例: </template>
          </el-input>
        </el-col>
      </el-form-item>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        保存
      </el-button>
    </el-form>

  </div>
</template>

<script>
import { settingCommission, settingCommissionSet } from '@/api/manhua'
import waves from '@/directive/waves' // waves directive

export default {
  name: 'SettingInvite',
  directives: { waves },
  data() {
    return {
      amount: '',
      rmb: '',
      form: {
        'shareRule': {
          'limit': 1,
          'amount': 10,
          'section': 3
        },
        'inviteRule': {
          'limit': 1,
          'amount': 10,
          'section': 3
        },
        'rechargeRule': {
          'rate': 0.5
        }
      },
      listLoading: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      settingCommission(this.listQuery).then(response => {
        this.form = response.data
        this.listLoading = false
      })
    },
    handleCreate() {
      settingCommissionSet(this.form).then(response => {
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
<style rel="stylesheet/scss" lang="scss" scoped>
  .block-header{
      color: #1ea0ff;
      font-size: 14px;
      padding: 12px 0;
      margin-bottom: 12px;
      background: #f7f7f7;

      &>div{
          padding: 0 12px;
          border-left: 2px solid #1ea0ff;
      }
  }

  .coupon-edit .el-form .el-textarea .el-textarea__inner{
      height: auto;
  }
  .adviceTxt{
      color: #8c939d
  }
</style>

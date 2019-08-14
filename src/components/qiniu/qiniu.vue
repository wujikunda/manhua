<template>
  <div class="inputBox">
    <input v-show="false" ref="file" class="needsclick" type="file" accept="image/*" multiple="multiple" @change="fileChanged">
  </div>
</template>

<script>
import { getQiNiuToken } from '@/api/manhua'
import iMlrz from 'lrz'
import * as qiniu from 'qiniu-js'
export default {
  name: 'QiniuUpload',
  components: {},
  data() {
    return {
      status: 'ready',
      files: [],
      token: {},
      domain: '',
      type: '',
      uploading: false,
      percent: 0,
      config: {
        useCdnDomain: true,
        disableStatisticsReport: false,
        retryCount: 6,
        region: qiniu.region.z2
      },
      putExtra: {
        fname: '',
        params: {},
        mimeType: null
      }
    }
  },
  computed: {},
  async created() {
    const res = await getQiNiuToken()
    this.token = res.data.uploadToken
    this.domain = res.data.host
  },
  methods: {
    museClick(type) {
      this.type = type
      this.$refs.file.click()
    },
    fileChanged(e) {
      if (typeof FileReader === 'undefined') {
        alert('你的浏览器不支持上传图片哟！')
        return
      }
      const loadingLog = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const list = this.$refs.file.files
      const listLength = list.length
      let sortImg = []
      for (let i = 0; i < list.length; i++) {
        if (!this.isContain(list[i])) {
          const item = {
            name: list[i].name,
            size: list[i].size,
            file: list[i]
          }
          const _this = this
          iMlrz(list[i], {
            // quality: 0.9,
            // width: 600,
            // fieldName: 'headimg'
          }).then(function(rst) {
            setTimeout(() => {
              const observable = qiniu.upload(rst.file, 'upf' + new Date().getTime(), _this.token, _this.putExtra, _this.config)
              observable.subscribe({
                next(res) {
                  // console.log('next', res)
                },
                error(err) {
                  console.log('err', err)
                  loadingLog.close()
                },
                complete(res) {
                  console.log('listLength', listLength)
                  if (listLength === 1) {
                    _this.$emit('selectFinish', _this.domain + '/' + res.key, rst, _this.type, i)
                    loadingLog.close()
                  } else {
                    sortImg.push({ pic: _this.domain + '/' + res.key, file: rst, index: i })
                    if (sortImg.length === listLength) {
                      sortImg = sortImg.sort((a, b) => a.index - b.index)
                      sortImg.forEach((item, j) => {
                        _this.$emit('selectFinish', item.pic, item.file, _this.type, j)
                        loadingLog.close()
                      })
                    }
                  }
                }
              })
            }, i * 50)
          }).catch(function(err) {
            console.log('err', err)
            loadingLog.close()
            alert('浏览器不支持上传图片')
          })
          this.files.push(item)
        }
      }
      this.$refs.file.value = ''
    },
    isContain(file) {
      this.files.forEach(item => {
        if (item.name === file.name && item.size === file.size) {
          return true
        }
      })
      return false
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /*付款弹层*/
  .hide-box{
    width: 100%;
    height: 100vh;
  }
  .dialog-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);
    z-index: 999;
    transition: all 0.5s;
    .dialog-content {
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      background: #fff;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    opacity: 1;
  }

  .fade-enter,
  .fade-leave-to {
    transform: translateY(10px);
    opacity: 0;
  }

</style>

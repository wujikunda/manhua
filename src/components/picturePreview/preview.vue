<template>
  <div v-show="shwoDialog" class="prewViewContainer" @click="shwoDialog = false">
    <div class="imgBox">
      <img :src="imgUrl" @error="loadError($event)">
    </div>
    <slot name="content"></slot>
  </div>
</template>

<script>
export default {
  props: {
    pos: {
      type: String,
      default: 'fixed'
    },
    showBack: {
      type: Boolean,
      default: true
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    backUrl: {
      type: String,
      default: ''
    },
    bgColor: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      imgUrl: require('./default.png'),
      shwoDialog: false
    }
  },
  methods: {
    setPicture: function(url) {
      this.imgUrl = url
      this.shwoDialog = true
    },
    loadError(event) {
      // event.target.src = './default.png'
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.prewViewContainer{
  position: fixed;
  overflow: auto;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: #000;
  z-index: 99999;
  display: flex;
  align-items: center;
  .imgBox{
    width: 100%;
    display: flex;
    align-items: center;
    img{
      object-fit: fill;
      margin: 0 auto;
    }
  }
}
</style>

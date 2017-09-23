<template>
  <div class="video-wrapper">
    <video class="video-player" ref="player" :controls="controls" :autoplay="autoplay" @ended="endedCb">
      <source v-for="(content, index) of contents" :key="index" :src="content.url">
      <!-- Message displayed if video tag not supported or source error -->
      Resource loading failed. Please try again.
    </video>
  </div>
</template>

<script>
export default {
  props: {
    contents: {
      type: Array,
      default: () => []
    },
    fullScreen: {
      type: Boolean,
      default: false
    },
    endedCb: {
      type: Function,
      default: () => {}
    },
    controls: {
      type: Boolean,
      default: true
    },
    autoplay: {
      type: Boolean,
      default: true
    }
  },
  updated () {
    // Suppose to restart the video if component got updated.
    this.$refs.player.load()
  }
}
</script>

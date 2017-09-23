<template>
  <div class="carousel-wrapper">
    <ul class="carousel-list">
      <li v-for="(entry, index) of entries" :key="index">
        <a class="image-link" :style="calcStyleObj(index)" @click="videoClicked(index)"></a>
        <p :style="{width: imageWidth}">{{ entry.title }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    entries: {
      type: Array,
      default: () => []
    },
    imageWidth: {
      type: String,
      default: '220px'
    },
    imageHeight: {
      type: String,
      default: '320px'
    }
  },
  data () {
    return {
      baseStyleObj: {
        width: this.imageWidth,
        height: this.imageHeight
      }
    }
  },
  computed: {
    //
  },
  methods: {
    calcStyleObj: function (index) {
      let bgImage = 'url(' + this.entries[index].getCoverImage().url + ')'
      return Object.assign({}, this.baseStyleObj, { backgroundImage: bgImage })
    },
    videoClicked: function (index) {
      this.$emit('video:clicked', index)
    }
  }
}
</script>

<style lang="scss">
  .carousel-list {
    display: block;
    white-space: nowrap;
    width: 100vw;
    overflow: auto;
    padding: 0;

    li {
      display: inline-block;
      padding: 0 10px;

      a.image-link {
        display: inline-block;
        background-size: cover;
      }

      p {
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
</style>
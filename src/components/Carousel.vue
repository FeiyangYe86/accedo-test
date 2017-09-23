<template>
  <div class="carousel-wrapper" @mousemove="() => { this.controllingByMouse = true }">
    <ul class="carousel-list" ref="item-list">
      <li v-for="(entry, index) of entries" :key="index"
        :class="checkActive(index)" :style="liStyleObj()"
      >
        <a class="image-link" :style="anchorStyleObj(index)" @click="videoClicked(index)" @mouseover="setActive(index)"></a>
        <p :style="{width: anchorStyleObj(index).width}">{{ entry.title }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    // Items to display
    entries: { type: Array },
    // Width of item, required for calculating scrolling
    imageWidth: {
      type: Number,
      default: 220
    },
    // Height of item, same as above
    imageHeight: {
      type: Number,
      default: 320
    },
    // Padding on x-axis, same as above
    paddingHorizontal: {
      type: Number,
      default: 10
    },
    // Padding on y-axis, same as above
    paddingVertical: {
      type: Number,
      default: 0
    },
    // Decide the layout type (either horizontal or vertical)
    layout: {
      default: 'horizontal'
    },
    windowWidth: { default: window.innerWidth },
    windowHeight: { default: window.innerHeight }
  },
  data () {
    return {
      baseStyleObj: {
        width: this.imageWidth + 'px',
        height: this.imageHeight + 'px'
      },
      // Index of the current active/focused item
      activeIndex: null,
      // If active index is defined by mouse or keyboard
      controllingByMouse: true
    }
  },
  computed: {
    imageOuterWidth: function () {
      return this.imageWidth + this.paddingHorizontal * 2
    },
    // The position of the current active item
    // X position for horizontal layout and Y for vertical layout
    activePosition: function () {
      if (this.layout === 'horizontal') {
        return (this.activeIndex + 0.5) * this.imageOuterWidth
      } else if (this.layout === 'vertical') {
        let reminder = this.activeIndex % 2
        return ((this.activeIndex - reminder) / 2 + 0.5) * this.imageHeight
      }
    }
  },
  methods: {
    /**
     * Get the styling obj for the anchor element
     * @param int index of entry
     */
    anchorStyleObj: function (index) {
      let bgImage = 'url(' + this.entries[index].getCoverImage().url + ')'
      if (this.layout === 'horizontal') {
        return Object.assign({}, this.baseStyleObj, { backgroundImage: bgImage })
      } else if (this.layout === 'vertical') {
        return { width: '100%', height: 'calc(' + this.imageHeight + 'px - 54px)', backgroundImage: bgImage }
      }
    },
    /**
     * Get the styling obj for the outer li element
     * @param int index of entry
     */
    liStyleObj: function () {
      if (this.layout === 'horizontal') {
        return { padding: this.paddingVertical + 'px ' + this.paddingHorizontal + 'px' }
      } else if (this.layout === 'vertical') {
        return { padding: '0 5%', width: '40%', height: this.imageHeight + 'px' }
      }
    },
    /**
     * Emit event to notify parent if any video clicked
     * @param int index of entry
     */
    videoClicked: function (index) {
      this.$emit('video:clicked', index)
    },
    /**
     * If the item should have active class
     * @param int index of entry
     */
    checkActive: function (index) {
      return this.activeIndex === index ? 'is-active' : ''
    },
    /**
     * Shift the active index based on the pressed key (left or right)
     * Left would reduce index by 1 and right would increase by 1
     * @param int diff '-1' for left and '1' for right
     */
    shiftActiveItem: function (diff) {
      this.controllingByMouse = false
      if (this.activeIndex === null) {
        this.activeIndex = 0
      } else {
        let newIndex = this.activeIndex + diff
        if (newIndex < 0) {
          this.activeIndex = 0
        } else if (newIndex >= this.entries.length) {
          this.activeIndex = this.entries.length - 1
        } else {
          this.activeIndex = newIndex
        }
      }
      this.scrollToCenter()
    },
    /**
     * If currently controlled by mouse, set the mouseover item as active
     * @param int index of entry
     */
    setActive: function (index) {
      if (this.controllingByMouse) {
        this.$emit('mouseover:carousel')
        this.activeIndex = index
      }
    },
    /**
     * Reset active index to null
     */
    unsetActive: function () {
      this.activeIndex = null
    },
    /**
     * Scrolling the active item to the center of screen
     */
    scrollToCenter: function () {
      if (this.layout === 'horizontal') {
        let targetScrollLeft = this.activePosition - (this.windowWidth / 2)
        this.$refs['item-list'].scrollLeft = targetScrollLeft
      } else if (this.layout === 'vertical') {
        let targetScrollTop = this.activePosition - (this.windowHeight / 2) + this.$el.offsetTop
        window.scrollTo(0, targetScrollTop)
      }
    }
  }
}
</script>

<style lang="scss">
  .carousel-title {
    padding: 10px;
    display: inline-block;
  }
  .carousel-list {
    display: block;
    width: calc(100vw - 20px);
    padding: 10px;
    margin: 0;
    background-color: #eee;
    li {
      display: inline-block;
      padding: 0 10px;

      &.is-active {
        background: #e0af17
      }

      a.image-link {
        display: inline-block;
        background-size: cover;
      }

      p {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
      }
    }
  }
  @media (min-width: 769px) {
    .carousel-list {
      white-space: nowrap;
      overflow: auto;
    }
  }
</style>
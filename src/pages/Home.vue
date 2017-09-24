<template>
  <div class="home-wrapper">
    <div v-show="!videoOn">
      <!-- Title and carousel for movie entries list -->
      <div><span class="carousel-title">Home</span><button style="float:right;margin:10px;padding:5px;" @click="loadEntries(() => {})">Reload</button></div>
      <carousel ref="entries-carousel"
        :entries="movieEntries"
        @video:clicked="videoClickedHandler"
        @mouseover:carousel="shiftControlling(false)"
        :layout="layout" :window-width="windowWidth" :window-height="windowHeight"
      ></carousel>
      <!-- Title and carousel for watched history list -->
      <div v-if="watchHistory.length > 0"><span class="carousel-title">Previous Watched</span></div>
      <carousel ref="history-carousel"
        :image-width="150" :image-height="150"
        :entries="watchHistory"
        @video:clicked="videoClickedHandler"
        @mouseover:carousel="shiftControlling(true)"
        :layout="layout" :window-width="windowWidth" :window-height="windowHeight"
      ></carousel>
    </div>
    <!-- Only display if the route name is 'Video' -->
    <div v-show="videoOn">
      Playing: {{ playingEntry.title }}
      <video-player ref="video-player" full-screen :ended-cb="handleVideoEnd" :contents="entryContents"></video-player>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Carousel from '../components/Carousel.vue'
import VideoPlayer from '../components/VideoPlayer.vue'
import { MovieEntry } from '../models/MovieEntry.js'
import { ApiLoadingError, ElementNotFoundError } from '../models/CustomErrors.js'

export default {
  components: {
    'carousel': Carousel,
    'video-player': VideoPlayer
  },
  data () {
    return {
      apiUrl: 'https://demo2697834.mockable.io/movies',
      // Array to store all movie entries fetched from api
      movieEntries: [],
      // Array to store all watched movies
      watchHistory: [],
      // Decide the current controlled carousel (either main list or history)
      controlling: 'entries-carousel',
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      /* Fields for route 'Video */
      playingEntry: {}, // Movie being played
      entryContents: [] // Contents of played movie
    }
  },
  computed: {
    // Decide to display home view or play video
    videoOn: function () {
      return this.$route.name === 'Video'
    },
    // Decide which layout to use (separated at screen width: 768px)
    onMobile: function () {
      return this.windowWidth <= 768
    },
    layout: function () {
      return this.onMobile ? 'vertical' : 'horizontal'
    }
  },
  methods: {
    /**
     * Push to the video-play path and update history.
     * Request for full screen for Chrome (for now just webkit)
     * @param int index    Index of selected entry
     */
    videoClickedHandler: function (index) {
      this.$router.push({name: 'Video', params: { id: this.movieEntries[index].id }})
      try {
        this.$refs['video-player'].$refs['player'].webkitRequestFullScreen()
      } catch (e) {
        throw new ElementNotFoundError(e.message)
      }
      this.updateHistory(this.movieEntries[index])
    },
    /**
     * Update the content and playing entry to the selected one
     * @param int entryId    Id of selected entry
     */
    updateEntryContents: function (entryId) {
      this.playingEntry = this.getEntryById(entryId)
      let hasContent = this.playingEntry.contents !== undefined
      this.entryContents = hasContent ? this.playingEntry.contents : []
    },
    /**
     * Filter entry instance by id
     * @param int index    Index of selected entry
     * @returns MovieEntry
     */
    getEntryById: function (id) {
      let filterEntries = this.movieEntries.filter(entry => entry.id === id)
      return filterEntries.length ? filterEntries[0] : {}
    },
    /**
     * Exit fullscreen once video ended
     */
    handleVideoEnd: function () {
      window.document.webkitExitFullscreen()
    },
    /**
     * Init history from local storage
     * Store entries array as json string
     */
    initHistory: function () {
      let localHistory = window.localStorage.getItem('watchHistory')
      if (localHistory !== null && localHistory !== '') {
        this.watchHistory = JSON.parse(localHistory).map(entry => {
          return new MovieEntry(entry)
        })
      } else {
        window.localStorage.setItem('watchHistory', JSON.stringify([]))
      }
    },
    /**
     * Insert entry to the front of history
     */
    updateHistory: function (entry) {
      this.watchHistory.unshift(entry)
      window.localStorage.setItem('watchHistory', JSON.stringify(this.watchHistory))
    },
    /**
     * Load movie entries from api
     *
     * @param function successCb callback executed if succeeded
     * @throws ApiLoadingError
     */
    loadEntries: function (successCb) {
      axios.get(this.apiUrl).then(response => {
        this.movieEntries = response.data.entries.map(entry => {
          return new MovieEntry(entry)
        })
        if (this.$route.params.id) {
          this.updateEntryContents(this.$route.params.id)
        }
        successCb()
      }).catch(error => {
        throw new ApiLoadingError(error.message)
      })
    },
    /**
     * Switch the control between entries-carousel and history-carousel
     * @param boolean down    If direction is downwards
     */
    shiftControlling: function (down) {
      if (down) {
        this.$refs['entries-carousel'].unsetActive()
        this.controlling = 'history-carousel'
      } else {
        this.$refs['history-carousel'].unsetActive()
        this.controlling = 'entries-carousel'
      }
    },
    /**
     * Update the window width / height
     */
    handleResize: function () {
      this.windowWidth = window.innerWidth
      this.windowHeight = window.innerHeight
    }
  },
  created () {
    // Load entries as long as component created.
    this.loadEntries(this.initHistory)
  },
  mounted () {
    // Bind keyboard and resize events
    window.addEventListener('keydown', event => {
      // If the pressed button is ArrowLeft(37) or ArraowRight(39), shift active item
      if (event.keyCode === 37 || event.keyCode === 39) {
        event.preventDefault()
        this.$refs[this.controlling].shiftActiveItem(event.keyCode - 38)
      // If ArrowUp(38) or ArrowDown(40) pressed, shift the carousel being controlled
      } else if (event.keyCode === 38 || event.keyCode === 40) {
        event.preventDefault()
        this.shiftControlling(event.keyCode > 38)
        this.$refs[this.controlling].shiftActiveItem(1)
      // If ENTER pressed, play the video and insert into history
      } else if (event.keyCode === 13) {
        this.videoClickedHandler(this.$refs[this.controlling].activeIndex)
      }
    })
    window.addEventListener('resize', this.handleResize)
  },
  watch: {
    '$route.params.id': function (id) {
      this.updateEntryContents(id)
    }
  }
}
</script>

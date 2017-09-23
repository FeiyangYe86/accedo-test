<template>
  <div class="home-wrapper">
    <div v-if="!videoOn">
      <h3>Home</h3>
      <carousel :entries="movieEntries" @video:clicked="videoClickedHandler"></carousel>
    </div>
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

export default {
  components: {
    'carousel': Carousel,
    'video-player': VideoPlayer
  },
  data () {
    return {
      apiUrl: 'https://demo2697834.mockable.io/movies',
      movieEntries: [],
      movieCount: 0,
      loaded: false,
      playingEntry: {},
      entryContents: []
    }
  },
  computed: {
    videoOn: function () {
      return this.$route.name === 'Video'
    }
  },
  methods: {
    videoClickedHandler: function (index) {
      this.$router.push({name: 'Video', params: { id: this.movieEntries[index].id }})
      this.$refs['video-player'].$refs['player'].webkitRequestFullScreen()
    },
    updateEntryContents: function (entryId) {
      this.playingEntry = this.getEntryById(entryId)
      let hasContent = this.playingEntry.contents !== undefined
      this.entryContents = hasContent ? this.playingEntry.contents : []
    },
    getEntryById: function (id) {
      let filterEntries = this.movieEntries.filter(entry => entry.id === id)
      return filterEntries.length ? filterEntries[0] : {}
    },
    handleVideoEnd: function () {
      this.$refs['video-player'].$refs['player'].webkitExitFullScreen()
    }
  },
  created () {
    axios.get(this.apiUrl).then(response => {
      this.movieEntries = response.data.entries.map(entry => {
        return new MovieEntry(entry)
      })
      this.movieCount = response.data.totalCount
      if (this.$route.params.id) {
        this.updateEntryContents(this.$route.params.id)
      }
    })
  },
  watch: {
    '$route.params.id': function (id) {
      this.updateEntryContents(id)
    }
  }
}
</script>

<style>

</style>

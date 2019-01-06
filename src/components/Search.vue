<template>
  <v-layout row wrap>
    <v-flex xs12 sm12 md12>
      <v-toolbar dark flat color="deep-purple accent-2" prominent>
        <v-toolbar-title class="font-weight-medium">HART</v-toolbar-title>
        <v-autocomplete
          :loading="searchLoading"
          color="yellow darken-3"
          :search-input.sync="search"
          cache-items
          flat
          class="mx-3"
          hide-no-data
          hide-details
          :disabled="searchLoading"
          hide-selected
          solo-inverted
          :label="label"
          @keyup.enter="submit(search)"
        ></v-autocomplete>
        <v-menu :nudge-width="100">
          <v-toolbar-title slot="activator">
            <v-icon dark>more_vert</v-icon>
          </v-toolbar-title>
          <v-list class="white">
            <v-list-tile v-for="item in 3" :key="item" href>
              <v-list-tile-title>{{item}}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar>
    </v-flex>
    <v-flex>
      <v-tabs
        v-show="this.news.length > 0"
        slot="extension"
        color="deep-purple accent-2"
        dark
        slider-color="white"
      >
        <v-tab class="font-weight-light">News</v-tab>
        <v-tab class="font-weight-light">Blog</v-tab>
        <v-tabs-items>
          <v-tab-item>
            <v-list
              v-show="news.length > 0"
              subheader
              three-line
              style="overflow-y: auto; height: 500;"
            >
              <v-subheader class="deep-purple darken-1">
                <v-spacer></v-spacer>
                <v-rating
                  v-model="averageRating"
                  background-color="white"
                  color="white"
                  dense
                  readonly
                  half-increments
                  hover
                ></v-rating>
                <v-chip label small outline text-color="white">{{ averageRating }}</v-chip>
                <v-chip v-if="averageRating < 2.5" label small color="red" text-color="white">부정적</v-chip>
                <v-chip
                  v-if="averageRating >= 4"
                  label
                  small
                  color="green accent-4"
                  text-color="white"
                >긍정적</v-chip>
                <v-spacer></v-spacer>
              </v-subheader>
              <template v-for="(item, index) in news">
                <v-list-tile :key="item.title" avatar ripple :href="item.link">
                  <v-list-tile-content>
                    <v-list-tile-title v-html="item.title"></v-list-tile-title>
                    <v-list-tile-sub-title class="font-weight-regular" v-html="item.description"></v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-list-tile-action-text>{{ item.rating }}</v-list-tile-action-text>
                    <v-icon v-if="item.rating < 8" color="red lighten-1">mood_bad</v-icon>
                    <v-icon v-else color="green darken-1">mood</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider v-if="index + 1 < news.length" :key="index"></v-divider>
              </template>
            </v-list>
          </v-tab-item>
          <v-tab-item>
            <v-list
              v-show="news.length > 0"
              subheader
              two-line
              style="overflow-y: auto; height: 500;"
            >
              <v-subheader class="deep-purple darken-1">
                <v-spacer></v-spacer>
                <v-rating
                  v-model="averageRatingBlog"
                  background-color="white"
                  color="white"
                  dense
                  readonly
                  half-increments
                  hover
                ></v-rating>
                <v-chip label small outline text-color="white">{{ averageRatingBlog }}</v-chip>
                <v-chip
                  v-if="averageRatingBlog < 2.5"
                  label
                  small
                  color="red"
                  text-color="white"
                >부정적</v-chip>
                <v-chip
                  v-if="averageRatingBlog >= 4"
                  label
                  small
                  color="green accent-4"
                  text-color="white"
                >긍정적</v-chip>
                <v-spacer></v-spacer>
              </v-subheader>
              <template v-for="(item, index) in blog">
                <v-list-tile :key="item.title" avatar ripple :href="item.link">
                  <v-list-tile-content>
                    <v-list-tile-title v-html="item.title"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="item.description"></v-list-tile-sub-title>
                    <v-list-tile-sub-title>{{item.postdate}}</v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-list-tile-action-text>{{ item.bloggername }}</v-list-tile-action-text>
                    <v-icon v-if="item.rating < 8" color="red lighten-1">mood_bad</v-icon>
                    <v-icon v-else color="green darken-1">mood</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider v-if="index + 1 < news.length" :key="index"></v-divider>
              </template>
            </v-list>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-flex>
    <v-flex xs12 sm12 md12>
      <v-chip
        outline
        small
        color="deep-purple"
        v-for="item in naverRank"
        :key="item.keyword"
        @click="submit(item.keyword)"
      >#{{item.keyword}}</v-chip>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Search',
  created () {},
  mounted () {
    axios.get('http://rank.search.naver.com/rank.js').then(response => {
      this.naverRank = response.data.data[0].data.slice(0, 10)
    })
  },
  data () {
    return {
      loading: false,
      search: null,
      select: null,
      news: [],
      label: '',
      blog: [],
      searchLoading: false,
      averageRating: null,
      averageRatingBlog: null,
      naverRank: []
    }
  },
  methods: {
    // Naver News Search API
    async submit (message) {
      this.searchLoading = true
      await axios
        .get('/v1/api/news/naver', {
          params: {
            query: message,
            sort: 'sim',
            display: 20
          }
        })
        .then(response => {
          this.news = response.data.items
          this.averageRating =
            this.news.map(n => n.rating).reduce((a, b) => a + b, 0) /
            this.news.length /
            2
        })
        .catch(error => {
          this.label = error
        })

      await axios
        .get('/v1/api/blog/naver', {
          params: {
            query: message,
            display: 20
          }
        })
        .then(response => {
          this.blog = response.data.items
          this.averageRatingBlog =
            this.blog.map(n => n.rating).reduce((a, b) => a + b, 0) /
            this.blog.length /
            2
        })
        .catch(error => {
          this.label = error
        })
      this.searchLoading = false
    },
    simulatedQuery (v) {
      this.loading = 'info'
      this.items = this.states.filter(
        e => (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
      )
      this.loading = false
    }
  }
}
</script>
<style>
.v-list {
  max-height: 300px;
  overflow-y: auto;
}
</style>

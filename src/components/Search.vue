<template>
  <v-layout row wrap>
    <v-flex xs12 sm12 md12>
      <v-toolbar dark flat color="deep-purple accent-2">
        <v-toolbar-title class="font-weight-medium">HART</v-toolbar-title>
        <v-autocomplete
          dense
          :loading="searchLoading"
          color="yellow darken-3"
          :search-input.sync="search"
          cache-items
          flat
          autofocus
          browser-autocomple
          :items="redisCache"
          class="mx-3"
          hide-no-data
          hide-details
          :disabled="searchLoading"
          solo-inverted
          :label="label"
          @keyup.enter="submit(search)"
        >
          <template slot="item" slot-scope="{ item }">
            <v-list-tile-avatar
              size="30"
              color="deep-purple"
              class="headline font-weight-light white--text"
            >{{ item.charAt(0)}}</v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-text="item" @click="submit(item)"></v-list-tile-title>
              <!-- <v-list-tile-sub-title v-text="item"></v-list-tile-sub-title> -->
            </v-list-tile-content>
            <v-list-tile-action>
              <!-- <v-icon>person</v-icon> -->
            </v-list-tile-action>
          </template>
        </v-autocomplete>
        <v-menu bottom left>
          <v-btn slot="activator" dark icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile v-for="(item, i) in menu" :key="i" @click="() => {}">
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
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
        slider-color="yellow darken-2"
        height="35"
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
    axios.get('/v1/api/redis/ranks').then(response => {
      this.naverRank = response.data.ranks
    })
    axios.get('/v1/api/redis/cache').then(response => {
      this.redisCache = response.data.cache
    })
  },
  data () {
    return {
      loading: false,
      search: null,
      select: null,
      redisCache: [],
      news: [],
      label: '',
      blog: [],
      searchLoading: false,
      averageRating: null,
      averageRatingBlog: null,
      naverRank: [],
      noResult: null,
      redisClient: null,
      menu: [{ title: '정확도' }, { title: '최신순' }]
    }
  },
  watch: {
    redisRecommandation (keyword) {
      keyword && keyword !== this.search && this.queryRedis(keyword)
    }
  },
  methods: {
    // Naver News Search API
    queryRedis (keyword) {
      this.searchLoading = true
      this.searchLoading = false
    },
    async submit (message) {
      this.searchLoading = true
      axios.post('/v1/api/redis/cache', {
        keyword: message
      })
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

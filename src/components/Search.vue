<template>
  <v-layout row wrap>
    <v-flex xs12 sm12 md12>
      <v-toolbar dark flat color="deep-purple accent-2">
        <v-toolbar-title>뉴스</v-toolbar-title>
        <v-autocomplete
          :loading="loading"
          :search-input.sync="search"
          cache-items
          flat
          class="mx-3"
          hide-no-data
          hide-details
          hide-selected
          solo-inverted
          @keyup.enter="submit()"
        ></v-autocomplete>
        <v-btn icon @click="submit()">
          <v-icon>search</v-icon>
        </v-btn>
      </v-toolbar>
    </v-flex>
    <v-flex>
      <v-list v-show="news.length > 0" subheader three-line style="overflow-y: auto; height: 500;">
        <v-subheader class="deep-purple darken-2">
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
          <v-chip v-if="averageRating < 2.5" label small color='red' text-color="white">부정적</v-chip>
          <v-chip v-if="averageRating >= 4" label small color='green accent-4' text-color="white">긍정적</v-chip>
          <v-spacer></v-spacer>
        </v-subheader>
        <template v-for="(item, index) in news">
          <v-list-tile :key="item.title" avatar ripple :href="item.link">
            <v-list-tile-content>
              <v-list-tile-title v-html="item.title"></v-list-tile-title>
              <v-list-tile-sub-title v-html="item.description"></v-list-tile-sub-title>
              <!-- <v-list-tile-sub-title>test</v-list-tile-sub-title> -->
            </v-list-tile-content>

            <v-list-tile-action>
              <v-list-tile-action-text>{{ item.rating }}</v-list-tile-action-text>
              <v-icon v-if="item.rating < 8" color="grey lighten-1">star_border</v-icon>
              <v-icon v-else color="yellow darken-2">star</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider v-if="index + 1 < news.length" :key="index"></v-divider>
        </template>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Search',
  created () {},
  data () {
    return {
      loading: false,
      search: null,
      select: null,
      news: [],
      averageRating: null
    }
  },
  methods: {
    // Naver News Search API
    submit (message, event) {
      axios
        .get('/v1/api/news/naver', {
          params: {
            query: this.search,
            sort: 'sim'
          }
        })
        .then(response => {
          this.news = response.data.items
          this.averageRating =
            this.news.map(n => n.rating).reduce((a, b) => a + b, 0) / this.news.length / 2
        })
        .catch(error => {
          console.log(error)
        })
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
  max-height: 360px;
  overflow-y: auto;
}
</style>

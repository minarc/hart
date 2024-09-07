<template>
  <v-container class="white">
    <v-img :src="`/static/polygon-heart.png`" height="180" contain/>
    <h2 class="display-3 font-weight-light deep-purple--text">HART</h2>

    <v-layout align-center justify-center row>
      <v-flex xs12 sm12 md12 lg10>
        <v-tabs v-model="model" color="deep-purple accent-4" dark icons-and-text centered grow>
          <v-tabs-slider color="yellow darken-3"></v-tabs-slider>
          <v-tab>감성 분류
            <v-icon>fa-heart</v-icon>
          </v-tab>
          <v-tab>감성 검색
            <v-icon>fa-search</v-icon>
          </v-tab>
          <v-tab>AI (준비중)
            <v-icon>fa-robot</v-icon>
          </v-tab>
          <v-tab>
            트위터 (준비중)
            <v-icon>fab fa-twitter</v-icon>
          </v-tab>
        </v-tabs>
         <v-tabs-items v-model="model" vertical reverse>
          <v-tab-item>
            <inputTab/>
          </v-tab-item>
          <v-tab-item lazy>
            <newsSearchTab/>
          </v-tab-item>
          <v-tab-item lazy>
            <rnnTab/>
          </v-tab-item>
          <v-tab-item lazy>
            <twitter/>
          </v-tab-item>
        </v-tabs-items>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import search from './Search.vue'
import input from './Input.vue'
import rnn from './RNN.vue'
import twitter from './Twitter.vue'

export default {
  components: {
    inputTab: input,
    newsSearchTab: search,
    rnnTab: rnn,
    twitter: twitter
  },
  data () {
    return {
      model: null
    }
  },
  created () {}
}
</script>
<style>
</style>

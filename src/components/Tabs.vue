<template>
  <v-container class="white">
    <v-img :src="`/static/polygon-heart.png`" height="180" contain/>
    <h2 class="display-3 font-weight-light deep-purple--text">HART</h2>

    <v-layout align-center justify-center row>
      <v-flex xs12 sm9 md10 lg7>
        <v-tabs v-model="model" color="deep-purple accent-4" grow dark icons-and-text>
          <v-tabs-slider color="yellow darken-3"></v-tabs-slider>
          <v-tab>감성 분류
            <v-icon>fa-heart</v-icon>
          </v-tab>
          <v-tab>감성 검색
            <v-icon>fa-search</v-icon>
          </v-tab>
          <v-tab>인물
            <v-icon>fa-user</v-icon>
          </v-tab>
          <v-tab>AI
            <v-icon>fa-robot</v-icon>
          </v-tab>
        </v-tabs>
         <v-tabs-items v-model="model" vertical>
          <v-tab-item transition="vertical">
            <inputTab/>
          </v-tab-item>
          <v-tab-item lazy>
            <newsSearchTab/>
          </v-tab-item>
          <v-tab-item lazy>
            <personTab/>
          </v-tab-item>
          <v-tab-item lazy>
            <rnnTab/>
          </v-tab-item>
        </v-tabs-items>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import search from './Search.vue'
import input from './Input.vue'
import person from './Person.vue'
import critic from './Critic.vue'
import rnn from './RNN.vue'

export default {
  components: {
    inputTab: input,
    newsSearchTab: search,
    personTab: person,
    critic: critic,
    rnnTab: rnn
  },
  data () {
    return {
      model: ''
    }
  },
  created () {}
}
</script>
<style>
</style>

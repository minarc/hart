<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height class="white">
        <v-layout row wrap align-start justify-center>
          <v-flex sm4 xs4 md4 class="elevation-5">
            <v-tabs
              infinite
              fixed-tabs
              color="deep-purple accent-4"
              grow
              dark
              show-arrows
            >
              <v-tabs-slider color="white"></v-tabs-slider>
              <v-tab>
                <v-icon>account_box</v-icon>
              </v-tab>
              <v-tab>
                <v-icon>favorite</v-icon>
              </v-tab>
              <v-tab>
                <v-icon>search</v-icon>
              </v-tab>
              <v-tabs-items>
                <v-tab-item>
                  <component :is="tab1"></component>
                </v-tab-item>
                <v-tab-item>
                  <component :is="tab2"></component>
                  <component :is="cards" v-for="n in 2" :key="n"></component>
                </v-tab-item>
                <v-tab-item>
                  <component :is="tab3"></component>
                </v-tab-item>
              </v-tabs-items>
            </v-tabs>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import search from './Search.vue'
import input from './Input.vue'
import cards from './Cards.vue'

export default {
  name: 'Tabs',
  data () {
    return {
      tab1: '',
      tab2: '',
      tab3: '',
      cards: ''
    }
  },
  created () {
    this.tab1 = input
    this.tab2 = search
    this.cards = cards
  }
}
</script>

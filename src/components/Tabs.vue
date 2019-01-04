<template>
  <v-container class="white">
    <v-layout align-center justify-center column>
      <v-flex sm4 xs4 md4 class="elevation-4">
        <v-tabs fixed-tabs color="deep-purple accent-4" grow dark>
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
              <inputTab/>
            </v-tab-item>
            <!-- <v-tab-item> -->
            <!-- <component :is="tab2"></component> -->
            <!-- <component :is="cards" v-for="n in 2" :key="n"></component> -->
            <!-- </v-tab-item> -->
            <!-- <v-tab-item> -->
            <!-- <component :is="tab3"></component> -->
            <!-- </v-tab-item> -->
          </v-tabs-items>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import search from './Search.vue'
import input from './Input.vue'
// import cards from './Cards.vue'

export default {
  components: {
    inputTab: input
  },
  data () {
    return {}
  },
  created () {}
}
</script>

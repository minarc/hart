<template>
  <v-container class="white">
    <v-layout align-center justify-center row>
      <v-flex sm9 xs12 md7 class="elevation-4">
        <v-tabs color="deep-purple accent-4" grow dark icons-and-text>
          <v-tabs-slider color="yellow darken-3"></v-tabs-slider>
          <v-tab>
            감성 분류
            <v-icon>account_box</v-icon>
          </v-tab>
          <v-tab>
            감성 검색
            <v-icon>search</v-icon>
          </v-tab>
          <v-tabs-items>
            <v-tab-item>
              <inputTab/>
            </v-tab-item>
            <v-tab-item>
              <newsSearchTab/>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import search from './Search.vue'
import input from './Input.vue'

export default {
  components: {
    inputTab: input,
    newsSearchTab: search
  },
  data () {
    return {}
  },
  created () {}
}
</script>

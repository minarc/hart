<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height class="white">
        <v-layout row wrap align-start justify-center>
          <v-flex xs4 class="elevation-5">
            <v-tabs animated bounce infinite fixed-tabs color="deep-purple accent-4" grow dark show-arrows>
              <v-tabs-slider color="white"></v-tabs-slider>
              <v-tab><v-icon>account_box</v-icon></v-tab>
              <v-tab><v-icon>favorite</v-icon></v-tab>
              <v-tab><v-icon>search</v-icon></v-tab>
              <v-tabs-items v-model="currentItem">
                <v-tab-item>
                  <component :is="tab1"></component>
                </v-tab-item>
                <v-tab-item>
                  <component :is="tab2"></component>
                  <v-container>
                    <v-card hover>
                      <v-layout >
                        <v-flex xs8>
                          <v-card-title>
                            <div>
                              <div class="headline">Halycon Days</div>
                              <div>Ellie Goulding</div>
                            </div>
                          </v-card-title>
                        </v-flex>
                        <v-flex xs4>
                          <v-img src="https://cdn.vuetifyjs.com/images/cards/halcyon.png" height="125px"></v-img>
                        </v-flex>
                      </v-layout>
                    </v-card>
                  </v-container>
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

export default {
  name: 'Tabs',
  data () {
    return {
      tab1: '',
      tab2: '',
      tab3: ''
    }
  },
  created () {
    this.tab1 = input
    this.tab2 = search
  }
}
</script>

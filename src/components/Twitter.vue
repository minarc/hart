<template>
  <v-layout row>
    <v-flex xs12 sm12>
      <v-card>
        <v-toolbar color='deep-purple accent-2' dark tabs>
          <v-text-field class='mx-3' flat label='Search' prepend-inner-icon='search' solo-inverted></v-text-field>
        </v-toolbar>
        <v-list three-line>
          <template v-for='(item, index) in items'>
            <v-list-tile :key='item.id' avatar>
              <v-list-tile-avatar>
                <img :src='item.user.profile_image_url'>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.user.name }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item.text }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider v-if='index + 1 < items.length' :key='index'></v-divider>
          </template>
        </v-list>
      </v-card>
      <v-card class="elevation-1">
        <v-sheet color='transparent'>
            <v-sparkline
              auto-draw
              smooth
              :labels='labels'
              :value='value'
              color='amber accent-4'
              line-width='1.5'
              :gradient="['#EFAB40', '#EFAB40']"
              padding='24'
            ></v-sparkline>
        </v-sheet>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'

export default {
  created () {
    axios.get('/v1/api/twitter/search').then(response => {
      this.items = response.data['statuses']
    })
  },
  data: () => ({
    items: [],
    labels: ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'],
    value: [200, 5, 410, 5, 300, 5, 250, 240]
  })
}
</script>

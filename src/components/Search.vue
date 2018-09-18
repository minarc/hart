<template>
  <v-toolbar dark flat color='deep-purple accent-2'>
    <v-toolbar-title>search</v-toolbar-title>
      <v-autocomplete :loading='loading' :items='items' :search-input.sync='search' v-model='select' cache-items class='mx-3' flat hide-no-data hide-details hide-selected solo-inverted @keyup.enter="submit(select)"></v-autocomplete>
    <v-btn icon @click="submit(select)"><v-icon>search</v-icon></v-btn>
  </v-toolbar>
</template>

<script>
import axios from 'axios'
import chart from './Chart.vue'

export default {
  name: 'Search',
  components: {
    'chart': chart
  },
  created () {
    axios.get('/api/today').then(response => {
      this.states = response.data
    }).catch(error => {
      console.log(error)
      this.states = ['부산', '서울', '대구', '광주', '대전', '공주', '천안', '이천', '구리', '광명', '안산', '오산', '일산', '성남', '인천', '울산']
    })
  },
  data () {
    return {
      loading: false,
      items: [],
      search: null,
      select: null,
      states: [],
      chart: '',
      chip: ''
    }
  },
  watch: {
    search (value) {
      value && value !== this.select && this.simulatedQuery(value)
    }
  },
  methods: {
    // mysql
    submit (message, event) {
      axios.get('/api/emotion').then(response => {
        this.component = 'chart'
      }).catch(error => {
        console.log(error)
        this.chart = 'chart'
        this.chip = 'chips'
      })
    },
    simulatedQuery (v) {
      this.loading = 'info'
      this.items = this.states.filter(e => (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1)
      this.loading = false
    }
  }
}
</script>

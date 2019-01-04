<template>
  <v-toolbar dark flat color="deep-purple accent-2">
    <v-toolbar-title>search</v-toolbar-title>
    <v-autocomplete
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      v-model="select"
      cache-items
      class="mx-3"
      flat
      hide-no-data
      hide-details
      hide-selected
      solo-inverted
      @keyup.enter="submit(select)"
    ></v-autocomplete>
    <v-btn icon @click="submit(select)">
      <v-icon>search</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Search',
  created () {},
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
      axios
        .get('/api/emotion')
        .then(response => {
          this.component = 'chart'
        })
        .catch(error => {
          console.log(error)
          this.chip = 'chips'
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

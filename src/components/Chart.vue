<template>
  <div class="small">
    <line-chart :chart-data="datacollection"></line-chart>
    <button @click="fillData()">Randomize</button>
  </div>
</template>

<script>
import LineChart from '../chart.js'

export default {
  components: {
    LineChart
  },
  data () {
    return {
      datacollection: null
    }
  },
  mounted () {
    this.fillData()
  },
  methods: {
    fillData () {
      this.datacollection = {
        labels: ['E1', 'E2'],
        datasets: [
          {
            label: [],
            backgroundColor: ['#28384B40', '#DC5C6040'],
            borderColor: '',
            hoverBackgroundColor: '',
            hoverBorderColor: '',
            borderWidth: 1,
            data: [this.getRandomInt(), this.getRandomInt()]
          }
        ]
      }
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1))
    }
  }
}
</script>

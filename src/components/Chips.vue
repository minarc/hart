<template>
  <div class="text-xs-center">
    <v-chip color="teal lighten-2" text-color="white" v-for="c in chips" :key="c">
      <v-avatar><v-icon>{{ c.icon }}</v-icon></v-avatar>
      {{ c.keyword }}
    </v-chip>
  </div>
</template>
<script>
export default {
  created () {
    for (let i = 0; i < Math.floor(Math.random() * (10 + 1)); i++) {
      this.chips.push({
        keyword: 'keyword ' + i,
        icon: 'label'
      })
    }
  },
  data () {
    return {
      chips: []
    }
  }
}
</script>

<template>
  <div id="app">
    <img src="./assets/polygon-heart.png">
    <router-view/>
    <v-footer dark height="auto">
      <v-card class="flex" flat tile>
        <v-card-title class="teal">
          <strong class="subheading">하트</strong>
          <v-spacer></v-spacer>
          <v-btn v-for="icon in icons" :key="icon" class="mx-3" dark icon>
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-actions class="grey darken-3 justify-center">
          &copy;2018 — <strong>Hart</strong>
        </v-card-actions>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

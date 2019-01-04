<template>
  <v-app class="white">
    <v-img :src="`/static/polygon-heart.png`" height="250" contain/>
    <router-view/>
    <v-footer height="165" color="deep-purple">
      <v-layout justify-center row wrap>
        <v-btn v-for="link in links" :key="link" color="white" flat round>{{ link.link }}</v-btn>
        <v-flex deep-purple lighten-1 py-3 text-xs-center white--text xs12>
          &copy;2018 —
          <strong>Hart</strong>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    links: [
      {
        link: 'Document',
        href: ''
      },
      {
        link: 'About Hart',
        href: ''
      },
      {
        link: 'Blog',
        href: ''
      },
      {
        link: 'Contact',
        href: ''
      }
    ]
  })
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<template>
  <v-app class="white">
    <v-img :src="`/static/polygon-heart.png`" height="250" contain/>
    <router-view/>
    <v-footer height="165" color="deep-purple">
      <v-layout justify-center row wrap>
        <!-- <template v-for="link in links"> -->
          <!-- <v-btn :key="link" color="white" flat round :href="`${link.href}`">{{ link.link }}</v-btn> -->
        <!-- </template> -->
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
        href: 'https://arfrumo.gitbook.io/hart/'
      },
      {
        link: 'About Hart',
        href: ''
      },
      {
        link: 'Blog',
        href: 'https://rumo.tistory.com/'
      },
      {
        link: 'Contact',
        href: 'https://rumo.netlify.com/'
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

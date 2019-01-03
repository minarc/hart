<template>
<v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs6>
          <v-layout column warp>
            <v-flex xs6 v-for="n in 4" :key="n">
              <v-card color="cyan darken-2" class="white--text">
                <v-layout>
                  <v-flex xs4>
                    <v-img src="https://cdn.vuetifyjs.com/images/cards/foster.jpg" height="125px"></v-img>
                  </v-flex>
                  <v-flex xs8>
                    <v-card-title class="text-sm-left">
                      <div>
                        <div class="headline">Supermodel</div>
                        <div>Foster the People</div>
                      </div>
                    </v-card-title>
                  </v-flex>
                </v-layout>
                <v-divider light></v-divider>
                <v-card-actions class="pa-2">
                  <v-rating v-model="rating" color="teal accent-4" dense readonly half-increments background-color="teal lighten-4"></v-rating>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
         <v-flex xs6>
            <v-layout column warp>
            <v-flex xs6  v-for="n in 4" :key="n">
            <v-card color="purple" class="white--text">
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
              <v-divider light></v-divider>
              <v-card-actions class="pa-2">
                confidence
                <v-spacer></v-spacer>
                <v-rating v-model="rating" color="teal accent-4" dense readonly half-increments background-color="teal lighten-4"></v-rating>
              </v-card-actions>
            </v-card>
            </v-flex>
            </v-layout>
         </v-flex>
        </v-layout>
      </v-container>
</template>

<script>
export default {
  data () {
    return {}
  },
  mounted () {},
  methods: {
    list () {
      // axios.get('/api/today').then(response => {
      // }).catch(error => {
      //   console.log(error)
      // })
    }
  }
}
</script>

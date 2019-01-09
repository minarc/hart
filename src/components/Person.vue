<template>
  <v-layout column>
    <v-list one-line>
      <v-flex v-for="item in 3" :key="item" style="padding-top: 30px">
        <v-card class="mt-3 mx-auto" max-width="500">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="amber"
            elevation="3"
            max-width="calc(100% - 100px)"
          >
            <v-sparkline
              auto-draw
              smooth
              :labels="labels"
              :value="value"
              color="deep-purple accent-4"
              line-width="1.5"
              :gradient="['#581EE1', '#E155D0']"
              padding="16"
            ></v-sparkline>
          </v-sheet>
          <v-divider></v-divider>
          <v-card-actions>
            <v-list-tile class="grow">
              <v-list-tile-avatar color="grey darken-3">
                <v-img
                  class="elevation-1"
                  src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                ></v-img>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title class="font-weight-light">정치인</v-list-tile-title>
              </v-list-tile-content>

              <v-layout align-center justify-end>
                <v-icon class="mr-1">face</v-icon>
                <span class="subheading mr-2">256</span>
                <span class="mr-1">·</span>
                <v-icon class="mr-1">face</v-icon>
                <span class="subheading">45</span>
              </v-layout>
            </v-list-tile>
          </v-card-actions>
          <v-list>
            <v-list-tile>
              <v-list-tile-avatar></v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title class="font-weight-light">comments</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-list>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      gradient: 'to top, #7B1FA2, #E1BEE7',
      labels: ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'],
      value: [200, 675, 410, 390, 310, 460, 250, 240]
    }
  }
}
</script>

<style>
.v-sheet--offset {
  top: -30px;
  position: relative;
}
</style>

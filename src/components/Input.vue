<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height class="white">
        <v-layout row wrap align-start justify-center>
          <v-flex xs4 class="elevation-5">
            <v-tabs animated bounce infinite fixed-tabs color="deep-purple accent-4" grow dark show-arrows>
              <v-tabs-slider color="white"></v-tabs-slider>
              <v-tab><v-icon>account_box</v-icon></v-tab>
              <v-tab><v-icon>favorite</v-icon></v-tab>
              <v-tab><v-icon>search</v-icon></v-tab>
              <v-tabs-items v-model="currentItem">
                <v-tab-item>
                  <v-container fluid grid-list-lg class="deep-purple lighten-5">
                    <v-textarea counter solo v-model=text required @keyup.enter="submit()" name="input-7-1" label="예문 입력" value=text single-line :disabled=input></v-textarea>
                    <v-progress-linear :active=active color="purple" :indeterminate="true"></v-progress-linear>
                    <v-alert :value=alert color="error" icon="warning" transition="scale-transition"> {{ message }} </v-alert>
                    <v-card>
                      <v-rating v-model="rating" size=40 color="purple darken-1" dense readonly half-increments background-color="purple lighten-4" length=10></v-rating>
                      <v-card-text>
                        <div class="text-md-center">
                          <div>rating : {{rating }}</div>
                          <div>confidence : {{confidence}}</div>
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-container>
                </v-tab-item>
                <v-tab-item>
                  <v-container fluid grid-list-lg class="deep-purple lighten-5">
                    <v-layout column>
                      <v-flex>
                        <v-card dark hover>
                          <v-layout>
                            <v-flex xs8>
                                  <v-card-title primary-title class="text-sm-left">
                                    <div>
                                      <div class="headline">김동연 부총리, 방북단에 포함 안 된 이유는</div>
                                      <div>靑 "부동산 등 추석 민심 살피는 게 더 </div>
                                    </div>
                                  </v-card-title>
                            </v-flex>
                            <v-img class="shrink ma-2" height="125px" src="https://milidom.net/files/attach/images/113/207/098/c16e31760b8eca94e772c148cce3b0ca.jpg" style="flex-basis: 125px"></v-img>
                          </v-layout>
                        <v-divider dark></v-divider>
                        <v-card-actions class="pa-3">#정치<v-spacer></v-spacer>
                        <v-rating value=2.5 readonly background-color="white" color="yellow accent-4" dense half-increments size="18"></v-rating>
                        </v-card-actions>
                        </v-card>
                      </v-flex>
                      <v-flex>
                        <v-card white hover>
                          <v-layout>
                            <v-flex xs8>
                                  <v-card-title primary-title class="text-sm-left">
                                    <div>
                                      <div class="headline">김병준, 소득주도성장 대항마 '국민성장' 제시…"</div>
                                      <div>靑 "부동산 등 추석 민심 살피는 게 더 </div>
                                    </div>
                                  </v-card-title>
                            </v-flex>
                            <v-img class="shrink ma-2" height="125px" src="https://imgnews.pstatic.net/image/003/2018/09/16/NISI20180916_0014467284_web_20180916133326_20180916154837985.jpg?type=w647" style="flex-basis: 125px"></v-img>
                          </v-layout>
                        <v-divider></v-divider>
                        <v-card-actions class="pa-3">#정치<v-spacer></v-spacer>
                        <v-rating value=4  readonly background-color="dark" color="yellow accent-4" dense half-increments size="18"></v-rating>
                        </v-card-actions>
                        </v-card>
                      </v-flex>

                        <v-flex>
                        <v-card dark hover>
                          <v-layout>
                            <v-flex xs8>
                                  <v-card-title primary-title class="text-sm-left">
                                    <div>
                                      <div class="headline">여자만 명절 가사노동, 성차별 1위 사례 꼽혀</div>
                                      <div>여성만 하는 가사노동이 남녀가 함께 꼽은 명절</div>
                                    </div>
                                  </v-card-title>
                            </v-flex>
                            <v-img class="shrink ma-2" height="125px" src="https://imgnews.pstatic.net/image/417/2018/09/16/0000342581_001_20180916145430855.jpg?type=w647" style="flex-basis: 125px"></v-img>
                          </v-layout>
                        <v-divider></v-divider>
                        <v-card-actions class="pa-3">#사회<v-spacer></v-spacer>
                        <v-rating value=1 background-color="white" color="yellow accent-4" dense hover half-increments size="18"></v-rating>
                        </v-card-actions>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-tab-item>
                <v-tab-item>
                  <v-toolbar dark flat color='deep-purple accent-2'>
                    <v-toolbar-title>search</v-toolbar-title>
                    <v-autocomplete
                      :loading='loading'
                      :items='items'
                      :search-input.sync='search'
                      v-model='select'
                      cache-items
                      class='mx-3'
                      flat
                      hide-no-data
                      hide-details
                      hide-selected
                      solo-inverted
                      @keyup.enter="submit(select)"
                    ></v-autocomplete>
                    <v-btn icon @click="submit(select)"><v-icon>search</v-icon></v-btn>
                  </v-toolbar>
                </v-tab-item>
              </v-tabs-items>
            </v-tabs>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Input',
  data () {
    return {
      rating: 0,
      confidence: 0,
      text: '이 감독은 또 한 번 실사화 작업을 멋지게 해 냈다.',
      active: false,
      input: false,
      alert: false,
      message: ''
    }
  },
  methods: {
    submit (message, error) {
      this.active = true
      this.input = true
      this.alert = false
      this.rating = 0

      this.text = this.text.trim()
      axios.get('/api/fasttext?q=' + this.text).then(response => {
        this.rating = response['data']['rating']
        this.confidence = response['data']['confidence']

        if (this.confidence < 0.6) {
          this.alert = true
          this.message = '확실하진 않습니다. 잘 모르겠어요.'
        }

        this.active = false
        this.input = false
      }).catch(error => {
        this.alert = true
        this.message = error.response.status + ' ' + error.response.statusText
        this.active = false
      })
    }
  }
}
</script>

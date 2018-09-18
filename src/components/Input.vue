<template>
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
</template>

<script>
import axios from 'axios'

export default {
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
      this.active = this.input = true
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

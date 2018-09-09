<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout row wrap align-start justify-center>
          <v-flex xs5>
            <v-textarea outline v-model=text @keyup.enter="submit()"
              name="input-7-1"
              label="예문 입력"
              value=text
              hint="최소 20자 이상 문장 입력 권장"
              single-line
            ></v-textarea>
             <v-progress-circular
              :rotate="-90"
              :size="100"
              :width="30"
              :value="rating * 10"
              color="teal"
            >
              {{ rating }}
            </v-progress-circular>
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
      text: '이 감독은 또 한 번 실사화 작업을 멋지게 해 냈다.'
    }
  },
  methods: {
    submit (message, error) {
      this.text = this.text.trim()
      console.log(this.text)
      axios.get('/api/fasttext?q=' + this.text).then(response => {
        console.log(response['data']['rating'])
        console.log(response['data']['confidence'])
        this.rating = response['data']['rating']
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

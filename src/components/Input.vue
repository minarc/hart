<template>
  <v-container fluid grid-list-xs class="deep-purple lighten-5">
    <v-layout row wrap>
      <v-flex>
        <v-form ref="form">
          <v-text-field
            v-model="text"
            color="purple"
            :counter="max"
            :rules="rules"
            @keyup.enter="submit()"
            label="이곳에 문장을 입력하세요."
          ></v-text-field>
        </v-form>
        <v-progress-linear :active="active" color="purple" :indeterminate="true"></v-progress-linear>
        <v-alert
          :value="alert"
          color="error"
          icon="warning"
          transition="scale-transition"
        >{{ message }}</v-alert>
        <v-card>
          <v-rating v-model="rating" size=32 color="purple darken-1" dense readonly half-increments background-color="purple lighten-4" length=10></v-rating>
          <v-card-text>
            <div class="text-md-center">
              <div>rating : {{rating }}</div>
              <div>confidence : {{confidence}}</div>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
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
      message: '',
      max: 50
    }
  },
  computed: {
    rules () {
      const rules = []
      if (this.max) {
        const rule = v =>
          (v || '').length <= this.max ||
          `최대 ${this.max} 글자까지 가능합니다.`
        rules.push(rule)
      }
      return rules
    }
  },
  watch: {
    max: 'validateField',
    model: 'validateField'
  },
  methods: {
    validateField () {
      return this.$refs.form.validate()
    },
    submit (message, error) {
      if (!this.validateField()) {
        return
      }

      this.active = this.input = true
      this.alert = false
      this.rating = 0

      this.text = this.text.trim()
      axios
        .get('/v1/api/predict?q=' + this.text)
        .then(response => {
          this.rating = response['data']['rating']
          this.confidence = response['data']['confidence']

          if (this.confidence < 0.55) {
            this.alert = true
            this.message = '확실하진 않습니다. 잘 모르겠어요.'
          }
          this.active = false
          this.input = false
        })
        .catch(error => {
          this.alert = true
          this.message = error.response.status + ' ' + error.response.data.error
          this.input = true
          this.active = false
        })
    }
  }
}
</script>

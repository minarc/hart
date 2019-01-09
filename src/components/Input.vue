<template>
  <v-container grid-list-md>
    <v-layout column>
      <v-flex>
        <v-form ref="form">
          <v-text-field
            v-model="text"
            :counter="max"
            :rules="rules"
            color="deep-purple accent-2"
            @keyup.enter="submit()"
            label="이곳에 문장을 입력하세요."
            :disabled="linearProgressActive"
            :loading="linearProgressActive"
          ></v-text-field>
        </v-form>
        <v-alert
          :value="alertShow"
          color="error"
          icon="warning"
          transition="scale-transition"
        >{{ alertMessage }}</v-alert>
      </v-flex>
      <v-flex>
        <v-card color="deep-purple accent-2" dark>
          <v-card-text>
            <v-rating v-model="rating" size=29 color="white" dense readonly background-color="grey lighten-1" length=10></v-rating>
            <div class="text-md-center">
              <div>rating : {{ rating }}</div>
              <div>confidence : {{ confidence }}</div>
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
      text: '',
      linearProgressActive: false,
      alertShow: false,
      alertMessage: '',
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
    submit (alertMessage, error) {
      if (!this.validateField()) {
        return
      }

      this.linearProgressActive = true
      this.alertShow = false
      this.rating = 0

      this.text = this.text.trim().replace('%', '')
      axios
        .get('/v1/api/predict?q=' + this.text)
        .then(response => {
          this.rating = response.data.rating
          this.confidence = response.data.confidence

          if (this.confidence < 0.55) {
            this.alertShow = true
            this.alertMessage = '확실하진 않습니다. 잘 모르겠어요.'
          }
          this.linearProgressActive = false
        })
        .catch(error => {
          this.alertShow = true
          this.message = error.response.status + ' ' + error.response.data.error
          this.linearProgressActive = false
        })
    }
  }
}
</script>

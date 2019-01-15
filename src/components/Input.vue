<template>
  <v-card>
    <v-card-text>
      <v-layout row justify-center>
        <v-flex xs11>
          <v-form ref="form">
            <v-text-field
              v-model="text"
              :counter="max"
              solo
              autofocus
              :rules="rules"
              color="deep-purple accent-2"
              @keyup.enter="submit()"
              label="이곳에 문장을 입력하세요."
              :disabled="linearProgressActive"
              :loading="linearProgressActive"
            ></v-text-field>
          </v-form>
          <v-slider
            :value="rating"
            thumb-label="always"
            thumb-color="deep-purple accent-2"
            thumb-size="30"
            color="grey lighten-1"
            always-dirty
            min="0"
            max="10"
            step="1"
            tick-size="1"
            :tick-labels="['-1', '-.8', '-.6', '-.4', '-.2', '0', '.2', '.4', '.6', '.8', '+1']"
            readonly
          >
            <template slot="thumb-label" slot-scope="prop">
              <span>{{ ((rating - 5) * 0.2).toFixed(1) }}</span>
            </template>
            <v-icon slot="prepend" color="grey">mood_bad</v-icon>
            <v-icon slot="append" color="grey">mood</v-icon>
          </v-slider>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-chip
        v-if="confidence"
        small
        outline
        disabled
        label
        color="deep-purple"
      >confidnece {{ confidence }}</v-chip>
      <v-spacer></v-spacer>
    </v-card-actions>
    <v-alert
      :value="alertShow"
      color="warning"
      icon="warning"
      transition="scale-transition"
    >{{ alertMessage }}</v-alert>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      rating: 5,
      confidence: 0,
      text: '',
      linearProgressActive: false,
      alertShow: false,
      alertMessage: '',
      max: 40
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
    },
    sentimentLabel () {
      return this.sentimentExplain[this.rating + 5]['label']
    },
    sentimentColor () {
      return this.sentimentExplain[this.rating + 5]['color']
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

      axios
        .get('/v1/api/predict?q=' + this.text)
        .then(response => {
          console.log(response.data.rating)
          this.rating = response.data.rating
          console.log(this.rating)
          this.confidence = response.data.confidence
          if (this.confidence < 0.3) {
            // this.alertShow = true
            this.alertMessage = '확실하진 않습니다. 잘 모르겠어요.'
          }
          this.linearProgressActive = false
        })
        .catch(error => {
          this.alertShow = true
          console.log(error.response)
          this.alertMessage =
            error.response.data + ' ' + error.response.statusText
          this.linearProgressActive = false
        })
    }
  }
}
</script>

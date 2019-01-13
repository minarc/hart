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
        <!-- <v-alert
          :value="alertShow"
          color="error"
          icon="warning"
          transition="scale-transition"
        >{{ alertMessage }}</v-alert>-->
      </v-flex>
      <v-flex>
        <v-card>
          <v-card-text>
            <v-slider
              v-model="rating"
              thumb-label="always"
              thumb-color="deep-purple accent-2"
              thumb-size="25"
              color="light-blue accent-2"
              always-dirty
              min="-1"
              max="1"
              step="0.25"
              tick-size="0"
              :tick-labels="['-1', '', '-0.5', '', '0', '', '+0.5', '', '+1']"
              track-color="red accent-2"
              readonly
            >
            </v-slider>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-chip
              small
              disabled
              label
              :color="sentimentColor"
              text-color="white"
            >{{ sentimentLabel }}</v-chip>
            <v-spacer></v-spacer>
          </v-card-actions>
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
      max: 50,
      sentimentExplain: [
        {
          label: '극심한 비판',
          color: 'red accent-4'
        },
        {
          label: '매우 부정적',
          color: 'red accent-3'
        },
        {
          label: '다소 부정적',
          color: 'red accent-2'
        },
        {
          label: '부정적',
          color: 'red accent-1'
        },
        {
          label: '조금 부정적',
          color: 'red accent-1'
        },
        {
          label: '중립',
          color: 'deep-purple accent-1'
        },
        {
          label: '조금 긍정적',
          color: 'light-blue'
        },
        {
          label: '다소 긍정적',
          color: 'light-blue accent-1'
        },
        {
          label: '긍정적',
          color: 'light-blue accent-2'
        },
        {
          label: '상당히 긍정적',
          color: 'light-blue accent-3'
        },
        {
          label: '극찬',
          color: 'light-blue accent-4'
        }
      ]
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
      this.rating = 0

      this.text = this.text.trim().replace('%', '')
      axios
        .get('/v1/api/predict?q=' + this.text)
        .then(response => {
          this.rating = response.data.rating - 5
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

<template>
  <v-card>
    <v-card-text>
      <v-flex>
        <v-text-field
          v-model="text"
          :counter="max"
          outline
          autofocus
          :rules="rules"
          color="deep-purple accent-2"
          @keyup.enter="submit()"
          label="주제"
          :disabled="linearProgressActive"
          :loading="linearProgressActive"
        ></v-text-field>
      </v-flex>
    </v-card-text>
    <v-card-actions>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'rnn',
  data () {
    return {}
  }
}
</script>

<template>
  <v-menu
    ref="timeMenuEnd"
    :close-on-content-click="false"
    v-model="timeMenu"
    :nudge-right="40"
    lazy
    transition="scale-transition"
    offset-y
    full-width
    max-width="290px"
    min-width="290px"
  >
    <v-text-field
      slot="activator"
      v-model="value"
      :label="label"
      prepend-icon="access_time"
      readonly/>
    <v-time-picker v-model="time" format="24hr" no-title @input="onInput(), timeMenu = false" :value="value"/>
  </v-menu>
</template>

<script>
export default {
  name: 'time-field',
  props: {
    label: {
      default: 'Label',
      type: String
    },
    value: {
      default: null
    }
  },
  data () {
    return {
      time: null,
      timeMenu: false
    }
  },
  methods: {
    onInput () {
      this.$emit('input', this.time)
    }
  }
}
</script>

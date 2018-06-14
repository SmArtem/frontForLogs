<template>
  <v-menu
    ref="dateMenuEnd"
    :close-on-content-click="false"
    v-model="dateMenu"
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
      prepend-icon="event"
      readonly/>
    <v-date-picker v-model="date" :locale="$i18n.locale" no-title @input="onInput(), dateMenu = false" :value="value"/>
  </v-menu>
</template>

<script>
export default {
  name: 'date-field',
  props: {
    local: {
      default: 'en-US',
      type: String
    },
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
      date: null,
      dateMenu: false
    }
  },
  methods: {
    onInput () {
      this.$emit('input', this.date)
    }
  }
}
</script>

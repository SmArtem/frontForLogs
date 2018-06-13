// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import VueI18n from 'vue-i18n'

import 'vuetify/dist/vuetify.min.css'
import locales from './locales.js'

const langs = []
Object.keys(locales.messages).forEach(function (lang) {
  langs.push(lang)
})
Vue.use(Vuetify, {
  theme: {
    primary: '#01579B',
    secondary: '#80CBC4',
    accent: '#9c27b0',
    error: '#C62828',
    warning: '#FFB300',
    info: '#1A237E',
    success: '#43A047'
  }
})
Vue.use(VueI18n)

const i18n = new VueI18n(locales)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  locals: langs,
  components: { App },
  template: '<App/>'
})

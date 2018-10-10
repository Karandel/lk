// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import ALP_ITIL_API from '@/services/ALP_ITIL_CLIENT_API'

const moment = require('moment')
require('moment/locale/ru')

Vue.use(require('vue-moment'), {
  moment
})

Vue.prototype.$defaultDateTimeFormat = 'DD MMM YYYY HH:mm'

Vue.use(Vuetify, {
  theme: {
    'primary': '#43a047',
    'secondary': '#424242',
    'accent': '#00bcd4',
    'error': '#FF5252',
    'info': '#2196F3',
    'success': '#4caf50',
    'warning': '#FFC107'
  }
})

Vue.config.productionTip = false

Vue.prototype.$ALP_ITIL_API = new ALP_ITIL_API()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import './config/msgs'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

// Token no header da requisição temporariamente
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkdhYnJpZWwgTWF0aWFzIGRhIE7Ds2JyZWdhIiwiZW1haWwiOiJtYXRpYXNub2JyZWdhN0BnbWFpbC5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTUyOTMxOTg2LCJleHAiOjE1NTMxOTExODZ9.QvAUGWIxNRq-RxcFslObjo_-A4U7Tb0fymKFGSkHpn4'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
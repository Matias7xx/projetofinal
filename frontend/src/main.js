import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import './config/msgs'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

// Token no header da requisição temporariamente
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkdhYnJpZWwgTWF0aWFzIGRhIE7Ds2JyZWdhIiwiZW1haWwiOiJtYXRpYXNub2JyZWdhN0BnbWFpbC5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTUyMzY4Mzc5LCJleHAiOjE1NTI2Mjc1Nzl9.6SCPw_9-K2D6wtX4irs1dDEgRrkCBg7cajXpVjbviFI'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
import 'regenerator-runtime'
import Vue from 'vue'
import App from './App'
import store from '@/store'
import router from '@/routes'
import loadImage from '@/plugins/loadImage'

Vue.use(loadImage) // 플러그인 사용

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
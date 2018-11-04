// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import axios from 'axios'
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/lib/flexible'
import '../src/css/index.scss'
import '../src/css/el.css'
import VueQrcode from '@xkeshi/vue-qrcode';

Vue.component ( VueQrcode.name, VueQrcode );


import VueClipboard from 'vue-clipboard2'
import  MuseUI from  'muse-ui'
import  ElementUI from  'element-ui'
// import Crypto from 'crypto-js'
import('@/assets/js/layer.js')
import('@/assets/css/layer.css')
import '@/css/muse-ui.css'
import store from './store/'


Vue.use ( ElementUI );
Vue.use( MuseUI)
Vue.use ( VueClipboard )
Vue.config.productionTip = false
Vue.prototype.$http = axios;
new Vue({
  el: '#app',
  router,
  store,
  render:c=>c(App)
})


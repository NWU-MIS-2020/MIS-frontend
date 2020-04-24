import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'

Vue.prototype.$axios = axios
axios.defaults.withCredentials = true;
// axios.defaults.baseURL = 'http://rap2.taobao.org:38080/app/mock/251395/'; // mock 地址
axios.defaults.baseURL = 'http://mis.zhangjunbo.top/'
// axios.defaults.xsrfCookieName = 'token'
// axios.defaults.xsrfHeaderName = 'Authorization' // default

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

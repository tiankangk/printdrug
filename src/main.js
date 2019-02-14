// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import store from './store'
import XLSX from 'xlsx'
import './api/iviewPull'
// 时间格式化插件
import VueMomentLib from "vue-moment-lib"

Vue.config.productionTip = false

Vue.prototype.$ajax = Axios;
Vue.prototype.XLSX = XLSX;

Vue.use(VueMomentLib);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App/>'
})

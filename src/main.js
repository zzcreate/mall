import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'components/common/toast'
Vue.use(toast)

Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(App) },
  router,
  store,
}).$mount('#app')

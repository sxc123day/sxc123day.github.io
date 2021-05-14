import Vue from 'vue'
import './class-component-hooks'

import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

import formCreate from '@form-create/element-ui'

Vue.use(formCreate)


import '@/utils/index'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

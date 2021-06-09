import Vue from 'vue'
import './class-component-hooks'

import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

import showdown from 'showdown'
import showdownHighlight from 'showdown-highlight'
Vue.prototype.md2html = (md: any) => {
  const converter = new showdown.Converter({
    extensions: [showdownHighlight]
  })
  const text = md.toString()
  const html = converter.makeHtml(text)
  return html
}
import 'highlight.js/lib/highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

import formCreate from '@form-create/element-ui'

Vue.use(formCreate)


import '@/utils/index'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

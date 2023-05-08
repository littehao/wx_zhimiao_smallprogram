import App from './App'
import store from './store'
import tui from '@/utils/httpRequest'
import debounce from '@/utils/debounce'
import config from '@/config/index.js'
// import share from '@/utils/share.js'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.prototype.tui = tui
Vue.prototype.$config = config
App.mpType = 'app'
Vue.mixin(debounce)
// Vue.mixin(share)
const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.mixin(debounce)
	// app.mixin(share)
  app.use(store)
  app.config.globalProperties.tui = tui;
  app.config.globalProperties.$config = config;
  return {
    app
  }
}
// #endif
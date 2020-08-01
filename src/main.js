import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/VueMaterial'
import './plugins/OwlCarousel'
import './plugins/Stripe'
import './plugins/GoogleMaps'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

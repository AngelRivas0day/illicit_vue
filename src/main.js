import Vue from 'vue'
import App from './App.vue'
// deps
import router from './router'
import store from './store'
// plugins
import './plugins/VueMaterial'
import './plugins/OwlCarousel'
import './plugins/Stripe'
import './plugins/GoogleMaps'
import './plugins/VueResponsive'
import './plugins/Vuelidate'
// directives
import './directives'
// styles
import './assets/css/mainTheme.scss'
import './assets/css/fieldTheme.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

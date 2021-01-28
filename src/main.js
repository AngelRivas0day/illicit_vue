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
import './plugins/VueNotify'
import './plugins/VueLazyLoad'
import './plugins/VueInputMask'
import './plugins/Firebase'
import './plugins/VueCookies'
import './plugins/VueClipboard'

// directives
import './directives'
// styles
import './assets/css/mainTheme.scss'
import './assets/css/fieldTheme.scss'
import '../node_modules/animate.css/animate.min.css'

Vue.prototype.$store = store
Vue.material.locale.dateFormat = 'dd/MM/yyyy'
Vue.$cookies.config('1d')


router.beforeEach((to, from, next)=>{
  if(to.matched.some(record=>record.meta.requiresAuth)){
    if(store.getters['user/isLoggedIn']){
      next()
      return 
    }
    next('/auth')
  }else{
    next()
  }
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

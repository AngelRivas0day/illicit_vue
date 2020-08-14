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

// directives
import './directives'
// styles
import './assets/css/mainTheme.scss'
import './assets/css/fieldTheme.scss'

Vue.prototype.$store = store

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

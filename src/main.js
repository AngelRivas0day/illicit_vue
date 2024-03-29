// deps
import Vue from 'vue'
import App from './App.vue'
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
import './plugins/SocketIO'
import './plugins/Skeleton'
import './plugins/Sentry'

// directives
import './directives'

// styles
import './assets/css/mainTheme.scss'
import './assets/css/fieldTheme.scss'
import '../node_modules/animate.css/animate.min.css'

// helpers
import interceptorSetup from './helpers/interceptor'

interceptorSetup()
Vue.prototype.$store = store
Vue.material.locale.dateFormat = 'dd/MM/yyyy'
Vue.$cookies.config('1d')

router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (store.getters['user/isLoggedIn']) {
			next()
			return
		}
		next('/auth')
	} else {
		next()
	}
})

Vue.config.productionTip = false

new Vue({
	sockets: {
		connect() {
			console.log('Socket connected!')
		},
	},
	router,
	store,
	render: (h) => h(App),
}).$mount('#app')
